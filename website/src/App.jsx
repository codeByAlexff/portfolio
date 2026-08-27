import { useCallback, useEffect, useState, useRef } from 'react'
import Background from './Background'
import Popup from './Popup'
import ProjectCard from './ProjectCard'
import cinemantic from './assets/cinemantic.mp4'
import clip from './assets/clip.mp4'
import llm from './assets/llm.mp4'
import leetbot from './assets/leetbot.mp4'
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
                'Hi Im Alex. Welcome to my portfolio.',
                3000,
                'Hola soy Alex. Bienvenido a mi portafolio',
                3000,
                'Olá, o meu nome é Alex. Bem-vindo ao meu portefólio.',
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
            <ProjectCard video={cinemantic} title="Cinemantic" badge="open source" badgeType="open">
              <p className="card-tagline project-p">Semantic movie recommendation engine</p>
              <p className="project-p">
              Embedded 4,800 TMDB plot overviews with OpenAI text-embedding-3-small, stored in PostgreSQL via pgvector for cosine-
              similarity retrieval.
              Combined vector distance with hard filters on year, runtime, and rating in a single SQL query, with an optional LLM rerank pass.
              Cached query embeddings in Redis by content hash (30-day TTL, fail-open), skipping the embedding API call on repeat searches.
              Currently working on benchmarking Precision@10 across keyword, semantic, and reranked retrieval on a hand-labeled 40-query evaluation set.
              </p>
            </ProjectCard>

            <ProjectCard image={clip} title="Typographic recovery" badge="open source" badgeType="open">
              <p className="card-tagline project-p">CLIP adversarial attack recovery.</p>
              <p className="project-p">
                Engineered a four-stage vision pipeline: CLIP (ViT-B/32) classification, EasyOCR text detection, removal, re-classification.
                Benchmarked three text-removal methods: solid masking, OpenCV Telea inpainting, and LaMa neural inpainting on a generated 28-image attack dataset.
                Measured an 89.3% attack success rate against CLIP and 100% classification recovery for all three removal methods.
                Structured the codebase into modular components (classifier, OCR, masking, evaluation) with a reproducible eval script and CLI
                entry points.
              </p>
            </ProjectCard>

            <ProjectCard video={llm} title="LLM token prediction model" badge="open source" badgeType="open">
              <p className="card-tagline project-p">Bigram Language Model (PyTorch)</p>
              <p className="project-p">
                Character-level tokenization over a 92-symbol vocabulary derived from the corpus, with encode/decode maps built from a sorted character set
                nn.Embedding(vocab_size, vocab_size) as a lookup table where each row is the logit distribution over next characters
                Batched sampling with torch.randint over an 80/20 train/val split, blocks of 8 tokens
                Loss computed by flattening (B, T, C) logits to (B*T, C) for F.cross_entropy
                Periodic evaluation under @torch.no_grad() with explicit model.eval() / model.train() toggling so dropout and normalization behave correctly at eval time
                Autoregressive generation: slice the final timestep, softmax over the vocab axis, sample with torch.multinomial, concatenate, repeat
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
            <ProjectCard video={leetbot} title="leetbot" badge="open source" badgeType="open">
              <p className="card-tagline project-p">Discord bot for LeetCode practice.</p>
              <p className="project-p">
                Built and published a Discord bot adopted across 10+ servers with a combined reach of 250+ members.
                Deployed and maintained the bot in production on Railway, with automated deploys triggered on each GitHub commit.
                Implemented commands for random retrieval, lookup by problem number, and filtering by difficulty and topic across 3,000+
                problems.
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
              <p className="experience-block-subtitle">
                Diagnose and resolve hardware, operating system, and application-level software defects across consumer devices daily.
                Consult with customers to scope technical requirements and translate complex findings into clear, actionable guidance.
                Own end-to-end device intake, documentation, and repair workflow, partnering with technicians to resolve escalations.
              </p>
            </div>
          </div>
          <div className="experience-block">
          <span className="experience-block-timeline">2023</span>
          <div className="experience-block-content">
            <span className="experience-block-title">Web Development Intern</span>
            <p className="experience-company">Show Production Miami · Large event and show company</p>
              <p className="experience-block-subtitle">
                Built a company website from the ground up with a three-person team, iterating on feedback through peer code reviews.
                Developed responsive front-end pages and layouts in HTML, CSS, and JavaScript as a framework for future expansion.
              </p>
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