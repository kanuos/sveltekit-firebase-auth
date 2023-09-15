<script lang="ts">
	import AdminHome from '$lib/components/AdminHome.svelte';
	import ManageAdmin from '$lib/components/ManageAdmin.svelte';
	import UpdatePassword from '$lib/components/UpdatePassword.svelte';
	import { NavType } from '$lib/constants';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;

	// reactive state to be passed as props to update password form
	$: updatePasswordMessage = form?.updatePassword?.message || ([] as string[]);
	$: updatePasswordSuccess = form?.updatePassword?.success || false;
	
	// reactive state to be passed as props to add admin form
	$: addAdminMessage = form?.addAdmin?.message || ([] as string[]);
	$: addAdminSuccess = form?.addAdmin?.success || false;
	
	// reactive state to be passed as props to delete admin form
	$: deleteAdminMessage = form?.deleteAdmin?.message || ([] as string[])
	$: deleteAdminSuccess = form?.deleteAdmin?.success || false;

	// this variable detects whether the logged in user is superuser and has superuser privileges
	$: isSuperUser = data.navType === NavType.superuser;
</script>

<svelte:head>
	<title>ADMIN dashboard</title>
</svelte:head>

<article class="text-center">
	<h1>Welcome admin</h1>
	<p class="article-meta">{data.email}</p>
	<p class="text-lead">This page denotes the dashboard.</p>
	<div class="row flex-spaces tabs margin-top-large">
		<input id="tab1" type="radio" name="tabs" checked />
		<label for="tab1">Home</label>
		<input id="tab2" type="radio" name="tabs" />
		<label for="tab2">Update Password</label>

		{#if isSuperUser}
			<input id="tab3" type="radio" name="tabs" />
			<label for="tab3">Manage Admins</label>
		{/if}
		<div class="content" id="content1">
			<AdminHome />
		</div>
		<div class="content" id="content2">
			<UpdatePassword message={updatePasswordMessage} success={updatePasswordSuccess} />
		</div>
		{#if isSuperUser}
			<div class="content" id="content3">
				<ManageAdmin
					existingAdmins={data.adminList}
					{isSuperUser}
					{addAdminMessage}
					{addAdminSuccess}
					{deleteAdminMessage}
					{deleteAdminSuccess}
				/>
			</div>
		{/if}
	</div>
</article>
