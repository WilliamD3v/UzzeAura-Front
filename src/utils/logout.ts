import { destroyCookie } from 'nookies'

export function logout() {
  destroyCookie(undefined, 'nextauth.token', {
    path: '/',
  })

  destroyCookie(undefined, 'nextauth.userId', {
    path: '/',
  })
}
