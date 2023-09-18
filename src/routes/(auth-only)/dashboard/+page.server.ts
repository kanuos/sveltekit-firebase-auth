import { redirect, type Actions, fail } from '@sveltejs/kit';
import { fireClient } from '$lib/firebase/client';
import { fireAdmin } from '$lib/firebase/admin';
import { PUBLIC_COOKIE_NAME } from '$env/static/public';
import { URL_Patterns, type AdminType } from '$lib/constants';
import { PasswordUpdationCredentials, EmailValidator } from '$lib/validator';
import type { PageServerLoad } from './$types';
import { ADMIN_DEFAULT_PASSWORD } from '$env/static/private';

export const actions: Actions = {
	logout: async ({ cookies, locals }) => {
		const currentUser = fireClient.auth.currentUser;

		// signout from firebase
		await fireClient.auth.signOut();

		/// refresh token blacklist using firebase-admin
		if (currentUser?.uid) {
			await fireAdmin.revokeRefreshTokens(currentUser.uid as string);
		}

		// on successful log out - clear the cookies
		// set the locals.user to null i.e no active logged in session
		cookies.delete(PUBLIC_COOKIE_NAME);
		locals.user = null;

		/// redirect to the login page
		throw redirect(303, URL_Patterns.login);
	},
	'update-password': async ({ cookies, locals, request }) => {
		// parse the incoming request from formData to JS object
		const passwordChangeCred = Object.fromEntries(await request.formData());

		// validate the creds using the validator
		const validationReport = PasswordUpdationCredentials.safeParse(passwordChangeCred);
		if (!validationReport.success) {
			// validator error - return all the messages as an array of strings
			return fail(400, {
				updatePassword: {
					success: false,
					message: validationReport.error.errors.map((el) => el.message)
				}
			});
		}

		try {
			// update the credentials
			// since hooks.server.ts ensures that the dashboard routes are authenticated
			// we can assume that the uid is present in locals.user.uid hence the 'as stirng' inference
			await fireAdmin.updateUser(locals.user?.uid as string, {
				password: validationReport.data.newPassword
			});

			// on success - this return statement is read else the catch block is run
			return { updatePassword: { success: true, message: ['Password updated'] } };
		} catch (error: any) {
			// firebase errors
			return fail(500, {
				updatePassword: { success: false, message: ['Something went wrong', error.message] }
			});
		}
	},
	add: async ({ locals, request }) => {
		// check if the logged in admin is a superuser or not
		if (!locals.user?.superuser) {
			return fail(409, {
				addAdmin: { success: false, message: ["User doesn't have superuser privileges"] }
			});
		}

		// parse the incoming email ID from the request body
		let email = (await request.formData()).get('new-admin-email');

		// validate the email
		const validationReport = EmailValidator.safeParse(email);
		if (!validationReport.success) {
			return fail(400, {
				addAdmin: { success: false, message: validationReport.error.errors.map((el) => el.message) }
			});
		}

		// reassign the validated email address to email variable - for ease of use in next steps
		email = validationReport.data;

		// create admin without custom claims
		// email verification email can be sent at this step but for the sake of simplicity
		// let's just assume the admin email is valid/real and doesn't need verification
		try {
			await fireAdmin.createUser({
				email,
				emailVerified: true,
				password: ADMIN_DEFAULT_PASSWORD
			});
		} catch (error: any) {
			// firebase errors could be
			// 1. email already exists
			// 2. server error
			return fail(400, { addAdmin: { success: false, message: [error.errorInfo.message] } });

			// Sample error -
			// errorInfo: {
			//     code:    'auth/email-already-exists',
			//     message: 'The email address is already in use by another account.'
			// },
		}

		return {
			addAdmin: { success: true, message: ['Admin created successfully'] }
		};
	},
	delete: async ({ locals, request }) => {
		if (!locals.user?.superuser) {
			return fail(409, {
				deleteAdmin: { success: false, message: ['User is not authorized to delete ADMINs'] }
			});
		}

		// parse the incoming request to obtain the uid of the ADMIN to be deleted
		const uid = (await request.formData()).get('uid');

		// validate the uid
		if (!uid || typeof uid !== 'string') {
			return fail(400, { deleteAdmin: { success: false, message: ['Invalid user ID'] } });
		}

		try {
			// delete the user from firestore
			await fireAdmin.deleteUser(uid);
			return {
				deleteAdmin: {
					success: true,
					message: [`ADMIN - (${uid}) has been deleted from the database`]
				}
			};
		} catch {
			// Some errors that might be caught -
			// 1. Invalid uid or uid doesn't exist
			// .2 Server error

			return { deleteAdmin: { success: false, message: ["ADMIN couldn't be deleted"] } };
		}
	}
};

export const load: PageServerLoad = async () => {
	const { users } = await fireAdmin.listUsers();
	return {
		adminList: users.map(
			({ email, uid, customClaims, metadata }) =>
				({
					email: email as string,
					uid,
					superuser: customClaims?.superuser,
					date: metadata.creationTime
				} satisfies AdminType)
		)
	};
};
