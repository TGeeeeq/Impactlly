import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { user } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's badges
    const { data: userBadges, error: badgesError } = await supabase
      .from('user_badges')
      .select('badge_id')
      .eq('user_id', user.id)

    if (badgesError) {
      return NextResponse.json({ error: badgesError.message }, { status: 500 })
    }

    // Get all badges
    const { data: allBadges, error: allBadgesError } = await supabase
      .from('badges')
      .select('*')
      .order('created_at', { ascending: true })

    if (allBadgesError) {
      return NextResponse.json({ error: allBadgesError.message }, { status: 500 })
    }

    const userBadgeIds = (userBadges || []).map(b => b.badge_id)
    const badges = (allBadges || []).map(badge => ({
      ...badge,
      earned: userBadgeIds.includes(badge.id),
    }))

    return NextResponse.json({ badges })
  } catch (error) {
    console.error('Error fetching badges:', error)
    return NextResponse.json(
      { error: 'Failed to fetch badges' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { user } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { badge_id } = body

    // Check if already earned
    const { data: existing } = await supabase
      .from('user_badges')
      .select('id')
      .eq('user_id', user.id)
      .eq('badge_id', badge_id)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Badge already earned' },
        { status: 400 }
      )
    }

    const { data: userBadge, error } = await supabase
      .from('user_badges')
      .insert([{ user_id: user.id, badge_id }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(userBadge, { status: 201 })
  } catch (error) {
    console.error('Error awarding badge:', error)
    return NextResponse.json(
      { error: 'Failed to award badge' },
      { status: 500 }
    )
  }
}
