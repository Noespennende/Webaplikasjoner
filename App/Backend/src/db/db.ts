
import type { Database } from "better-sqlite3";
import BetterSqlite3 from "better-sqlite3"
import { env } from "../lib/env";

export const db: Database = new BetterSqlite3(env.DATABASE_URL)

export type DB = typeof db

export default db

