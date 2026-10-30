import { Link } from 'react-router-dom'
export default function NotFound({ project = false }) { return <main className="not-found"><span className="eyebrow">404 · NOT FOUND</span><h1>{project ? 'Project not found' : 'Page not found'}</h1><p>We couldn’t find what you were looking for.</p><Link className="primary-button" to="/">Back to showcase</Link></main> }
