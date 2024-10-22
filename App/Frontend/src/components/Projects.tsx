import { useEffect, useState } from 'react'
import ProjectCard from "./ProjectCard";
import LoadingProjectCard from "./LoadingProjectCard"
import useProjects from '../hooks/useProjects';


export default function Projects (){

    const {data, status} = useProjects()


    const [currentPageWidth, setCurrentPageWidth] = useState(window.innerWidth)
    const [loadingCardAmount, setLoadingCardAmount] = useState(3)
    const [projectCardsSectionHeight, setProjectCardsSectionHeight] = useState(200)

    const projectCardHeight = 350
    const projectCardWith = 300
    const projectCardMargin = 40
    
    //updates browser window size
    const handleWindowResize = () => {
        setCurrentPageWidth(window.innerWidth)
    }

    const calculateProjectCardsSectionHeight = () => {
        let cardsInEachRow: number
        let totalRowMargin: number

        if (currentPageWidth >= (projectCardWith * 3 + 2* projectCardMargin)){
            cardsInEachRow = 3
        } 
        else if (currentPageWidth >=  (projectCardWith * 2 + projectCardMargin)){
            cardsInEachRow = 2
        } else {
            cardsInEachRow = 1
        }

        if (status.loading){
            const projectCardRows = Math.ceil(loadingCardAmount/cardsInEachRow)
            totalRowMargin = projectCardRows * projectCardMargin
            return(
                projectCardHeight*projectCardRows + totalRowMargin
            )

        }

        if (!status.loading && data.length === 0) {
            return ( 100)
        }

        const projectCardRows = Math.ceil(data.length/cardsInEachRow)
        totalRowMargin = Math.ceil(projectCardRows * projectCardMargin)

        return (
            projectCardRows * projectCardHeight + totalRowMargin
        )
    }
    
    const generateLoadingCards = (amount : number) => {
        return(
            Array.from({ length: amount }, (_, index) => (
                <li key={index} className="projectCardListElements">
                    <LoadingProjectCard />
                </li>
            )
            )
        )

    }

    const generateHtmlClassWhenLoaded = () => {
        const projectCardsSection = document.getElementById('projectCards')

        if (!status.loading && projectCardsSection) {
            projectCardsSection.classList.add('loaded')
            setProjectCardsSectionHeight(200)
        } 
        else if (status.loading && projectCardsSection) {
            projectCardsSection.classList.remove('loaded')
            setProjectCardsSectionHeight(500)
        }
    }

    
    useEffect(() => {
        //Listen to window resize and updates variables with new size
        window.addEventListener('resize', handleWindowResize)
    },[])

    useEffect(() => {
        generateHtmlClassWhenLoaded()
    },[status.loading])

    return (
    <section 
        id="projectCards"
        //animate height based on content
        style={{
            height: `${typeof projectCardsSectionHeight === 'number' ? `${calculateProjectCardsSectionHeight()}px` : "fit-content"}`
    }}
    >
            <ul>
                {!status.loading ? 
                    (
                    data?.length > 0 ?  
                        data?.map((project, index) => (
                            <li key={index} className="projectCardListElements">
                                <ProjectCard header={project.header}
                                    tags={project.tags}
                                    image={project.image}
                                    imageAlt={project.imagealt}
                                    text={project.summary}
                                    link={"/project/"+project.slug}
                                    />
                                </li>
                                ))
                    : <li id="noProsjects">Ingen prosjekter 😞</li>    
                    )
                : generateLoadingCards(loadingCardAmount)
                }
            </ul>
    </section>
    )
}