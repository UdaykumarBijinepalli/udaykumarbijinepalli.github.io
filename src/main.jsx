import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const profile = {
  name: 'UDAY KUMAR B',
  role: 'Software Engineer',
  focus: 'Cloud • DevOps • Automation',
  email: 'udaybijinepalli@gmail.com',
  linkedin: 'https://www.linkedin.com/in/udaybiji/',
  github: 'https://github.com/UdaykumarBijinepalli',
  whatsapp: 'https://wa.me/918125261689',
  instagram: 'https://instagram.com/the_name_is_uday3'
};

const projects = [
  {
    number: '01',
    type: 'CI/CD • CLOUD DEPLOYMENT',
    title: 'Cloud-Native CI/CD Pipeline',
    description: 'Designed and implemented an automated CI/CD pipeline integrating GitHub, Jenkins, Docker and AWS EC2 to streamline application deployment. Docker image build, versioning and deployment were automated through Jenkins pipelines.',
    stack: ['Git', 'GitHub', 'Jenkins', 'Docker', 'Docker Hub', 'Kubernetes', 'AWS EC2', 'Linux'],
    flow: ['GIT PUSH', 'JENKINS', 'BUILD', 'DOCKER', 'KUBERNETES', 'AWS EC2', 'RUNNING APP'],
    repo: '#',
    visual: 'cicd'
  },
  {
    number: '02',
    type: 'INFRASTRUCTURE AS CODE',
    title: 'Infrastructure Provisioning with Terraform',
    description: 'Provisioned reusable AWS infrastructure using Terraform and Infrastructure as Code principles across compute, networking and identity resources for repeatable deployment.',
    stack: ['Terraform', 'AWS', 'EC2', 'IAM', 'VPC', 'S3'],
    flow: ['TERRAFORM', 'VPC', 'IAM', 'EC2', 'S3', 'READY'],
    repo: '#',
    visual: 'terraform'
  },
  {
    number: '03',
    type: 'AUTOMATION • CLOUD • EMAIL',
    title: 'Job Search Automation App',
    description: 'Built a Python automation script that gathers job listings from LinkedIn, Google and Naukri based on user preferences, then emails a sorted daily summary through Gmail SMTP.',
    stack: ['Python', 'AWS', 'Gmail SMTP', 'CI/CD Automation'],
    flow: ['PREFERENCES', 'SEARCH', 'FILTER', 'SORT', 'EMAIL', 'DAILY'],
    repo: '#',
    visual: 'jobs'
  },
  {
    number: '04',
    type: 'FULL-STACK • AWS',
    title: 'AWS Full-Stack Form Application',
    description: 'Designed and deployed a form-based web application entirely on AWS using EC2 for the backend, S3 for static assets and RDS for the database, demonstrating an end-to-end cloud deployment workflow.',
    stack: ['Python Flask', 'HTML/CSS', 'AWS EC2', 'S3', 'RDS'],
    flow: ['FORM', 'FLASK', 'EC2', 'S3', 'RDS', 'SUBMITTED'],
    repo: '#',
    visual: 'form'
  },
  {
    number: '05',
    type: 'MACHINE LEARNING • AWS',
    title: 'Diabetes Prediction Web App',
    description: 'Designed and implemented an ML-powered web app using a Support Vector Machine classifier to analyse health data and predict diabetes likelihood, with preprocessing, feature selection, training, evaluation and AWS deployment.',
    stack: ['Python', 'SVM', 'HTML/CSS', 'AWS EC2', 'RDS'],
    flow: ['INPUT', 'PREPROCESS', 'SVM', 'PREDICT', 'EC2', 'RESULT'],
    repo: '#',
    visual: 'ml'
  },
  {
    number: '06',
    type: 'PYTHON • CNN • IMAGE PROCESSING',
    title: 'OCR-Based Text Extraction Tool',
    description: 'Developed a Python application using CNN-based OCR to extract printed and handwritten text from scanned documents and images, with grayscale and thresholding preprocessing to improve accuracy.',
    stack: ['Python', 'CNN', 'OCR', 'Image Processing'],
    flow: ['IMAGE', 'GRAYSCALE', 'THRESHOLD', 'CNN OCR', 'TEXT', 'EXPORT'],
    repo: '#',
    visual: 'ocr'
  }
];

