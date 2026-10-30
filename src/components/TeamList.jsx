import { Users } from 'lucide-react'
export default function TeamList({ team, compact = false }) {
  if (!team?.length) return null
  return <div className={`team-list ${compact ? 'compact' : ''}`}><Users size={compact ? 14 : 17} aria-hidden="true"/><span>{team.join(' · ')}</span></div>
}
