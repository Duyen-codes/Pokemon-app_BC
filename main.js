// Queries
let allPokemonContainer = document.querySelector(".card-container");

const fetchData = () => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
    .then((response) => response.json())
    .then((data) => {
      const fetches = data.results.map((dataItem) => {
        return fetch(dataItem.url).then((res) => res.json());
      });
      Promise.all(fetches).then((res) => {
        renderCards(res);
        let pokeType = res.forEach((resItem) =>
          resItem.types.forEach((resItemType) => {
            let eachPokeType = resItemType.type.name;
            return eachPokeType;
          })
        );
      });
    });
};
fetchData();

const renderCards = (dataFromFetch) => {
  const cards = dataFromFetch
    .map((dataItem) => {
      let types = dataItem.types.map((item) => item.type.name).join(", ");
      return `<div class="card">
      <div class="poke-img">
        <img src="${dataItem.sprites.other.dream_world.front_default}" alt="" />
      </div>
      <div class="poke-details">
          <h4 class="poke-name">${dataItem.name}</h4>
          <span class="poke-type">Type: ${types}</span>
      </div>
    </div>`;
    })
    .join("");
  allPokemonContainer.innerHTML = cards;
};

// Search
const searchInput = document.querySelector("#search");
