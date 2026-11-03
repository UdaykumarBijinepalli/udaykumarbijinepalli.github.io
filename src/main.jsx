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

const deploymentProjects = [
  {
    number: '01',
    type: 'AWS • KUBERNETES • MICROSERVICES',
    title: 'Cloud-Native Microservices Deployment on AWS EKS',
    description: 'Provisioned AWS networking and an EKS managed node group with Terraform, then deployed a polyglot microservices application using Helm and NGINX Ingress. Added Prometheus/Grafana observability and Locust traffic simulation to explore workload behaviour.',
    stack: ['Terraform', 'AWS VPC', 'Amazon EKS', 'Kubernetes', 'Helm', 'NGINX Ingress', 'GitHub Actions', 'Prometheus', 'Grafana', 'Locust'],
    flow: ['TERRAFORM', 'AWS VPC + EKS', 'HELM RELEASE', 'NGINX INGRESS', 'OBSERVABILITY'],
    visual: 'eks',
    details: {
      architecture: 'Terraform provisions the AWS network and EKS cluster resources. A managed node group runs the Kubernetes workloads; Helm deploys the microservices and NGINX Ingress exposes application routes. Prometheus and Grafana provide cluster/workload visibility, while Locust generates test traffic.',
      implementation: [
        'Defined the AWS infrastructure with Terraform, including VPC and EKS-related resources.',
        'Deployed the multi-service application to Kubernetes using Helm charts.',
        'Configured NGINX Ingress for application access and routing.',
        'Added Prometheus and Grafana monitoring, then used Locust to simulate traffic.',
        'Used GitHub Actions for workflow automation and validation.'
      ],
      engineering: 'During monitoring setup, Prometheus pod scheduling was blocked by resource requests. Adjusting the CPU requests resolved the scheduling issue and allowed the monitoring components to run.',
      result: 'A hands-on AWS EKS deployment covering infrastructure provisioning, Kubernetes application delivery, ingress, observability and load simulation.'
    }
  },
  {
    number: '02',
    type: 'CONFIGURATION MANAGEMENT • AWS',
    title: 'Automated Full-Stack Deployment with Ansible',
    description: 'Automated application delivery across AWS EC2 workers using Ansible playbooks launched from a control node through a GitHub Actions workflow. The playbooks handle application setup, frontend build steps, PM2 process management and NGINX reverse-proxy configuration.',
    stack: ['AWS EC2', 'Ansible', 'GitHub Actions', 'NGINX', 'Node.js', 'Express', 'PM2', 'MongoDB', 'Linux'],
    flow: ['GIT PUSH', 'GITHUB ACTIONS', 'ANSIBLE CONTROL', 'EC2 WORKERS', 'NGINX + PM2'],
    visual: 'ansible',
    details: {
      architecture: 'A GitHub Actions workflow connects over SSH to the Ansible control host. Ansible inventory and playbooks then configure the target EC2 worker instances, install application dependencies, build the frontend and manage the backend process with PM2. NGINX handles incoming web/API routing.',
      implementation: [
        'Organized target instances in an Ansible inventory and connected to workers over SSH.',
        'Used playbooks to synchronize application files and install required packages and dependencies.',
        'Ran frontend build steps as part of deployment.',
        'Managed the Node.js/Express backend process with PM2.',
        'Configured NGINX as the reverse proxy and triggered the automation from GitHub Actions.'
      ],
      engineering: 'The deployment required coordinating SSH access, inventory targeting, application dependencies, process state and reverse-proxy routing across more than one server.',
      result: 'A repeatable configuration-management workflow for deploying and configuring a full-stack application across EC2 instances.'
    }
  },
  {
    number: '03',
    type: 'DOCKER • AWS EC2 • REVERSE PROXY',
    title: 'Containerized Full-Stack Application Delivery',
    description: 'Containerized the frontend and backend and deployed them on separate AWS EC2 instances connected through a private network path. GitHub Actions automates remote delivery, while NGINX routes browser requests and API traffic to the appropriate service.',
    stack: ['AWS EC2', 'Docker', 'NGINX', 'GitHub Actions', 'React', 'Node.js', 'Express', 'Linux', 'VPC'],
    flow: ['GIT PUSH', 'GITHUB ACTIONS', 'FRONTEND EC2', 'NGINX ROUTING', 'BACKEND EC2'],
    visual: 'docker',
    details: {
      architecture: 'The frontend and backend run as containerized workloads on separate EC2 instances. NGINX provides the web entry point and forwards API requests to the backend over the private network. GitHub Actions initiates the remote deployment workflow.',
      implementation: [
        'Built Docker images for the frontend and backend application components.',
        'Deployed the application components to separate EC2 instances.',
        'Configured NGINX to serve frontend traffic and proxy API paths to the backend.',
        'Used GitHub Actions to automate remote deployment steps.',
        'Validated application and API reachability after deployment.'
      ],
      engineering: 'A key debugging lesson was that browser-side API calls cannot use localhost to reach a backend on another server. The frontend API endpoint and NGINX proxy paths had to match the actual deployment topology.',
      result: 'A two-tier container deployment that demonstrates image-based delivery, EC2 networking and reverse-proxy configuration.'
    }
  },
  {
    number: '04',
    type: 'KUBERNETES • CONTAINER ORCHESTRATION',
    title: 'Kubernetes-Based Application Deployment',
    description: 'Deployed a containerized application to a Kubernetes cluster running on an AWS EC2 lab environment with Minikube. Created Kubernetes Deployments and Services, configured application connectivity and used kubectl to validate rollout and access.',
    stack: ['AWS EC2', 'Ubuntu', 'Docker', 'Minikube', 'Kubernetes', 'kubectl', 'NGINX', 'GitHub Actions'],
    flow: ['CODE + IMAGE', 'MINIKUBE', 'DEPLOYMENTS', 'SERVICES', 'RUNNING WORKLOAD'],
    visual: 'kubernetes',
    details: {
      architecture: 'An EC2-hosted Minikube cluster provides the Kubernetes environment. Container images are deployed through Kubernetes Deployment resources and exposed through Services for stable in-cluster or external access, depending on the service type.',
      implementation: [
        'Prepared an Ubuntu EC2 environment with Docker and Minikube.',
        'Created Deployment and Service manifests for the application workloads.',
        'Configured service ports and verified application access with kubectl and curl.',
        'Practiced workload lifecycle operations, including inspecting and removing resources.',
        'Used GitHub Actions in the deployment workflow.'
      ],
      engineering: 'The lab involved troubleshooting host resource limits and Docker permissions before the cluster could start reliably. Service exposure and port mapping were then validated independently from pod readiness.',
      result: 'Practical experience with Kubernetes workload resources, service discovery, deployment verification and cluster troubleshooting in a self-managed lab.'
    }
  },
  {
    number: '05',
    type: 'OBSERVABILITY • METRICS • DASHBOARDS',
    title: 'Kubernetes Monitoring with Prometheus & Grafana',
    description: 'Installed the kube-prometheus-stack on a Kubernetes lab cluster using Helm and connected Grafana to Prometheus for metrics visualization. Explored cluster and workload dashboards and investigated resource requirements when monitoring pods could not be scheduled.',
    stack: ['Kubernetes', 'Minikube', 'Helm', 'Prometheus', 'Grafana', 'kubectl'],
    flow: ['HELM', 'PROMETHEUS', 'METRICS', 'GRAFANA', 'DASHBOARDS'],
    visual: 'monitoring',
    details: {
      architecture: 'Helm installs the kube-prometheus-stack into the Kubernetes cluster. Prometheus collects metrics from configured targets, and Grafana uses Prometheus as a data source to display cluster and workload metrics in dashboards.',
      implementation: [
        'Enabled and prepared the Kubernetes monitoring environment.',
        'Installed kube-prometheus-stack through Helm.',
        'Located the Prometheus service and configured Grafana to use the in-cluster service DNS name as its data source.',
        'Opened Grafana dashboards to inspect cluster and workload metrics.',
        'Reviewed pod status and resource requests while validating the monitoring stack.'
      ],
      engineering: 'Prometheus pod scheduling exposed the impact of CPU resource requests on a small lab cluster. Reviewing and tuning those requests helped the monitoring components schedule successfully.',
      result: 'A working observability lab demonstrating metrics collection, Grafana data-source configuration and Kubernetes resource troubleshooting.'
    }
  },
  {
    number: '06',
    type: 'DOCKER COMPOSE • DATA PERSISTENCE',
    title: 'MongoDB Persistent Storage & Backup/Restore',
    description: 'Ran a Node.js application and MongoDB with Docker Compose, separating live database storage from backup archives. Verified that database files persisted across container recreation and practised archive-based backup and restore with mongodump and mongorestore.',
    stack: ['AWS EC2', 'Ubuntu', 'Docker', 'Docker Compose', 'MongoDB 7', 'Docker Volumes', 'mongodump', 'mongorestore'],
    flow: ['NODE APP', 'DOCKER COMPOSE', 'MONGODB', '/DATA/DB', '/BACKUP'],
    visual: 'mongodb',
    details: {
      architecture: 'Docker Compose runs the application and MongoDB services. A persistent volume mounted at /data/db stores MongoDB live database files. A separate volume mounted at /backup stores exported backup archives created by database backup tools.',
      implementation: [
        'Defined the application and MongoDB services in a Docker Compose file.',
        'Mounted persistent storage at /data/db for the live MongoDB database.',
        'Mounted a separate backup location at /backup for archive files.',
        'Created database backups with mongodump and restored them with mongorestore.',
        'Recreated containers and checked that persisted database data remained available.'
      ],
      engineering: 'The important distinction was between a live database volume and a backup destination: /data/db holds MongoDB working files, while /backup holds exported backup archives. They serve different purposes and are not interchangeable.',
      result: 'A practical lab covering containerized stateful services, Docker volume mounts, persistence testing and MongoDB backup/restore operations.'
    }
  },
  {
    number: '07',
    type: 'CI/CD • JENKINS • CONTAINER DELIVERY',
    title: 'Jenkins CI/CD Pipeline for Containerized Apps',
    description: 'Built a Jenkins pipeline that checks out source code, builds and tags a Docker image, authenticates securely and publishes the image to Docker Hub. The workflow continues with container deployment on an AWS EC2 environment.',
    stack: ['Git', 'GitHub', 'Jenkins', 'Docker', 'Docker Hub', 'AWS EC2', 'Linux'],
    flow: ['GIT CHECKOUT', 'JENKINS', 'DOCKER BUILD', 'DOCKER HUB', 'EC2 DEPLOY'],
    visual: 'jenkins',
    details: {
      architecture: 'Jenkins retrieves the application source from Git, builds a Docker image and publishes it to Docker Hub. A deployment stage then runs the container on the target EC2 host.',
      implementation: [
        'Configured Jenkins and its Java runtime on the Linux environment.',
        'Created a Jenkinsfile with source checkout, Docker build, publish and deployment stages.',
        'Tagged the built image and pushed it to Docker Hub.',
        'Used Jenkins credentials binding for registry authentication instead of placing credentials directly in pipeline commands.',
        'Ran the container on the EC2 deployment host and checked the running service.'
      ],
      engineering: 'The pipeline required resolving Jenkins runtime/setup issues, Docker daemon permissions and secure credential handling for registry authentication.',
      result: 'An end-to-end CI/CD practice pipeline connecting source control, image creation, registry publishing and EC2 container deployment.'
    }
  }
];

