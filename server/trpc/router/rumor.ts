import { getRumorRecordQuery } from "~/server/database/postgresql";
import { getRumors } from "~/server/database/postgresql/repository";
import { searchQueryValidator, idQueryValidator } from "~/types/common/zod";
import { publicProcedure, router } from "../trpc";

export const rumorRouter = router({
	getAll: publicProcedure
		.input(searchQueryValidator)
		.query(({ input }) => getRumors(input)),

	getOne: publicProcedure
		.input(idQueryValidator)
		.query(({ input }) => getRecord(getRumorRecordQuery, input)),
});
