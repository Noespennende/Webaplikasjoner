import SearchPortfolio from "./SearchPortfolio";
import { Link } from "react-router-dom";
import {person} from "../../../Types"
import Projects from "./Projects";
import ExperienceSection from "./ExperienceSection";

export default function Frontpage({person} : {person : person}){

    return (
        <>
            <SearchPortfolio/>
            <section id="frontpageContent">
                <h1 id="frontPageHeader">Sjekk ut mine prosjekter</h1>
                <Projects/>
                <Link id="createProject" label="createProject" to="/createproject">+</Link>
                <ExperienceSection person={person}/>
            </section>
        </>
    )
}
