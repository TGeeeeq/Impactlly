import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { user } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      task_id,
      before_photo_url,
      after_photo_url,
      video_url,
      before_latitude,
      before_longitude,
      after_latitude,
      after_longitude,
    } = body

    // Create submission with pending status
    const { data: submission, error: submitError } = await supabase
      .from('task_submissions')
      .insert([
        {
          task_id,
          user_id: user.id,
          before_photo_url,
          after_photo_url,
          video_url,
          before_latitude,
          before_longitude,
          after_latitude,
          after_longitude,
          status: 'pending',
        },
      ])
      .select()
      .single()

    if (submitError) {
      return NextResponse.json({ error: submitError.message }, { status: 500 })
    }

    // Trigger AI verification
    const verifyResponse = await fetch(
      new URL('/api/verify', request.nextUrl.origin),
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submission_id: submission.id,
          before_photo_url,
          after_photo_url,
        }),
      }
    )

    const verifyData = await verifyResponse.json()
    if (!verifyResponse.ok) {
      console.error('Verification failed:', verifyData)
    }

    return NextResponse.json(submission, { status: 201 })
  } catch (error) {
    console.error('Error creating submission:', error)
    return NextResponse.json(
      { error: 'Failed to submit task' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { user } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: submissions, error } = await supabase
      .from('task_submissions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ submissions })
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}
