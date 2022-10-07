const planetasArray = [];

//Nodos
const cardsContainer = document.querySelector(".cards-container");
const templateCard = document.querySelector("#template-cards");
const card = templateCard.content.querySelector("article");

const cardsRender = (array) => {
  //Elimino todos los nodos y renderizo las cards
  cardsContainer.innerHTML = "";
  for (let item of array) {
    let cardClonada = card.cloneNode(true);
    item.moons ? (moons = "Has one or more moons") : (moons = "Has no moons");
    cardClonada.querySelector("img").src = `./assets/${item.image}`;
    cardClonada.querySelector(".card-title").innerText = item.name;
    cardClonada.querySelector(".card-description").innerText = ` Distance: ${item.distance} million km.\nType: ${item.type}\nRadius: ${item.radius} million km.\n${moons}`;
    cardClonada.querySelector(".card-price").innerText = `$${item.price} M.`;
    cardClonada.querySelector("button").addEventListener("click", () => agregarProducto(item.id));
    cardsContainer.appendChild(cardClonada);
  }
};

//Filtros
const addFilter = (i) => {
  for (const item of buttonsFilters) item.classList.remove("text-primary");
  buttonsFilters[i].classList.add("text-primary");
  let filtered;
  const order = (a, b) => {
    if (a.radius < b.radius) return -1;
    if (a.radius < b.radius) return 1;
    return 0;
  };
  switch (i) {
    case 0:
      filtered = planetasArray;
      break;
    case 1:
      filtered = planetasArray.filter((item) => item.type === "Terrestrial");
      break;
    case 2:
      filtered = planetasArray.filter((item) => item.type === "Gas giants");
      break;
    case 3:
      filtered = planetasArray.filter((item) => item.moons === true);
      break;
    case 4:
      filtered = planetasArray.filter((item) => item.radius <= 6371);
      filtered.sort(order);
      break;
    case 5:
      filtered = planetasArray.filter((item) => item.radius > 6371);
      filtered.sort(order);
      break;
  }

  cardsRender(filtered);
};

const buttonsFilters = document.querySelectorAll(".addFilter");
for (let i = 0; i < buttonsFilters.length; i++) buttonsFilters[i].addEventListener("click", () => addFilter(i));

//Inicio
fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    planetasArray.push(...data);
    cardsRender(planetasArray);
  });