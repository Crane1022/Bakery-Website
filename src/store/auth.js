import { reactive, computed } from 'vue'
import { api } from '../api'

// ---------------------------------------------------------------------------
// Accounts now live in the "Users" tab of your Google Sheet.
// The browser only keeps two small things in localStorage so you stay logged
// in after a refresh:
//   wabisabi_token         -> a signed login token from the server
//   wabisabi_current_user  -> the user's name, email, address (never the password)
// ---------------------------------------------------------------------------

const TOKEN_KEY = 'wabisabi_token'
const USER_KEY = 'wabisabi_current_user'

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY)) || null
  } catch {
    return null
  }
}

const savedToken = localStorage.getItem(TOKEN_KEY) || ''

const state = reactive({
  token: savedToken,
  // old sessions from the localStorage version have no token, so treat them as logged out
  currentUser: savedToken ? loadUser() : null,
  error: '',
  loading: false
})

function setSession({ token, user }) {
  state.token = token
  state.currentUser = user
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

// Shared by login and register: show loading, save the session, catch errors
async function run(request) {
  state.error = ''
  state.loading = true

  try {
    setSession(await request())
    return true
  } catch (err) {
    state.error = err.message
    return false
  } finally {
    state.loading = false
  }
}

const register = (form) => run(() => api.register(form))
const login = (form) => run(() => api.login(form))

// Save edited details to the sheet, then refresh the user kept in the browser
async function updateProfile(form) {
  state.error = ''
  state.loading = true

  try {
    const user = await api.updateProfile(state.token, form)
    state.currentUser = user
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    return true
  } catch (err) {
    state.error = err.message
    if (/log in again/i.test(err.message)) logout()
    return false
  } finally {
    state.loading = false
  }
}

function logout() {
  state.token = ''
  state.currentUser = null
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

const isLoggedIn = computed(() => !!state.currentUser)

export function useAuth() {
  return {
    currentUser: computed(() => state.currentUser),
    token: computed(() => state.token),
    isLoggedIn,
    error: computed(() => state.error),
    loading: computed(() => state.loading),
    register,
    login,
    updateProfile,
    logout
  }
}