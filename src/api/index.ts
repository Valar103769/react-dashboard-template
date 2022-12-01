export const apiGetCurrentUser = async () =>
  fetch(
    `https://jsonplaceholder.typicode.com/posts/${localStorage.getItem(
      'token'
    )}`
  ).then((response) => response.json())
