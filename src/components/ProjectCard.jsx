import { ArrowUpRight, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categoryClass } from '../utils/categories'

export default function ProjectCard({ project, index }) {
  return <Link to={`/project/${project.id}`} state={{ returnScrollY: window.scrollY }} className={`project-card ${categoryClass(project.category)}`} aria-label={`Open ${project.title} project details`} style={{ animationDelay: `${index * 65}ms` }}>
    <div className="card-top"><span className="category-badge">{project.category}</span><ArrowUpRight className="card-arrow" size={19} /></div>
    <h3>{project.title}</h3>
    <p className="card-summary">{project.summary}</p>
    <div className="card-bottom"><span className="member-icon"><Users size={14}/></span><span className="member-names">{project.team.join(' · ')}</span></div>
  </Link>
}