const experiences = [
  { year: '2025 → NOW', company: 'KODS Technologies', role: 'DevOps Intern', points: ['Jenkins + Git CI/CD workflows', 'Docker containerization on Linux', 'Terraform provisioning + shell automation', 'AWS microservices deployment', 'Kubernetes orchestration for containerized workloads'] },
  { year: 'FEB → AUG 2025', company: 'Visionet Systems', role: 'CloudOps Intern', points: ['Enterprise cloud operations exposure', 'AWS + Microsoft Azure architecture', 'Deployment models + ITIL concepts', 'Cloud engineering foundation'] },
  { year: 'OCT → NOV 2023', company: 'IBM', role: 'Cybersecurity Intern', points: ['Secure computing principles', 'Threats, malware + attack vectors', 'Enterprise security practices', 'Security-first approach to IT systems'] }
];

const skills = [
  { title: 'CLOUD', items: ['AWS', 'Microsoft Azure', 'EC2', 'S3', 'IAM', 'VPC', 'RDS', 'CloudWatch', 'Auto Scaling', 'ELB'] },
  { title: 'DEVOPS', items: ['Git', 'GitHub Actions', 'Jenkins', 'Docker', 'Kubernetes', 'Terraform', 'Ansible'] },
  { title: 'CODE', items: ['Python', 'Java', 'C', 'Bash', 'MySQL', 'Linux'] }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const lastScroll = useRef(0);
  const cursor = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 80) setNavHidden(y > lastScroll.current);
      else setNavHidden(false);
      lastScroll.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = cursor.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    const move = (e) => {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };
    const enter = () => el.classList.add('active');
    const leave = () => el.classList.remove('active');
    window.addEventListener('pointermove', move, { passive: true });
    const interactive = document.querySelectorAll('a, button, .project-card, .skill-chip');
    interactive.forEach((node) => {
      node.addEventListener('pointerenter', enter);
      node.addEventListener('pointerleave', leave);
    });
    return () => {
      window.removeEventListener('pointermove', move);
      interactive.forEach((node) => {
        node.removeEventListener('pointerenter', enter);
        node.removeEventListener('pointerleave', leave);
      });
    };
  }, []);

  useEffect(() => {
    const rail = document.querySelector('.projects-rail');
    if (!rail) return;
    const wheel = (e) => {
      const max = rail.scrollWidth - rail.clientWidth;
      if (max <= 0) return;
      const atStart = rail.scrollLeft <= 1;
      const atEnd = rail.scrollLeft >= max - 1;
      const movingDown = e.deltaY > 0;
      const movingUp = e.deltaY < 0;
      if ((movingDown && !atEnd) || (movingUp && !atStart)) {
        e.preventDefault();
        rail.scrollLeft += e.deltaY + e.deltaX;
      }
    };
    rail.addEventListener('wheel', wheel, { passive: false });
    return () => rail.removeEventListener('wheel', wheel);
  }, []);

  const jump = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <div className="app">
      <div className="noise" />
      <div className="cursor" ref={cursor} />
      <div className="deploy-line" aria-hidden="true"><span /></div>

      <header className={`nav ${navHidden ? 'nav--hidden' : ''}`}>
        <button className="brand" onClick={() => jump('#home')} aria-label="Go to top">
          <span>UDAY KUMAR B</span><i />
        </button>
        <nav className={menuOpen ? 'nav-links nav-links--open' : 'nav-links'}>
          <button onClick={() => jump('#about')}>About</button>
          <button onClick={() => jump('#experience')}>Experience</button>
          <button onClick={() => jump('#work')}>Work</button>
          <button onClick={() => jump('#stack')}>Stack</button>
          <button className="nav-cta" onClick={() => jump('#contact')}>Let's talk ↗</button>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu"><span /><span /></button>
      </header>

      <main>
        <section className="hero" id="home">
          <HeroSystemVisual />
          <div className="hero-meta">
            <span>BENGALURU, INDIA</span>
            <span>SOFTWARE ENGINEER</span>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
          <div className="hero-copy">
            <p className="eyebrow">CLOUD / DEVOPS / AUTOMATION</p>
            <h1>I build systems<br /><em>that ship.</em></h1>
            <p className="lede">Cloud-native engineering, infrastructure automation and reliable software delivery — built with hands-on AWS and DevOps experience.</p>
            <div className="hero-actions">
              <button className="button button--solid" onClick={() => jump('#work')}>Explore my work <span>↓</span></button>
              
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="section-kicker"><span>01 — ABOUT</span><span>THE ENGINEER BEHIND THE SYSTEMS</span></div>
          <div className="about-grid">
            <div className="portrait-wrap" data-reveal><div className="portrait-glow" /><img src="/assets/uday-profile.png" alt="Portrait of Uday Kumar B" /><div className="portrait-caption"><span>UDAY KUMAR B</span><span>BENGALURU / IN</span></div></div>
            <div className="about-copy" data-reveal><span className="mini-label">A LITTLE CONTEXT</span><h2>Curious by default.<br /><em>Hands-on by choice.</em></h2><p>I’m an entry-level Software Engineer focused on cloud-native software, infrastructure automation and DevOps practices. I enjoy taking a system from an idea on a laptop to something repeatable, observable and deployable.</p><div className="about-college"><span>EDUCATION</span><strong>New Horizon College of Engineering</strong><small>B.E. — Information Science and Engineering</small></div><div className="about-stats"><div><strong>8.35</strong><span>CGPA / 10</span></div><div><strong>2021–25</strong><span>B.E. / ISE</span></div><div><strong>3</strong><span>INTERNSHIPS</span></div><div><strong>15+</strong><span>PROJECTS BUILT</span></div></div></div>
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="section-heading section-heading--split"><div><span className="section-number">02</span><span className="section-name">ENGINEERING JOURNEY</span></div><p>A progression from security fundamentals → cloud operations → DevOps automation.</p></div>
          <div className="timeline">
            {experiences.map((item, idx) => <article className="timeline-item" key={item.company} data-reveal><div className="timeline-year">{item.year}</div><div className="timeline-dot" /><div className="timeline-body"><span>{String(idx + 1).padStart(2, '0')}</span><h3>{item.role}</h3><h4>{item.company}</h4><div className="timeline-points">{item.points.map((p) => <p key={p}>+ {p}</p>)}</div></div></article>)}
          </div>
        </section>

        <section className="signal-section">
          <div className="section-kicker"><span>03 — SIGNAL</span><span>WHAT I BUILD</span></div>
          <div className="signal-grid">
            <div data-reveal>
              <span className="mini-label">FROM CODE</span>
              <h2>To cloud.</h2>
            </div>
            <div className="signal-arrow" data-reveal>→</div>
            <div data-reveal>
              <span className="mini-label">FROM MANUAL</span>
              <h2>To automated.</h2>
            </div>
          </div>
          <div className="pipeline" data-reveal>
            {['CODE', 'GIT', 'CI/CD', 'CONTAINER', 'KUBERNETES', 'CLOUD', 'DEPLOY'].map((step, i) => <div key={step} className="pipeline-step"><span>0{i + 1}</span><b>{step}</b></div>)}
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="section-heading">
            <div><span className="section-number">04</span><span className="section-name">SELECTED WORK</span></div>
            <h2>Systems,<br /><span>not screenshots.</span></h2>
          </div>
          <div className="projects-rail">
            {projects.map((project) => (
              <article className="project-card" key={project.number} data-reveal>
                <div className="project-topline"><span>{project.number} / {projects.length}</span><span>{project.type}</span></div>
                <ProjectVisual project={project} />
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="chips">{project.stack.map((x) => <span className="skill-chip" key={x}>{x}</span>)}</div>
                  <button className="text-link" onClick={() => setActiveProject(project)}>Inspect system <span>↗</span></button>
                </div>
              </article>
            ))}
          </div>
          <div className="work-foot"><span>Scroll horizontally through the build log</span><span>→ → →</span></div>
        </section>

        <section className="stack-section" id="stack">
          <div className="section-kicker"><span>05 — STACK</span><span>TOOLS I WORK WITH</span></div>
          <div className="stack-intro" data-reveal><span>THE TOOLBOX</span><h2>Built for the<br />entire delivery path.</h2></div>
          <div className="skills-map">
            {skills.map((group) => <div className="skill-group" key={group.title} data-reveal><div className="skill-group-title">{group.title}<span>↘</span></div><div className="skill-cloud">{group.items.map((item) => <div className="skill-chip skill-chip--large" key={item}>{item}</div>)}</div></div>)}
          </div>
        </section>

        <section className="cert-section">
          <div className="section-kicker"><span>06 — CERTIFICATIONS</span><span>LEARNING IN PUBLIC</span></div>
          <div className="credential-marquee"><div className="marquee-track">{['AZ-900', 'OCI FOUNDATIONS', 'CYBERSECURITY', 'MACHINE LEARNING', 'AZ-900', 'OCI FOUNDATIONS', 'CYBERSECURITY', 'MACHINE LEARNING'].map((x, i) => <span key={i}>{x} <i>✦</i></span>)}</div></div>
          <div className="cert-grid" data-reveal>
            <div><span>MICROSOFT</span><strong>Azure Fundamentals</strong><small>AZ-900</small></div>
            <div><span>ORACLE</span><strong>Cloud Infrastructure</strong><small>Foundations Associate</small></div>
            <div><span>HCL SOFTWARE</span><strong>Cybersecurity</strong><small>Training & Certification</small></div>
            <div><span>INFOSYS SPRINGBOARD</span><strong>Machine Learning</strong><small>Implementation</small></div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-bg-text">LET'S BUILD</div>
          <div className="contact-inner" data-reveal>
            <span className="mini-label">07 — CONTACT</span>
            <h2>Ready for<br /><em>what's next?</em></h2>
            <p>I’m open to Software Engineering, Cloud, DevOps and infrastructure-focused opportunities.</p>
            <div className="contact-actions"><a className="button button--solid" href={`mailto:${profile.email}`}>Email me ↗</a><a className="button button--ghost button--resume" href="/resume.pdf" download="Uday-Kumar-B-Resume.pdf">Download resume ↓</a><a className="button button--ghost" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><a className="button button--ghost" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a className="button button--ghost button--social" href={profile.whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a><a className="button button--ghost" href={profile.instagram} target="_blank" rel="noreferrer">Instagram ↗</a></div>
          </div>
        </section>
      </main>

      <footer><div className="footer-brand">UDAY KUMAR B</div><div className="footer-copy">© 2026 Uday Kumar B / Built for the next deployment.</div></footer>

      {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
    </div>
  );
}

