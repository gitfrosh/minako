import fetch from "node-fetch";

export async function requester(url, method, values, token) {
  console.dir(values);
  const requestOptions = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  if (values) {
    requestOptions.body = JSON.stringify(values);
  }
  try {
    const response = await fetch(`${url}?secret_token=${token}`, requestOptions);
    console.log("👉 Returned data:", response);
    console.log(response.status);
    if (response.status > 399) {
      return {
        success: false,
        message: response.statusText,
      };
    } else {
      const json = await response.json();
      console.log(json)
      return json
    }
  } catch (e) {
    console.log(`😱 Request failed: ${e}`);
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}

export async function login(values) {
  return await requester("/api/login", "POST", values);
}

export async function logout() {
  return await requester("/api/logout", "GET");
}

export async function deletePost(id, token) {
  const url = "/api/post/" + id;
  return await requester(url, "DELETE", null, token);
}

export async function postPost(values, token) {
  const url = `/api/posts`;
  return await requester(url, "POST", values, token);
}

export async function editPost(id, values, token) {
  const url = "/api/post/" + id;
  return await requester(url, "PUT", values, token);
}

export async function fetchPosts(token) {
  const url = `/api/posts`;
  return await requester(url, "GET", null, token);
}

export async function fetchPost(id, token) {
  const url = `/api/post/${id}`;
  return await requester(url, "GET", null, token);
}
