import fetch from "node-fetch";

const cms_host = process.env.CMS_HOST || "localhost";
const cms_port = process.env.CMS_PORT || "1341";


export default async function fetchPosts() {
  const res = await fetch(`http://${cms_host}:${cms_port}/posts`, {
    method: "GET",
    // headers: {
    //   Authorization:
    //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOGNlMTNlMjQwNmMzMDA4NTRiMTQzMSIsImlhdCI6MTU4NjI5MjAxMSwiZXhwIjoxNTg4ODg0MDExfQ.Wicl1PfLf1tWG6Dq8c6SjjtKoj78yX0qOM76HyGryWA",
    //   "Content-Type": "application/json"
    // }
  });
  console.log(res);
  let posts = await res.json();
  //   console.log(posts);
  // posts.forEach(post => {
  //   post.date = post.date.replace(/-/g, "/");
  //   post.year = post.date.substring(0, 4);
  //   post.month = post.date.substring(5, 7);
  //   post.day = post.date.substring(8, 10);
  // });
  //   console.log(posts);
  return posts;
}
