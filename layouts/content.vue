<script setup lang="ts">
import { genericModuleIdEnumSchema } from "~/types/common/zod";

const searchQuery = useSearchQuery();

const route = useRoute();

const path = genericModuleIdEnumSchema.parse(route.path.split("/")[1]);

const page = searchQuery.query.page || 1;

const isNextDisable = page >= searchQuery.data.totalPage;

const isPrevDisable = page <= 1;

const onNext = async () => {
	if (isNextDisable) return;
	return searchQuery.updateQuery(path, {
		...searchQuery.query,
		page: (searchQuery.query.page || 1) + 1,
	});
};

const onPrev = () => {
	if (isPrevDisable) return;
	searchQuery.updateQuery(path, {
		...searchQuery.query,
		page: (searchQuery.query.page || 1) - 1,
	});
};

await searchQuery.updateQuery(path);
</script>

<template>
	<NuxtLayout :name="'root'">
		<div class="flex gap-3 capitalize mx-auto">
			<button :disabled="(searchQuery.query.page || 1)  <= 1" @click="onPrev">Prev</button>

			<button :disabled="(searchQuery.query.page || 1) >= searchQuery.data.totalPage" @click="onNext">Next</button>
		</div>

		<div class="grid gap-3 md:grid-cols-2 p-5">
			<slot />
		</div>
	</NuxtLayout>
</template>
