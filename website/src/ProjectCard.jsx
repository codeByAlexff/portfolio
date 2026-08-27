import { useEffect, useRef } from "react";

export default function ProjectCard ({ image, video, poster, title, badge, badgeType, children}) {
    const videoRef = useRef(null);


    useEffect(() => {
        const e1 = videoRef.current;
        if (!e1) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    e1.play().catch(() => {});
                } else {
                    e1.pause();
                }
            },
            { threshold: 0.25 }
        );

        observer.observe(e1);
        return () => observer.disconnect()
    }, []);

    return (
        <div className="project-card">
            <div className="card-header">
                <h3>{title}</h3>
                {badge && <span className={`badge badge-${badgeType}`}>{badge}</span>}
            </div>
            <div className="card-frame">
                {video ? (
                <video 
                ref={videoRef} 
                src={video} 
                poster={poster} 
                preload="none" 
                className="card-image" 
                loop 
                muted 
                playsInline
                />
                ) : (
                    <img src={image} alt={title} className="card-image" />
                )}
            </div>
            <div className="card-body">{children}</div>
        </div>
    )
}