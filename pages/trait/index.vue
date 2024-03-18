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
				<p>
					{{ JSON.stringify(item.mergeFrom) }}
				</p>
			</div>
		</div>
	</NuxtLayout>
</template>
