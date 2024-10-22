import {  useEffect, useState } from 'react'
import useProjects from '../hooks/useProjects';
import { v4 as uuid } from 'uuid';
import { project } from "../../../Types"

export default function createProject (){

    const {add, status, error} = useProjects()

    const [formMessage, setFormMessage] = useState("")
 
    //States to store form information
    const [header, setHeader] = useState("")
    const [slug, setSlug] = useState("")
    const [summary, setSummary] = useState("")
    const [tags, setTags] = useState("")
    const [image, setImage] = useState("")
    const [imageAlt, setImageAlt] = useState("")
    const [repository, setRepository] = useState("")
    const [text, setText] = useState("")

    //HandleChange functions to handle form inputs
    const handleHeaderChange = (e) => {
        e.preventDefault()
        setHeader(e.target.value)
    }
    const handleSlugChange = (e) => {
        e.preventDefault()
        setSlug(e.target.value)
    }
    const handleSummaryChange = (e) => {
        e.preventDefault()
        setSummary(e.target.value)
    }
    const handleTagsChange = (e) => {
        e.preventDefault()
        setTags(e.target.value)
    }
    const handleImageChange = (e) => {
        e.preventDefault()
        setImage(e.target.value)
    }
    const handleImageAltChange = (e) => {
        e.preventDefault()
        setImageAlt(e.target.value)
    }
    const handleRepositoryChange = (e) => {
        e.preventDefault()
        setRepository(e.target.value)
    }
    const handleTextChange = (e) => {
        e.preventDefault()
        setText(e.target.value)
    }

    const handleLoading = () => {
        if (status.posting){
            setFormMessage("Creating post...")
            document.getElementById("formmessage").className = "posting"
        } else if (status.error){
            setFormMessage(`${error}`)
            document.getElementById("formmessage").className = "error"
        } else {
            setFormMessage("")
            document.getElementById("formmessage").className = ""
        }
    }

    //Handle form submitt
    const handleSubmitt = (e) => {
        e.preventDefault()
        if(header.length === 0){
            setFormMessage("Artikkelen trenger en overskrift!")
            document.getElementById("formmessage").className = "error"
        }
        else if (slug.length === 0){
            setFormMessage("Artikkelen trenger en slug!")
            document.getElementById("formmessage").className = "error"
        }
        else if (summary.length === 0){
            setFormMessage("Artikkelen trenger ett sammendrag!")
            document.getElementById("formmessage").className = "error"
        }
        else if (tags.length === 0){
            setFormMessage("Artikkelen trenger noen tags!")
            document.getElementById("formmessage").className = "error"
        }
        else if (image.length === 0){
            setFormMessage("Artikkelen trenger ett bilde!")
            document.getElementById("formmessage").className = "error"
        }
        else if (imageAlt.length === 0){
            setFormMessage("Artikkelens bilde trenger en bildebeskrivelse!")
            document.getElementById("formmessage").className = "error"
        }
        else if (repository.length === 0){
            setFormMessage("Artikkelen trenger en link til repositoriet!")
            document.getElementById("formmessage").className = "error"
        }
        else if (slug.text === 0){
            setFormMessage("Artikkelen trenger en artikkeltekst!")
            document.getElementById("formmessage").className = "error"
        } else {
            setFormMessage("Informasjonen er motatt!")
            document.getElementById("formmessage").className = ""
            const tagsList = tags.split(" ")

            const projectData: project = 
                {
                    id: uuid(),
                    header: header,
                    slug: slug,
                    summary: summary,
                    tags: tagsList,
                    image: image,
                    imagealt: imageAlt,
                    repository: repository,
                    article: text,
                    createdat: Date.now(),
                    public: true,
                    status: "published"
                }

            add(projectData)
        }   
    }

    useEffect(() => {
        handleLoading()
    },[status.posting, status.error])


    return(
        <>
            <section id="createProjectPage">
                <h1>Opprett en ny artikkel</h1>
                <form onSubmit={handleSubmitt}>
                    <label htmlFor="createHeader">Overskrift</label>
                    <input onChange={handleHeaderChange} type="text" id="createHeader" name="createHeader" placeholder="Overskrift..." required></input>
                    <label htmlFor="createSlug">Slug</label>
                    <input onChange={handleSlugChange} type="text" id="createSlug" name="createSlug" placeholder="Slug..." required></input>
                    <label htmlFor="createSummary">Sammendrag</label>
                    <input onChange={handleSummaryChange} type="text" id="createSummary" name="createSummary" placeholder="Kort, men beskrivende tekst..." required></input>
                    <label htmlFor="createTags">Tags</label>
                    <input onChange={handleTagsChange} type="text" id="createTags" name="createTags" placeholder="Tags. F.eks: CSS HTML JS..." required></input>
                    <label htmlFor="createImage">Bildeadresse</label>
                    <input onChange={handleImageChange} type="url" id="createImage" name="createImage" placeholder="https://eksempeladresse.no..." required></input>
                    <label htmlFor="createImagealt">Bildebeskrivelse</label>
                    <input onChange={handleImageAltChange} type="text" id="createImagealt" name="createImagealt" placeholder="Beskrivelse av bilde..." required></input>
                    <label htmlFor="createRepository">Repository link</label>
                    <input onChange={handleRepositoryChange} type="url" id="createRepository" name="createRepository" placeholder="https://github.com/eksempel......" required></input>
                    <label htmlFor="createText">Artikkel</label>
                    <textarea onChange={handleTextChange} type="text" id="createText" name="createText" placeholder="Artikkel tekst..." required></textarea>
                    <button type="submit">Opprett artikkel</button>
                    <p id="formmessage">{formMessage}</p>
                </form>
            </section>
        </>
    )
}