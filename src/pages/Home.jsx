import { ArrowDownRight, ArrowUpRight, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import projects from '../data/projects.json'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import ProjectCard from '../components/ProjectCard'
import { site } from '../config/site'

export default function Home({ dark, onToggle }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState('All projects')
  const categories = useMemo(() => [...new Set(projects.map(project => project.category))].sort(), [])
  const counts = useMemo(() => ({ 'All projects': projects.length, ...Object.fromEntries(categories.map(category => [category, projects.filter(p => p.category === category).length])) }), [categories])
  const visible = projects.filter(project => (selected === 'All projects' || project.category === selected) && `${project.title} ${project.team.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase()))
  const studentCount = new Set(projects.flatMap(project => project.team)).size
  const filterCategories = ['All projects', ...categories]

  return <><Header dark={dark} onToggle={onToggle}/><main>
    <section className="hero shell"><div className="hero-copy"><div className="eyebrow"><span className="live-dot"/> THE NEXT GENERATION OF INTELLIGENCE</div><h1>Ideas that make<br/><span>intelligence</span> tangible.</h1><p className="hero-subtitle">{site.subtitle} Meet the people and projects pushing the boundaries of AI &amp; machine learning.</p><a className="hero-cta" href="#projects">Explore the showcase <ArrowDownRight size={17}/></a></div>
      <div className="hero-visual" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="orbit-center"><Sparkles size={29}/></div><span className="orbit-tag tag-top">AI<span> / ML</span></span><span className="orbit-tag tag-side">HUMAN<br/>INGENUITY</span><span className="orbit-tag tag-bottom">IDEAS → IMPACT</span><div className="visual-index">01 <span>—</span> 06</div></div>
    </section>
    <section className="stats-band"><div className="shell stats-inner"><div className="stat"><strong>{String(projects.length).padStart(2,'0')}</strong><span>Projects on display</span></div><div className="stat-divider"/><div className="stat"><strong>{String(studentCount).padStart(2,'0')}</strong><span>Student innovators</span></div><div className="stats-note">Curiosity, code &amp; a little courage.<ArrowUpRight size={17}/></div></div></section>
    <section className="showcase shell" id="projects"><div className="section-heading"><div><span className="eyebrow">THE SHOWCASE <span className="eyebrow-rule"/></span><h2>Projects in focus<span className="heading-dot">.</span></h2><p>A glimpse into what our students are building.</p></div><div className="result-count"><span>{String(visible.length).padStart(2,'0')}</span> / {String(projects.length).padStart(2,'0')} projects</div></div>
      <div className="filter-row"><CategoryFilter categories={filterCategories} selected={selected} onSelect={setSelected} counts={counts}/><SearchBar value={query} onChange={setQuery}/></div>
      {visible.length ? <div className="project-grid">{visible.map((project, index) => <ProjectCard key={project.id} project={project} index={index}/>)}</div> : <div className="empty-state"><span className="empty-icon"><Sparkles size={21}/></span><h3>No projects found</h3><p>Try a different search or category to find what you’re looking for.</p><button onClick={() => {setQuery(''); setSelected('All projects')}}>Clear filters</button></div>}
    </section>
  </main><footer className="site-footer"><div className="shell footer-inner"><span>© 2025–26 · {site.collegeName}</span><span>MADE WITH CURIOSITY <span className="footer-star">✳</span></span></div></footer></>
}
