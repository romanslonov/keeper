import Cookies from 'js-cookie'

export default function ({ $axios, redirect, store }) {
  $axios.onRequest((config) => {
    if (store.state.token) {
      config.headers.common.Authorization = `Bearer ${store.state.token}`
    }
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)

    if (code === 401) {
      store.commit('authenticate', { authenticated: false, user: null, token: null })
      redirect('/auth/login')
      !process.server && Cookies.remove('token')
    }
  })
}
