import { Search, X } from 'lucide-react'
export default function SearchBar({ value, onChange }) {
  return <div className="search-wrap"><Search size={18} aria-hidden="true" /><input type="search" value={value} onChange={e => onChange(e.target.value)} placeholder="Search projects or students…" aria-label="Search by project title or student name" />{value && <button onClick={() => onChange('')} aria-label="Clear search"><X size={16} /></button>}<kbd>⌘ K</kbd></div>
}
