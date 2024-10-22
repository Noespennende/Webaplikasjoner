import LoadingAnimation from "../assets/LoadingAnimation.gif"

export default function LoadingProjectPage(){
    return(
        <div id="loadingProjectPage">
            <picture className="loadingAnimation">
                <source media="(min-width:250px)" srcSet={LoadingAnimation}/>
                <img src={LoadingAnimation} alt=""  width="250" height="93"></img>
            </picture>
            <div className="loadingLinesContainer">
            {Array.from({ length: 20 }, (_, index) => {
                const generateRandomWidth = Math.floor(Math.random() * (100 - 60 + 1)) + 60; 
                
                return (
                    <div 
                        key={index} 
                        className="loadingLine" 
                        style={{ width: `${generateRandomWidth}%` }}
                    ></div>
                );
            })}
        </div>
        </div> 
    )
}