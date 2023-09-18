// Global layout handler
import type { LayoutServerLoad } from './$types';
import { NavType } from '$lib/constants';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { user } = locals;
	let loadData: { navType: NavType; email: string | null } = {
		navType: NavType.public,
		email: null
	};

	// authenticated and authorized superuser is logged in
	if (user) {
		loadData.email = user.email;
		loadData.navType = user.superuser ? NavType.superuser : NavType.admin;
	}
	// any non superuser admin is logged in
	return loadData;
};
