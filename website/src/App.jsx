import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Background from './Background'
import Popup from './Popup'
import ProjectCard from './ProjectCard'
import cinemantic from './assets/cinemantic.png'
import clip from './assets/clip.png'
import llm from './assets/llm.mp4'
import logo from './assets/logo.png'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const [copied, setCopied] = useState(false)
  const [hasWon, setHasWon] = useState(false)

  const handleWin = useCallback(() => setHasWon(true), []);
  setTimeout(() => setHasWon(false), 3500);

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true)
      setTimeout(() => setCopied(false), 1500);
      console.log('Text copied');
    } catch (err) {
      console.error('Failed to copy', err);
    }
  }

  return (
    <>
    <div className="container">
    <Background onWin={handleWin}/>
    <header className="site-header">
      <div className="header-inner">
      <a href="#center" className='logo'>
        <span className="logo-badge">AF</span>
        <span>Alexander Ferreira</span>
      </a>
      <nav className="navbar">
        <a href="#center">About</a>
        <a href="#projects">Work</a>
        <a href="#jobs">Experience</a>
        <a href="#email">Get in Touch</a>
        </nav>
      </div>
    </header>
      <section id="center">
        <div className="hero-panel">
          <h1>FullStack | AI Engineer</h1>
          <p>
          I'm a newly graduated software engineer with an interest in AI and ML.<br></br>
          I combine my artificial intelligence knowledge with deep engineering experience<br></br>
          in order to build related AI platforms or systems and the large-scale systems<br></br>
          that distribute them.
          </p>
          <p className="standout-p">Interested in software engineering or deep neural systems? <br></br><span className="let-talk">Let's talk!</span></p>
          <p className="tight-spacing links-p">github: <a href="https://github.com/codeByAlexff" className="no-underline custom-color" target="_blank" rel="noopener noreferrer">@codeByAlexff</a></p>
          <p className="tight-spacing links-p">linkedIn: <a href="https://www.linkedin.com/in/alexanderff/" className="no-underline custom-color" target="_blank" rel="noopener noreferrer">@alexanderff</a></p>
          <p className="tight-spacing links-p">email: <a onClick={() => copyToClipboard("alexanderferreira003@hotmail.com")} style={{ cursor: 'pointer' }} className="no-underline custom-color">Click Here</a></p>
        </div>
      </section>
      <section id="projects">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          <ProjectCard image={cinemantic} title="cinemantic" badge="open source" badgeType="open">
            <p className="card-tagline project-p">Semantic movie search.</p>
            <p className="project-p">Movie recommender system made to fully understand and conceptualize vector embeddings and cosine similarity turned into a project.
              System takes in a TMDB 4k+ movie dataset and turns them into vector embeddings. These then get stored in a PostgreSQL database utilizing pgvector.
              User can send a query with a film or description of one and the system will then embed the query, insert it into the database, perform a cosine similarity calculation
              and return the top k movies that match the query the most. For system performance Redis is utilized for result caching and error catching. Currently adding a benchmarked retrieval
              evaluation harness for correct metrics.
            </p>
          </ProjectCard>
          <ProjectCard image={clip} title="typographic recovery" badge="open source" badgeType="open">
            <p className="card-tagline project-p"></p>
            <p className="project-p">Search films by meaning, not keywords. Built on pgvector cosine similarity over OpenAI embeddings, with Redis caching and a benchmarked retrieval eval harness.</p>
          </ProjectCard>
          <ProjectCard video={llm} title="Next-word Prediction GPT Model" badge="open source" badgeType="open">
            <p className="card-tagline project-p">Semantic movie search.</p>
            <p className="project-p">Search films by meaning, not keywords. Built on pgvector cosine similarity over OpenAI embeddings, with Redis caching and a benchmarked retrieval eval harness.</p>
          </ProjectCard>
          <ProjectCard video={llm} title="leetbot" badge="open source" badgeType="open">
            <p className="card-tagline project-p">Semantic movie search.</p>
            <p className="project-p">Search films by meaning, not keywords. Built on pgvector cosine similarity over OpenAI embeddings, with Redis caching and a benchmarked retrieval eval harness.</p>
          </ProjectCard>
          </div>
        </section>
      <Popup isOpen={copied} message="Copied to clipboard" />
      <Popup isOpen={hasWon} message="Achievemnt Uncloked: Fully Connected Layer" position='top'/>
      </div>
    </>
  )
}

export default App
