import React, { useState, useEffect, useRef } from 'react';
import { useTransition, animated, useSpringRef } from '@react-spring/web';
import AudioPlayer from 'react-h5-audio-player';

import content from "../assets/content.json";
import media from "../assets/media.jpeg";

import styles from './styles.module.css';

import audioFile from "../assets/Tucson.wav";

const LINES = content['lines'];

const colors = ['lightpink', 'lightgreen', 'lightblue'];

const pages = LINES.map((x, i) => {
    return (
        x !== "IMAGE" && x !== "CREDITS"
        ? 
        ({style}) => 
            <animated.div style={{ ...style, background: colors[i%3] }}>
                <p style={{ padding: 10, textAlign: "center" }}>{x}</p>
            </animated.div>
        :
        x === "IMAGE" 
        ? // image
        ({ style }) => 
            <animated.div style={{ ...style, background: 'lavender' }}>
                <span
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <img
                        style={{
                            width: "70%"
                        }}
                        src={media} 
                        alt="my media" 
                    />
                </span>
            </animated.div>
        : // credits
        ({style}) => 
            <animated.div style={{ ...style, background: 'darkslategray' }}>
                <div style={{ height: "100%", marginTop: 20, paddingBottom: 20 }}>
                    {LINES.slice(0, 13).map(x => {
                        return (
                            <p key={x} style={{ padding: 10, textAlign: "center", fontSize: "1rem"}}>{x}</p>
                        )
                    })}
                </div>
            </animated.div>
    )
});

export default function App() {
    const player = useRef(null);
    const handlePlayClick = () => {
        player.current.audio.current.play();
    };
    const [index, set] = useState(0);
    const onClick = () => {
        set(state => (state + 1) % LINES.length);
        handlePlayClick();
    };
    const transRef = useSpringRef();
    const transitions = useTransition(index, {
        ref: transRef,
        keys: null,
        from: { 
            opacity: 0, 
            transform: 'translate3d(100%,0,0)' 
        },
        enter: { 
            opacity: 1, 
            transform: 'translate3d(0%,0,0)' 
        },
        leave: { 
            opacity: 0, 
            transform: 'translate3d(-50%,0,0)' 
        },
    });
    
    useEffect(() => {
        transRef.start();
    }, [index, transRef]);

    return (
        <div>
            <AudioPlayer
                src={audioFile}
                style={{ display: "none" }}
                ref={player}
            />
            <div className={`flex fill ${styles.container}`} onClick={onClick}>
                {transitions((style, i) => {
                    const Page = pages[i];
                    return <Page style={style} />;
                })}
            </div>
        </div>
    );
}
