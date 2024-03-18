<script setup lang="ts">
const searchQuery = useSearchQuery();
</script>

<template>
	<NuxtLayout :name="'content'">
		<li
			class="text-primary"
			v-for="item in searchQuery.data.pages.item || []"
		>
			{{ item.name }}
		</li>
	</NuxtLayout>
</template>
