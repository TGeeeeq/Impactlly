import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    
    const type = searchParams.get('type') || 'global' // global, country, city
    const country = searchParams.get('country')
    const city = searchParams.get('city')
    const metric = searchParams.get('metric') || 'impact_score' // impact_score, tasks_completed, total_tokens

    let query = supabase
      .from('profiles')
      .select('*')
      .gt('tasks_completed', 0)

    if (type === 'country' && country) {
      query = query.eq('location_country', country)
    } else if (type === 'city' && city) {
      query = query.eq('location_city', city)
    }

    // Sort by metric
    const orderColumn = metric === 'impact_score' ? 'impact_score' :
                       metric === 'tasks_completed' ? 'tasks_completed' :
                       'total_tokens'

    const { data: leaderboard, error } = await query
      .order(orderColumn, { ascending: false })
      .limit(100)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const ranked = (leaderboard || []).map((profile, index) => ({
      ...profile,
      rank: index + 1,
    }))

    return NextResponse.json({ leaderboard: ranked })
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}
