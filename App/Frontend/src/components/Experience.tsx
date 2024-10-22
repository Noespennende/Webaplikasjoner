import {involvement} from "../../../Types"


export default function Experience ({experience} : {experience: involvement}){
    
    return (
        <>
            <li>
                <div className="experiencePictureAndDetails">
                    <picture className="experienceLogo">
                        <source media="(min-width:50px min-height:50px)" srcSet={experience.logo}/>
                        <img src={experience.logo} alt={"Logo for " + experience.company}  width="50" height="50"></img>
                    </picture>
                    <p>{experience.role} for {experience.company}</p>
                </div>
                <div className="experienceDate">
                    {experience.duration.from + " - " + experience.duration.to} 
                </div>
                </li>
        </>
    )
}