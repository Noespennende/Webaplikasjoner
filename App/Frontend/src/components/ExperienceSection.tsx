import { person } from "../../../Types";
import Experiences from "./Experiences";
import Line from "../assets/Line.png";

export default function ExperienceSection ({person} : {person : person}) {
    return(
        <section id="experiences">
            <h2>Erfaring</h2>
            <picture className="Line">
                <source media="(min-width:300px)" srcSet={Line}/>
                <img src={Line} alt=""  width="150" height=""></img>
            </picture>
            <Experiences person={person}></Experiences>
        </section>
    )
}