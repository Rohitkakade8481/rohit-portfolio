import React, { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import {
  ArrowDown, ArrowDownToLine, ArrowLeft, ArrowRight, Award, BadgeCheck, BookOpen,
  BriefcaseBusiness, Check, ChevronRight, Code2, Download, ExternalLink, FileBadge,
  FileText, Github, GraduationCap, House, Linkedin, Mail, Menu, Moon, Phone,
  Send, Settings2, ShieldCheck, Sparkles, Sun, UserRound, X, Zap
} from "lucide-react";
import { starterData } from "./data.js";

const DATA_KEY = "rk_portfolio_data_v2";
const THEME_KEY = "rk_portfolio_theme_v2";
const MESSAGES_KEY = "rk_portfolio_messages_v2";

// Portfolio content is bundled with the website. Do not read old browser data:
// every visitor receives the same default content from src/data.js.
function loadData() {
  return JSON.parse(JSON.stringify(starterData));
}
function safeExternal(url) {
  return /^https?:\/\//i.test(url || "");
}
function downloadText(filename, text, mime = "text/plain;charset=utf-8") {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}
function makeResumePDF(p) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const left = 18, width = 174;
  let y = 19;
  const addText = (text, size = 10, color = [70, 80, 100], style = "normal", gap = 5) => {
    doc.setFont("helvetica", style); doc.setFontSize(size); doc.setTextColor(...color);
    const lines = doc.splitTextToSize(String(text || ""), width);
    if (y + lines.length * gap > 280) { doc.addPage(); y = 18; }
    doc.text(lines, left, y); y += lines.length * gap;
  };
  doc.setFillColor(10, 18, 35); doc.rect(0, 0, 210, 46, "F");
  doc.setFont("helvetica", "bold"); doc.setFontSize(22); doc.setTextColor(255,255,255);
  doc.text(p.name || "Your Name", left, 20);
  doc.setFont("helvetica", "normal"); doc.setFontSize(11); doc.setTextColor(160,195,255);
  doc.text(p.role || "Developer", left, 28);
  doc.setFontSize(9); doc.setTextColor(224,232,245);
  doc.text([p.location, p.email, p.phone].filter(Boolean).join("  |  ").slice(0, 110), left, 37);
  y = 56;
  const heading = title => {
    if (y > 265) { doc.addPage(); y = 18; }
    doc.setFont("helvetica", "bold"); doc.setFontSize(12); doc.setTextColor(32,83,170);
    doc.text(title.toUpperCase(), left, y); y += 3;
    doc.setDrawColor(210,220,238); doc.line(left, y, left + width, y); y += 7;
  };
  heading("Professional Summary"); addText(p.about, 9.5, [65,75,90], "normal", 4.5); y += 3;
  heading("Career Objective"); addText(p.objective, 9.5, [65,75,90], "normal", 4.5); y += 3;
  heading("Education"); addText(`${p.degree} | ${p.graduation}\n${p.university}\n${p.college}`, 9.5, [65,75,90], "normal", 4.7); y += 3;
  heading("Training"); addText(p.training, 9.5, [65,75,90], "normal", 4.7); y += 3;
  heading("Technical Skills");
  (p.skills || []).forEach(s => addText(`${s.category}: ${(s.items || []).join(", ")}`, 9, [65,75,90], "normal", 4.5));
  y += 3; heading("Projects");
  (p.projects || []).forEach(pr => {
    addText(pr.name, 10, [25,35,55], "bold", 4.5);
    addText(pr.description, 9, [65,75,90], "normal", 4.5);
    addText(`Technologies: ${(pr.tech || []).join(", ")}`, 8.5, [80,90,110], "normal", 4.2);
    if (pr.github) addText(`GitHub: ${pr.github}`, 8.5, [35,85,170], "normal", 4.2);
    y += 2;
  });
  if ((p.experience || []).length) {
    y += 2; heading("Experience");
    p.experience.forEach(e => { addText(`${e.title} — ${e.organization} (${e.duration || ""})`, 9.5, [30,40,60], "bold", 4.5); addText(e.description, 9, [65,75,90], "normal", 4.5); });
  }
  if ((p.certificates || []).length) {
    y += 2; heading("Certificates");
    p.certificates.forEach(c => addText(`${c.title} — ${c.issuer || ""} ${c.year || ""}`, 9, [65,75,90], "normal", 4.5));
  }
  y += 2; heading("Links");
  if (p.github) addText(`GitHub: ${p.github}`, 9, [35,85,170], "normal", 4.5);
  if (p.linkedin) addText(`LinkedIn: ${p.linkedin}`, 9, [35,85,170], "normal", 4.5);
  doc.save(`${(p.name || "portfolio").trim().replace(/\s+/g,"-").toLowerCase()}-resume.pdf`);
}
function makeCertificateInfoPDF(c, p) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.setFillColor(9,17,33); doc.rect(0,0,210,297,"F");
  doc.setDrawColor(110,165,255); doc.setLineWidth(1.2); doc.roundedRect(13,13,184,271,5,5,"S");
  doc.setTextColor(120,175,255); doc.setFont("helvetica","bold"); doc.setFontSize(11);
  doc.text("PORTFOLIO CERTIFICATE RECORD",105,38,{align:"center"});
  doc.setTextColor(255,255,255); doc.setFontSize(24); doc.text(c.title || "Certificate",105,76,{align:"center",maxWidth:155});
  doc.setTextColor(195,207,228); doc.setFont("helvetica","normal"); doc.setFontSize(12);
  doc.text("Certificate details saved in the portfolio",105,94,{align:"center"});
  doc.setDrawColor(70,95,135); doc.line(45,107,165,107);
  doc.setTextColor(255,255,255); doc.setFontSize(14); doc.text(p.name || "Portfolio owner",105,130,{align:"center"});
  doc.setTextColor(180,195,220); doc.setFontSize(11);
  const details = [`Issuer: ${c.issuer || "Not specified"}`, `Year: ${c.year || "Not specified"}`, `Credential ID: ${c.credentialId || "Not specified"}`, `Description: ${c.description || "Not specified"}`];
  let y=151;
  details.forEach(line => { const lines=doc.splitTextToSize(line,140); doc.text(lines,105,y,{align:"center"}); y += lines.length*7+5; });
  doc.setTextColor(255,180,120); doc.setFontSize(9);
  doc.text("This is a portfolio information sheet, NOT the original certificate or proof of qualification.",105,255,{align:"center",maxWidth:150});
  doc.save(`${(c.title || "certificate-details").trim().replace(/[^a-z0-9]+/gi,"-").toLowerCase()}-details.pdf`);
}

