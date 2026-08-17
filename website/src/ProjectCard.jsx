import cinemantic from './assets/cinemantic.png'

export default function ProjectCard ({ image, video, title, badge, badgeType, children}) {
    return (
        <div className="project-card">
            <div className="card-header">
                <h3>{title}</h3>
                {badge && <span className={`badge badge-${badgeType}`}>{badge}</span>}
            </div>
            <div className="card-frame">
                {video ? (
                <video className="card-image" autoplay loop muted playsInline>
                    <source src={video} type="video/webm" />
                    <source src={video} type="video/mp4" />
                    </video>
                ) : (
                    <img src={image} alt={title} className="card-image" />
                )}
            </div>
            <div className="card-body">{children}</div>
        </div>
    )
}