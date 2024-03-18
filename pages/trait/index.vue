<script setup lang="ts">
const searchQuery = useSearchQuery();
</script>

<template>
	<NuxtLayout :name="'content'">
		<div
			class="text-primary card"
			v-for="item in searchQuery.data.pages.trait || []"
		>
			<div class="card-title">
				{{ item.name }}
			</div>
			<div class="card-body">
				<p>
					<span class="font-bold">Description:</span>
					{{ item.description }}
				</p>
				<p>
					<span class="font-bold">Categories:</span>
					{{ item.categories.join(", ") }}
				</p>

				<div className="mockup-code">
					<pre><code>{{ JSON.stringify(item.mergeFrom, undefined, 2) }}</code></pre>
				</div>

				<div className="mockup-code">
					<pre><code>{{ JSON.stringify(item.itemPresent || {}, undefined, 2) }}</code></pre>
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>
