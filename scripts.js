/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */
/*

//Hiiii Commenting this all out 
const FRESH_PRINCE_URL =
  "test/bulbasaur.png";
const CURB_POSTER_URL =
"test/ivysaur.png"
const EAST_LOS_HIGH_POSTER_URL =
"test/venusaur.png"
// This is an array of strings (TV show titles)
let titles = [
  "Bulbasaur",
  "Ivysaur",
  "Venusaur",
  "Charmander"
];
// Your final submission should have much more data than this, and
// you should use more than just an array of strings to store it all.

// This function adds cards the page to display the data in the array
function showCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  for (let i = 0; i < titles.length; i++) {
    let title = titles[i];

    // This part of the code doesn't scale very well! After you add your
    // own data, you'll need to do something totally different here.
    let imageURL = "";
    if (i == 0) {
      imageURL = FRESH_PRINCE_URL;
    } else if (i == 1) {
      imageURL = CURB_POSTER_URL;
    } else if (i == 2) {
      imageURL = EAST_LOS_HIGH_POSTER_URL;
    }

    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, title, imageURL); // Edit title and image
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
}

function editCardContent(card, newTitle, newImageURL) {
  card.style.display = "block";

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = newTitle;

  const cardImage = card.querySelector("img");
  cardImage.src = newImageURL;
  cardImage.alt = newTitle + " Poster";

  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  console.log("new card:", newTitle, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);

function quoteAlert() {
  console.log("Button Clicked!");
  alert(
    "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!"
  );
}

function removeLastCard() {
  titles.pop(); // Remove last item in titles array
  showCards(); // Call showCards again to refresh
}
*/
window.onload = async function() {
  const response = await fetch('pokemon_evolution_data.json');
  const data = await response.json();
  allCards = data;
};

/*
window.onload = function() {
  allCards = [
    {
        "name": "Bulbasaur",
        "image_url": "https://img.pokemondb.net/sprites/scarlet-violet/normal/bulbasaur.png",
        "types": ["Grass", "Poison"],
        "previous_evolution": null,
        "next_evolution": "Ivysaur"
    },
    {
        "name": "Ivysaur",
        "image_url": "https://img.pokemondb.net/sprites/scarlet-violet/normal/ivysaur.png",
        "types": ["Grass", "Poison"],
        "previous_evolution": "Bulbasaur",
        "next_evolution": "Venusaur"
    },
    {
        "name": "Venusaur",
        "image_url": "https://img.pokemondb.net/sprites/scarlet-violet/normal/venusaur.png",
        "types": ["Grass", "Poison"],
        "previous_evolution": "Ivysaur",
        "next_evolution": null
    },
    {
      "name": "Charmander",
      "image_url": "https://img.pokemondb.net/sprites/scarlet-violet/normal/charmander.png",
      "types": [
          "Fire"
      ],
      "previous_evolution": null,
      "next_evolution": "Charmeleon"
  },
  {
      "name": "Charmeleon",
      "image_url": "https://img.pokemondb.net/sprites/scarlet-violet/normal/charmeleon.png",
      "types": [
          "Fire"
      ],
      "previous_evolution": "Charmander",
      "next_evolution": "Charizard"
  },
  {
      "name": "Charizard",
      "image_url": "https://img.pokemondb.net/sprites/scarlet-violet/normal/charizard.png",
      "types": [
          "Fire",
          "Flying"
      ],
      "previous_evolution": "Charmeleon",
      "next_evolution": null
  },
  {
      "name": "Squirtle",
      "image_url": "https://img.pokemondb.net/sprites/scarlet-violet/normal/squirtle.png",
      "types": [
          "Water"
      ],
      "previous_evolution": null,
      "next_evolution": "Wartortle"
  }


  ];
};*/

let drawnCards = [];
let savedCards = [];
let selectedCardIndex=null;
let pullHistory = [];

