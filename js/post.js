const postDetailsContainer = document.querySelector("#post-content");
const title = document.querySelector("title");
const heading = document.querySelector("h1");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://headless.superdupersiden.com//wp-json/wp/v2/posts/" + id;

// FUNCTION fetchPost
async function fetchPost() {
  try {
    const response = await fetch(url);
    const post = await response.json();

    postDetailsContainer.innerHTML = "";

    //Update details page title
    title.innerHTML = "Leeds United | " + post.title.rendered;

    // Update heading
    var random = new Array();
    random[0] = "You have chosen a great post!";
    random[1] = "You have chosen the greatest post of all!";
    random[2] = "Excellent choice of post, I salute you!";
    random[3] = "Just another awesome post, enjoy!";
    random[4] = "This is the best post - ever!";
    random[5] = "You have chosen the greatest post ever written!";
    random[6] = "You have chosen one of my favorite posts";
    var i = Math.floor(7 * Math.random());

    heading.innerHTML = random[i];

    //Create post content
    const postTitle = post.title.rendered;
    const postImg = post.jetpack_featured_media_url;
    const postContent = post.content.rendered;
    const postDate = new Date(post.date).toLocaleString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    postDetailsContainer.innerHTML += postDetails(postTitle, postImg, postContent, postDate);

    //Create modal content
    const modal = document.querySelector(".modal");
    const bigImg = document.querySelector(".big-img");
    const imageDetails = document.querySelectorAll(".postImgContainer img");

    imageDetails.forEach((preview) => {
      preview.addEventListener("click", () => {
        modal.classList.add("open");
        bigImg.classList.add("open");
      });
    });
    modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        modal.classList.remove("open");
        bigImg.classList.remove("open");
      }
    });

    // CATCH any errors
  } catch (error) {
    postDetailsContainer.innerHTML = "";
    console.error(error);
    postDetailsContainer.innerHTML = newError("Woops, something went wrong. Please call 404!", error);
  }
}

fetchPost();
