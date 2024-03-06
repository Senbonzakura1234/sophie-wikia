import { getTraitRecordQuery } from "~/server/database/postgresql";
import { getTraits } from "~/server/database/postgresql/repository";
import { searchQueryValidator, idQueryValidator } from "~/types/common/zod";
import { publicProcedure, router } from "../trpc";

export const traitRouter = router({
	getAll: publicProcedure
		.input(searchQueryValidator)
		.query(({ input }) => getTraits(input)),

	getOne: publicProcedure
		.input(idQueryValidator)
		.query(({ input }) => getRecord(getTraitRecordQuery, input)),
});
