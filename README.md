# Pokemon-Themed Gacha Pull Simulator
Link: [https://gverango.github.io/sea-project-summer-2025/](https://gverango.github.io/sea-project-summer-2025/)

## Dataset
The dataset I chose is of Generation 1 Pokémon with known evolution chains by scraping structured HTML from pokemondb.net/evolution, including names, types, and evolution relationships. Every Pokémon entry has img URLs corresponding to Gen 5 sprites sourced from pokemondb.net/sprites, and the final data is formatted into a JSON file: pokemon_evolution_data.json

## Data Structures
Arrays: Used to track drawn cards (drawnCards) and pull history (pullHistory), controlling stack-like behavior (.push(), .pop() entries).

Objects (Dictionaries): Grouped cards by type and evolution chain using objects as hash maps (typeGroups, chainsMap), for categorizing.

Sets: Used Set to track unique items (like already revealed stages of an evolution chain) to prevent duplicates.

Traversal: Evolution chains resemble linked nodes. Linear list traversal in both directions (first backward to find the root, then forward to find children).

## JavaScript

script.js: [https://github.com/gverango/sea-project-summer-2025/blob/main/scripts.js](https://github.com/gverango/sea-project-summer-2025/blob/main/scripts.js)
```
📁 Project Root
├─ index.html
├─ card.css         // Styling
├─ style.css         // Styling
├─ pokemon_evolution_data.json       // Pokemon Evolution JSON Data
├─ 📂 assets            
│  ├─ backgrounds
│  └─ fonts
├─ script.js
```
## Online Resources

Tools: VSCode, Live-Server Plugin, Aseprite, Red Ketchup Color Picker

Data: https://pokemondb.net/evolution, https://pokemondb.net/sprites

Font: https://www.1001fonts.com/medodica-font.html by Posto Carattere

Logo Art: https://pokemon-fonts-generator.netlify.app/ by phoneticallySAARTHaK

Card Cover Art: https://www.deviantart.com/atomicmonkeytcg/art/Pokemon-Card-Backside-in-High-Resolution-633406210 by AtomicMonkeyTCG

CSS GPT (GPT-4): https://www.scriptbyai.com/

Tutorial: https://www.geeksforgeeks.org/singly-linked-list-tutorial/5

Tutorial: https://www.w3schools.com/js/js_sets.asp

## Total Hours

# 12+ hours
