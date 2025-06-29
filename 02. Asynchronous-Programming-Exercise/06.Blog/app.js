function attachEvents() {
  const loadBtn = document.getElementById("btnLoadPosts");
  const viewBtn = document.getElementById("btnViewPost");

  const postRef = document.getElementById("posts");
  const postTitle = document.getElementById("post-title");

  const postBody = document.getElementById("post-body");
  const postComments = document.getElementById("post-comments");

  const postUrl = `http://localhost:3030/jsonstore/blog/posts`;
  const commentUrl = `http://localhost:3030/jsonstore/blog/comments`;

  loadBtn.addEventListener("click", loadPosts);

  async function loadPosts() {
    try {
      postRef.replaceChildren();
      const response = await fetch(postUrl);
      const data = await response.json();

      Object.entries(data).forEach((element) => {
        const id = element[0];
        const title = element[1].title;

        const option = document.createElement("option");

        option.value = id;
        option.textContent = title;
        postRef.appendChild(option);
      });
    } catch (error) {
      return error;
    }
  }

  viewBtn.addEventListener("click", viewPosts);

  async function viewPosts() {
    try {
      const contentId = postRef.value;

      const response = await fetch(
        `http://localhost:3030/jsonstore/blog/posts/${contentId}`
      );

      const { body, title, id } = await response.json();

      postBody.textContent = body;
      postTitle.textContent = title;

      postComments.replaceChildren();

      const commentResponse = await fetch(commentUrl);

      const commentData = await commentResponse.json();

      const matchedId = Object.values(commentData).filter(
        (obj) => obj.postId === contentId
      );

      for (const { id, postId, text } of matchedId) {
        const li = document.createElement("li");
        li.setAttribute("id", `${postId}`);
        li.textContent = text;

        postComments.appendChild(li);
      }
    } catch (error) {
      return error;
    }
  }
}

attachEvents();