function App() {
  const [data, setData] = useState(loadData);
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Content is intentionally not persisted to localStorage. Publish changes by editing src/data.js and redeploying.
  useEffect(() => { localStorage.setItem(THEME_KEY, theme); document.documentElement.dataset.theme = theme; }, [theme]);
  useEffect(() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }, [location.pathname]);

  const update = (key, value) => setData(prev => ({ ...prev, [key]: value }));
  const links = [
    ["/","Home",House], ["/about","About",UserRound], ["/education","Education",GraduationCap],
    ["/skills","Skills",Code2], ["/projects","Projects",BriefcaseBusiness],
    ["/experience","Experience",BookOpen], ["/certificates","Certificates",Award],
    , ["/resume","Resume",FileText], ["/contact","Contact",Mail]
  ];

  return <div className="site-shell">
    <header className="navbar">
      <Link to="/" className="brand"><span className="brand-logo">RK<span>.</span></span><span className="brand-text">{data.name || "Student Portfolio"}<small>DEVELOPER PORTFOLIO</small></span></Link>
      <button className="mobile-menu icon-btn" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? "nav-items nav-open" : "nav-items"}>
        {links.map(([to,label]) => <NavLink key={to} to={to} end={to === "/"} className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>{label}</NavLink>)}
        <button className="icon-btn theme-btn" onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} aria-label="Switch theme">{theme === "dark" ? <Sun size={17}/> : <Moon size={17}/>}</button>
      </nav>
    </header>
    <main className="main">
      <Routes>
        <Route path="/" element={<Home data={data}/>}/>
        <Route path="/about" element={<About data={data}/>}/>
        <Route path="/education" element={<Education data={data}/>}/>
        <Route path="/skills" element={<Skills data={data}/>}/>
        <Route path="/projects" element={<Projects data={data}/>}/>
        <Route path="/projects/:projectIndex" element={<ProjectDetail data={data}/>}/>
        <Route path="/experience" element={<Experience data={data}/>}/>
        <Route path="/certificates" element={<Certificates data={data}/>}/>
        <Route path="/resume" element={<Resume data={data}/>}/>
        <Route path="/contact" element={<Contact data={data}/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </main>
    <footer className="footer"><Link to="/" className="footer-brand"><span className="brand-logo mini">RK<span>.</span></span><span>Made with focus & curiosity.</span></Link><span>© {new Date().getFullYear()} {data.name || "Portfolio"}</span><div className="footer-social">{data.github && <a href={data.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a>}{data.linkedin && <a href={data.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a>}{data.email && <a href={`mailto:${data.email}`} aria-label="Email"><Mail size={17}/></a>}</div></footer>
  </div>;
}

function PageIntro({ tag, title, text }) {
  return <section className="page-intro"><span className="eyebrow">{tag}</span><h1>{title}</h1>{text && <p>{text}</p>}<div className="intro-line"/></section>;
}
function SectionTitle({ kicker, title, link, to }) {
  return <div className="section-title"><div><span className="eyebrow">{kicker}</span><h2>{title}</h2></div>{link && <Link to={to} className="link-arrow">{link}<ArrowRight size={16}/></Link>}</div>;
}
function ExternalButton({ href, children, primary = false }) {
  if (!href || !safeExternal(href)) return null;
  return <a className={primary ? "btn btn-primary" : "btn btn-ghost"} href={href} target="_blank" rel="noreferrer">{children}</a>;
}
function SocialButtons({ data }) {
  return <div className="social-buttons">{data.github && <ExternalButton href={data.github}><Github size={16}/> GitHub <ExternalLink size={13}/></ExternalButton>}{data.linkedin && <ExternalButton href={data.linkedin}><Linkedin size={16}/> LinkedIn <ExternalLink size={13}/></ExternalButton>}{data.email && <a className="btn btn-ghost" href={`mailto:${data.email}`}><Mail size={16}/> Email</a>}</div>;
}
function Home({ data }) {
  return <div className="page home">
    <section className="hero">
      <div className="hero-grid-bg"/>
      <div className="hero-copy">
        <div className="open-pill"><span className="pulse-dot"/> OPEN TO WORK <span className="pill-divider"/> FRESHER / INTERN</div>
        <span className="eyebrow">HELLO, I'M</span>
        <h1>{data.name || "Your Name"}<span className="gradient-period">.</span></h1>
        <div className="hero-role">{data.role || "Developer"}</div>
        <p className="hero-description">{data.headline}</p>
        <p className="hero-about">{data.about}</p>
        <div className="hero-actions"><Link to="/projects" className="btn btn-primary">Explore my work <ArrowRight size={17}/></Link><Link to="/contact" className="btn btn-ghost">Let's connect <Mail size={16}/></Link></div>
        <SocialButtons data={data}/>
      </div>
      <div className="hero-art">
        <div className="orbit orbit-a"/><div className="orbit orbit-b"/>
        <div className="profile-glass">
          <div className="profile-top"><span className="window-dots"><i/><i/><i/></span><span className="profile-code">developer.json</span><span className="live-tag"><span/> LIVE</span></div>
          <div className="profile-avatar">{data.profileImage ? <img src={data.profileImage} alt={`${data.name} profile`} /> : (data.name || "RK").split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase()}</div>
          <span className="profile-caption">BUILD · LEARN · REPEAT</span>
          <h3>{data.name || "Your Name"}</h3><p>{data.role}</p>
          <div className="code-lines"><span><b>const</b> passion = <em>"coding"</em>;</span><span><b>const</b> mindset = <em>"always learning"</em>;</span><span><b>return</b> <i>new opportunities</i>;</span></div>
          <div className="profile-bottom"><span><Code2 size={14}/> {data.skills?.length || 0} skill groups</span><span><BriefcaseBusiness size={14}/> {data.projects?.length || 0} projects</span></div>
        </div>
        <div className="floating-card float-top"><span className="float-icon"><Zap size={17}/></span><span><b>Problem solver</b><small>Curious by nature</small></span></div>
        <div className="floating-card float-bottom"><span className="float-icon"><ShieldCheck size={17}/></span><span><b>Full stack learner</b><small>Backend + frontend</small></span></div>
      </div>
      <a href="#highlights" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></a>
    </section>

    <section className="section-block" id="highlights"><SectionTitle kicker="THE QUICK VIEW" title="A little about me" link="Read my story" to="/about"/>
      <div className="highlight-grid"><article className="highlight-card about-highlight"><div className="highlight-icon"><UserRound/></div><span className="eyebrow">WHO I AM</span><p>{data.about}</p><Link to="/about" className="inline-link">More about me <ArrowRight size={15}/></Link></article>
        <article className="highlight-card stat-highlight"><span className="eyebrow">EDUCATION</span><div className="stat-number">{data.graduation || "—"}</div><h3>{data.degree}</h3><p>{data.university}</p><Link to="/education" className="inline-link">Education details <ArrowRight size={15}/></Link></article>
        <article className="highlight-card stat-highlight accent-card"><span className="eyebrow">WHAT I BUILD WITH</span><div className="stat-number">{data.skills?.length || 0}<small> groups</small></div><h3>Technical toolkit</h3><p>Backend, frontend, databases and development tools.</p><Link to="/skills" className="inline-link">Explore skills <ArrowRight size={15}/></Link></article>
      </div>
    </section>

    <section className="section-block"><SectionTitle kicker="MY TOOLKIT" title="Technologies I work with" link="All skills" to="/skills"/><div className="tech-strip">{(data.skills || []).slice(0,4).map((s,i)=><div className="tech-tile" key={s.category}><span className="tech-index">0{i+1}</span><div><h3>{s.category}</h3><p>{(s.items || []).slice(0,5).join(" · ")}</p></div><ChevronRight size={17}/></div>)}</div></section>

    <section className="section-block"><SectionTitle kicker="SELECTED WORK" title="Projects with purpose" link="View all projects" to="/projects"/><div className="project-grid">{(data.projects || []).slice(0,2).map((p,i)=><ProjectCard project={p} index={i} key={p.name+i}/>)}</div></section>
    <section className="cta-band"><div className="cta-spark"><Sparkles size={23}/></div><div><span className="eyebrow">LET'S CONNECT</span><h2>Have an opportunity in mind?</h2><p>I'm ready to learn, contribute, and grow with a team.</p></div><Link to="/contact" className="btn btn-primary">Contact me <ArrowRight size={17}/></Link></section>
  </div>;
}
function About({ data }) {
  return <div className="page"><PageIntro tag="ABOUT ME" title="A learner. A builder. A problem solver." text="A little more about my background, the way I approach development, and where I want to go next."/>
    <div className="two-col"><article className="surface-card"><span className="eyebrow">MY STORY</span><h2>Curiosity drives my code.</h2><p className="body-text">{data.about}</p><h3>Career objective</h3><p className="body-text">{data.objective}</p><div className="interest-box"><BookOpen size={18}/><span><b>Outside the code</b><small>{data.interests}</small></span></div></article>
      <article className="surface-card"><div className="about-profile-head">{data.profileImage ? <img src={data.profileImage} alt={`${data.name} profile`}/> : <div className="resume-avatar">{(data.name || "RK").split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase()}</div>}<div><span className="eyebrow">AT A GLANCE</span><h2>Quick profile</h2></div></div><Fact label="Name" value={data.name}/><Fact label="Role" value={data.role}/><Fact label="Location" value={data.location}/><Fact label="Graduation" value={data.graduation}/><Fact label="Training" value={data.training}/><Fact label="Current focus" value="Entry-level roles & internships"/></article></div>
    <section className="section-block"><SectionTitle kicker="HOW I APPROACH WORK" title="The values I bring"/><div className="value-grid"><Value icon={<BookOpen/>} title="Continuous learning" text="Strengthen fundamentals, practice consistently, and stay curious about new tools."/><Value icon={<Code2/>} title="Build with purpose" text="Turn concepts into practical applications and learn from each iteration."/><Value icon={<BriefcaseBusiness/>} title="Team mindset" text="Listen carefully, communicate clearly, and use feedback to improve."/></div></section>
  </div>;
}
function Education({ data }) {
  return <div className="page"><PageIntro tag="EDUCATION" title="My learning journey" text="Academic background and professional training that support my development path."/>
    <div className="timeline"><TimelineItem icon={<GraduationCap/>} label="DEGREE" date={data.graduation}><h2>{data.degree}</h2><h3>{data.university}</h3><p>{data.college}</p><div className="tag-row"><span className="tag">Computer Science</span><span className="tag">Graduated {data.graduation}</span></div></TimelineItem>
      <TimelineItem icon={<Code2/>} label="PROFESSIONAL TRAINING" date="2025"><h2>Java Full Stack Development</h2><h3>{data.training}</h3><p>Training and practice in Java development, web technologies, database concepts, and building applications. Keep this description aligned with the course content you completed.</p><div className="tag-row"><span className="tag">Java</span><span className="tag">Spring Boot</span><span className="tag">Web Development</span></div></TimelineItem></div>
    
  </div>;
}
function Skills({ data }) {
  const iconFor = i => [<Code2/>,<Sparkles/>,<ShieldCheck/>,<Settings2/>][i%4];
  return <div className="page"><PageIntro tag="TECHNICAL TOOLKIT" title="Skills & technologies" text="A snapshot of the technologies I have studied and practiced. Edit the list to reflect your current confidence and experience."/>
    <div className="skills-grid">{(data.skills || []).map((s,i)=><article className="skill-panel" key={s.category+i}><div className="skill-head"><span className="skill-icon">{iconFor(i)}</span><span className="skill-count">GROUP 0{i+1}</span></div><h2>{s.category}</h2><p className="skill-subtitle">Technologies & concepts</p><div className="tag-row">{(s.items || []).map(t=><span className="tag" key={t}>{t}</span>)}</div></article>)}</div>
    
  </div>;
}
function ProjectCard({ project, index = 0 }) {
  return <article className="project-card project-card-clickable">
    <Link to={`/projects/${index}`} className="project-card-main" aria-label={`View details for ${project.name}`}>
      {project.image ? <div className="project-photo"><img src={project.image} alt={`${project.name} project preview`} loading="lazy"/><span className="project-photo-label">PROJECT PREVIEW</span></div> : <div className={`project-art art-${index%3}`}><span className="project-art-number">0{index+1}</span><div className="project-art-center"><Code2 size={36}/></div><span className="project-art-label">{project.type || "DEVELOPMENT PROJECT"}</span><div className="art-grid"/></div>}
      <div className="project-body"><div className="project-title-row"><div><span className="eyebrow">PROJECT / {String(index+1).padStart(2,"0")}</span><h3>{project.name}</h3></div><span className="project-arrow"><ArrowUpRightIcon/></span></div><p className="project-description">{project.shortDescription || project.description}</p><div className="tag-row">{(project.tech || []).slice(0,7).map(t=><span className="tag" key={t}>{t}</span>)}</div><span className="inline-link project-details-link">Explore full project <ArrowRight size={15}/></span></div>
    </Link>
    <div className="project-footer">{project.github && safeExternal(project.github) ? <a className="inline-link" href={project.github} target="_blank" rel="noreferrer"><Github size={15}/> Source code <ExternalLink size={13}/></a> : <span className="muted">GitHub link not added</span>}{project.demo && safeExternal(project.demo) && <a className="inline-link" href={project.demo} target="_blank" rel="noreferrer">Live demo <ExternalLink size={13}/></a>}</div>
  </article>;
}
function ArrowUpRightIcon() { return <ExternalLink size={17}/>; }
function Projects({ data }) {
  return <div className="page"><PageIntro tag="SELECTED WORK" title="Projects I've worked on" text="Open any project to explore its goal, features, technical design, implementation notes, challenges, and links."/>
    {(data.projects || []).length ? <div className="project-grid">{data.projects.map((p,i)=><ProjectCard project={p} index={i} key={p.name+i}/>)}</div> : <Empty title="No projects added yet" text="Use Edit Portfolio to add your project details."/>}
    <div className="notice"><Code2 size={18}/><p>Use Edit Portfolio to upload a screenshot for each project and add accurate implementation details.</p></div>
  </div>;
}
function ProjectDetail({ data }) {
  const { projectIndex } = useParams();
  const index = Number(projectIndex);
  const project = Number.isInteger(index) ? (data.projects || [])[index] : null;
  if (!project) return <NotFound/>;
  const bullets = value => Array.isArray(value) ? value : (typeof value === "string" ? value.split("\n").map(x=>x.trim()).filter(Boolean) : []);
  return <div className="page project-detail-page">
    <Link to="/projects" className="back-link"><ArrowLeft size={16}/> All projects</Link>
    <section className="project-detail-hero">
      {project.image ? <img className="project-detail-image" src={project.image} alt={`${project.name} screenshot`}/> : <div className={`project-art detail-art art-${index%3}`}><div className="project-art-center"><Code2 size={54}/></div><span className="project-art-label">{project.type || "DEVELOPMENT PROJECT"}</span><div className="art-grid"/></div>}
      <div className="project-detail-heading"><span className="eyebrow">PROJECT / {String(index+1).padStart(2,"0")} · {project.type || "SOFTWARE DEVELOPMENT"}</span><h1>{project.name}</h1><p>{project.shortDescription || project.description}</p><div className="project-detail-actions">{project.github && safeExternal(project.github) && <ExternalButton href={project.github} primary><Github size={16}/> View source code</ExternalButton>}{project.demo && safeExternal(project.demo) && <ExternalButton href={project.demo}><ExternalLink size={16}/> Live demo</ExternalButton>}</div>
        <div className="project-facts"><span><small>STATUS</small><b>{project.status || "Practice / Portfolio project"}</b></span><span><small>ROLE</small><b>{project.role || "Developer"}</b></span><span><small>DURATION</small><b>{project.duration || "Not specified"}</b></span></div>
      </div>
    </section>
    <div className="project-detail-layout"><div className="project-detail-content">
      <article className="surface-card"><span className="eyebrow">01 / OVERVIEW</span><h2>What this project does</h2><p className="body-text">{project.overview || project.description || "Add a detailed overview from Edit Portfolio."}</p></article>
      <article className="surface-card"><span className="eyebrow">02 / PROBLEM & SOLUTION</span><h2>Why I built it</h2><p className="body-text">{project.problem || "Add the problem this application is intended to solve."}</p><h3>Solution approach</h3><p className="body-text">{project.solution || "Describe how the application addresses the problem and how users move through the main workflow."}</p></article>
      <article className="surface-card"><span className="eyebrow">03 / FEATURES</span><h2>Key functionality</h2>{bullets(project.features).length ? <ul className="detail-list">{bullets(project.features).map((f,i)=><li key={i}><Check size={16}/><span>{f}</span></li>)}</ul> : <p className="body-text">Add each implemented feature as a separate line in Edit Portfolio.</p>}</article>
      <article className="surface-card"><span className="eyebrow">04 / TECHNICAL IMPLEMENTATION</span><h2>Architecture & workflow</h2><p className="body-text">{project.implementation || "Explain the frontend-to-API flow, backend layers, database interaction, validation, and response handling here."}</p>{project.apiDetails && <><h3>API / data flow</h3><p className="body-text">{project.apiDetails}</p></>}</article>
      <article className="surface-card"><span className="eyebrow">05 / CHALLENGES & LEARNINGS</span><h2>What I learned</h2><h3>Challenges</h3><p className="body-text">{project.challenges || "Add a real technical challenge you faced and how you approached it."}</p><h3>Learning outcomes</h3><p className="body-text">{project.learnings || "Describe the concepts, debugging techniques, and development practices you learned."}</p></article>
      {project.futureImprovements && <article className="surface-card"><span className="eyebrow">06 / NEXT STEPS</span><h2>Future improvements</h2><p className="body-text">{project.futureImprovements}</p></article>}
    </div><aside className="project-detail-sidebar"><article className="surface-card"><span className="eyebrow">TECH STACK</span><h2>Built with</h2><div className="tag-row">{(project.tech || []).map(t=><span className="tag" key={t}>{t}</span>)}</div></article><article className="surface-card"><span className="eyebrow">MY CONTRIBUTION</span><h2>Responsibilities</h2><p className="body-text">{project.contribution || "Describe the parts you personally designed, coded, tested, and documented."}</p></article><article className="surface-card"><span className="eyebrow">EXPLORE MORE</span><h2>Want to connect?</h2><p className="body-text">I'm happy to discuss the project, technical decisions, and what I learned.</p><Link to="/contact" className="btn btn-primary full-btn">Contact me <ArrowRight size={16}/></Link></article></aside></div>
    <section className="section-block"><SectionTitle kicker="MORE WORK" title="Explore other projects" link="All projects" to="/projects"/><div className="project-grid">{(data.projects || []).map((p,i)=>({p,i})).filter(x=>x.i!==index).slice(0,2).map(({p,i})=><ProjectCard project={p} index={i} key={p.name+i}/>)}</div></section>
  </div>;
}
function Experience({ data }) {
  return <div className="page"><PageIntro tag="EXPERIENCE" title="Training & practical experience"/>
    {(data.experience || []).length ? <div className="timeline">{data.experience.map((e,i)=><TimelineItem key={e.title+i} icon={<BriefcaseBusiness/>} label={e.type || "EXPERIENCE"} date={e.duration}><h2>{e.title}</h2><h3>{e.organization}</h3><p>{e.description}</p></TimelineItem>)}</div> : <div className="empty-card"><div className="empty-icon"><BriefcaseBusiness size={24}/></div><h2>Starting my professional journey</h2><p>I'm looking for an opportunity to apply my skills, learn from an experienced team, and contribute to real projects. My projects and training are available on this portfolio.</p><Link to="/projects" className="btn btn-ghost">See my projects <ArrowRight size={16}/></Link></div>}
    <div className="section-block"><SectionTitle kicker="PROFESSIONAL TRAINING" title="Current learning foundation"/><article className="surface-card training-card"><span className="training-icon"><GraduationCap size={23}/></span><div><span className="eyebrow">COURSE</span><h2>{data.training}</h2><p className="body-text">Learned Core Java, Object-Oriented Programming, and exception handling.Practiced Spring Boot and REST API development.Worked with MySQL databases and CRUD operations.Developed frontend interfaces using React.js, HTML, CSS, and JavaScript.Built practice projects to understand full-stack application development.</p></div></article></div>
  </div>;
}
function Certificates({ data, update }) {
  const certificates = data.certificates || [];
  return <div className="page"><PageIntro tag="CERTIFICATES & ACHIEVEMENTS" title="Learning worth sharing" text="Certificate entries are bundled with the website so every visitor sees the same content."/>
    {certificates.some(c => (c.issuer || "").toLowerCase().includes("dummy data")) && <div className="notice"><ShieldCheck size={18}/></div>}
    {certificates.length ? <div className="certificate-grid">{certificates.map((c,i)=><article className="certificate-card" key={c.title+i}><div className="certificate-top"><span className="certificate-emblem"><Award size={25}/></span><span className="certificate-number">CERTIFICATE / {String(i+1).padStart(2,"0")}</span></div><h2>{c.title}</h2><p>{c.description || "Certificate record added to the portfolio."}</p><div className="certificate-meta"><span><b>Issuer</b>{c.issuer || "Not specified"}</span><span><b>Year</b>{c.year || "—"}</span></div><div className="certificate-actions"><button className="btn btn-primary" onClick={() => makeCertificateInfoPDF(c,data)}><Download size={15}/> Download details PDF</button>{c.fileData && <a className="btn btn-ghost" href={c.fileData} download={c.fileName || "certificate"}><ArrowDownToLine size={15}/> Download original</a>}{c.link && safeExternal(c.link) && <a className="inline-link" href={c.link} target="_blank" rel="noreferrer">Verify online <ExternalLink size={13}/></a>}</div></article>)}</div> : <div className="empty-card"><div className="empty-icon"><Award size={24}/></div><h2>Your certificates will appear here</h2><p>No certificate has been added yet. Use <b>Edit Portfolio</b> to add real certificate details. Don't list a course or certificate you haven't earned.</p><Link to="/manage" className="btn btn-primary"><Settings2 size={16}/> Add certificate details</Link></div>}
    {(data.achievements || []).length > 0 && <section className="section-block"><SectionTitle kicker="MILESTONES" title="Achievements"/><div className="value-grid">{data.achievements.map((a,i)=><Value key={a.title+i} icon={<BadgeCheck/>} title={a.title} text={a.description}/>)}</div></section>}
    
  </div>;
}

function Resume({ data }) {
  const hasOriginal = Boolean(data.resumeFileData);
  return <div className="page"><PageIntro tag="RESUME / CV" title="Resume preview" text="This is a preloaded resume draft built from the portfolio details."/>
    {hasOriginal ? <div className="original-resume-layout"><article className="surface-card original-resume-card"><div className="original-resume-top"><span className="side-icon"><FileText size={24}/></span><div><span className="eyebrow">ORIGINAL FILE UPLOADED</span><h2>{data.resumeFileName || "My resume.pdf"}</h2><p>This is your uploaded document, not an automatically generated replacement.</p></div></div><div className="pdf-preview"><iframe title="Original resume PDF preview" src={data.resumeFileData}/></div><div className="resume-original-actions"><a className="btn btn-primary" href={data.resumeFileData} target="_blank" rel="noreferrer"><ExternalLink size={16}/> Open original resume</a><a className="btn btn-ghost" href={data.resumeFileData} download={data.resumeFileName || "resume.pdf"}><Download size={16}/> Download original PDF</a><Link className="btn btn-ghost" to="/manage"><Settings2 size={16}/> Replace file</Link></div></article><aside className="resume-side"><div className="side-card"><span className="eyebrow">RESUME CHECKLIST</span><h2>Before sharing</h2><p>Check your contact details, education, skills, project links, and spelling in the uploaded file. Replace it in Edit Portfolio whenever you update your resume.</p><Link className="btn btn-primary full-btn" to="/manage">Upload updated resume</Link></div></aside></div> : <div className="resume-layout"><article className="resume-sheet"><div className="resume-header">{data.profileImage ? <img className="resume-photo" src={data.profileImage} alt="Profile"/> : <div className="resume-avatar">{(data.name || "RK").split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase()}</div>}<div><h2>{data.name}</h2><p>{data.role}</p><span>{[data.location,data.email,data.phone].filter(Boolean).join(" · ")}</span></div></div><div className="resume-rule"/><ResumeSection title="Professional Summary"><p>{data.about}</p></ResumeSection><ResumeSection title="Career Objective"><p>{data.objective}</p></ResumeSection><ResumeSection title="Education"><h3>{data.degree} <small>({data.graduation})</small></h3><p>{data.university}<br/>{data.college}</p></ResumeSection><ResumeSection title="Training"><p>{data.training}</p></ResumeSection><ResumeSection title="Technical Skills">{(data.skills || []).map(s=><p key={s.category}><b>{s.category}:</b> {(s.items || []).join(", ")}</p>)}</ResumeSection><ResumeSection title="Projects">{(data.projects || []).map((p,i)=><div className="resume-project" key={p.name}><h3>{p.name}</h3><p>{p.description}</p><small>Technologies: {(p.tech || []).join(", ")}</small><p>{p.github}</p></div>)}</ResumeSection><ResumeSection title="Experience & Certificates">{(data.experience || []).map(e=><p key={e.title}><b>{e.title}</b> — {e.organization}: {e.description}</p>)}{(data.certificates || []).map(c=><p key={c.title}><b>{c.title}</b> — {c.issuer} ({c.year})</p>)}</ResumeSection><ResumeSection title="Links"><p>{data.github}<br/>{data.linkedin}</p></ResumeSection></article><aside className="resume-side"><div className="side-card"><span className="side-icon"><FileText size={24}/></span><span className="eyebrow">RESUME OPTIONS</span><h2>Download resume draft</h2><p>This draft is generated from the portfolio details and is available to all visitors</p><button className="btn btn-primary full-btn" onClick={() => makeResumePDF(data)}><Download size={17}/> Download resume PDF</button></div></aside></div>}
  </div>;
}
function ResumeSection({ title, children }) { return <section className="resume-section"><h4>{title}</h4>{children}</section>; }
function Contact({ data }) {
  const [form,setForm] = useState({name:"",email:"",subject:"Internship / Job Opportunity",message:""});
  const [feedback,setFeedback] = useState("");
  const change = e => setForm({...form,[e.target.name]:e.target.value});
  const submit = e => {
    e.preventDefault();
    try {
      const messages = JSON.parse(localStorage.getItem(MESSAGES_KEY) || "[]");
      messages.push({...form, createdAt:new Date().toISOString()});
      localStorage.setItem(MESSAGES_KEY,JSON.stringify(messages));
      setFeedback("Message saved in this browser. It has not been emailed or sent to the portfolio owner.");
      setForm({name:"",email:"",subject:"Internship / Job Opportunity",message:""});
    } catch { setFeedback("Could not save the message in this browser."); }
  };
  const openEmail = () => {
    if (!data.email) { setFeedback("Add your email address in Edit Portfolio first."); return; }
    const subject=encodeURIComponent(form.subject || "Hello");
    const body=encodeURIComponent(`Name: ${form.name}\nReply email: ${form.email}\n\n${form.message}`);
    window.location.href=`mailto:${data.email}?subject=${subject}&body=${body}`;
  };
  return <div className="page"><PageIntro tag="CONTACT" title="Let's start a conversation" text="For job opportunities, internships, project collaboration, or just to connect — I'd be happy to hear from you."/>
    <div className="contact-layout"><div className="contact-left"><article className="surface-card"><span className="eyebrow">GET IN TOUCH</span><h2>Choose your preferred way to connect.</h2><p className="body-text">You can use the contact details and professional profiles below. Add your public contact information from Edit Portfolio.</p>{data.email && <ContactLink icon={<Mail/>} label="EMAIL" value={data.email} href={`mailto:${data.email}`}/ >}{data.phone && <ContactLink icon={<Phone/>} label="PHONE" value={data.phone} href={`tel:${data.phone}`}/ >}{data.linkedin && <ContactLink icon={<Linkedin/>} label="LINKEDIN" value="Connect professionally" href={data.linkedin}/ >}{data.github && <ContactLink icon={<Github/>} label="GITHUB" value="Explore my projects" href={data.github}/ >}</article><div className="contact-note"><span className="status-dot"/><p><b>Currently open to opportunities</b><small>Entry-level roles and internships in software / web development.</small></p></div></div>
     </div>
  </div>;
}
function ContactLink({icon,label,value,href}) { return <a className="contact-link" href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noreferrer" : undefined}><span className="contact-link-icon">{icon}</span><span><small>{label}</small><b>{value}</b></span><ArrowRight size={16}/></a>; }
function Fact({label,value}) { return <div className="fact"><span>{label}</span><b>{value || "Not added"}</b></div>; }
function Value({icon,title,text}) { return <article className="value-card"><span className="value-icon">{icon}</span><h3>{title}</h3><p>{text}</p></article>; }
function TimelineItem({icon,label,date,children}) { return <article className="timeline-item"><div className="timeline-icon">{icon}</div><div className="timeline-card"><div className="timeline-top"><span className="eyebrow">{label}</span><span className="timeline-date">{date}</span></div>{children}</div></article>; }
function Empty({title,text}) { return <div className="empty-card"><div className="empty-icon"><FileText size={24}/></div><h2>{title}</h2><p>{text}</p><Link to="/manage" className="btn btn-primary">Edit portfolio <ArrowRight size={16}/></Link></div>; }

function handleImageUpload(event, onReady, setNotice) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;
  if (!file.type.startsWith("image/")) { setNotice("Please select an image file."); return; }
  const reader = new FileReader();
  reader.onload = () => {
    const image = new Image();
    image.onload = () => {
      const maxSide = 1000;
      const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const ctx = canvas.getContext("2d"); ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      const compressed = canvas.toDataURL("image/jpeg", 0.78);
      if (compressed.length > 700000) { setNotice("This image is still too large. Please choose a smaller image."); return; }
      onReady(compressed); setNotice("Image added for this session preview only. Add the file under public/images and update src/data.js to publish it to all visitors.");
    };
    image.onerror = () => setNotice("Could not read this image. Try another JPG or PNG.");
    image.src = reader.result;
  };
  reader.onerror = () => setNotice("Could not read this image.");
  reader.readAsDataURL(file);
}
function handleResumeUpload(event, set, setNotice) {
  const file = event.target.files?.[0]; event.target.value = ""; if (!file) return;
  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) { setNotice("Please upload your resume as a PDF file."); return; }
  if (file.size > 1.5 * 1024 * 1024) { setNotice("PDF is larger than 1.5 MB. Please compress it and upload again."); return; }
  const reader = new FileReader();
  reader.onload = () => { set("resumeFileData", reader.result); set("resumeFileName", file.name); setNotice("Resume ready for this session preview only. Add the PDF to public and update src/data.js/code to publish it for all visitors."); };
  reader.onerror = () => setNotice("Could not read this PDF file.");
  reader.readAsDataURL(file);
}

function Manage({ data, update, reset }) {
  const [draft,setDraft] = useState(() => JSON.parse(JSON.stringify(data)));
  const [notice,setNotice] = useState("");
  const [tab,setTab] = useState("profile");
  useEffect(() => setDraft(JSON.parse(JSON.stringify(data))),[data]);
  const set = (k,v) => { setDraft(d=>({...d,[k]:v})); setNotice(""); };
  const setJson = (key,value) => {
    try { set(key,JSON.parse(value)); }
    catch { set(key,value); setNotice(`${key} is currently invalid JSON. Correct it before saving.`); }
  };
  const save = e => {
    e.preventDefault();
    const arrayKeys=["skills","projects","certificates","experience","achievements"];
    for (const k of arrayKeys) if (!Array.isArray(draft[k])) { setNotice(`${k} must be a valid JSON array. Please correct it before saving.`); return; }
    Object.entries(draft).forEach(([k,v])=>update(k,v));
    setNotice("Preview updated for this session only. To publish it for all visitors, update src/data.js and redeploy the website.");
  };
  const exportData = () => downloadText("rohit-portfolio-backup.json",JSON.stringify(draft,null,2),"application/json");
  const importData = e => {
    const file=e.target.files?.[0]; if(!file)return;
    const reader=new FileReader();
    reader.onload=()=>{try{setDraft({...starterData,...JSON.parse(reader.result)});setNotice("Backup loaded. Click Save Changes to apply it.");}catch{setNotice("That file is not valid portfolio JSON.");}};
    reader.readAsText(file); e.target.value="";
  };
  const field = (label,key,opts={}) => <Field key={key} label={label} value={draft[key] ?? ""} onChange={v=>set(key,v)} {...opts}/>;
  return <div className="page"><PageIntro tag="PORTFOLIO SETTINGS" title="Make this portfolio yours" text="Edit your information, projects, skills, and certificates. This version uses preloaded project data so every visitor sees the same content. To publish edits, update src/data.js and redeploy the site."/>
    <div className="storage-alert"><ShieldCheck size={21}/><div><b>Shared static portfolio content</b><p>This portfolio does not load old browser-saved data. Visitors see the content bundled in the website. Edits in this form are only a temporary preview; update src/data.js and redeploy to publish changes to everyone.</p></div></div>
    <div className="manage-tabs">{[["profile","Profile"],["lists","Skills & Projects"],["credentials","Certificates & Experience"]].map(([v,l])=><button type="button" key={v} className={tab===v?"manage-tab selected":"manage-tab"} onClick={()=>setTab(v)}>{l}</button>)}</div>
    <form onSubmit={save} className="manage-form">
      {tab==="profile" && <div className="form-panel"><FormTitle number="01" title="Personal & education details" text="These details appear across the website and in your generated resume."/><div className="form-grid">
        {field("Full name","name")}{field("Professional title","role")}{field("Headline","headline",{wide:true})}{field("Location","location")}{field("Graduation year","graduation")}{field("Email address","email",{type:"email"})}{field("Phone number","phone")}{field("GitHub URL","github")}{field("LinkedIn URL","linkedin")}{field("Degree","degree")}{field("University","university")}{field("College","college")}{field("Training/course","training")}{field("About me","about",{area:true,wide:true,rows:5})}{field("Career objective","objective",{area:true,wide:true,rows:4})}{field("Interests","interests",{wide:true})}
      </div><div className="upload-panels"><div className="upload-panel"><h3>Profile photo</h3><p>Upload a JPG, PNG, or WebP image for a temporary preview. To publish it to everyone, add it under public/images and update src/data.js.</p>{draft.profileImage && <img className="upload-preview profile-upload-preview" src={draft.profileImage} alt="Profile upload preview"/>}<label className="btn btn-ghost upload-btn">{draft.profileImage ? "Replace profile photo" : "Upload profile photo"}<input type="file" accept="image/*" hidden onChange={e=>handleImageUpload(e, image=>set("profileImage",image),setNotice)}/></label>{draft.profileImage && <button className="btn btn-danger" type="button" onClick={()=>set("profileImage","")}>Remove photo</button>}</div>
      <div className="upload-panel"><h3>Original resume (PDF)</h3><p>Upload a PDF for a temporary preview. To publish it to all visitors, place it in the public folder and link it in the source code.</p>{draft.resumeFileName && <p className="uploaded-file"><FileText size={16}/>{draft.resumeFileName}</p>}<label className="btn btn-primary upload-btn">{draft.resumeFileData ? "Replace original resume PDF" : "Upload original resume PDF"}<input type="file" accept="application/pdf,.pdf" hidden onChange={e=>handleResumeUpload(e,set,setNotice)}/></label>{draft.resumeFileData && <button className="btn btn-danger" type="button" onClick={()=>{set("resumeFileData","");set("resumeFileName","");}}>Remove uploaded resume</button>}</div></div></div>}
      {tab==="lists" && <div className="form-panel"><FormTitle number="02" title="Skills & projects" text="Use valid JSON arrays. You can export a backup before editing."/><div className="form-grid">
        <Field label="Skills JSON" value={JSON.stringify(draft.skills,null,2)} onChange={v=>setJson("skills",v)} area wide rows={12}/>
        <Field label="Projects JSON" value={JSON.stringify(draft.projects,null,2)} onChange={v=>setJson("projects",v)} area wide rows={18}/>
        <div className="project-upload-list wide"><h3>Project screenshots / images</h3><p>Uploads preview only in this session. To share them with all visitors, add image files under public/images and update src/data.js.</p>{(draft.projects || []).map((project,i)=><div className="project-upload-row" key={`${project.name}-${i}`}><div className="project-upload-name"><b>{i+1}. {project.name || `Project ${i+1}`}</b>{project.image && <img src={project.image} alt={`${project.name} preview`}/>}</div><label className="btn btn-ghost upload-btn">{project.image ? "Replace image" : "Upload image"}<input type="file" accept="image/*" hidden onChange={e=>handleImageUpload(e,image=>{const next=[...(draft.projects||[])];next[i]={...next[i],image};set("projects",next);},setNotice)}/></label>{project.image && <button type="button" className="btn btn-danger" onClick={()=>{const next=[...(draft.projects||[])];next[i]={...next[i],image:""};set("projects",next);}}>Remove image</button>}</div>)}</div>
      </div><p className="field-help">Project format: name, type, description, tech (array), github, demo, featured.</p></div>}
      {tab==="credentials" && <div className="form-panel"><FormTitle number="03" title="Certificates, experience & achievements" text="Add only real credentials. Certificates can link to an original file or verification page."/><div className="form-grid">
        <Field label="Certificates JSON" value={JSON.stringify(draft.certificates,null,2)} onChange={v=>setJson("certificates",v)} area wide rows={10}/>
        <Field label="Experience JSON" value={JSON.stringify(draft.experience,null,2)} onChange={v=>setJson("experience",v)} area wide rows={10}/>
        <Field label="Achievements JSON" value={JSON.stringify(draft.achievements,null,2)} onChange={v=>setJson("achievements",v)} area wide rows={8}/>
      </div><p className="field-help">Certificate example: <code>{`[{"title":"Course name","issuer":"Provider","year":"2025","description":"Completed course","link":"https://example.com"}]`}</code>. Replace example details with real information. For an original downloadable file, use the upload option after adding certificate fields.</p></div>}
      <div className="manage-actions"><button className="btn btn-primary" type="submit"><Check size={16}/> Save changes</button><button className="btn btn-ghost" type="button" onClick={exportData}><Download size={16}/> Export backup</button><label className="btn btn-ghost upload-btn">Import backup<input type="file" accept=".json,application/json" onChange={importData} hidden/></label><button className="btn btn-danger" type="button" onClick={()=>{if(window.confirm("Reset all portfolio details to the starter content?")){reset();setDraft(starterData);setNotice("Starter content restored.");}}}>Reset starter content</button></div>
      {notice && <p className={notice.includes("invalid")||notice.includes("must be")?"form-error":"form-feedback"}><Check size={15}/>{notice}</p>}
    </form>
  </div>;
}
function Field({label,value,onChange,type="text",area=false,wide=false,rows=4}) { return <label className={`field ${wide?"wide":""}`}>{label}{area?<textarea rows={rows} value={typeof value==="string"?value:JSON.stringify(value,null,2)} onChange={e=>onChange(e.target.value)}/>:<input type={type} value={value ?? ""} onChange={e=>onChange(e.target.value)}/>}</label>; }
function FormTitle({number,title,text}) { return <div className="form-title"><span>{number}</span><div><h2>{title}</h2><p>{text}</p></div></div>; }
function NotFound() { return <div className="page not-found"><span className="eyebrow">404 / LOST IN SPACE</span><h1>This page isn't here.</h1><p>Let's get you back to the portfolio.</p><Link to="/" className="btn btn-primary"><ArrowLeft size={16}/> Back home</Link></div>; }

export default App;
