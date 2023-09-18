// built in imports
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

// validator
import { AdminCredentials } from '$lib/validator';

// firebase auth controllers
import { fireAdmin } from '$lib/firebase/admin';
import { fireClient } from '$lib/firebase/client';
import { PUBLIC_COOKIE_NAME } from '$env/static/public';
import { URL_Patterns } from '$lib/constants';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const fd = await request.formData();
		// login cred - email and password
		const loginCred = Object.fromEntries(fd);

		// validate the credentials using external validator
		const validation = AdminCredentials.safeParse(loginCred);

		if (!validation.success) {
			return fail(400, { message: validation.error.errors.map((el) => el.message).join(',') });
		}

		const { email, password } = validation.data;

		// login using the client firebase
		try {
			// check whether the email exists as ADMIN - if no ADMIN with the email exists - firebase throws an error
			await fireAdmin.getUserByEmail(email);

			// signin with the email+password using the firebase client
			await fireClient.signIn(fireClient.auth, email, password);

			// on Successful authentication - the current user in the firebase client will have a token
			const tokenID = await fireClient.auth.currentUser?.getIdToken(true);
			if (!tokenID) {
				return fail(500, { message: 'Something went wrong' });
			}

			cookies.set(PUBLIC_COOKIE_NAME, tokenID, { httpOnly: true, secure: true, sameSite: true });
			redirect(307, URL_Patterns.dashboard);
		} catch (error: any) {
			let message: string = '';
			const err: string = error.message;
			if (err === 'Firebase: Error (auth/wrong-password).') {
				message = 'Invalid ADMIN credentials';
			} else if (err === 'There is no user record corresponding to the provided identifier.') {
				message = 'No ADMIN found';
			} else {
				message = error.message;
			}
			return fail(400, { message });
		}
	}
};
