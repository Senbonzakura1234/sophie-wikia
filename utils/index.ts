import { appEnv } from "~/server/utils/env.mjs";
import type { CommonObject, KeyOf, ValueOf } from "~/types/common";
import type { SearchQuery } from "~/types/common/zod";

import type { APIError, AlertTypeEnum } from "~/types/common";
import type { AtelierIcon } from "~/types/common/icon";
import type {
	CategoryEnum,
	ColorEnum,
	ModuleIdEnum,
	RecipeTypeEnum,
	RumorTypeEnum,
	SortByEnum,
} from "~/types/common/zod";

// =======================================					Constant						=======================================

export const DEFAULT_LIMIT = 16;

export const colorTWClassMap = {
	BLUE: { background: "text-blue-500", foreground: "text-slate-950" },
	GREEN: { background: "text-green-500", foreground: "text-slate-950" },
	RED: { background: "text-red-500", foreground: "text-slate-950" },
	WHITE: { background: "text-slate-500", foreground: "text-slate-50" },
	YELLOW: { background: "text-yellow-500", foreground: "text-slate-950" },
} as const satisfies Record<
	ColorEnum,
	{ background: string; foreground: string }
>;

export const alertTypeColorMap = {
	ERROR: "RED",
	INFO: "BLUE",
	SUCCESS: "GREEN",
	WARN: "YELLOW",
} as const satisfies Record<AlertTypeEnum, ColorEnum>;

export const recipeTypeColorMap = {
	BEGINNER_RECIPES: "RED",
	GROWTH_RECIPES: "BLUE",
	HOPE_RECIPES: "GREEN",
	DREAM_RECIPES: "YELLOW",
	MYSTERY_RECIPES: "WHITE",
} as const satisfies Record<RecipeTypeEnum, ColorEnum>;

export const rumorTypeColorMap = {
	MONSTER: colorTWClassMap["RED"],
	MATERIAL: colorTWClassMap["GREEN"],
} as const satisfies Record<
	RumorTypeEnum,
	{ background: string; foreground: string }
>;

export const rumorColorMap = {
	MONSTER: "RED",
	MATERIAL: "GREEN",
} as const satisfies Record<RumorTypeEnum, ColorEnum>;

export const sortByMap = {
	effect: ["index", "name"],
	item: ["index", "level", "name"],
	rumor: ["price", "name"],
	trait: ["index", "name"],
} as const satisfies Record<ModuleIdEnum, Readonly<Array<SortByEnum>>>;

export const rumorTypeIconMap = {
	MATERIAL: "atelier__material",
	MONSTER: "atelier__race-puni",
} as const satisfies Record<RumorTypeEnum, AtelierIcon>;

export const categoryIconMap = {
	MATERIAL: "atelier__material",
	SYNTHESIS: "atelier__type-synthesis",
	WEAPON: "atelier__type-weapon",
	ARMOR: "atelier__type-armor",
	ATK_ITEM: "atelier__type-attack",
	ACCESSORY: "atelier__type-accessory",
	HEAL_ITEM: "atelier__type-heal",
	KEY_ITEM: "atelier__category-key-items",
	BUFF_ITEM: "atelier__type-buff",
	DE_BUFF_ITEM: "atelier__type-debuff",
	EXPLORATION: "atelier__tool-gather",
	BOOK: "atelier__book",
	MACHINE: "atelier__category-neutralizers",
} as const satisfies Record<CategoryEnum, AtelierIcon>;

export const errorMap = {
	PARSE_ERROR: { message: "Invalid JSON From Client", status: 400 },
	BAD_REQUEST: { message: "Bad Request", status: 400 },
	UNAUTHORIZED: { message: "Unauthorized Request", status: 401 },
	NOT_FOUND: { message: "Content Not Found", status: 404 },
	FORBIDDEN: { message: "Forbidden Content", status: 403 },
	METHOD_NOT_SUPPORTED: { message: "Method Not Supported", status: 405 },
	TIMEOUT: { message: "Request Timeout", status: 408 },
	CONFLICT: { message: "Request Conflict", status: 409 },
	PRECONDITION_FAILED: { message: "Request Precondition Failed", status: 412 },
	PAYLOAD_TOO_LARGE: { message: "Payload Request Too Large", status: 413 },
	UNPROCESSABLE_CONTENT: { message: "Unprocessable Content", status: 422 },
	TOO_MANY_REQUESTS: { message: "Too Many Requests", status: 429 },
	CLIENT_CLOSED_REQUEST: { message: "Client Closed Request", status: 499 },
	INTERNAL_SERVER_ERROR: { message: "Some Thing Wrong Server", status: 500 },
	NOT_IMPLEMENTED: { message: "Some Thing Wrong Server", status: 501 },
} as const satisfies Record<
	APIError["code"],
	{ message: string; status: number }
>;

export const listAboutPaths = ["about", "license"] as const;

