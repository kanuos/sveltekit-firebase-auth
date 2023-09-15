<script lang="ts">
	import { enhance } from '$app/forms';
	import { URL_Patterns, type AdminType } from '$lib/constants';

	export let existingAdmins: AdminType[] = [];
	export let isSuperUser: boolean = false;

	export let addAdminMessage: string[] = [];
	export let addAdminSuccess: boolean = false;

	export let deleteAdminMessage: string[] = [];
	export let deleteAdminSuccess: boolean = false;
</script>

<!-- Modal to create a new ADMIN -->
<input class="modal-state" id="manage-admin-modal" type="checkbox" />
<div class="modal">
	<label class="modal-bg" for="manage-admin-modal" />
	<div class="modal-body container">
		{#if addAdminMessage.length > 0}
			<div>
				<input class="alert-state" id="addAdminMsgs" type="checkbox" />
				<div class="alert dismissible {addAdminSuccess ? 'alert-success' : 'alert-danger'}">
					<ul>
						{#each addAdminMessage as msg}
							<li class="padding-small">
								{msg}
							</li>
						{/each}
					</ul>
					<label class="btn-small paper-btn" for="addAdminMsgs">&times;</label>
				</div>
			</div>
		{/if}
		<form action={URL_Patterns.addAdminAction} class="row" use:enhance method="post">
			<div class="form-group sm-12 md-8 lg-10 col">
				<label for="new-admin-email">New Admin Email</label>
				<input
					type="email"
					class="padding"
					name="new-admin-email"
					placeholder="e.g. johndoe@example.com"
					id="new-admin-email"
				/>
			</div>
			<button class="sm-12 md-4 lg-2 col inline-block btn paper-btn">Add Admin</button>
		</form>
	</div>
</div>

<!-- ADMIN list -->
<h2 class="text-left">
	<small> Admins List </small>
	<label class="paper-btn btn-secondary btn-large" for="manage-admin-modal"> &plus; </label>
</h2>

{#if deleteAdminMessage.length > 0}
	<div>
		<input class="alert-state" id="deleteAdminMsgs" type="checkbox" />
		<div class="alert dismissible {deleteAdminSuccess ? 'alert-success' : 'alert-danger'}">
			<ul>
				{#each deleteAdminMessage as msg}
					<li class="padding-small">
						{msg}
					</li>
				{/each}
			</ul>
			<label class="btn-close" for="deleteAdminMsgs">&times;</label>
		</div>
	</div>
{/if}

<table class="text-left table-alternating">
	<thead>
		<tr>
			<th>#</th>
			<th>Email</th>
			<th>isSuperUser</th>
			<th>Created On</th>
			<th>Action</th>
		</tr>
	</thead>
	<tbody>
		{#each existingAdmins as { email, superuser, date, uid }, index}
			<tr class:text-muted={isSuperUser}>
				<td>{index + 1}</td>
				<td>{email}</td>
				<td>{Boolean(superuser)}</td>
				<td>{new Date(date).toDateString()}</td>

				<td>
					{#if superuser}
						<span> - </span>
					{:else}
						<form action={URL_Patterns.deleteAdminAction} method="post" use:enhance>
							<input type="hidden" name="uid" value={uid} />
							<button class="btn btn-danger btn-small">Delete</button>
						</form>
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	input[type='email'] {
		display: block;
		width: 100%;
	}
</style>
