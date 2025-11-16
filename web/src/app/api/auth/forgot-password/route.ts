import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { forgotPasswordSchema } from '@/lib/validations/auth'
import { sendPasswordResetEmail } from '@/lib/email'
import { randomBytes } from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate input
    const validatedData = forgotPasswordSchema.parse(body)

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json(
        { success: true, message: 'If an account exists, a password reset link has been sent' },
        { status: 200 }
      )
    }

    // Generate reset token
    const token = randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Delete any existing reset tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email: user.email },
    })

    // Create new reset token
    await prisma.passwordResetToken.create({
      data: {
        email: user.email,
        token,
        expires,
      },
    })

    // Send password reset email
    await sendPasswordResetEmail(user.email, token)

    return NextResponse.json(
      { success: true, message: 'If an account exists, a password reset link has been sent' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Forgot password error:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'An error occurred. Please try again' },
      { status: 500 }
    )
  }
}
