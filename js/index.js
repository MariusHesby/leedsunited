// --- SPORTDATAAPI --- //

const resultsContainer = document.querySelector("#updatedResults");
const homeTeam = document.querySelector(".homeTeam");

const corsFix = "https://noroffcors.herokuapp.com/";
const sportsDataUrl = "https://app.sportdataapi.com/api/v1/soccer/matches";

// Turned the search-strings into variables for my own convenience
const apikey = "?apikey=c27529a0-aa73-11eb-b941-37fde2d8acd3";
const seasonId = "&season_id=352";
const leagueId = "&league_id=237";
const dateFrom = "&date_from=2021-04-28";
const dateTo = "&date_to=2021-08-01";
const teamId = "&team_id=2546";
const leedsUrl = corsFix + sportsDataUrl + apikey + seasonId + leagueId + dateFrom + dateTo + teamId;

async function getScore() {
  try {
    const json = await (await fetch(leedsUrl)).json();
    resultsContainer.innerHTML = "";
    console.log(json.data);
    let lastMatch;
    for (let i = 0; i < json.data.length; i++) {
      const awayTeamIdZ = json.data[i].away_team.team_id;
      const homeTeamIdZ = json.data[i].home_team.team_id;
      const status = json.data[i].status;

      if (awayTeamIdZ === 2546 || homeTeamIdZ === 2546)
        if (status === "finished") {
          lastMatch = json.data[i];
        }
    }
    result(lastMatch);
  } catch (error) {
    console.log(error);
  }
}

function result(data) {
  const awayTeamId = data.away_team.team_id;
  const homeTeamId = data.home_team.team_id;
  const awayTeamName = data.away_team.name;
  const homeTeamName = data.home_team.name;
  const fullTimeScore = data.stats.ft_score;
  const startDate = new Date(data.match_start).toLocaleString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  resultsContainer.innerHTML += `
                             <div class="latestResult">
                                <div class="homeTeam"><img src="" alt="${homeTeamName}" id="home" /></div>
                                <div class="fulltime">
                                  <p class="date">${startDate}</p>
                                  <p class="result">${fullTimeScore}</p>
                                </div>
                                <div class="awayTeam"><img src="" alt="${awayTeamName}" id="away" /></div>
                              </div>
                                `;

  document.querySelector("#home").src = "img/teams/" + homeTeamId + ".png";
  document.querySelector("#away").src = "img/teams/" + awayTeamId + ".png";
}

getScore();

// --- WORDPRESS --- //

const url = "https://headless.superdupersiden.com//wp-json/wp/v2/posts?per_page=4";

const back = document.querySelector(".arrow.left");
const forth = document.querySelector(".arrow.right");
const slider = document.querySelector(".slider");
// const slideOne = document.querySelector(".one");
// const slideTwo = document.querySelector(".two");
// const slideThree = document.querySelector(".three");
// const slideFour = document.querySelector(".four");
const indicatorContainer = document.querySelector(".control ul");
const indicators = document.querySelectorAll(".control li");
let position = 0;

async function getPosts() {
  try {
    const response = await fetch(url);
    const post = await response.json();

    for (let i = 0; i < post.length; i++) {
      const postDate = new Date(post[i].date).toLocaleString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      slider.innerHTML += `
                            <section>
                            <div class="flex">
                            <h2>
                            <a href="post.html?id=${post[i].id}">${post[i].title.rendered}<a>
                            </h2>
                            <a href="post.html?id=${post[i].id}"><img src="${post[i].jetpack_featured_media_url}" class="postImg" alt="${post[i].title.rendered}"></a>
                            <p class="posted">Posted: ${postDate}</p>
                            </div>
                            </section>
                           `;
      // slideTwo.innerHTML = `
      //                       <div class="flex">
      //                       <h2>
      //                       <a href="post.html?id=${post[1].id}">${post[1].title.rendered}<a>
      //                       </h2>
      //                       <a href="post.html?id=${post[1].id}"><img src="${post[1].jetpack_featured_media_url}" class="postImg" alt="${post[1].title.rendered}"></a>
      //                       <p class="posted">Posted: ${postDate}</p>
      //                       </div>
      //                      `;
      // slideThree.innerHTML = `
      //                       <div class="flex">
      //                       <h2>
      //                       <a href="post.html?id=${post[2].id}">${post[2].title.rendered}<a>
      //                       </h2>
      //                       <a href="post.html?id=${post[2].id}"><img src="${post[2].jetpack_featured_media_url}" class="postImg" alt="${post[2].title.rendered}"></a>
      //                       <p class="posted">Posted: ${postDate}</p>
      //                       </div>
      //                      `;
      // slideFour.innerHTML = `
      //                       <div class="flex">
      //                       <h2>
      //                       <a href="post.html?id=${post[3].id}">${post[3].title.rendered}<a>
      //                       </h2>
      //                       <a href="post.html?id=${post[3].id}"><img src="${post[3].jetpack_featured_media_url}" class="postImg" alt="${post[3].title.rendered}"></a>
      //                       <p class="posted">Posted: ${postDate}</p>
      //                       </div>
      //                      `;

      indicators.forEach((indicator, move) => {
        indicator.addEventListener("click", () => {
          document.querySelector(".control .selected").classList.remove("selected");
          indicator.classList.add("selected");
          slider.style.transform = "translateX(" + move * -25 + "%)";
          position = move;
        });
      });
    }

    back.addEventListener("click", function () {
      if (position > 0) {
        position = position - 1;
      } else {
        position = 0;
      }
      document.querySelector(".control .selected").classList.remove("selected");
      indicatorContainer.children[position].classList.add("selected");
      slider.style.transform = "translateX(" + position * -25 + "%)";
      if (slider.style.transform === "translateX(0%)") {
        back.style.display = "none";
      } else {
        forth.style.display = "block";
      }
    });

    forth.addEventListener("click", function () {
      if (position < 3) {
        position = position + 1;
      } else {
        position = 3;
      }
      document.querySelector(".control .selected").classList.remove("selected");
      indicatorContainer.children[position].classList.add("selected");
      slider.style.transform = "translateX(" + position * -25 + "%)";
      if (slider.style.transform === "translateX(-75%)") {
        forth.style.display = "none";
      } else {
        back.style.display = "block";
      }
    });
  } catch (error) {
    console.log(error);
  }
}
getPosts();
