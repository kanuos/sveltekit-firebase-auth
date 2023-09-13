import { URL_Patterns } from '$lib/constants';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, url }) => {
    const redirectTo = url.searchParams.get('redirect');
    if (locals.user) {
        throw redirect(307, redirectTo || URL_Patterns.dashboard);
    }
};
