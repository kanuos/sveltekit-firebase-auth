<script lang="ts">
	import { URL_Patterns, NavType } from '$lib/constants';

	export let navType: NavType = NavType.public;
</script>

<nav class="fixed split-nav padding">
	<div class="nav-brand">
		<h3>
			<a href={URL_Patterns.home}> SvelteADMIN </a>
		</h3>
	</div>
	<div class="collapsible">
		<input id="collapsible1" type="checkbox" name="collapsible1" />
		<label for="collapsible1">
			<div class="bar1" />
			<div class="bar2" />
			<div class="bar3" />
		</label>
		<div class="collapsible-body">
			<ul class="inline">
				{#if navType === NavType.public}
					<li><a href={URL_Patterns.login}>Login</a></li>
					<!-- user is authenticated -->
				{:else}
					<!-- only superuser can manage other admins -->
					{#if navType === NavType.superuser}
						<li><a href={URL_Patterns.manageAdminPage}>Manage users</a></li>
					{/if}
					<!-- all admins and the superuser can operate the following operations -->
					<li><a href={URL_Patterns.updatePasswordPage}>Update Password</a></li>
					<li>
						<form action={URL_Patterns.logoutAction}>
							<button type="submit"> Logout </button>
						</form>
					</li>
				{/if}
			</ul>
		</div>
	</div>
</nav>

<style>
	li > a {
		font-size: 1rem;
	}
</style>
