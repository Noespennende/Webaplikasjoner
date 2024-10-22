import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { getMessageData, updateMessageData } from "./src/lib";
import {project, contactMessage} from "../Types"
import {projectsGet, projectsPost, backendPort, messagesPost, projectDelete} from "../config/index"
import { getProject, getProjects, pushProject , deleteProject} from "./src/db/services/projectService";
import { pushMessage } from "./src/db/services/messageServices";

const app = new Hono()

app.use("/*", cors()) //Filter for å si hvem som kan gå på servere. /* betyr alle har lov

app.use("/statics/*", serveStatic({ root: "./" }));


app.get(`${projectsGet}`, async (c) => {
    const data = await getProjects()
    return c.json(data)
}) //Definerer hvilken URL vi henter info fra. I dette tilfellet localhost3999/json

app.get(`${projectsGet}/:id`, async (c) => {
    try {
        const slug = c.req.param('id')
        const data = await getProject(slug)
        return c.json(data)
    }catch (error) {
    console.error("Could not find project" + error)
    return c.json({ message: 'Failed to find project' }, 404);
    }
})

app.post(`${projectsPost}`, async (c) => {

try {
    const newData = await c.req.json<project>();
    await pushProject(newData)
    return c.json({ message: 'Data saved'}, 201);
} catch (error) {
    console.error("Could not write to file: " + error)
    return c.json({ message: 'Failed to save data to file' }, 500);
    }
}) //Post request for creating a new article  

app.delete(`${projectDelete}/:id`, async (c) => {
    try {
        const newData = await c.req.json<project>();
        await deleteProject(newData)
        return c.json({ message: 'Data deleted'}, 200);
    } catch (error) {
        console.error("Could not delete data: " + error)
        return c.json({ message: 'Failed to delete data' }, 500);
        }
    }) //Delete request for deleting an article 

app.post(`${messagesPost}`, async (c) => {

    try {
    const data = await c.req.json<contactMessage>();
    await pushMessage(data)
    return c.json({ message: 'Data saved'}, 201);
} catch (error) {
    console.error("Could not write to server: " + error)
    return c.json({ message: 'Failed to save data to server' }, 500);
    }
}) //Post request for creating a new Message in the data.json file. 


const port = backendPort //Definerer porten til serveren


console.log(`Server is running on port: ${port}`)

serve({
    fetch: app.fetch,
    port
}) //Serveren starter i hono med den gitte porten (3999)


