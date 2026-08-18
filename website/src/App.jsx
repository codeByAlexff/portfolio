import { useCallback, useEffect, useState } from 'react'
import Background from './Background'
import Popup from './Popup'
import ProjectCard from './ProjectCard'
import cinemantic from './assets/cinemantic.png'
import clip from './assets/clip.png'
import llm from './assets/llm.mp4'
import './App.css'

function App() {
  const [copied, setCopied] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  const handleWin = useCallback(() => {
    setHasWon(true)
    setTimeout(() => setHasWon(false), 3500)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 600)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  return (
    <>
      <Background onWin={handleWin} hasScrolled={hasScrolled}/>

      <header className={hasScrolled ? 'site-header scrolled' : 'site-header' }>
        <div className={hasScrolled ? 'header-inner scrolled' : 'header-inner' }>
          <a href="#center" className="logo">
            <span className="logo-badge">AF</span>
            <span>Alexander Ferreira</span>
          </a>
          <nav className="navbar">
            <a href="#projects">Projects</a>
            <a href="#jobs">Experience</a>
            <a href="#center">About Me</a>
            <a href="#email">Get in Touch</a>
          </nav>
        </div>
      </header>

      <section id="center">
        <div className="hero-panel">
          <div>
            <h1>FullStack | AI Engineer</h1>
            <p>
              Hey! I'm Alex — a newly graduated software engineer passionate about AI and machine learning.
              I combine my software engineering background with AI/ML knowledge to build intelligent systems,
              scalable platforms, and the infrastructure that brings them to life.
            </p>
            <p className="standout-p">
              Interested in software engineering or deep neural systems?<br />
              <a
                className="let-talk no-underline custom-color"
                href="https://www.linkedin.com/messaging/compose/?recipient=alexanderff"
                target="_blank"
                rel="noopener noreferrer"
              >
                Let's talk!
              </a>
            </p>
            <p className="tight-spacing links-p">
              github:{' '}
              <a href="https://github.com/codeByAlexff" className="no-underline custom-color" target="_blank" rel="noopener noreferrer">
                @codeByAlexff
              </a>
            </p>
            <p className="tight-spacing links-p">
              linkedIn:{' '}
              <a href="https://www.linkedin.com/in/alexanderff/" className="no-underline custom-color" target="_blank" rel="noopener noreferrer">
                @alexanderff
              </a>
            </p>
            <p className="tight-spacing links-p">
              email:{' '}
              <a onClick={() => copyToClipboard('alexanderferreira003@hotmail.com')} style={{ cursor: 'pointer' }} className="no-underline custom-color">
                Click Here
              </a>
            </p>
          </div>

          <div className="code-window">
            <div className="window-header">
              <div className="window-buttons">
                <span className="btn close"></span>
                <span className="btn minimize"></span>
                <span className="btn maximize"></span>
              </div>
              <div className="window-title">style.css</div>
            </div>
            <div className="window-body">
              <code></code>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="projects-bg">
        <div className="container">
          <h2>Projects</h2>
          <div className="projects-grid">
            <ProjectCard image={cinemantic} title="cinemantic" badge="open source" badgeType="open">
              <p className="card-tagline project-p">Semantic movie search.</p>
              <p className="project-p">
                Movie recommender system made to fully understand and conceptualize vector embeddings and cosine similarity turned into a project.
                System takes in a TMDB 4k+ movie dataset and turns them into vector embeddings. These then get stored in a PostgreSQL database utilizing pgvector.
                User can send a query with a film or description of one and the system will then embed the query, insert it into the database, perform a cosine similarity calculation
                and return the top k movies that match the query the most. For system performance Redis is utilized for result caching and error catching. Currently adding a benchmarked retrieval
                evaluation harness for correct metrics.
              </p>
            </ProjectCard>

            <ProjectCard image={clip} title="typographic recovery" badge="open source" badgeType="open">
              <p className="card-tagline project-p">CLIP adversarial attack recovery.</p>
              <p className="project-p">
                Benchmark pipeline measuring how well CLIP recovers from typographic attacks — images with misleading text printed on them.
                Compares three removal methods (solid mask, OpenCV inpaint, LaMa) and measures attack success rate and classification recovery across each.
              </p>
            </ProjectCard>

            <ProjectCard video={llm} title="Next-word Prediction GPT Model" badge="open source" badgeType="open">
              <p className="card-tagline project-p">GPT-2 built from scratch.</p>
              <p className="project-p">
                A 124M-parameter transformer trained from the ground up on FineWeb-Edu. Implements the full architecture by hand — attention, layer norm,
                BPE tokenization, gradient accumulation, and cosine learning-rate decay.
              </p>
            </ProjectCard>

            <ProjectCard video={llm} title="leetbot" badge="open source" badgeType="open">
              <p className="card-tagline project-p">Discord bot for LeetCode practice.</p>
              <p className="project-p">
                Discord bot that serves daily LeetCode problems and tracks solve streaks. Currently running in 10+ servers with 250+ active users.
              </p>
            </ProjectCard>
          </div>
        </div>
      </section>

      <Popup isOpen={copied} message="Copied to clipboard" />
      <Popup isOpen={hasWon} message="Achievement Unlocked: Fully Connected Layer" position="top" />
    </>
  )
}

export default App