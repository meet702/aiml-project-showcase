import { ArrowUpRight, Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '../config/site'

export default function Header({ dark, onToggle }) {
  return <header className="site-header">
    <Link to="/" className="brand" aria-label={`${site.title} home`}>
      <span className="brand-mark">{site.collegeMark}</span>
      <span className="brand-copy"><strong>{site.collegeName}</strong><small>INNOVATION LAB · 2025—26</small></span>
    </Link>
    <div className="header-right"><span className="header-label">STUDENT PROJECT EXHIBITION</span><a className="visit-link" href="#projects">Explore projects <ArrowUpRight size={15} /></a>
      <button className="theme-toggle" onClick={onToggle} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
    </div>
  </header>
}
