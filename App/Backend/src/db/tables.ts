import type { DB } from "./db"

export const createTables = (db: DB) => {
    db.exec(`CREATE TABLE IF NOT EXISTS projects (
            id TEXT PRIMARY KEY NOT NULL,
            header TEXT NOT NULL,
            slug TEXT NOT NULL,
            summary TEXT NOT NULL,
            tags TEXT NOT NULL,
            image TEXT NOT NULL,
            imagealt TEXT NOT NULL,
            repository TEXT NOT NULL,
            article TEXT NOT NULL,
            createdat INT,
            public BOOLEAN,
            status TEXT
        )
    `)

    db.exec(`CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY NOT NULL,
        person TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        recievedAt INT NOT NULL
    )
`)
}