// Earlier portfolio projects are intentionally retained alongside the newer hands-on DevOps builds.
const legacyProjects = [
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

const legacyProjectDetails = {
  'Cloud-Native CI/CD Pipeline': {
    architecture: 'The original portfolio record describes a delivery pipeline connecting GitHub, Jenkins, Docker and AWS EC2. The documented flow is represented below; the earlier record does not include a more detailed infrastructure diagram.',
    implementation: [
      'Integrated GitHub source control with a Jenkins pipeline.',
      'Automated Docker image building, versioning and deployment through Jenkins.',
      'Used the AWS EC2 environment as the application deployment target.'
    ],
    engineering: 'The original project summary does not record a specific troubleshooting incident or measured performance result, so none is asserted here.',
    result: 'A CI/CD project demonstrating source control integration, automated container image delivery and cloud deployment.'
  },
  'Infrastructure Provisioning with Terraform': {
    architecture: 'Terraform is used to define AWS infrastructure across compute, networking and identity resources. The project flow and scope below reflect the original portfolio description.',
    implementation: [
      'Used Terraform to define AWS infrastructure as code.',
      'Worked across compute, networking and identity resources.',
      'Applied an Infrastructure as Code approach for repeatable provisioning.'
    ],
    engineering: 'The original project summary does not record a specific troubleshooting incident or measured performance result, so none is asserted here.',
    result: 'A hands-on Infrastructure as Code project covering repeatable AWS resource provisioning.'
  },
  'Job Search Automation App': {
    architecture: 'The Python automation gathers job listings from LinkedIn, Google and Naukri using user preferences, then filters and sorts the results before sending a daily email summary through Gmail SMTP.',
    implementation: [
      'Collected job listings from LinkedIn, Google and Naukri.',
      'Applied user preferences to filter and sort relevant listings.',
      'Sent the daily summary through Gmail SMTP.'
    ],
    engineering: 'The original project summary does not record a specific troubleshooting incident or measured performance result, so none is asserted here.',
    result: 'An automation application that consolidates job listings and delivers a sorted daily email summary.'
  },
  'AWS Full-Stack Form Application': {
    architecture: 'The original project record describes a form-based application deployed on AWS, using EC2 for the backend, S3 for static assets and RDS for the database.',
    implementation: [
      'Deployed the backend on AWS EC2.',
      'Used Amazon S3 to host static assets.',
      'Used Amazon RDS as the application database.'
    ],
    engineering: 'The original project summary does not record a specific troubleshooting incident or measured performance result, so none is asserted here.',
    result: 'An end-to-end AWS deployment exercise combining compute, static asset storage and a managed relational database.'
  },
  'Diabetes Prediction Web App': {
    architecture: 'The project uses a Support Vector Machine classifier in an ML-powered web application. The original description records preprocessing, feature selection, model training, evaluation and AWS deployment.',
    implementation: [
      'Prepared health data through preprocessing and feature selection.',
      'Trained and evaluated a Support Vector Machine classifier.',
      'Deployed the web application in an AWS environment.'
    ],
    engineering: 'The original project summary does not record model metrics, a specific troubleshooting incident or clinical validation; none is asserted here.',
    result: 'A machine-learning web application demonstrating an SVM-based prediction workflow and cloud deployment.'
  },
  'OCR-Based Text Extraction Tool': {
    architecture: 'The Python application processes scanned documents and images through grayscale and thresholding steps before using a CNN-based OCR approach to extract text.',
    implementation: [
      'Built the text-extraction workflow in Python.',
      'Applied grayscale and thresholding preprocessing to document images.',
      'Used a CNN-based OCR approach for printed and handwritten text extraction.'
    ],
    engineering: 'The original project summary does not record a specific accuracy metric or benchmark, so none is asserted here.',
    result: 'An image-processing and OCR tool for extracting text from scanned documents and images.'
  }
};

const projects = [
  ...legacyProjects.map((project, index) => ({
    ...project,
    number: String(index + 1).padStart(2, '0'),
    details: legacyProjectDetails[project.title]
  })),
  ...deploymentProjects.map((project, index) => ({
    ...project,
    number: String(legacyProjects.length + index + 1).padStart(2, '0')
  }))
];


const experiences = [
  { year: '2025 → NOW', company: 'KODS Technologies', role: 'DevOps Intern', points: ['Jenkins + Git CI/CD workflows', 'Docker containerization on Linux', 'Terraform provisioning + shell automation', 'AWS microservices deployment', 'Kubernetes orchestration for containerized workloads'] },
  { year: 'FEB → AUG 2025', company: 'Visionet Systems', role: 'CloudOps Intern', points: ['Enterprise cloud operations exposure', 'AWS + Microsoft Azure architecture', 'Deployment models + ITIL concepts', 'Cloud engineering foundation'] },
  { year: 'OCT → NOV 2023', company: 'IBM', role: 'Cybersecurity Intern', points: ['Secure computing principles', 'Threats, malware + attack vectors', 'Enterprise security practices', 'Security-first approach to IT systems'] }
];

const skills = [
  { title: 'CLOUD', items: ['AWS', 'Microsoft Azure', 'EC2', 'S3', 'IAM', 'VPC', 'RDS', 'CloudWatch', 'Auto Scaling', 'ELB'] },
  { title: 'DEVOPS', items: ['Git', 'GitHub Actions', 'Jenkins', 'Docker', 'Kubernetes', 'Terraform', 'Ansible'] },
  { title: 'MONITORING', items: ['Prometheus', 'Grafana'] },
  { title: 'CODE', items: ['Python', 'Java', 'C', 'Bash', 'MySQL', 'Linux'] }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [projectIndex, setProjectIndex] = useState(1);
  const lastScroll = useRef(0);
  const cursor = useRef(null);
  const projectsRail = useRef(null);

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

  const updateProjectIndex = () => {
    const rail = projectsRail.current;
    if (!rail) return;
    const card = rail.querySelector('.project-card');
    if (!card) return;
    const styles = window.getComputedStyle(rail);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 18;
    const stride = card.getBoundingClientRect().width + gap;
    setProjectIndex(Math.min(projects.length, Math.max(1, Math.round(rail.scrollLeft / stride) + 1)));
  };

  const scrollProjects = (direction) => {
    const rail = projectsRail.current;
    if (!rail) return;
    const card = rail.querySelector('.project-card');
    if (!card) return;
    const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap || window.getComputedStyle(rail).gap) || 18;
    rail.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: 'smooth' });
  };

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
          <div className="projects-rail" ref={projectsRail} onScroll={updateProjectIndex}>
            {projects.map((project) => (
              <article className="project-card" key={project.number} data-reveal>
                <div className="project-topline"><span>PROJECT / {project.number}</span><span>{project.type}</span></div>
                <div className="project-content">
                  <div className="project-card-index">{project.number} <span>— SELECTED BUILD</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="chips">{project.stack.slice(0, 4).map((x) => <span className="skill-chip" key={x}>{x}</span>)}{project.stack.length > 4 && <span className="skill-chip skill-chip--more">+{project.stack.length - 4} MORE</span>}</div>
                  <button className="text-link" onClick={() => setActiveProject(project)}>Inspect system <span>↗</span></button>
                </div>
              </article>
            ))}
          </div>
          <div className="projects-controls" aria-label="Project navigation">
            <button className="projects-arrow" onClick={() => scrollProjects(-1)} aria-label="Previous projects">←</button>
            <span>EXPLORE THE BUILDS <i>—</i> {String(projectIndex).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
            <button className="projects-arrow" onClick={() => scrollProjects(1)} aria-label="Next projects">→</button>
          </div>
          <div className="work-foot"><span>Hands-on cloud, DevOps &amp; observability builds</span><span>SELECT A PROJECT TO INSPECT ↗</span></div>
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
    eks: ['TERRAFORM', 'VPC + EKS', 'HELM', 'INGRESS', 'METRICS'],
    ansible: ['GIT PUSH', 'ACTIONS', 'ANSIBLE', 'EC2 NODES', 'NGINX'],
    docker: ['GIT PUSH', 'ACTIONS', 'FRONTEND', 'NGINX', 'API'],
    kubernetes: ['IMAGE', 'MINIKUBE', 'DEPLOY', 'SERVICE', 'POD'],
    monitoring: ['HELM', 'PROMETHEUS', 'METRICS', 'GRAFANA', 'DASHBOARD'],
    mongodb: ['APP', 'COMPOSE', 'MONGODB', 'DATA VOL', 'BACKUP'],
    jenkins: ['GIT', 'JENKINS', 'DOCKER', 'REGISTRY', 'EC2']
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
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby={`project-title-${project.number}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close project details">CLOSE ×</button>
        <span className="mini-label">PROJECT {project.number} / CASE STUDY</span>
        <h2 id={`project-title-${project.number}`}>{project.title}</h2>
        <p>{project.description}</p>
        <div className="case-study-block">
          <span className="case-study-label">01 / ARCHITECTURE &amp; DELIVERY FLOW</span>
          <p>{project.details.architecture}</p>
          <div className="modal-flow">{project.flow.map((x, i) => <div key={`${project.number}-${x}`}><span>{String(i + 1).padStart(2, '0')}</span><strong>{x}</strong></div>)}</div>
        </div>
        <div className="case-study-grid">
          <div className="case-study-block">
            <span className="case-study-label">02 / IMPLEMENTATION</span>
            <ul>{project.details.implementation.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="case-study-block">
            <span className="case-study-label">03 / ENGINEERING NOTES</span>
            <p>{project.details.engineering}</p>
            <span className="case-study-label case-study-label--result">04 / OUTCOME</span>
            <p>{project.details.result}</p>
          </div>
        </div>
        <div className="case-study-block case-study-stack">
          <span className="case-study-label">TECH STACK</span>
          <div className="chips">{project.stack.map((x) => <span className="skill-chip" key={x}>{x}</span>)}</div>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
