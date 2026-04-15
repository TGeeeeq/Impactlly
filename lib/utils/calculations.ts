export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function getUserLevel(impactScore: number): number {
  if (impactScore >= 1000) return 5
  if (impactScore >= 500) return 4
  if (impactScore >= 200) return 3
  if (impactScore >= 50) return 2
  return 1
}

export function getLevelName(level: number): string {
  const names = ['Novice', 'Volunteer', 'Hero', 'Champion', 'Legend']
  return names[Math.min(level - 1, names.length - 1)]
}

export function calculateBadgeProgress(
  requirement_type: string,
  requirement_value: number,
  current_value: number
): { current: number; target: number; percentage: number } {
  const percentage = Math.min((current_value / requirement_value) * 100, 100)
  return {
    current: current_value,
    target: requirement_value,
    percentage,
  }
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    park_cleanup: '🌳',
    forest_cleanup: '🌲',
    river_cleanup: '💧',
    community_help: '🤝',
    environmental_building: '🏗️',
    wildlife_support: '🦋',
  }
  return icons[category] || '♻️'
}

export function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    easy: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    hard: 'bg-orange-100 text-orange-800 border-orange-200',
    expert: 'bg-red-100 text-red-800 border-red-200',
  }
  return colors[difficulty] || 'bg-gray-100 text-gray-800 border-gray-200'
}

export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m away`
  }
  return `${distance.toFixed(1)}km away`
}

export function formatImpactScore(score: number): string {
  if (score >= 1000000) {
    return `${(score / 1000000).toFixed(1)}M`
  }
  if (score >= 1000) {
    return `${(score / 1000).toFixed(1)}K`
  }
  return score.toString()
}
