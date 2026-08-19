import { useCallback, useEffect, useState, useRef } from 'react'
import Background from './Background'
import Popup from './Popup'
import ProjectCard from './ProjectCard'
import cinemantic from './assets/cinemantic.png'
import clip from './assets/clip.png'
import llm from './assets/llm.mp4'
import './App.css'
import { GitHubCalendar } from 'react-github-calendar'
import { TypeAnimation } from 'react-type-animation'

function App() {
  const [copied, setCopied] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const typeRef = useRef(null);
  
  



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
            <a href="#experience">Experience</a>
            <a href="#aboutme">About Me</a>
            <a
                className={`no-underline get-in-touch ${hasScrolled ? 'scrolled' : 'get-in-touch'}`}
                href="https://www.linkedin.com/messaging/compose/?recipient=alexanderff"
                target="_blank"
                rel="noopener noreferrer"
              > Get in touch
            </a>
          </nav>
        </div>
      </header>

      <section id="center">
        <div className="hero-panel">
          <div>
            <h1 id="title" onClick={() => setIsVisible(!isVisible)} style={{cursor: 'pointer'}}>
              {isVisible ? (
                <TypeAnimation
                  sequence={[
                  'FullStack Engineer', 7000,
                  'AI Engineer', 7000,
                  'Backend Engineer', 7000,
              ]}
              wrapper="span"
              repeat={Infinity}
              speed={50}
              />
            ) : (
              'FullStack Engineer'
            )}
            </h1>
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
              <div className="window-title">alex@portfolio</div>
            </div>
            <div className="window-body">
              <code>
              <TypeAnimation
              sequence = {[
                'Hey Im Alex. Welcome to my portfolio.',
                3000,
                'FIU 2026 Graduate',
                3000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              className="string-highlight"
              />
              </code>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className={hasScrolled ? 'project-title scrolled' : 'project-title'}>
          <div className="container">
          <h2 className="project-title">Selected Work</h2>
          <h2 className="project-subtitle">Things I built to understand how they work.</h2>
          <div className="projects-grid">
            <ProjectCard image={cinemantic} title="Cinemantic" badge="open source" badgeType="open">
              <p className="card-tagline project-p">semantic movie search engine</p>
              <p className="project-p">
                Movie recommender system made to fully understand and conceptualize vector embeddings and cosine similarity turned into a project.
                System takes in a TMDB 4k+ movie dataset and turns them into vector embeddings. These then get stored in a PostgreSQL database utilizing pgvector.
                User can send a query with a film or description of one and the system will then embed the query, insert it into the database, perform a cosine similarity calculation
                and return the top k movies that match the query the most. For system performance Redis is utilized for result caching and error catching. Currently adding a benchmarked retrieval
                evaluation harness for correct metrics.
              </p>
            </ProjectCard>

            <ProjectCard image={clip} title="Typographic recovery" badge="open source" badgeType="open">
              <p className="card-tagline project-p">CLIP adversarial attack recovery.</p>
              <p className="project-p">
                Benchmark pipeline measuring how well CLIP recovers from typographic attacks — images with misleading text printed on them.
                Compares three removal methods (solid mask, OpenCV inpaint, LaMa) and measures attack success rate and classification recovery across each.
              </p>
            </ProjectCard>

            <ProjectCard video={llm} title="LLM token prediction model" badge="open source" badgeType="open">
              <p className="card-tagline project-p">GPT-2 built from scratch.</p>
              <p className="project-p">
                A 124M-parameter transformer trained from the ground up on FineWeb-Edu. Implements the full architecture by hand — attention, layer norm,
                BPE tokenization, gradient accumulation, and cosine learning-rate decay.
              </p>
            </ProjectCard>
            <div className="code-window">
            <div className="window-header">
              <div className="window-buttons">
                <span className="btn close"></span>
                <span className="btn minimize"></span>
                <span className="btn maximize"></span>
              </div>
              <div className="window-title">techStack.py</div>
            </div>
            <div className="window-body-left">
              <span className="stack-deco">01 | Backend</span>
              <div className="stack-tags">
              <span className="code-deco">Python</span>
              <span className="code-deco">Java</span>
              <span className="code-deco">Redis</span>
              <span className="code-deco">PostgreSQL</span>
              </div>
            </div>
            <div className="window-body-left">
              <span className="stack-deco">02 | Frontend</span>
              <div className="stack-tags">
              <span className="code-deco">JavaScript</span>
              <span className="code-deco">React</span>
              <span className="code-deco">Next.js</span>
              </div>
            </div>
              <div className="window-body-left">
              <span className="stack-deco">03 | AI/ML</span>
              <div className="stack-tags">
              <span className="code-deco">Python</span>
              <span className="code-deco">PyTorch</span>
              <span className="code-deco">pgvector</span>
              </div>
            </div>
          </div>
            <ProjectCard video={llm} title="leetbot" badge="open source" badgeType="open">
              <p className="card-tagline project-p">Discord bot for LeetCode practice.</p>
              <p className="project-p">
                Discord bot that serves daily LeetCode problems and tracks solve streaks. Currently running in 10+ servers with 250+ active users.
              </p>
            </ProjectCard>
            <div className="code-window">
            <div className="window-header">
              <div className="window-buttons">
                <span className="btn close"></span>
                <span className="btn minimize"></span>
                <span className="btn maximize"></span>
              </div>
              <div className="window-title">Focus.jsx</div>
            </div>
            <div className="window-body-left">
              <span className="stack-deco">Current Direction</span>
              <div className="stack-tags">
              <span className="code-deco">AI-Assisted Engineering</span>
              <span className="code-deco">Agentic Workflows</span>
              <span className="code-deco">MCP tooling</span>
              <span className="code-deco">Developer Experience</span>
              <span className="code-deco">RAG</span>
              </div>
            </div>
            <div className="window-body-left">
              <h2 className="section-title">Github Activity</h2>
              <GitHubCalendar className="calendar-wrap" username="codeByAlexff" colorScheme="dark" transformData={(data) => data.slice(-140)} />
            </div>

          </div>
          </div>
        </div>
      </section>
      <section id="experience" className={hasScrolled ? 'scrolled' : ''}>
        <div className="container">
          <h2 className="experience-title">Experience</h2>
          <h2 className="experience-subtitle">Careers across industries.</h2>
          <div className="experience-block">
          <span className="experience-block-timeline">2023 - Present</span>
          <div className="experience-block-content">
            <span className="experience-block-title">Technical Support Agent</span>
            <p className="experience-company">Best Buy · Major Tech Retailer</p>
              <p className="experience-block-subtitle">Building React Native applications and reusable native infrastructure for iOS and Android, alongside web and backend services — native integrations (Swift, Objective-C, Kotlin, Java), shared tooling, and engineering workflow improvements.</p>
            </div>
          </div>
          <div className="experience-block">
          <span className="experience-block-timeline">2023</span>
          <div className="experience-block-content">
            <span className="experience-block-title">Web Development Intern</span>
            <p className="experience-company">Show Production Miami · Large event and show company</p>
              <p className="experience-block-subtitle">Building React Native applications and reusable native infrastructure for iOS and Android, alongside web and backend services — native integrations (Swift, Objective-C, Kotlin, Java), shared tooling, and engineering workflow improvements.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="aboutme">
        <div className="container">
            <h2 className="aboutme-block-title">About me</h2>
            <h2 className="aboutme-block-subtitle">A few things to learn</h2>
            <div className="aboutme-block">
              <div clasName="tag-pills">
                <span className="tag-pill">Miami,FL</span>
                <span className="tag-pill">FL Studio</span>
                <span className="tag-pill">Gaming</span>
              </div>
              <p className="aboutme-p">
                  I've been interested in computers and how they work since I was a kid — taking them apart,
                  putting them back together, and occasionally making them worse. That curiosity turned into
                  playing videogames, then into building PCs, and eventually into writing software.
                </p>
                <p className="aboutme-p">
                  Outside of that, you'll usually find me producing music, playing the newest videogames, or going down a rabbit hole on whatever caught my attention that week.
                </p>
            </div>
        </div>
      </section>
      <section id="end" className="contact-section">
        <div className="end-container">
          <h2 className="end-title">CONTACT</h2>
          <h2 className="end-largeTitle">Let's build something.</h2>
          <p className="end-p">Open to new roles and new experiences.</p>
        </div>
      </section>

      <footer className="site-footer">
      <div className="container">
        <p>© 2026 Alexander Ferreira</p>
        <div className="footer-links">
          <a href="https://github.com/codeByAlexff" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/alexanderff/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>

      <Popup isOpen={copied} message="Copied to clipboard" />
      <Popup isOpen={hasWon} message="Achievement Unlocked: Fully Connected Layer" position="top" />
    </>
  )
}

export default App