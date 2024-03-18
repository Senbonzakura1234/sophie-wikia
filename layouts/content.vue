<script setup lang="ts">
import { genericModuleIdEnumSchema } from "~/types/common/zod";
import { moduleIdList } from "~/types/model";

const searchQuery = useSearchQuery();

const route = useRoute();

const page = genericModuleIdEnumSchema.parse(route.path.split("/")[1]);

const onNext = async () =>
	searchQuery.updateQuery(page, {
		...searchQuery.query,
		page: (searchQuery.query.page || 1) + 1,
	});

const onPrev = () => {
	if (searchQuery.query.page && searchQuery.query.page > 0) {
		searchQuery.updateQuery(page, {
			...searchQuery.query,
			page: (searchQuery.query.page || 1) - 1,
		});
	}
};

await searchQuery.updateQuery(page);
</script>

<template>
	{{ JSON.stringify(searchQuery.query) }}
	{{ searchQuery.status }}

	<div>
		<NuxtLink v-for="m in moduleIdList" :to="`/${m}`">{{ m }}</NuxtLink>
	</div>

	<div>
		<div>
			<button :disabled="(searchQuery.query.page || 1) <= 1" @click="onPrev">
				Prev
			</button>
			<button @click="onNext">Next</button>
		</div>
		<slot />
	</div>
</template>
