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
/*  console.log("Available cards:", allCards); */
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

  // if User selects "Sort by Chain"
  } else if (sortOption === "chain") {
    chainView.innerHTML = "";
    typeView.style.display = "none";
    chainView.style.display = "block";
  
    const chainsMap = {};
  
    revealedCards.forEach(card => {
  
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
  }
}