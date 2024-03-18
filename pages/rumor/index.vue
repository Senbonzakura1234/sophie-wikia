<script setup lang="ts">
const searchQuery = useSearchQuery();
</script>

<template>
	<NuxtLayout :name="'content'">
		<div
			class="text-primary card"
			v-for="item in searchQuery.data.pages.rumor || []"
		>
			<div class="card-title">
				{{ item.name }}
			</div>
			<div class="card-body">
				<p><span class="font-bold">Location:</span> {{ item.location }}</p>
				<p><span class="font-bold">Price:</span> {{ item.price }}</p>
				<p>
					<span class="font-bold">Rumor Type:</span> {{ item.rumorType }}
				</p>

				<div className="mockup-code">
					<pre><code>{{ JSON.stringify(item.description, undefined, 2) }}</code></pre>
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>
