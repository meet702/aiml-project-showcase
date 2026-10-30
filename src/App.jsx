import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation, useNavigationType } from 'react-router-dom'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import NotFound from './pages/NotFound'
import { site } from './config/site'

function ScrollManager() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const frame = useRef(0)

  useLayoutEffect(() => {
    const root = document.documentElement
    const oldBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    window.history.scrollRestoration = 'manual'

    const saved = sessionStorage.getItem(`showcase-scroll:${location.key}`)
    const requested = location.state?.restoreScrollY
    const y = typeof requested === 'number'
      ? requested
      : navigationType === 'POP' && saved !== null
        ? Number(saved)
        : 0
    window.scrollTo(0, y)
    requestAnimationFrame(() => { root.style.scrollBehavior = oldBehavior })

    const savePosition = () => {
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        sessionStorage.setItem(`showcase-scroll:${location.key}`, String(window.scrollY))
      })
    }
    window.addEventListener('scroll', savePosition, { passive: true })
    return () => {
      cancelAnimationFrame(frame.current)
      sessionStorage.setItem(`showcase-scroll:${location.key}`, String(window.scrollY))
      window.removeEventListener('scroll', savePosition)
      root.style.scrollBehavior = oldBehavior
    }
  }, [location.key, location.state, navigationType])

  return null
}

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('showcase-theme') === 'dark')
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; document.title = site.title; localStorage.setItem('showcase-theme', dark ? 'dark' : 'light') }, [dark])
  useEffect(() => { const handle = event => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); document.querySelector('input[type="search"]')?.focus() } }; window.addEventListener('keydown', handle); return () => window.removeEventListener('keydown', handle) }, [])
  const props = { dark, onToggle: () => setDark(value => !value) }
  return <><ScrollManager/><Routes><Route path="/" element={<Home {...props}/>}/><Route path="/project/:id" element={<ProjectDetail {...props}/>}/><Route path="*" element={<><header className="site-header"><a className="brand" href="/"><span className="brand-mark">AI</span><span className="brand-copy"><strong>AIML Project Showcase</strong><small>STUDENT PROJECT EXHIBITION</small></span></a></header><NotFound/></>}/></Routes></>
}
