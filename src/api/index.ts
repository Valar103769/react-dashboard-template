import { $fetch } from 'ohmyfetch'

export const apiGetCurrentUser = async () =>
  fetch(
    `https://jsonplaceholder.typicode.com/posts/${localStorage.getItem(
      'token'
    )}`
  ).then((response) => response.json())

const apiFetch = $fetch.create({
  baseURL: import.meta.env.VITE_HOST,
})

export default apiFetch
