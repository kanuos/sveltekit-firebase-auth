// Global layout handler
import type { LayoutServerLoad } from "./$types";
import { NavType } from "$lib/constants"

export const load: LayoutServerLoad = async ({ locals }) => {
    const { user } = locals

    // not authenticated user
    if (!user) {
        return { navType: NavType.public, email: null }
    }

    // authenticated and authorized superuser is logged in
    if (user.superuser) {
        return { navType: NavType.superuser, email: user.email }

    }

    // any non superuser admin is logged in
    return { navType: NavType.admin, email: user.email }
};