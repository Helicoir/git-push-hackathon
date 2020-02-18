import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'

export default ({ store, require, isDevepelopmentMode }) => {
  createPersistedState({
    key: 'cookieState',
    reducer: (state) => ({
      token: state.token,
      // temporarilySaved: state.temporarilySaved
    }),
    storage: {
      getitem: (key) => {
        if (process.client) {
          Cookies.getJSON(key)
        } else {
          cookie.parse(require.headers.cookie || '')[key]
        }
      },
      setItem: (key, value) => {
        console.log('run setItem')
        Cookies.set(key, value, { expires: 3, secure: false })
      },
      removeItem: (key) => {
        console.log('run removeItem')
        Cookies.remove(key)
      }
    }
  })(store)
}