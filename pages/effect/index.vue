<script setup lang="ts">
const { $client } = useNuxtApp()

const { records, totalPage, totalRecord, search } = await $client.effect.getAll.query({})


</script>

<template>
	<li class="text-primary" v-for="item in records || []">
		{{ item.name }}
	</li>
</template>
