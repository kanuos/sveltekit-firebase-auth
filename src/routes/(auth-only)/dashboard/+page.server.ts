import { redirect, type Actions, fail } from "@sveltejs/kit";
import { fireClient } from "$lib/firebase/client";
import { fireAdmin } from "$lib/firebase/admin";
import { PUBLIC_COOKIE_NAME } from "$env/static/public";
import { URL_Patterns } from "$lib/constants";
import { PasswordUpdationCredentials } from "$lib/validator"

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
        throw redirect(303, URL_Patterns.login)
    },
    "update-password": async ({ cookies, locals, request }) => {
        // parse the incoming request from formData to JS object
        const passwordChangeCred = Object.fromEntries(await request.formData());

        // validate the creds using the validator
        const validationReport = PasswordUpdationCredentials.safeParse(passwordChangeCred);
        if (!validationReport.success) {
            // validator error - return all the messages as an array of strings 
            return fail(400, { success: false, message: validationReport.error.errors.map(el => el.message) })
        }

        try {
            // update the credentials
            // since hooks.server.ts ensures that the dashboard routes are authenticated
            // we can assume that the uid is present in locals.user.uid hence the 'as stirng' inference
            await fireAdmin.updateUser(locals.user?.uid as string, {
                password: validationReport.data.newPassword
            })

            // on success - this return statement is read else the catch block is run
            return { success: true, message: ["Password updated"] }

        } catch (error: any) {
            // firebase errors
            return fail(500, { success: false, message: ["Something went wrong", error.message] })
        }
    }
};