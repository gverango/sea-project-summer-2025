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

Favicon Art: https://static.wikia.nocookie.net/pokemon-fano/images/6/6f/Poke_Ball.png/revision/latest/scale-to-width-down/767?cb=20140520015336

Logo Art: https://pokemon-fonts-generator.netlify.app/ by phoneticallySAARTHaK

Card Cover Art: https://www.deviantart.com/atomicmonkeytcg/art/Pokemon-Card-Backside-in-High-Resolution-633406210 by AtomicMonkeyTCG

Background Art by Me

CSS GPT (GPT-4): https://www.scriptbyai.com/

Tutorial: https://www.geeksforgeeks.org/singly-linked-list-tutorial/5

Tutorial: https://www.w3schools.com/js/js_sets.asp

## Total Hours

# 15+ hours

One of the most challenging aspects of this project was organizing the Pokémon into their evolution chains, it resembled a DSA- Leetcode level problem and I already had three days left for this project. Especially when trying to trace the evolution path of each Pokémon. I had to iterate through each card, figure out its root, and see that I was correctly mapping its evolution history, all while preventing any loops or missing links. 

I had many variables made for tracking which nodes (or Pokémon) I’d already visited to avoid redundant processing. I also manually cleaned up the dataset so rendered cards looked nice. If I had more time, I’d refine the logic to accommodate multiple evolution branches, in the case future Pokémon with more complex evolution patterns were introduced.
