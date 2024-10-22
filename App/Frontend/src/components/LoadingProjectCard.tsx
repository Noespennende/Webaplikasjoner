import LoadingAnimation from "../assets/LoadingAnimation.gif"

export default function LoadingProjectCard(){
    return (
        <>
        <div className="loadingProjectCard">
            <picture className="loadingAnimation">
                <source media="(min-width:250px)" srcSet={LoadingAnimation}/>
                <img src={LoadingAnimation} alt=""  width="250" height="93"></img>
            </picture>
        </div>
        </>
    )
}