import { z } from "zod";

export const projectSchema = z.object({
    id: z.string(),
    header: z.string(),
    slug: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    image: z.string(),
    imagealt: z.string(),
    repository: z.string(),
    article: z.string(),
    createdat: z.number(),
    public: z.boolean(),
    status: z.string()
})

export const projectsSchema = z.array(projectSchema)

export const projectFromDBSchema = z.object({
    id: z.string(),
    header: z.string(),
    slug: z.string(),
    summary: z.string(),
    tags: z.string(),
    image: z.string(),
    imagealt: z.string(),
    repository: z.string(),
    article: z.string(),
    createdat: z.number(),
    public: z.union([z.string(), z.number()]),
    status: z.string()
})


export const projectsFromDBSchema = z.array(
    projectFromDBSchema
)


export type Project = z.infer<typeof projectSchema>
export type ProjectFromDB = z.infer<typeof projectFromDBSchema>

export const validateProjects = (data: unknown) => {
    return projectsSchema.safeParse(data)
}

export const validateProject = (data: unknown) => {
    return projectSchema.safeParse(data)
}

export const validateProjectsFromDB = (data: unknown) => {
    return projectsFromDBSchema.safeParse(data)
}

