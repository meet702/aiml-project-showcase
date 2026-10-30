export default function CategoryFilter({ categories, selected, onSelect, counts }) {
  return <nav className="category-list" aria-label="Filter by category">{categories.map(category => <button key={category} className={`category-chip ${selected === category ? 'selected' : ''}`} onClick={() => onSelect(category)} aria-pressed={selected === category}><span>{category}</span><span className="chip-count">{counts[category]}</span></button>)}</nav>
}
