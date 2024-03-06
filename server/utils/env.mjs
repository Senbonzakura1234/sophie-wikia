import { createEnv } from "@t3-oss/env-nuxt";
import { z } from "zod";

const appCodeSchema = z
	.string()
	.regex(/(?=\S*['-])([a-zA-Z'-]+)/)
	.catch("-");
const appKeyWordSchema = z.string().regex(/[^,]+/).catch("-");
const nodeEnumEnvSchema = z
	.enum(["development", "test", "production"])
	.catch("production");

/** @type {(input: string) => string} */
const capitalize = (input) =>
	input
		? input.replace(
				/(^\w|\s\w)(\S*)/g,
				(_, firstLetter, rest) =>
					firstLetter.toUpperCase() + rest.toLowerCase()
		  )
		: "";

export const appEnv = createEnv({
	server: {
		PGURL_NONPOOLING: z.string().catch(""),

		GITHUB_TOKEN: z.string().catch(""),
		GITHUB_APP_ID: z.string().catch(""),
		GITHUB_APP_SECRET: z.string().catch(""),

		NEXTAUTH_URL: z.string().catch(""),
		NEXTAUTH_SECRET: z.string().catch(""),

		REQUEST_COUNT_LIMIT: z.coerce.number().nonnegative().catch(10),
		REQUEST_LIMIT_TIME_SPAN_S: z.coerce.number().nonnegative().catch(10),

		REDIS_URL: z.string().catch(""),
		UPSTASH_REDIS_REST_TOKEN: z.string().catch(""),
		UPSTASH_REDIS_REST_URL: z.string().catch(""),
	},

	client: {
		NUXT_PUBLIC_NODE_ENV: nodeEnumEnvSchema,
		NUXT_PUBLIC_PORT: z.coerce.number().nonnegative().catch(3000),
		NUXT_PUBLIC_VERCEL_URL: z.string().optional(),

		NUXT_PUBLIC_APP_HOST: z.string().optional(),

		NUXT_PUBLIC_APP_AUTHOR: z.string().catch("-"),
		NUXT_PUBLIC_APP_AUTHOR_EMAIL: z.string().email().catch("-"),
		NUXT_PUBLIC_APP_CODE: appCodeSchema, 
		NUXT_PUBLIC_APP_DESCRIPTION: z.string().catch("-"),
		NUXT_PUBLIC_APP_KEYWORD: appKeyWordSchema,
		NUXT_PUBLIC_APP_LICENSE_CODE: z.string().catch("-"),
		NUXT_PUBLIC_APP_NAME: appCodeSchema.transform((val) =>
			capitalize(val.replaceAll("-", " "))
		),
		NUXT_PUBLIC_APP_PATH: z.string().catch("-"),
	},

	runtimeEnv: {
		PGURL_NONPOOLING: process.env.PGURL_NONPOOLING,

		GITHUB_TOKEN: process.env.GITHUB_TOKEN,
		GITHUB_APP_ID:
			process.env.HTTPS === "true"
				? process.env.GITHUB_HTTPS_APP_ID
				: process.env.GITHUB_HTTP_APP_ID,
		GITHUB_APP_SECRET:
			process.env.HTTPS === "true"
				? process.env.GITHUB_HTTPS_APP_SECRET
				: process.env.GITHUB_HTTP_APP_SECRET,

		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

		REQUEST_COUNT_LIMIT: process.env.REQUEST_COUNT_LIMIT,
		REQUEST_LIMIT_TIME_SPAN_S: process.env.REQUEST_LIMIT_TIME_SPAN_S,

		REDIS_URL: process.env.REDIS_URL,
		UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
		UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,

		NUXT_PUBLIC_APP_HOST: process.env.NUXT_PUBLIC_APP_HOST,
		NUXT_PUBLIC_APP_AUTHOR: process.env.NUXT_PUBLIC_APP_AUTHOR,
		NUXT_PUBLIC_APP_AUTHOR_EMAIL: process.env.NUXT_PUBLIC_APP_AUTHOR_EMAIL,
		NUXT_PUBLIC_APP_CODE: process.env.NUXT_PUBLIC_APP_CODE,
		NUXT_PUBLIC_APP_DESCRIPTION: process.env.NUXT_PUBLIC_APP_DESCRIPTION,
		NUXT_PUBLIC_APP_KEYWORD: process.env.NUXT_PUBLIC_APP_KEYWORD,
		NUXT_PUBLIC_APP_LICENSE_CODE: process.env.NUXT_PUBLIC_APP_LICENSE_CODE,
		NUXT_PUBLIC_VERCEL_URL: process.env.NUXT_PUBLIC_VERCEL_URL,

		NUXT_PUBLIC_APP_NAME: process.env.NUXT_PUBLIC_APP_CODE,
		NUXT_PUBLIC_APP_PATH: `${process.env.NUXT_PUBLIC_APP_AUTHOR || "-"}/${
			process.env.NUXT_PUBLIC_APP_CODE || "-"
		}`,
		NUXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
		NUXT_PUBLIC_PORT: process.env.PORT,
	},

	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true,
	isServer: typeof window === "undefined",
});
