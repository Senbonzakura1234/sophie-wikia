import { getEffectRecordQuery } from "~/server/database/postgresql";
import { getEffects } from "~/server/database/postgresql/repository";
import { searchQueryValidator, idQueryValidator } from "~/types/common/zod";
import { publicProcedure, router } from "../trpc";

export const effectRouter = router({
	getAll: publicProcedure
		.input(searchQueryValidator)
		.query(({ input }) => getEffects(input)),

	getOne: publicProcedure
		.input(idQueryValidator)
		.query(({ input }) => getRecord(getEffectRecordQuery, input)),
});
