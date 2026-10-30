const classes = ['mlops', 'automation', 'privacy', 'devops', 'generative']
export function categoryClass(category = '') {
  const key = category.toLowerCase()
  if (key.includes('mlops')) return `accent-${classes[0]}`
  if (key.includes('automation')) return `accent-${classes[1]}`
  if (key.includes('privacy') || key.includes('federated')) return `accent-${classes[2]}`
  if (key.includes('devops') || key.includes('aiops')) return `accent-${classes[3]}`
  if (key.includes('generative') || key.includes('rag')) return `accent-${classes[4]}`
  return 'accent-default'
}
