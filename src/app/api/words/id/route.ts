import { NextResponse } from 'next/server'
import { deleteWord } from '@/lib/database/queries/wordQueries'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const success = await deleteWord(params.id)
    if (!success) {
      return NextResponse.json(
        { error: 'Kelime silinirken bir hata oluştu' },
        { status: 500 }
      )
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting word:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}