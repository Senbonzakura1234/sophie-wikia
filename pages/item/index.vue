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
				<p><span class="font-bold">Recipe Type:</span> {{ item.recipeType }}</p>
				<p>
					{{ JSON.stringify(item.relatedCategories) }}
				</p>
				<p>
					{{ JSON.stringify(item.description) }}
				</p>
			</div>
		</div>
	</NuxtLayout>
</template>
