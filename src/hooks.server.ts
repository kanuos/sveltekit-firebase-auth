import { fireAdmin } from '$lib/firebase/admin';
import { fireClient } from '$lib/firebase/client';

import { ADMIN_DEFAULT_PASSWORD, SUPERUSER_EMAIL } from '$env/static/private';
import { PUBLIC_COOKIE_NAME } from "$env/static/public"

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    try {
        // list all the admin users
        // if no user is found i.e users.length == 0 - create a superuser with superuser claim set to true
        // no other admin account will have this unique superuser claim set to true
        const { users } = await fireAdmin.listUsers();
        if (users.length === 0) {
            // create a new admin with SUPERUSER email and default admin password
            // also pass the emailVerified flag to true - superuser doesnt need to verify email separately
            const superUser = await fireAdmin.createUser({
                email: SUPERUSER_EMAIL,
                password: ADMIN_DEFAULT_PASSWORD,
                emailVerified: true
            });

            // set the claims for the newly created superuser
            await fireAdmin.setCustomUserClaims(superUser.uid, { superuser: true });
        }

        // check whether authorized
        // if the cookie with the name %PUBLIC_COOKIE_NAME% exists in the incoming request cookie 
        /// it means 
        const tokenFromCookie = event.cookies.get(PUBLIC_COOKIE_NAME);
        const currentUser = fireClient.auth.currentUser;


        if (!tokenFromCookie) {
            throw new Error('No token found in cookies');
        }

        if (!currentUser) {
            throw new Error('Not logged in');
        }

        if (tokenFromCookie && currentUser) {
            const customClaims = await fireAdmin.verifyIdToken(tokenFromCookie)
            const isValidToken = customClaims.uid === currentUser?.uid;
            if (!isValidToken) {
                throw new Error('Invalid token');
            }
            event.locals.user = { email: currentUser.email as string, uid: currentUser.uid, superuser: Boolean(customClaims.superuser) };
        } else {
            // not authorized - either token doesnt exist in cookie or currentUser is null
            // or cookie exists - corrupted
        }

        const response = await resolve(event);
        return response;
    } catch (error) {
        event.locals.user = null;
        event.cookies.delete(PUBLIC_COOKIE_NAME);
        const response = await resolve(event);
        return response;
    }
};
