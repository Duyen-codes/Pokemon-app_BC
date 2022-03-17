// // Queries
// let allPokemonContainer = document.querySelector(".card-container");

// const fetchData = () => {
//   fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
//     .then((response) => response.json())
//     .then((data) => {
//       const fetches = data.results.map((dataItem) => {
//         return fetch(dataItem.url).then((res) => res.json());
//       });
//       Promise.all(fetches).then((res) => {
//         renderCards(res);
//         let pokeType = res.forEach((resItem) =>
//           resItem.types.forEach((resItemType) => {
//             let eachPokeType = resItemType.type.name;
//             return eachPokeType;
//           })
//         );
//       });
//     });
// };
// fetchData();

// const renderCards = (dataFromFetch) => {
//   const cards = dataFromFetch
//     .map((dataItem) => {
//       let types = dataItem.types.map((item) => item.type.name).join(", ");
//       return `<div class="card">
//       <div class="poke-img">
//         <img src="${dataItem.sprites.other.dream_world.front_default}" alt="" />
//       </div>
//       <div class="poke-details">
//           <h4 class="poke-name">${dataItem.name}</h4>
//           <span class="poke-type">Type: ${types}</span>
//       </div>
//     </div>`;
//     })
//     .join("");
//   allPokemonContainer.innerHTML = cards;
// };

// Implement search

// Queries
let allPokemonContainer = document.querySelector(".card-container");
const searchInput = document.querySelector("#search");

const fetchData = () => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
    .then((response) => response.json())
    .then((data) => {
      searchInput.addEventListener("keyup", () => {
        allPokemonContainer.innerHTML = "";
        data.results.forEach((item) => {
          if (item.name.toLowerCase().includes(searchInput.value.trim())) {
            renderPokemon(item.name);
          }
        });
      });
      data.results.forEach((item) => renderPokemon(item.name));
    });
};

fetchData();

const renderPokemon = async (name) => {
  let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  let types = data.types.map((item) => item.type.name).join(", ");

  allPokemonContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="card">
//       <div class="poke-img">
//         <img src="${data.sprites.other.dream_world.front_default}" alt="${name}" />
//       </div>
//       <div class="poke-details">
//           <h4 class="poke-name">${name}</h4>
//           <span class="poke-type">Type: ${types}</span>
//       </div>
//     </div>
    `
  );
};
