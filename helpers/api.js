import fetch from "node-fetch";

const cms_host = process.env.CMS_HOST || "localhost";
const cms_port = process.env.CMS_PORT || "1340";

export async function login(values) {
  console.log(values)
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values)

    };

    const response = await fetch("/api/login", requestOptions);
    console.log("👉 Returned data:", response);
    const token = await response.json()
    console.log(token)
    return token;
  } catch (e) {
    console.log(`😱 Request failed: ${e}`);
  }
}

export async function logout() {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/api/logout", requestOptions);
    console.log("👉 Returned data:", response);
    if (response.status === 200) {
      return {
        success: true
      }
    } else {
      return {
        message: "Logout failed"
      }
    }
  } catch (e) {
    console.log(`😱 Request failed: ${e}`);
    return {
      message: "Logout failed"
    }
  }
}


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

