import { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div className="flex items-center justify-center mt-6">{children}</div>
}

export default AuthLayout
