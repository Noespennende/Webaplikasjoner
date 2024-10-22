import { project } from "../../../../Types"

type ProjectRepository = {
    list: (querry?: project) => Promise<project[]>
    create: (data: project) => Promise<project>
}

export const createProjectRepository = (db: unknown): ProjectRepository => {
    return{
        list: () => {},
        create: () => {},
    }
}


export const studentRepository = createProjectRepository({});
