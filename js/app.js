let apiKey =
  "live_mgVOvWdDLixRyGYBD2AeybduQH2W9NrHU03OmwW94NJK5GCrWsgDF2WH8AFTtRVX";
let catBreed = document.querySelector(".catBreed");
let catInfoDiv = document.querySelector(".catInfoDiv");

fetch("https://api.thecatapi.com/v1/breeds", {
  method: "GET",
  headers: {
    "x-api-key": apiKey,
  },
})
  .then((response) => response.json())
  .then((data) => {
    data.forEach((breed) => {
      let option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      catBreed.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Ошибка", error);
  });

catBreed.addEventListener("change", async (event) => {
  let selectedBreedId = event.target.value;
  let apiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreedId}`;
  try {
    let response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("ошибка");
    }
    let catInfo = await response.json();

    let catImageUrl = catInfo[0].url;
    console.log(catInfo[0]);
    catImage(catImageUrl);

    let breedInfoUrl = `https://api.thecatapi.com/v1/breeds/${selectedBreedId}`;
    let breedResponse = await fetch(breedInfoUrl, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      },
    });
    if (!breedResponse.ok) {
      throw new Error("Ощибка");
    }
    let breedInfo = await breedResponse.json();
    catInfoDisplay(breedInfo);
  } catch (error) {
    console.log("error", error);
  }
});

function catImage(catImageUrl) {
  catInfoDiv.innerHTML = "";
  let catImage = document.createElement("img");
  catImage.onload = function () {
    catInfoDiv.appendChild(catImage);
  };
  catImage.onerror = function () {
    console.error("ошибка");
  };
  catImage.src = catImageUrl;
  // catImage.src = catImageUrl;
  // catInfoDiv.appendChild(catImage);
}

function catInfoDisplay(breedInfo) {
  catInfoDiv.innerHTML = "";
  let breedName = document.createElement("h2");
  breedName.textContent = `Порода: ${breedInfo.name}`;

  let description = document.createElement("p");
  description.textContent = `Описание: ${breedInfo.description}`;

  let temperament = document.createElement("p");
  temperament.textContent = `Характер: ${breedInfo.temperament}`;

  catInfoDiv.appendChild(breedName);
  catInfoDiv.appendChild(description);
  catInfoDiv.appendChild(temperament);
}
