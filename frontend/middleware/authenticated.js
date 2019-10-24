const parseCookies = cookies => Object.fromEntries(cookies.split('; ').map(x => x.split('=')))

export default async function ({ req, store, redirect, route }) {
  const cookies = parseCookies(req ? (req.headers.cookie || '') : (document.cookie || ''))

  const secure = route.meta.reduce((requiredAuth, meta) => meta.requiredAuth || requiredAuth, false)

  if (cookies && cookies.token) {
    store.commit('setToken', cookies.token)
    await store.dispatch('fetchUser')
  } else {
    store.commit('authenticate', { authenticated: false, user: null, token: null })
  }

  if (route.name === 'index' && store.state.authenticated) {
    redirect('/h')
  }

  if (secure && !store.state.authenticated) {
    redirect('/auth/login')
  }
}
