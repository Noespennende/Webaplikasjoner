import {readFile, writeFile} from "node:fs/promises"
import {project, contactMessage} from "../../Types"
import {} from "./db/projectData.json"

export async function getProjectData(){
    const data = await readFile("./src/db/projectData.json", 'utf-8')
    const parsedData = JSON.parse(data)
    return parsedData  
}


export async function updateProjectData(updatedData: project){
    await writeFile("./src/db/projectData.json", JSON.stringify(updatedData))
}

export async function getMessageData(){
    const data = await readFile('./src/db/messageData.json', 'utf-8')
    const parsedData = JSON.parse(data)
    return parsedData  
}

export async function updateMessageData(updatedData: contactMessage){
    await writeFile('./src/db/messageData.json', JSON.stringify(updatedData))
}


