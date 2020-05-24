import fetch from "node-fetch";

const cms_host = process.env.CMS_HOST || "localhost";
const cms_port = process.env.CMS_PORT || "1340";

export async function deletePost(id) {
  try {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/api/post/" + id, requestOptions);
    console.log("👉 Returned data:", response);
  } catch (e) {
    console.log(`😱 Request failed: ${e}`);
  }
}

export async function postPost(values) {
  console.dir(values)
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    };
    
    const response = await fetch("/api/posts", requestOptions);
    console.log("👉 Returned data:", response);
  } catch (e) {
    console.log(`😱 Request failed: ${e}`);
  }
}

export async function editPost(id, values) {
  try {
    const requestOptions = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    };

    const response = await fetch("/api/post/" + id, requestOptions);
    console.log("👉 Returned data:", response);
  } catch (e) {
    console.log(`😱 Request failed: ${e}`);
  }
}

export async function fetchPosts() {
  try {
    const res = await fetch(`http://${cms_host}:${cms_port}/api/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let posts = await res.json();
    return posts;
  } catch (e) {
    console.log(`😱 Request failed: ${e}`);
  }
}
