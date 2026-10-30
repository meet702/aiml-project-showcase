import { ArrowLeft, ArrowUpRight, Cpu, Sparkles } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import projects from '../data/projects.json'
import Header from '../components/Header'
import TeamList from '../components/TeamList'
import MaterialViewer from '../components/MaterialViewer'
import NotFound from './NotFound'
import { categoryClass } from '../utils/categories'

export default function ProjectDetail({ dark, onToggle }) {
  const { id } = useParams()
  const location = useLocation()
  const project = projects.find(item => item.id === id)
  if (!project) return <><Header dark={dark} onToggle={onToggle}/><NotFound project/></>
  const hasDetails = project.description?.trim() || project.materials?.length || project.techStack?.length
  return <><Header dark={dark} onToggle={onToggle}/><main className="detail-page shell">
    <Link to="/" state={{ restoreScrollY: location.state?.returnScrollY }} className="back-link"><ArrowLeft size={16}/> Back to showcase</Link>
    <section className={`detail-hero ${categoryClass(project.category)}`}><div className="detail-hero-copy"><span className="category-badge">{project.category}</span><h1>{project.title}</h1><TeamList team={project.team}/></div><div className="detail-index"><span>PROJECT</span><strong>{String(projects.indexOf(project)+1).padStart(2,'0')}</strong><span>OF {String(projects.length).padStart(2,'0')}</span></div></section>
    <div className="detail-content">{project.description?.trim() && <section className="detail-section"><div className="detail-section-head"><span className="section-number">01</span><div><span className="eyebrow">THE IDEA</span><h2>Overview</h2></div></div><div className="detail-prose"><ReactMarkdown>{project.description}</ReactMarkdown></div></section>}
      {!!project.techStack?.length && <section className="detail-section"><div className="detail-section-head"><span className="section-number">02</span><div><span className="eyebrow">BUILT WITH</span><h2>Technology</h2></div></div><div className="tech-list">{project.techStack.map(tech => <span key={tech}><Cpu size={14}/>{tech}</span>)}</div></section>}
      {!!project.materials?.length && <section className="detail-section"><div className="detail-section-head"><span className="section-number">{project.description ? '03' : '02'}</span><div><span className="eyebrow">EXPLORE FURTHER</span><h2>Project materials</h2></div></div><div className="materials-list">{project.materials.map((material, index) => <MaterialViewer key={`${material.label}-${index}`} material={material}/>)}</div></section>}
      {!hasDetails && <section className="coming-soon"><span className="coming-icon"><Sparkles size={20}/></span><div><span className="eyebrow">MORE TO COME</span><h2>Details coming soon</h2><p>Our team is putting the finishing touches on this project. Check back soon for the full story and materials.</p></div></section>}
      <Link className="next-link" to="/">Discover more projects <ArrowUpRight size={16}/></Link>
    </div><footer className="detail-footer">STUDENT PROJECT EXHIBITION · {new Date().getFullYear()}</footer>
  </main></>
}
