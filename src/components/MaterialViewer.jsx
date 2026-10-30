import { ArrowUpRight, Download, FileText, Link2, Play, Presentation } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from 'react'

const iconFor = type => type === 'video' ? Play : type === 'ppt' ? Presentation : type === 'link' ? Link2 : FileText
function TextMaterial({ material }) {
  const [content, setContent] = useState(material.content || '')
  const isTextFile = /\.(md|markdown|txt)$/i.test(material.src || '')
  useEffect(() => {
    if (!isTextFile || material.content) return
    let cancelled = false
    fetch(material.src).then(response => {
      if (!response.ok) throw new Error('Could not load this text file.')
      return response.text()
    }).then(text => { if (!cancelled) setContent(text) }).catch(error => { if (!cancelled) setContent(error.message) })
    return () => { cancelled = true }
  }, [isTextFile, material.content, material.src])
  return <article className="material-text"><div className="material-heading"><FileText size={18}/><h3>{material.label}</h3></div>{content ? <div className="markdown"><ReactMarkdown>{content}</ReactMarkdown></div> : material.src ? <a className="material-download" href={material.src} download>Download text file</a> : null}</article>
}
function videoEmbed(src) {
  try { const url = new URL(src); if (url.hostname.includes('youtu.be')) return `https://www.youtube-nocookie.com/embed/${url.pathname.slice(1)}`; if (url.hostname.includes('youtube.com')) return `https://www.youtube-nocookie.com/embed/${url.searchParams.get('v') || url.pathname.split('/').filter(Boolean).pop()}`; if (url.hostname.includes('vimeo.com')) return `https://player.vimeo.com/video/${url.pathname.split('/').filter(Boolean).pop()}` } catch { return '' }
  return ''
}
export default function MaterialViewer({ material }) {
  const { type, label, src, embedUrl } = material
  const extension = (src || '').split('?')[0].split('.').pop()?.toLowerCase()
  if (type === 'text' || type === 'report' && ['md', 'markdown', 'txt'].includes(extension)) return <TextMaterial material={material}/>
  const Icon = iconFor(type)
  if (type === 'video' && extension === 'mp4') return <div className="material-block"><div className="material-heading"><Icon size={18}/><h3>{label}</h3></div><video className="video-player" controls src={src}>Your browser does not support video playback.</video></div>
  const preview = type === 'video' ? videoEmbed(src) : embedUrl
  if ((type === 'pdf' || type === 'report' && extension === 'pdf' || preview) && (type !== 'video' || preview)) return <div className="material-block"><div className="material-heading"><Icon size={18}/><h3>{label}</h3><a className="download-link" href={src} download><Download size={15}/> Download</a></div><iframe className="material-frame" src={type === 'pdf' || type === 'report' ? src : preview} title={label} loading="lazy" /></div>
  return <a className="material-link" href={src} target={type === 'link' || type === 'video' ? '_blank' : undefined} rel="noopener noreferrer"><span className="material-icon"><Icon size={18}/></span><span className="material-link-copy"><strong>{label}</strong><small>{type === 'link' ? 'Open external resource' : type === 'video' ? 'Watch video' : `Download ${type.toUpperCase()}`}</small></span>{type === 'link' || type === 'video' ? <ArrowUpRight size={17}/> : <Download size={17}/>}</a>
}
