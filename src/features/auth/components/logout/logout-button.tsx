'use client'

import { logout } from '../../actions/logout'

interface LogoutButtonProps {
  children?: React.ReactNode
}

// TODO: Fix logout button (must click two times two logout)
export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logout()
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}
