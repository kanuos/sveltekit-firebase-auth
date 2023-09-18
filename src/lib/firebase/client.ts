import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';
import {
    PUBLIC_API_KEY,
    PUBLIC_APP_ID,
    PUBLIC_AUTH_DOMAIN,
    PUBLIC_MESSAGING_SENDER_ID,
    PUBLIC_PROJECT_ID
} from '$env/static/public';

// Check whether the default firebase app exists or not.
// if the default app exists - the getApps() will return the configured apps list
// if it doesn't the getApps function returns an empty array
// in case the list of apps is not empty - assign app to the default app
// in case where the list of apps is empty - initialize a new app with the configuration from the .env

const app =
    getApps().length > 0
        ? getApp()
        : initializeApp({
            apiKey: PUBLIC_API_KEY,
            authDomain: PUBLIC_AUTH_DOMAIN,
            projectId: PUBLIC_PROJECT_ID,
            messagingSenderId: PUBLIC_MESSAGING_SENDER_ID,
            appId: PUBLIC_APP_ID
        });

// auth variable will be used to operate all the client side firebase usage including loging out and much more
const auth = getAuth(app);

//
export const fireClient = {
    auth,
    signIn: signInWithEmailAndPassword,
    reset: sendPasswordResetEmail,
    verifyReset: verifyPasswordResetCode,
    confirmReset: confirmPasswordReset
};
