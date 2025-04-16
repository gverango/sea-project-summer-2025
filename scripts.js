/**
 * 
 * - Data Structure:	Tracks drawn card history, adding/removing entries, card filtering, sorting/grouping
 * vs.
 * - Display (DOM):	Creates/manipulates DOM elements, sets innerHTML, handles everything visual layout
 * 
 * Data Structure Logic found in
 *    drawCard()
 *    renderCards()
 *    removeLastCard()
 *    displayPulls()
 * 
 */

window.onload = async function() {
  const response = await fetch('pokemon_evolution_data.json');
  const data = await response.json();
  allCards = data;
};

let drawnCards = [];
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
    const firstType = card.types[0].toLowerCase(); // e.g., "fire", "water"
      cardDiv.innerHTML = `
      <div class="card-content card-${firstType}"> 
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
/*  console.log("Available cards:", allCards); */
  if (drawnCards.length >= 6) {
    alert("Max 6 cards at once. Remove one to draw again.");
    return;
  }
  const available = allCards.filter(card => !drawnCards.includes(card));
  const randomCard = available[Math.floor(Math.random() * available.length)]; // Gacha is just math.random() 
  
  if (randomCard) {
    randomCard.isRevealed = false; // initially hidden when rendered
    drawnCards.push(randomCard); // updates current cards being viewed

  if (!pullHistory.includes(randomCard)) { // no duplicates
    pullHistory.push(randomCard); // adds to history
  }
    renderCards(); // Updates View
  }
}

/* bottom-buttons*/
function removeLastCard() {
  if (drawnCards.length === 0) {
    alert("No cards to remove!");
    return;
  }

  drawnCards.pop();           // removes last card in the array
  selectedCardIndex = null;   // resets selection
  renderCards();              // update UI
}

// helper function - displayPulls()
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

//helper function - displayPulls()
function renderEmptyCardSlot(name) {
  return `
    <div class="card empty">
      <div style="text-align:center; opacity: 0.5; padding: 1rem;">${name} (missing)</div>
    </div>
  `;
}


function displayPulls() {
  // Clears card-container
  document.getElementById("card-container").innerHTML = "";
  drawnCards = [];
  selectedCardIndex = null;

  // Hide footer
  document.querySelector(".footer").style.display = "none";

  // Show pulls menu
  document.getElementById("pulls-menu").style.display = "block";

  const sortOption = document.getElementById("pulls-sort").value;
  const typeView = document.getElementById("pulls-type-view");
  const chainView = document.getElementById("pulls-chain-view");

  // Filter only revealed cards
  const revealedCards = pullHistory.filter(card => card.isRevealed);
  
// if User selects "Sort by Type"
  if (sortOption === "type") {
    // Hides Pulls Sorted by Chain View
    typeView.innerHTML = "";
    chainView.style.display = "none";
    typeView.style.display = "block";

    const typeGroups = {}; // Dictionary for types. typeGroups {"Fire": [Charizard, Arcanine], "Water": [Squirtle, Poliwag]}

    revealedCards.forEach(card => {
      card.types.forEach(type => {
        if (!typeGroups[type]) typeGroups[type] = []; // if type hasn't been seen before, Initialize empty array
        typeGroups[type].push(card); // Pushes card into respect type array
      });
    });
//Loops through type group for rendering
    for (const type in typeGroups) {
      const group = typeGroups[type]; //Array from typeGrups

      const section = document.createElement("div");
      section.innerHTML = `<h3>${type}</h3>`;

      const row = document.createElement("div");
      row.className = "card-row";

      // Calls helper function to render all cards belonging to type
      group.forEach(card => {
        row.innerHTML += renderCardHTML(card);
      });

      section.appendChild(row); // Cards are added as a render row
      typeView.appendChild(section); // adds to type container
    }

  // if User selects "Sort by Chain"
  } else if (sortOption === "chain") {
    // Hides Pulls Sorted by Type View
    chainView.innerHTML = "";
    typeView.style.display = "none";
    chainView.style.display = "block";
  
    const chainsMap = {}; // Object= Maps root pokemon name to a Set inside chainMap: { "Bulbasaur" : Set("Bulbasaur", "Ivysaur")}
  
    revealedCards.forEach(card => {
  
      // Finds the root of the chain from allCards
      let root = allCards.find(p => p.name === card.name);
      while (root && root.previous_evolution) { //Starts at current card and moves backward in evolution
        root = allCards.find(p => p.name === root.previous_evolution) || root;
      }
  // a Set exists for this root in chainsMap ? 
      if (!chainsMap[root.name]) 
        chainsMap[root.name] = new Set();
      // Card's name is a added to a root's set 
      chainsMap[root.name].add(card.name);
    });
  
    for (const chainRoot in chainsMap) {
      const revealedNames = chainsMap[chainRoot];
      const fullChain = [];
      let curr = allCards.find(p => p.name === chainRoot);
      const visited = new Set(); // To check if entire chain is complete or if evolutions misisng
  
      while (curr && !visited.has(curr.name)) {
        fullChain.push(curr);
        visited.add(curr.name);
        curr = allCards.find(p => p.previous_evolution === curr.name); //Find next evolution (indicates, curr is previous evolution)
      }
  
      const row = document.createElement("div");
      row.className = "card-row";

      const label = document.createElement("h3");
      // Check if all elements of chain are in revealedNames
      const isComplete = fullChain.every(card => revealedNames.has(card.name));
      label.textContent = `${chainRoot} Evolution ${isComplete ? "" : " (Incomplete)"}`;
      
      chainView.appendChild(label); // Label is added (will sit above rendered row of cards)
  
      // Render each card in the chain
      fullChain.forEach(card => {
        if (revealedNames.has(card.name)) {
          // if card is Revealed, render
          const revealedCard = revealedCards.find(c => c.name === card.name);
          row.innerHTML += renderCardHTML(revealedCard);
        } else { // otherwise, rendered as a placeholder
          row.innerHTML += renderEmptyCardSlot(card.name);
        }
      });
  
      chainView.appendChild(row);  // Cards are added as a render row
    }
  }
}