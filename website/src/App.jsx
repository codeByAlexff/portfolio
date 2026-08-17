import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Background from './Background'
import Popup from './Popup'
import ProjectCard from './ProjectCard'
import cinemantic from './assets/cinemantic.png'
import clip from './assets/clip.png'
import llm from './assets/creating_an_llm.webm'
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
    <Background onWin={handleWin}/>
      <section id="center">
        <div className="hero">
        </div>
        <div className="hero-panel">
          <h1>FullStack | AI Engineer</h1>
          <p>
          I'm a newly graduated software engineer with an interest in AI and ML.<br></br>
          I combine my artificial intelligence knowledge with deep engineering experience<br></br>
          in order to build related AI platforms or systems and the large-scale systems<br></br>
          that distribute them.
          </p>
          <p className="standout-p">Interested in software engineering or deep neural systems? Let's talk! </p>
          <p className="tight-spacing links-p">github: <a href="https://github.com/codeByAlexff" className="no-underline custom-color" target="_blank" rel="noopener noreferrer">@codeByAlexff</a></p>
          <p className="tight-spacing links-p">linkedIn: <a href="https://www.linkedin.com/in/alexanderff/" className="no-underline custom-color" target="_blank" rel="noopener noreferrer">@alexanderff</a></p>
          <p className="tight-spacing links-p">email: <a onClick={() => copyToClipboard("alexanderferreira003@hotmail.com")} style={{ cursor: 'pointer' }} className="no-underline custom-color">Click Here</a></p>
        </div>
        <div className="projects-grid">
          <ProjectCard image={cinemantic} title="Cinemantic" badge="open source" badgeType="open">
            <p className="card-tagline project-p">Semantic movie search.</p>
            <p className="project-p">Search films by meaning, not keywords. Built on pgvector cosine similarity over OpenAI embeddings, with Redis caching and a benchmarked retrieval eval harness.</p>
          </ProjectCard>
          <ProjectCard image={clip} title="CLIP Typographic Attack" badge="open source" badgeType="open">
            <p className="card-tagline project-p">Semantic movie search.</p>
            <p className="project-p">Search films by meaning, not keywords. Built on pgvector cosine similarity over OpenAI embeddings, with Redis caching and a benchmarked retrieval eval harness.</p>
          </ProjectCard>
          <ProjectCard video={llm} title="Creating An LLM" badge="open source" badgeType="open">
            <p className="card-tagline project-p">Semantic movie search.</p>
            <p className="project-p">Search films by meaning, not keywords. Built on pgvector cosine similarity over OpenAI embeddings, with Redis caching and a benchmarked retrieval eval harness.</p>
          </ProjectCard>
          </div>
      </section>
      <Popup isOpen={copied} message="Copied to clipboard" />
      <Popup isOpen={hasWon} message="Achievemnt Uncloked: Fully Connected Layer" position='top'/>
    </>
  )
}

export default App
