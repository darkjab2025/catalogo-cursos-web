export default function categoryIcon(name = '') {
  if (name.includes('web')) return 'code-slash'
  if (name.includes('móvil')) return 'phone'
  if (name.includes('datos')) return 'database'
  if (name.includes('Infra')) return 'hdd-network'
  return 'braces'
}