function HeroSystemVisual() {
  const ref = useRef(null);

  useEffect(() => {
    const wrap = ref.current;
    if (!wrap || window.matchMedia('(pointer: coarse)').matches) return;
    const move = (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      wrap.style.setProperty('--mx', `${x * 14}px`);
      wrap.style.setProperty('--my', `${y * 14}px`);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <div className="hero-system" ref={ref} aria-hidden="true">
      <div className="hero-system-halo hero-system-halo--one" />
      <div className="hero-system-halo hero-system-halo--two" />
      <div className="system-grid" />

      <svg className="system-connections" viewBox="0 0 720 620" preserveAspectRatio="none">
        <defs>
          <linearGradient id="flowLine" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(244,201,93,0)" />
            <stop offset=".5" stopColor="#f4c95d" />
            <stop offset="1" stopColor="rgba(244,201,93,0)" />
          </linearGradient>
          <filter id="softGlow"><feGaussianBlur stdDeviation="5" /></filter>
        </defs>
        <path className="connection glow" d="M122 175 C220 140 250 215 350 300 S500 430 612 390" />
        <path className="connection" d="M122 175 C220 140 250 215 350 300 S500 430 612 390" />
        <path className="connection glow" d="M615 180 C530 180 472 245 420 300 S315 430 170 455" />
        <path className="connection" d="M615 180 C530 180 472 245 420 300 S315 430 170 455" />
        <path className="connection glow" d="M190 520 C290 500 350 430 360 320 S415 145 535 105" />
        <path className="connection" d="M190 520 C290 500 350 430 360 320 S415 145 535 105" />
        <circle className="data-packet packet-one" cx="122" cy="175" r="4" />
        <circle className="data-packet packet-two" cx="615" cy="180" r="4" />
        <circle className="data-packet packet-three" cx="190" cy="520" r="4" />
      </svg>

      <div className="system-node node-cloud">
        <span className="node-icon cloud-icon"><i /><b /><em /></span>
        <span className="node-label">CLOUD</span>
        <small>AWS / AZURE</small>
      </div>

      <div className="system-node node-devops">
        <span className="node-icon stack-icon"><i /><i /><i /></span>
        <span className="node-label">DEVOPS</span>
        <small>CI/CD • CONTAINERS</small>
      </div>

      <div className="system-node node-ai">
        <span className="node-icon ai-icon"><i /><i /><i /><i /><i /><i /></span>
        <span className="node-label">AI</span>
        <small>AUTOMATION • INTELLIGENCE</small>
      </div>

      <div className="system-node node-code">
        <span className="node-icon code-icon">&lt;/&gt;</span>
        <span className="node-label">CODE</span>
        <small>PYTHON • LINUX</small>
      </div>

      <div className="system-core">
        <div className="core-ring core-ring--outer" />
        <div className="core-ring core-ring--inner" />
        <div className="core-dot" />
        <span className="core-label">SHIP</span>
      </div>

      <div className="system-status status-top"><span className="status-pulse" /> PIPELINE ACTIVE</div>
      <div className="system-status status-bottom">01 / 04 <span>BUILD → DEPLOY → SCALE</span></div>
    </div>
  );
}

function ProjectVisual({ project }) {
  const labels = {
    cicd: ['GIT', 'JENKINS', 'DOCKER', 'K8S', 'AWS'],
    terraform: ['TF', 'VPC', 'IAM', 'EC2', 'S3'],
    fullstack: ['USER', 'FLASK', 'EC2', 'RDS', 'S3'],
    jobs: ['LINKEDIN', 'GOOGLE', 'NAUKRI', 'SORT', 'SMTP'],
    form: ['FORM', 'FLASK', 'EC2', 'S3', 'RDS'],
    ml: ['DATA', 'SVM', 'MODEL', 'EC2', 'RDS'],
    ocr: ['IMAGE', 'PREPROCESS', 'CNN', 'TEXT', 'EXPORT']
  };
  return (
    <div className={`project-visual project-visual--${project.visual}`}>
      <div className="visual-grid" />
      <div className="visual-ambient" />
      <div className="visual-circuit">
        {(labels[project.visual] || project.flow).map((label, i) => (
          <React.Fragment key={label}>
            <div className="visual-node"><span>{String(i + 1).padStart(2, '0')}</span><b>{label}</b></div>
            {i < (labels[project.visual] || project.flow).length - 1 && <div className="visual-link"><i /></div>}
          </React.Fragment>
        ))}
      </div>
      <div className="visual-badge">SYSTEM / {project.number}</div>
      <div className="visual-scanline" />
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, []);
  return <div className="modal-backdrop" onClick={onClose}><div className="modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={onClose}>CLOSE ×</button><span className="mini-label">PROJECT {project.number}</span><h2>{project.title}</h2><p>{project.description}</p><div className="modal-flow">{project.flow.map((x, i) => <div key={x}><span>{String(i + 1).padStart(2, '0')}</span><strong>{x}</strong></div>)}</div><div className="chips">{project.stack.map((x) => <span className="skill-chip" key={x}>{x}</span>)}</div></div></div>;
}

createRoot(document.getElementById('root')).render(<App />);
