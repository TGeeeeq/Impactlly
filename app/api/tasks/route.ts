import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    
    const category = searchParams.get('category')
    const difficulty = searchParams.get('difficulty')
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const radius = searchParams.get('radius') || '50' // km

    let query = supabase
      .from('tasks')
      .select('*')
      .eq('status', 'available')
      .order('created_at', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    if (difficulty) {
      query = query.eq('difficulty', difficulty)
    }

    const { data: tasks, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Filter by distance if coordinates provided
    let filtered = tasks || []
    if (lat && lng) {
      const userLat = parseFloat(lat)
      const userLng = parseFloat(lng)
      const radiusNum = parseFloat(radius)

      filtered = filtered.filter((task) => {
        const distance = Math.sqrt(
          Math.pow(task.latitude - userLat, 2) +
          Math.pow(task.longitude - userLng, 2)
        )
        return distance <= radiusNum / 111 // rough conversion
      })
    }

    return NextResponse.json({ tasks: filtered })
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
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
    const {
      title,
      description,
      instructions,
      category,
      difficulty,
      latitude,
      longitude,
      location_name,
      location_address,
      token_reward,
      impact_points,
      estimated_trash_kg,
      estimated_duration_minutes,
      organization_id,
      sponsor_id,
    } = body

    const { data: task, error } = await supabase
      .from('tasks')
      .insert([
        {
          created_by: user.id,
          title,
          description,
          instructions,
          category,
          difficulty,
          latitude,
          longitude,
          location_name,
          location_address,
          token_reward,
          impact_points,
          estimated_trash_kg,
          estimated_duration_minutes,
          organization_id,
          sponsor_id,
          status: 'available',
        },
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    )
  }
}
