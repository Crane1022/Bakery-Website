// src/api.js
// The only file that talks to the Google Sheet (through your Apps Script web app).
// Put the web app URL in a .env file in your project root:
//   VITE_API_URL=https://script.google.com/macros/s/XXXXXXXX/exec

const API_URL = import.meta.env.VITE_API_URL

// Every response looks like { ok: true, data } or { ok: false, error }
async function unwrap(res) {
  const json = await res.json()
  if (!json.ok) throw new Error(json.error)
  return json.data
}

async function post(action, payload = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    // text/plain avoids a browser CORS preflight, which Apps Script cannot answer
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ ...payload, action })
  })
  return unwrap(res)
}

export const api = {
  getProducts: async () => unwrap(await fetch(API_URL)), // -> { products, categories }
  register: (user) => post('register', user),            // -> { token, user }
  login: ({ email, password }) => post('login', { email, password }), // -> { token, user }
  me: (token) => post('me', { token }),                  // -> user
  updateProfile: (token, profile) => post('updateProfile', { token, ...profile }), // -> user
  createOrder: (token, order) => post('createOrder', { token, ...order }), // -> order
  myOrders: (token) => post('myOrders', { token }),      // -> [orders]
  getReviews: async () => unwrap(await fetch(API_URL + '?action=reviews')), // -> [reviews]
  addReview: (token, review) => post('addReview', { token, ...review }) // -> { review, status }
}