import { useEffect, useRef } from "react";
import p5 from 'p5'
import createSketch from './sketch'

function Background({onWin}) {
    const containerRef = useRef(null)

    useEffect(() => {
        const instance = new p5(createSketch(onWin), containerRef.current)
        return () => instance.remove()
    }, [onWin])

    return <div ref={containerRef} className="background-canvas" />
}

export default Background