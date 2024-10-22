import db from "../db"
import {project} from "../../../../Types"
import { validateProject, validateProjects, validateProjectsFromDB } from "../../features/projects/project.schema"
import { error } from "node:console"

export const getProjects = async () => {
    try {
        //get data from server
        const data = db.prepare(
            `
            SELECT *
            FROM projects
            `
        ).all()

        //validate data from server
        const validDBData = validateProjectsFromDB(data)

        //throw error if data is invalid
        if (!validDBData.success){
            throw error(validDBData.error.errors)
        }

        //formate data from server in to projects list
        const projects: project[] = formateProjectData(data)

        //validate projects list
        const validProjectsData = validateProjects(projects)

        //throw error if projectslist is invalid
        if (!validProjectsData.success){
            throw error(validProjectsData.error.errors)
        }
        
        return projects

    } catch (error) {
        console.error("Error fetching projects: ", error)
        return [];
    }
}

export const getProject = async (slug: string | undefined) => {
    try {
        const data = db.prepare(
            `
            SELECT *
            FROM projects
            WHERE slug = ?
            `
        ).all(slug)

        const validDBData = validateProjectsFromDB(data)

        //throw error if data is invalid
        if (!validDBData.success){
            throw error(validDBData.error.errors)
        }

        const project: project[] = formateProjectData(data)

         //validate projects list
         const validProjectData = validateProjects(project)

         //throw error if projectslist is invalid
        if (!validProjectData.success){
            throw error(validProjectData.error.errors)
        }

        return project
    } catch (error) {
        console.error("Error fetching projects: ", error)
        return [];
    }
}

export const pushProject = async (project:project) => {
    try {
        //validate incomming project
        const validDBData = validateProject(project)

        //if project is invalid throw error
        if(!validDBData.success){
            throw error(validDBData.error.errors)
        }

        //Prepare to write to db
        const insert = db.prepare(
            `INSERT INTO projects (id, header, slug, summary, tags, image, imagealt, repository, article, createdat, public, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        );

        //stringify tags
        const tagsString = project.tags.join(","); 
        //convert boleans to int
        const publicAsInt = project.public ? 1 : 0;

        //write to server
        insert.run(
            project.id,         
            project.header,     
            project.slug,      
            project.summary,
            tagsString,         // comma-separated tags)
            project.image,
            project.imagealt,
            project.repository,
            project.article,
            project.createdat,
            publicAsInt,
            project.status
        );
        return [project]

    } catch (error) {
        console.error("Error fetching project: ", error)
        return [];
    }
}

export const deleteProject = async (project:project) => {

    try{
        //validate incomming project
        const validDBData = validateProject(project)

        //if project is invalid throw error
        if(!validDBData.success){
            throw error(validDBData.error.errors)
        }

        //prepare to delete from server
        const deleteFromServer = db.prepare(
            `DELETE FROM projects
            WHERE id = ?`
        );

        //delete from server
        deleteFromServer.run(project.id)

        return [];
    } catch (error) {
        console.error("Error deleting projects: ", error)
        return [];
    }
}

export const formateProjectData = (data: unknown[]) => {
    try {
        const projects: project[] =data.map(item  => {
            return {
                ...item,
                tags: item.tags.split(',').map(tag => tag.trim()),
                public: (item.public === 1 || item.public === true ? true : false)
            }
    
        })
        return projects

    } catch (error) {
        console.error("failed to format data: ", error)
        return []
    }
    
}