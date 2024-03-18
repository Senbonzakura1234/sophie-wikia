import type {
	Effect,
	Item,
	Rumor,
	Trait,
} from "~/server/database/postgresql/schema";
import type { SearchQuery, ModuleIdEnum } from "~/types/common/zod";

const controllers: Record<string, AbortController> = {};

export type DataStore = {
	status: "loading" | "success" | "error";
	query: Partial<SearchQuery>;
	data: {
		pages: {
			effect: Array<Effect>;
			item: Array<Item>;
			rumor: Array<Rumor>;
			trait: Array<Trait>;
		};
		totalRecord: number;
		totalPage: number;
	};
};

export type Action = {
	updateQuery(
		page: ModuleIdEnum,
		nextQuery?: DataStore["query"]
	): Promise<void>;
};

export const useSearchQuery = defineStore<"searchQuery", DataStore, {}, Action>(
	"searchQuery",
	{
		state: () => ({
			status: "loading",
			query: {},
			data: {
				pages: { effect: [], item: [], rumor: [], trait: [] },
				totalPage: 0,
				totalRecord: 0,
			},
		}),
		actions: {
			async updateQuery(page: ModuleIdEnum, nextQuery) {
				this.query = nextQuery ? { ...this.query, ...nextQuery } : {};

				const id = new Date().toUTCString();

				try {
					controllers[id]?.abort();

					controllers[id] = new AbortController();

					this.status = "loading";

					const { $client } = useNuxtApp();

					switch (page) {
						case "effect": {
							const { records, ...rest } = await $client[
								page
							].getAll.query(this.query);

							this.data = {
								pages: {
									effect: records,
									item: [],
									rumor: [],
									trait: [],
								},
								...rest,
							};

							break;
						}

						case "rumor": {
							const { records, ...rest } = await $client[
								page
							].getAll.query(this.query);

							this.data = {
								pages: {
									rumor: records,
									item: [],
									effect: [],
									trait: [],
								},
								...rest,
							};

							break;
						}

						case "item": {
							const { records, ...rest } = await $client[
								page
							].getAll.query(this.query);

							this.data = {
								pages: {
									item: records,
									rumor: [],
									effect: [],
									trait: [],
								},
								...rest,
							};

							break;
						}

						case "trait": {
							const { records, ...rest } = await $client[
								page
							].getAll.query(this.query);

							this.data = {
								pages: {
									trait: records,
									rumor: [],
									effect: [],
									item: [],
								},
								...rest,
							};

							break;
						}

						default:
							break;
					}

					this.status = "success";
				} catch (error) {
					this.status = "error";
				}
			},
		},
	}
);
