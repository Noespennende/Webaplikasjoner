import { useState, useEffect } from "react"
import {contactMessage} from "../../../Types"
import ContactInfo from "./ContactInfo"
import { useMessage } from "../hooks/useMessage"
import { v4 as uuid } from 'uuid';


export default function ContactPage({email} : {email: string}){

    const {status, add, error} = useMessage()

    const [person, setPerson] = useState("")
    const [contactEmail, setContactEmail] = useState("")
    const [message, setMessage] = useState("")
    const [formMessage, setFormMessage] = useState("")

    //Clears all input text from form
    const clearInputText = () => {
        let inputPerson = document.getElementById("contactPerson")
        let inputEmail = document.getElementById("contactEmail")
        let inputMessage = document.getElementById("contactMessage")

        inputPerson.value = ""
        inputEmail.value = ""
        inputMessage.value = ""
    }

    const handleLoading = () => {
        if (status.posting){
            setFormMessage("Sending message...")
            document.getElementById("formmessage").className = "posting"
        } else if (status.error){
            setFormMessage(`Ops! noe gikk feil og meldingen ble ikke sendt, men send meg gjerne en mail istede 😄`)
            document.getElementById("formmessage").className = "error"
        } else if (status.success) {
            setFormMessage("Meldingen er motatt!")
        }
    }

     //HandleChange functions to handle form inputs
     const handlePersonChange = (e) => {
        e.preventDefault()
        setPerson(e.target.value)
    }
    const handleEmailChange = (e) => {
        e.preventDefault()
        setContactEmail(e.target.value)
    }
    const handleMessageChange = (e) => {
        e.preventDefault()
        setMessage(e.target.value)
    }
    const handleSubmitt = (e) => {
        e.preventDefault()

        if(person.length < 3){
            setFormMessage("Ditt navn' feltet må ha ett gylding navn")
        } else if (contactEmail.length < 3 || !contactEmail.includes("@")) {
            setFormMessage("Venligst fyll inn en gyldig epost-adresse i 'Din epost' feltet")
        } else if (message.length < 3){
            setFormMessage("Venligst skriv hva henvendelsen gjelder i 'Din melding' feltet")
        } else {
            const contactMessageInfo: contactMessage = {
                id: uuid(),
                person: person,
                email: contactEmail,
                message: message,
                recievedAt: Date.now()
            }

            add(contactMessageInfo)
            clearInputText()
        }
    }


    useEffect(() => {
        handleLoading()
    },[status.posting, status.error, status.success])


    return (
        <section id="contactPage">
            <h1>Kontakt meg</h1>

            <ContactInfo email={email}/>
            <h2>Eller kontakt meg her:</h2>
            <form onSubmit={handleSubmitt} id="contactForm">
                <label htmlFor="contactPerson">Ditt navn</label>
                <input onChange={handlePersonChange} type="text" id="contactPerson" name="contactPerson" placeholder="Ola Normann..." required></input>
                <label htmlFor="contactEmail">Din epost</label>
                <input onChange={handleEmailChange} type="email" id="contactEmail" name="contactEmail" placeholder="eksempel@eksempel.no..." required></input>
                <label htmlFor="contactMessage">Din melding</label>
                <textarea onChange={handleMessageChange} type="text" id="contactMessage" name="contactMessage" placeholder="Skriv din beskjed her..." required></textarea>
                <button type="submit">Send melding</button>
                <p id="formmessage">{formMessage}</p>
            </form>
        </section>
    )
}