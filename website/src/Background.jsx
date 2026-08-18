import { useEffect, useRef } from "react";
import p5 from 'p5'
import createSketch from './sketch'

function Background({onWin, hasScrolled}) {
    const containerRef = useRef(null)
    const scrolledRef = useRef(hasScrolled)

    useEffect(() => {
        scrolledRef.current = hasScrolled
    }, [hasScrolled])

    useEffect(() => {
        const instance = new p5(createSketch(onWin, scrolledRef), containerRef.current)
        return () => instance.remove()
    }, [onWin])

    return <div ref={containerRef} className="background-canvas" />
}

export default Background