// =======================================				Native Override				=======================================

export function arrayInclude<TSearch extends Readonly<string | number>>(
	arr: Readonly<Array<TSearch>>,
	search: unknown
): search is TSearch {
	return arr.includes(search as TSearch);
}

export function capitalize<TInput extends string>(
	input?: TInput | null
): Capitalize<TInput> {
	return (
		input
			? input.replace(
					/(^\w|\s\w)(\S*)/g,
					(_, firstLetter, rest) =>
						firstLetter.toUpperCase() + rest.toLowerCase()
			  )
			: ""
	) as Capitalize<TInput>;
}

export type CapitalizeFunction = typeof capitalize;

export function createArray<TFill>(len = 0, fill: TFill) {
	return Array(len).fill(fill) as Array<TFill>;
}

export function entries<const Obj extends CommonObject>(
	obj: Obj
): Array<[KeyOf<Obj>, ValueOf<Obj>]> {
	return Object.entries(obj) as Array<[KeyOf<Obj>, ValueOf<Obj>]>;
}

export function fromEntries<Key extends KeyOf<CommonObject>, Value = unknown>(
	entries: Array<Readonly<[Key, Value]>>
): Readonly<Record<Key, Value>> {
	return Object.fromEntries(entries) as Readonly<Record<Key, Value>>;
}

export function indexOf<TSearch extends Readonly<string | number>>(
	arr: Readonly<Array<TSearch>>,
	search: unknown,
	defaultIndex?: number
) {
	return arrayInclude(arr, search) ? arr.indexOf(search) : defaultIndex || -1;
}

export function objectKeys<const Obj extends CommonObject>(
	obj: Obj
): Array<KeyOf<Obj>> {
	return Object.keys(obj);
}

export function objectValues<const Obj extends CommonObject>(
	obj: Obj
): Array<ValueOf<Obj>> {
	return Object.values(obj) as Array<Obj[keyof Obj]>;
}

export function sleep(milliseconds = 1000) {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function writeLog({
	args,
	type = "log",
	hideInProd = false,
}: {
	args: Array<unknown>;
	type?: "log" | "warn" | "error";
	hideInProd?: boolean;
}) {
	return (!hideInProd || !evnIs("production")) && console[type](...args);
}

export function deleteNullableProperty<const Obj extends CommonObject>(
	obj: Obj,
	keyList: Array<KeyOf<Obj>> = objectKeys(obj)
) {
	keyList.forEach((key) => {
		if (typeof obj[key] === "undefined") return delete obj[key];
	});

	return obj;
}

export function evnIs(nodeEnv: typeof appEnv.NUXT_PUBLIC_NODE_ENV) {
	return appEnv.NUXT_PUBLIC_NODE_ENV === nodeEnv;
}

// =======================================					Utilities					=======================================

export function convertCode<TInput extends string>(input?: TInput | null) {
	return input ? input.toLowerCase().replaceAll("_", " ") : "";
}

export function getBaseUrl(useMainHost?: boolean) {
	if (useMainHost)
		return (
			appEnv.NUXT_PUBLIC_APP_HOST ||
			`http://localhost:${appEnv.NUXT_PUBLIC_PORT ?? 3000}`
		);
	if (typeof window !== "undefined") return ""; // browser should use relative url
	if (appEnv.NUXT_PUBLIC_VERCEL_URL)
		return `https://${appEnv.NUXT_PUBLIC_VERCEL_URL}`; // SSR should use vercel url
	return `http://localhost:${appEnv.NUXT_PUBLIC_PORT ?? 3000}`; // dev SSR should use localhost
}

export function queryToParamsString(query: Partial<SearchQuery>) {
	const queryEntries = entries(query).filter(([, value]) => Boolean(value));

	if (!queryEntries.length) return "";

	return `?${queryEntries
		.map(([key, value]) => `${key}=${encodeURIComponent(value!)}`)
		.join("&")}` as const;
}

export function highlightSearchedText(
	input: string,
	search: string | undefined
) {
	if (!search) return input;
	const arr = input.split(new RegExp(`(${search})`, "ig"));

	return arr
		.map((s) =>
			s.match(new RegExp(search, "i"))
				? `<span class='bg-base-content text-base-100 px-1'>${s}</span>`
				: s
		)
		.join("");
}

export async function tryCatchHandler<TReturn = unknown>(
	promise: Promise<TReturn>
) {
	try {
		return { data: await promise, isSuccess: true as const, error: null };
	} catch (error) {
		writeLog({ args: [error], type: "error", hideInProd: true });

		return { data: null, isSuccess: false as const, error };
	}
}

export function tryCatchHandlerSync<TReturn = unknown>(
	callback: () => TReturn
) {
	try {
		return { data: callback(), isSuccess: true as const, error: null };
	} catch (error) {
		writeLog({ args: [error], type: "error" });

		return { data: null, isSuccess: false as const, error };
	}
}
