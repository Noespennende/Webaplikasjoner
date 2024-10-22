import { fetch, fetchPort } from "../Types"

const backendPort = 3999;

const backendUrl = `http://localhost:${backendPort}`
const frontendUrl = "http://localhost:5174/"

//Projects:
const projectsGet = "/projects"
const projectsPost = `${projectsGet}/submit`
const projectDelete = `${projectsGet}/delete`

const projectsUrl = (fetchType: fetch , id?:string) => {
    if (fetchType === "get"){
        return (`${backendUrl}${projectsGet}`)
    } else if (fetchType === "post"){
        return `${backendUrl}${projectsPost}`
    } else if (fetchType==="getOne" && id != null){
        return `${backendUrl}${projectsGet}/${id}`
    } else if (fetchType==="delete" && id != null){
        console.log("hit")
        return `${backendUrl}${projectDelete}/${id}`
    }

}

//messages:
const messagesPost = "/submitMessage"

const messageUrl: fetchPort = {
    post: `${backendUrl}${messagesPost}`
}

export { backendUrl, frontendUrl, projectsUrl, messageUrl, messagesPost, projectsGet, projectsPost, backendPort, projectDelete}

