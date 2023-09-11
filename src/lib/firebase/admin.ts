import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { PRIVATE_KEY, PROJECT_ID, CLIENT_EMAIL } from '$env/static/private';


// Check whether the default firebase app exists or not.
// if the default app exists - the getApps() will return the configured apps list
// if it doesn't the getApps function returns an empty array
// in case the list of apps is not empty - assign app to the default app
// in case where the list of apps is empty - initialize a new app with the configuration from the .env
// cert function is used to pass in the configurations
// these ADMIN/private env variables should never be exposed to the client

const app =
    getApps().length > 0
        ? getApp()
        : initializeApp({
            credential: cert({
                clientEmail: CLIENT_EMAIL,
                privateKey: PRIVATE_KEY,
                projectId: PROJECT_ID
            })
        });

export const fireAdmin = getAuth(app);
