<script setup lang="ts">
import { moduleIdList } from "~/types/model";
</script>

<template>
	<div class="grid gap-3 container mx-auto">
		<div class="grid gap-3 text-center mx-auto place-content-center">
			<h1 class="text-6xl p-4 font-bold">Sophie Wikia</h1>

			<div class="flex gap-3 capitalize mx-auto">
				<NuxtLink v-for="m in moduleIdList" :to="`/${m}`">{{ m }}</NuxtLink>
			</div>
		</div>

		<slot />
	</div>
</template>
