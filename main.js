// const apiRoot = "https://pokeapi.co/api/v2";

// window.addEventListener("load", (event) => {
//   async () => {
//     const url = apiRoot + "/pokemon";
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);
//   };
// });

// Queries
let allPokemonContainer = document.querySelector(".card-container");

// Fetch data
const fetchData = () => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
    .then((response) => response.json())
    .then((data) => {
      //   console.log("fetch result", data);
      //   pokeCards(data.results);
      const fetches = data.results.map((dataItem) => {
        return fetch(dataItem.url).then((res) => res.json());
      });
      Promise.all(fetches).then((res) => {
        pokeCards(res);
        console.log(res, "res");
        let pokeType = res.forEach((resItem) =>
          resItem.types.forEach((resItemType) => {
            let eachPokeType = resItemType.type.name;
            // console.log(eachPokeType);
            return eachPokeType;
          })
        );
      });
    });
};

// Use data
const pokeCards = (dataFromFetch) => {
  const cards = dataFromFetch
    .map((dataItem) => {
      let types = dataItem.types.map((item) => item.type.name).join(", ");
      console.log(types);
      return `<div class="card">
      <div class="poke-img">
        <img src="${dataItem.sprites.other.dream_world.front_default}" alt="" />
      </div>
      <div class="poke-details">
          <h1 class="poke-name">${dataItem.name}</h1>
          <span class="poke-type">${types}</span>
      </div>
    </div>`;
    })
    .join("");
  allPokemonContainer.innerHTML = cards;
};

fetchData();
