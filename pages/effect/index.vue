<script setup lang="ts">
const searchQuery = useSearchQuery();
</script>

<template>
	<NuxtLayout :name="'content'">
		<div
			class="text-primary card"
			v-for="item in searchQuery.data.pages.effect || []"
		>
			<div class="card-title">
				{{ item.name }}
			</div>
			<div class="card-body">
				<p><span class="font-bold">Level:</span> {{ item.index }}</p>
				<p>
					{{ item.description }}
				</p>
			</div>
		</div>
	</NuxtLayout>
</template>
