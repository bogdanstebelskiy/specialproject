'use client'

import { signOut } from 'next-auth/react'
import { DEFAULT_LOGOUT_REDIRECT } from '@/features/auth/config/routes'
import React, { ReactNode } from 'react'

export const LogoutButton = ({ children }: { children?: ReactNode }) => {
  const onClick = async () => {
    await signOut({ redirectTo: DEFAULT_LOGOUT_REDIRECT })
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}
