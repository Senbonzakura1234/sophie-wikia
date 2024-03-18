<script setup lang="ts">
const searchQuery = useSearchQuery();
</script>

<template>
	<NuxtLayout :name="'content'">
		<div
			class="text-primary card"
			v-for="item in searchQuery.data.pages.item || []"
		>
			<div class="card-title">
				{{ item.name }}
			</div>
			<div class="card-body">
				<p><span class="font-bold">Level:</span> {{ item.level }}</p>
				<p><span class="font-bold">Category:</span> {{ item.category }}</p>
				<p><span class="font-bold">Color:</span> {{ item.color }}</p>
				<p>
					<span class="font-bold">Recipe Type:</span> {{ item.recipeType }}
				</p>

				<div className="mockup-code">
					<pre><code>{{ JSON.stringify(item.relatedCategories, undefined, 2) }}</code></pre>
				</div>

				<div className="mockup-code">
					<pre><code>{{ JSON.stringify(item.description, undefined, 2) }}</code></pre>
				</div>

				<div className="mockup-code">
					<pre><code>{{ JSON.stringify(item.traitPresent || {}, undefined, 2) }}</code></pre>
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>
