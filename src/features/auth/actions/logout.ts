'use server'

import { signOut } from '../config/auth'
import { DEFAULT_LOGOUT_REDIRECT } from '../config/routes'

export const logout = async () => {
  // TODO: server side clean up
  await signOut({ redirectTo: DEFAULT_LOGOUT_REDIRECT })
}
