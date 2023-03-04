let tabsBtn = document.querySelectorAll(".category");
let preview = document.querySelector(".game-content").children;
let tabs = document.querySelectorAll(".row");
let exit = document.querySelector("#exit");

tabsBtn.forEach(function (el) {
  el.addEventListener("click", function () {
    removeClassesAll(tabsBtn, "selected a");
    el.classList.add("selected");
    removeClassesAll(document.querySelectorAll(".row"), "d-flex");
    document.querySelector(`.${el.id}`).classList.add("d-flex");
  });
});

function displayTab(tab, game) {
  let item = document.createElement("div");
  let card = document.createElement("div");
  // ==============================
  let gameThumbnail = document.createElement("img");
  gameThumbnail.src = game.thumbnail;
  gameThumbnail.classList.add("w-100");

  let imgContainer = document.createElement("div");
  addClasses(imgContainer, "w-100 rounded-top overflow-hidden");
  imgContainer.appendChild(gameThumbnail);
  // ==========================================
  let gameName = document.createElement("span");
  if (game.title.length > 25) {
    gameName.innerText = game.title.substring(0, 25) + "...";
  } else {
    gameName.innerText = game.title;
  }
  addClasses(gameName, "h6 small");
  gameName.id = "gameName";

  let freeMark = document.createElement("span");
  addClasses(freeMark, "free px-1 rounded-2");
  freeMark.innerText = "Free";

  let titleContainer = document.createElement("div");
  addClasses(
    titleContainer,
    "d-flex justify-content-between align-items-start"
  );
  titleContainer.appendChild(gameName);
  titleContainer.appendChild(freeMark);

  let gameDesc = document.createElement("p");
  if (game.short_description.length > 50) {
    gameDesc.innerText = game.short_description.substring(0, 45) + "...";
  } else {
    gameDesc.innerText = game.short_description;
  }
  addClasses(gameDesc, "gameDesc text-center");

  let cardContent = document.createElement("div");
  cardContent.classList.add("mt-3");

  cardContent.appendChild(titleContainer);
  cardContent.appendChild(gameDesc);

  let paddingDiv = document.createElement("div");
  paddingDiv.classList.add("m-3");
  paddingDiv.appendChild(imgContainer);
  paddingDiv.appendChild(cardContent);

  // addClasses(card, "card carden");
  card.classList.add("card");

  card.appendChild(paddingDiv);
  // ==========================================
  let ndRow = document.createElement("div");
  addClasses(ndRow, "nd-row d-flex justify-content-between p-3 py-2");

  let category = document.createElement("span");
  let paltform = document.createElement("span");
  addClassesAll([category, paltform], "badge badge-color");

  category.innerText = game.genre;
  if (game.platform.split(", ").length > 1) {
    paltform.innerText = game.platform.split(", ")[0];
  } else {
    paltform.innerText = game.platform;
  }

  ndRow.appendChild(category);
  ndRow.appendChild(paltform);

  card.appendChild(ndRow);

  addClasses(item, "item col-xl-3 col-lg-4 col-md-6 col-sm-12");
  item.appendChild(card);

  tab.appendChild(item);
}

(async function () {
  async function returnResponse(category) {
    let api;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "216422f1e8msh3f6ce73f8c5e2fcp164460jsn3d8e770f80f5",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      options
    );
    let games = await api.json();
    return games;
  }
  for (let i = 0; i < tabs.length; i++) {
    let games = await returnResponse(tabs[i].classList[1]);
    for (let j = 0; j < games.length; j++) {
      displayTab(tabs[i], games[j]);
    }
  }
  turnOffLoading();

  let cards = document.querySelectorAll(".card");

  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", async function () {
      let res = await returnResponse(
        cards[i].parentElement.parentElement.classList[1]
      );
      previewGame(returnGameObj(returnTitleFromGamecard(cards[i]), res));
    });
  }
})();

function previewGame(gameObj) {
  preview[0].parentElement.previousElementSibling.firstElementChild.src =
    gameObj.thumbnail;
  preview[0].firstElementChild.innerText = gameObj.title;
  preview[1].firstElementChild.innerText = gameObj.genre;
  preview[2].firstElementChild.innerText = gameObj.platform;
  preview[4].innerText = gameObj.short_description;
  preview[5].href = gameObj.game_url;
  $(".more-detailes").css("display", "block");
}

exit.addEventListener("click", function () {
  $(".more-detailes").css("display", "none");
});

function returnGameObj(gameName, gamesArr) {
  for (let i = 0; i < gamesArr.length; i++) {
    if (gamesArr[i].title == gameName) {
      return gamesArr[i];
    }
  }
}

function returnTitleFromGamecard(gameCard) {
  return gameCard.firstElementChild.lastElementChild.firstElementChild
    .firstElementChild.innerText;
}

function turnOffLoading() {
  $(window).ready(function () {
    document.getElementById("loading").style = "opacity: 0; z-index: -1;";
    document.body.style = "overflow: auto;";
  });
}
