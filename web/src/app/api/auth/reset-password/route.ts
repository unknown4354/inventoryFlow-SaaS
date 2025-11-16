import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { resetPasswordSchema } from '@/lib/validations/auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate input
    const validatedData = resetPasswordSchema.parse(body)

    // Find reset token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token: validatedData.token },
    })

    if (!resetToken) {
      return NextResponse.json(
        { error: 'Invalid or expired reset token' },
        { status: 400 }
      )
    }

    // Check if token is expired
    if (resetToken.expires < new Date()) {
      await prisma.passwordResetToken.delete({
        where: { token: validatedData.token },
      })

      return NextResponse.json(
        { error: 'Reset token has expired' },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Update user password
    await prisma.user.update({
      where: { email: resetToken.email },
      data: { password: hashedPassword },
    })

    // Delete used token
    await prisma.passwordResetToken.delete({
      where: { token: validatedData.token },
    })

    return NextResponse.json(
      { success: true, message: 'Password reset successfully' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Reset password error:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'An error occurred. Please try again' },
      { status: 500 }
    )
  }
}
