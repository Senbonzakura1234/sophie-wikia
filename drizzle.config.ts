import type { Config } from "drizzle-kit";
import { appEnv } from "./server/utils/env.mjs";

export default {
	schema: "./server/database/postgresql/schema",
	out: "./server/database/postgresql/migration",
	driver: "pg",
	breakpoints: true,
	tablesFilter: [`sophie_dex_*`],
	dbCredentials: { connectionString: appEnv.PGURL_NONPOOLING },
} satisfies Config;
