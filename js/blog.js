// --- WORDPRESS --- //

let pageNumber = 12;
const loadMore = document.querySelector("main button");
const loadMoreHover = document.querySelector("main button:hover");
const url = "https://headless.superdupersiden.com//wp-json/wp/v2/posts?per_page=" + pageNumber;
const containerBlog = document.querySelector(".blog-wrapper");

async function getPosts() {
  try {
    const response = await fetch(url);
    const post = await response.json();
    console.log("post: ", post);

    containerBlog.innerHTML = "";

    for (let i = 0; i < post.length; i++) {
      if (i === 6) {
        break;
      }
      const postDate = new Date(post[i].date).toLocaleString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      containerBlog.innerHTML += `
                            <div class="blogPost">
                            <h2>
                            <a href="post.html?id=${post[i].id}">${post[i].title.rendered}<a>
                            </h2>
                            <a href="post.html?id=${post[i].id}"><img src="${post[i].jetpack_featured_media_url}" alt="${post[i].title.rendered}"></a>
                            <p class="posted">Posted: ${postDate}</p>
                            </div>
                      `;

      // Load more posts
      function loadMorePosts() {
        for (let i = 6; i < post.length; i++)
          containerBlog.innerHTML += `
                            <div class="blogPost">
                            <h2>
                            <a href="post.html?id=${post[i].id}">${post[i].title.rendered}<a>
                            </h2>
                            <a href="post.html?id=${post[i].id}"><img src="${post[i].jetpack_featured_media_url}" class="postImgBlog" alt="${post[i].title.rendered}"></a>
                            <p class="posted">Posted: ${postDate}</p>
                            </div>
                      `;

        loadMore.disabled = true;
        loadMore.innerText = "No more posts";
        loadMore.style.background = "var(--lightBlue)";
        loadMore.style.color = "#999";
        loadMore.style.cursor = "default";
      }
    }
  } catch (error) {
    console.log(error);
  }
  loadMore.addEventListener("click", loadMorePosts);
}

getPosts();
