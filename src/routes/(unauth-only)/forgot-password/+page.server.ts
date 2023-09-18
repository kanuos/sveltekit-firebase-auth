import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from '@sveltejs/kit';

import { EmailValidator, PasswordUpdationCredentials } from '$lib/validator';
import { fireClient } from "$lib/firebase/client"
import { fireAdmin } from '$lib/firebase/admin';
import { URL_Patterns } from '$lib/constants';

export const actions: Actions = {
    "forgot-password": async ({ request, url }) => {
        // parse the incoming request object to get the email 
        let email = (await request.formData()).get("email")?.toString();

        // validate the email received
        const report = EmailValidator.safeParse(email);
        if (!report.success) {
            return fail(400, { forgot: { success: false, message: report.error.errors.map(el => el.message) } })
        }

        // assigning the parsed and validated value to email
        email = report.data;

        try {
            // check if admin exists - if it doesn't - error is thrown by firebase
            await fireAdmin.getUserByEmail(email);

            // the props to the reset function are - 
            // 1 - the current auth state ofthe  user (logged out)
            // 2 - the email of the user
            // 3 - the redirect URL - after successful reset redirect to the login page
            await fireClient.reset(fireClient.auth, email, { url: url.origin + URL_Patterns.login })
            return { forgot: { success: true, message: ["Password reset link sent to " + email] } }
        }
        catch (err: any) {
            // firebase errors
            if (err.errorInfo.code === "auth/user-not-found") {
                return { forgot: { success: false, message: ["Admin doesn't exist"] } };
            }

            return { forgot: { success: false, message: ["something went wrong"] } }
        }
    },
    "reset-password": async ({ request, url }) => {

        // parse the incoming request object to get the email 
        const formData = Object.fromEntries(await request.formData());
        const code = formData.code.toString();
        // for parsing the data using validator
        // remove the unwanted code key - oobCode from firebase is passed as a hidden input
        const passwordCred = { ...formData };
        delete passwordCred.code;

        // the formData has two keys - newPassword , confirmPassword
        // validate the formData
        const validationReport = PasswordUpdationCredentials.safeParse(passwordCred);

        // invalid data
        if (!validationReport.success) {
            return fail(400, { reset: { success: false, message: validationReport.error.errors.map(el => el.message) } })
        }

        // valid passwords + oobCode exists
        try {
            // only runs if the code is valid - try to reset the password
            // if any error is thrown - its caught in the next segment
            await fireClient.confirmReset(fireClient.auth, code, validationReport.data.newPassword)

            return { reset: { success: true, message: ["Password reset successfully!"] } }

        } catch (error) {
            // firebase error
            // - code expired
            return fail(400, { reset: { success: false, message: ["Something went wrong"] } })
        }
    },
};


export const load: PageServerLoad = async ({ url }) => {
    // reset password values are passed through query params
    // two props are passed - mode and oobCode - as per firebase docs
    // if no query params is passed - it means the user wants to visit the forgot password page and not the reset password page
    // reset password is only conditionally rendered depending on the query params and the validity of the codes passed
    const mode = url.searchParams.get("mode"), code = url.searchParams.get("oobCode");

    if (!mode || mode !== "resetPassword" || !code) {
        // render the basic forgot password 
        return { mode: "forgot" }
    }

    // reset password mode
    try {
        // step 1:  
        //  validate the code sent by firebase via email <query params> 
        //  reutrns the email ID of the admin who's trying to reset password
        await fireClient.verifyReset(fireClient.auth, code);

    } catch (error) {
        // firebase error
        // e.g someone manually enters oobCode (maliciously) in order to mess up the admin auth db
        // or the code has expired
        throw redirect(303, URL_Patterns.forgot)

    }

    // valid reset code - will be handled by the page form
    return { mode: "reset", code }
};