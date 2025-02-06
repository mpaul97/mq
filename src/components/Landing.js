import { useState } from "react";
import content from "../assets/content.json";
import media from "../assets/media.jpeg";

const LINES = content['lines'];

function Landing() {
    const [index, setIndex] = useState(0);
    const [height, setHeight] = useState(100);
    const handleClick = () => {
        if (index < LINES.length) {
            setIndex(index + 1);
            setHeight(height + 10);
        }
    };
    return (
        <div style={{
                display: "flex",
                flexDirection: "column",
                color: "white",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                height: index !== LINES.length ? `${height}vh` : "100%"
            }} 
            onClick={handleClick}
        >
            {LINES.slice(0, index).map((x, i) => {
                return (
                    <h3 
                        style={{
                            fontFamily: "Times New Roman",
                            fontSize: i !== 10 ? 50 : 30,
                            textAlign: "center"
                        }}
                    >
                        {x}
                    </h3>
                )
            })}
            {
                index === LINES.length ?
                <img src={media} alt="us" /> : <></>

            }
        </div>
    )
};

export default Landing;