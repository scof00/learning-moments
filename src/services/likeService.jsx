export const getAllLikes = () => {
    return fetch(
        `http://localhost:8088/likes?_expand=user&_expand=post`
      ).then((res) => res.json())
}