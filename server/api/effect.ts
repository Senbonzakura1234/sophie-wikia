import { searchQueryValidator } from "~/types/common/zod";
import { getEffects } from "../database/postgresql/repository";

export default defineEventHandler(async (event) => {
	event._requestBody
	return await getEffects(searchQueryValidator.parse({}));
});