function renderCards() {
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  drawnCards.forEach((card, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    // Highlight selected card
    if (index === selectedCardIndex) {
      cardDiv.classList.add("selected");
    }

    // Only show name and types if revealed
    const nameHTML = card.isRevealed ? `<h3">${card.name}</h3>` : "";
    const typesHTML = card.isRevealed
      ? `<div class="types">
           ${card.types.map(type => `<span class="type-tag">${type}</span>`).join("")}
         </div>`
      : "";
      cardDiv.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-back">
          <img src="assets/pokemon_cover_art.png" alt="Card Back" />
        </div>
        <div class="card-face card-front">
          <h3>${card.name}</h3>
          <img src="${card.image_url}" alt="${card.name}" />
          <div class="types">
            ${card.types.map(type => `<span class="type-tag type-${type.toLowerCase()}">${type}</span>`).join("")}
          </div>
        </div>
      </div>
    `;
  // Add this after setting cardDiv.innerHTML:
  if (card.isRevealed) {
    cardDiv.classList.add("revealed");
  }  
    // Clickable Cards, reveals pokemon
    cardDiv.addEventListener("click", () => {
      selectedCardIndex = index;
      card.isRevealed = !card.isRevealed;
      console.log(`Card ${card.name} clicked, revealed: ${card.isRevealed}`);
      renderCards();
    });

    container.appendChild(cardDiv);
  });
}


function drawCard() {
  console.log("Draw card called");
  console.log("Available cards:", allCards);
  if (drawnCards.length >= 6) {
    alert("Max 6 cards at once. Remove one to draw again.");
    return;
  }

  const available = allCards.filter(card => !drawnCards.includes(card));
  const randomCard = available[Math.floor(Math.random() * available.length)];

  
  if (randomCard) {
    randomCard.isRevealed = false; 
    drawnCards.push(randomCard);
  if (!pullHistory.includes(randomCard)) { // no duplicates
    pullHistory.push(randomCard); // adds to history
  }
    renderCards();
  }
}

/*On click event*/
cardDiv.onclick = () => {
  selectedCardIndex = index;
  card.isRevealed = !card.isRevealed; // toggle reveal state
  renderCards(); // re-render
};


/* bottom-buttons*/
function removeLastCard() {
  if (drawnCards.length === 0) {
    alert("No cards to remove!");
    return;
  }

  drawnCards.pop();           // remove the last card in the array
  selectedCardIndex = null;   // reset selection
  renderCards();              // update UI
}

/*
function removeCard() {
  if (selectedCardIndex === null) return alert("Select a card to remove!");
  drawnCards.splice(selectedCardIndex, 1);
  selectedCardIndex = null;
  renderCards();

function saveCard() {
  if (selectedCardIndex === null) return alert("Select a card to save!");
  const card = drawnCards[selectedCardIndex];
  if (!savedCards.includes(card)) savedCards.push(card);
  alert("Card saved!");
}
*/ 

// helper function
function renderCardHTML(card) {
  return `
    <div class="card">
      <h3>${card.name}</h3>
      <div class="card-img">
        <img src="${card.image_url}" alt="${card.name}">
      </div>
      <div class="types">
        ${card.types.map(type => `<span class="type-tag type-${type.toLowerCase()}">${type}</span>`).join("")}
      </div>
    </div>
  `;
}

//helper function
function renderEmptyCardSlot(name) {
  return `
    <div class="card empty">
      <div style="text-align:center; opacity: 0.5; padding: 1rem;">${name} (missing)</div>
    </div>
  `;
}


function displayPulls() {
  // Clear active view
  document.getElementById("card-container").innerHTML = "";
  drawnCards = [];
  selectedCardIndex = null;

  // Hide the main controls (Draw/Remove) if you want:
  document.querySelector(".footer").style.display = "none";

  // Show the pulls menu
  document.getElementById("pulls-menu").style.display = "block";

  const sortOption = document.getElementById("pulls-sort").value;
  const typeView = document.getElementById("pulls-type-view");
  const chainView = document.getElementById("pulls-chain-view");

  // Filter only revealed cards
  const revealedCards = pullHistory.filter(card => card.isRevealed);
  

  if (sortOption === "type") {
    typeView.innerHTML = "";
    chainView.style.display = "none";
    typeView.style.display = "block";

    const typeGroups = {};

    revealedCards.forEach(card => {
      card.types.forEach(type => {
        if (!typeGroups[type]) typeGroups[type] = [];
        typeGroups[type].push(card);
      });
    });

    for (const type in typeGroups) {
      const group = typeGroups[type];
      const section = document.createElement("div");
      section.innerHTML = `<h3>${type}</h3>`;
      const row = document.createElement("div");
      row.className = "card-row";

      group.forEach(card => {
        row.innerHTML += renderCardHTML(card);
      });

      section.appendChild(row);
      typeView.appendChild(section);
    }

  } else if (sortOption === "chain") {
    chainView.innerHTML = "";
    typeView.style.display = "none";
    chainView.style.display = "block";
  
    const chainsMap = {};
    const standalone = [];
  
    revealedCards.forEach(card => {
      if (!card.previous_evolution && !card.next_evolution) {
        standalone.push(card);
        return;
      }
  
      // Find the root of the chain from allCards
      let root = allCards.find(p => p.name === card.name);
      while (root && root.previous_evolution) {
        root = allCards.find(p => p.name === root.previous_evolution) || root;
      }
  
      if (!chainsMap[root.name]) chainsMap[root.name] = new Set();
      chainsMap[root.name].add(card.name);
    });
  
    for (const chainRoot in chainsMap) {
      const revealedNames = chainsMap[chainRoot];
      const fullChain = [];
      let curr = allCards.find(p => p.name === chainRoot);
      const visited = new Set();
  
      while (curr && !visited.has(curr.name)) {
        fullChain.push(curr);
        visited.add(curr.name);
        curr = allCards.find(p => p.previous_evolution === curr.name);
      }
  
      const row = document.createElement("div");
      row.className = "card-row";
  
      const label = document.createElement("h3");
      const isComplete = fullChain.every(card => revealedNames.has(card.name));
      label.textContent = `${chainRoot} Evolution ${isComplete ? "" : " (Incomplete)"}`;
      chainView.appendChild(label);
  
      fullChain.forEach(card => {
        if (revealedNames.has(card.name)) {
          const revealedCard = revealedCards.find(c => c.name === card.name);
          row.innerHTML += renderCardHTML(revealedCard);
        } else {
          row.innerHTML += renderEmptyCardSlot(card.name);
        }
      });
  
      chainView.appendChild(row);
    }
  
    // Edge case because the data I pulled from should only be pokemon with an evolution
    if (standalone.length > 0) {
      chainView.innerHTML += `<h3>Standalone Pokémon</h3>`;
      const row = document.createElement("div");
      row.className = "card-row";
      standalone.forEach(card => {
        row.innerHTML += renderCardHTML(card);
      });
      chainView.appendChild(row);
    }
  }
}