<script lang="ts">
	let currentTab = 0; // 0 - show admin info 1 - change password

	$: getBtnClass = (index: number) => {
		return currentTab === index ? 'primary' : 'secondary';
	};

	const buttons = ['My profile', 'Change password'];
</script>

<article>
	<section class="grid">
		{#each buttons as btn, i (i)}
			<button on:click={() => (currentTab = i)} class="outline {getBtnClass(i)}">{btn}</button>
		{/each}
	</section>
	<hr />

	{#if currentTab === 0}
		<h1>Welcome admin</h1>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, voluptatem explicabo blanditiis
			mollitia id nam ex nisi ipsam rerum, earum enim! Delectus fugiat necessitatibus et.
		</p>
	{:else if currentTab === 1}
		<h1>Change password</h1>
		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, libero?</p>
		<form>
			<section>
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					placeholder="*******"
					required
					autocomplete="bday-day"
				/>
				<small>We'll never share your email with anyone else.</small>
			</section>
			<section>
				<label for="confirm-password">Confirm Password</label>
				<input
					type="password"
					id="confirm-password"
					name="confirm-password"
					placeholder="*******"
					required
					autocomplete="bday-day"
				/>
				<small>We'll never share your email with anyone else.</small>
			</section>

			<!-- Button -->
			<button type="submit">Submit</button>
		</form>
	{/if}
</article>

<style>
	article {
		min-height: 90%;
		margin-bottom: auto;
	}

	section.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
	hr {
		margin-bottom: 2rem;
	}
</style>
