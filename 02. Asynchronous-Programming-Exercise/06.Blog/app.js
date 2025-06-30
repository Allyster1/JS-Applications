function attachEvents() {
  const BASE_URL = "http://localhost:3030/jsonstore/blog/";

  const loadBtn = document.getElementById("btnLoadPosts");
  const viewBtn = document.getElementById("btnViewPost");

  const postsSelect = document.getElementById("posts");
  const postTitle = document.getElementById("post-title");

  const postBody = document.getElementById("post-body");
  const postComments = document.getElementById("post-comments");

  let postsCache = {};

  loadBtn.addEventListener("click", loadPosts);
  viewBtn.addEventListener("click", viewPost);

  async function loadPosts() {
    try {
      postsSelect.innerHTML = "";
      const response = await fetch(BASE_URL + "posts");

      if (!response.ok) {
        throw new Error("Failed to load posts");
      }

      postsCache = await response.json();

      Object.entries(postsCache).forEach(([id, post]) => {
        const option = document.createElement("option");
        option.value = id;
        option.textContent = post.title;
        postsSelect.appendChild(option);
      });
    } catch (error) {
      throw new Error("Error loading posts:", error);
    }
  }

  async function viewPost() {
    try {
      const selectedId = postsSelect.value;
      if (!selectedId) {
        return;
      }

      const commentsResponse = await fetch(BASE_URL + "comments");
      if (!commentsResponse.ok) {
        throw new Error("Failed to load comments");
      }
      const allComments = await commentsResponse.json();

      const selectedPost = postsCache[selectedId];
      if (!selectedPost) {
        throw new Error("Selected post not found");
      }

      postTitle.textContent = selectedPost.title;
      postBody.textContent = selectedPost.body;
      postComments.innerHTML = "";

      Object.values(allComments)
        .filter((comment) => comment.postId === selectedId)
        .forEach((comment) => {
          const li = document.createElement("li");
          li.textContent = comment.text;
          postComments.appendChild(li);
        });
    } catch (error) {
      throw new Error("Error viewing post:", error);
    }
  }
}

document.addEventListener("DOMContentLoaded", attachEvents);
