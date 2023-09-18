import { URL_Patterns } from '$lib/constants';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	let redirectURL: string = URL_Patterns.login;
	if (url.pathname !== redirectURL) {
		redirectURL += '?redirect=' + url.pathname.slice(1, url.pathname.length);
	}
	if (!locals.user) {
		throw redirect(307, redirectURL);
	}
};
