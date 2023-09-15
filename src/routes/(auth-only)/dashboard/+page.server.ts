import { redirect, type Actions } from "@sveltejs/kit";
import { fireClient } from "$lib/firebase/client";
import { fireAdmin } from "$lib/firebase/admin";
import { PUBLIC_COOKIE_NAME } from "$env/static/public";
import { URL_Patterns } from "$lib/constants";

export const actions: Actions = {
    logout: async ({ cookies, locals, url }) => {
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
    }
};