import fetch from "node-fetch";



export async function requester(url, method, values) {
  console.dir(values)
  const requestOptions = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  if (values) {
    requestOptions.body = JSON.stringify(values)
  }
  try {

  const response = await fetch(url, requestOptions);
  console.log("👉 Returned data:", response);
  console.log(response.status)
  if (response.status > 399) {
    return ({
      success: false,
      message: response.statusText
    })

  } else {
    return await response.json();
  }

  } catch(e) {
    console.log(`😱 Request failed: ${e}`);

  }
}


export async function login(values) {
  return await requester("/api/login", "POST", values)
}    

export async function logout() {
  return await requester("/api/logout", "GET")

}

export async function deletePost(id) {
  const url = "/api/post/" + id;
  return await requester(url, "DELETE")
}

export async function postPost(values) {
  return await requester("/api/posts", "POST", values)
}

export async function editPost(id, values) {
  const url = "/api/post/" + id;
  return await requester(url, "PUT", values)
}

export async function fetchPosts(token) {
  try {
    const res = await fetch(`/api/posts?secret_token=${token}`, {
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

export async function fetchPost(id, token) {
  try {
    const res = await fetch(`/api/post/${id}?secret_token=${token}`, {
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

