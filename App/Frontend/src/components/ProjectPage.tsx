import Line from "../assets/line.png"
import { Link, redirect } from "react-router-dom"
import { FaGithub } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import useProjects from "../hooks/useProjects";
import LoadingProjectPage from "./LoadingProjectPage";

export default function ProjectPage(){
    const { slug } = useParams()
    const {data, status, getOne, remove} = useProjects()
    const [deleteProject, setDeleteProject] = useState<boolean>(false)
    const [deleteInput, setDeleteInput] = useState<string>()
    const [errorMessage, setErrorMessage] = useState<string>()

    const handleDelete = (e) => {
        e.preventDefault()
        if (!deleteProject) {
            setDeleteProject(true)
        } else if (deleteProject && deleteInput=== data[0].header){
            remove(data[0])
            setDeleteProject(false)
        } else {
            setErrorMessage("Feil navn")
        }
    }

    const handleDeleteInputChange = (e) => {
        e.preventDefault()
        setDeleteInput(e.target.value)
    }

    useEffect(() => {
        getOne(slug)
    },[slug])

    return (
        <>
        {
            status.loading ? (
                <LoadingProjectPage/>
            ) :
            (
                <section id="projectPage">
                <picture>
                    <source media="(min-width:300px)" srcSet={data[0]?.image}/>
                    <img src={data[0]?.image} alt={data[0]?.imagealt} width="700" height=""></img>
                </picture>
                <article id="projectContent">
                    <div id="projectPageHeaderAndTags">
                        <h1>{data[0]?.header}</h1>
                        <ul id="tags">
                            {data[0]?.tags.map(((tag, index) => {
                                return <li key={"projectTags"+tag+index}>{tag}</li>
                            }))}
                        </ul>
                    </div>
                    <picture id="line">
                        <source media="(min-width:300px)" srcSet={Line}/>
                        <img src={Line} alt=""  width="130" height=""></img>
                    </picture>

                    <Link to={data[0]?.repository} id="repositoryButton"><FaGithub /> Visit repository</Link>
                    
                    <p>{data[0]?.article}</p>
                </article>
                <form id="deleteProject" onSubmit={handleDelete}>
                { deleteProject ? (
                        <>
                            <label htmlFor="deleteInput">Skriv navnet på artikkelen for å slette den</label>
                            <input onChange={handleDeleteInputChange} type="text" id="deleteInput" name="deleteInput" placeholder="Navnet på artikkelen..."></input>
                        </>
                    )
                        :
                        (<></>)
                    }
                    <button type="submit">Delete project</button>
                    {errorMessage ? (<p id="errorMessage">{errorMessage}</p>) : (<></>)}
                </form>
                
            </section>
        
            )
        }

        </>    
    )
}