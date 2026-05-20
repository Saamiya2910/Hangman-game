const WORDS = {
  animals: {
    easy: [
      { word: "CAT", hint: "A small furry pet that purrs" },
      { word: "DOG", hint: "Man's best friend" },
      { word: "COW", hint: "Gives us milk" },
      { word: "PIG", hint: "Farm animal that oinks" },
      { word: "BAT", hint: "Only flying mammal" },
      { word: "FOX", hint: "Sly orange woodland creature" },
      { word: "OWL", hint: "Wise night bird" },
      { word: "RAT", hint: "Small rodent with a long tail" },
      { word: "BEE", hint: "Makes honey and buzzes" },
      { word: "ANT", hint: "Tiny insect that lives in colonies" }
    ],
    medium: [
      { word: "TIGER", hint: "Striped big cat", vagHint: "A dangerous feline" },
      { word: "ZEBRA", hint: "Horse with black and white stripes", vagHint: "An African hoofed animal" },
      { word: "EAGLE", hint: "Majestic bird of prey", vagHint: "A large bird" },
      { word: "PANDA", hint: "Black and white bear from China", vagHint: "A bamboo-eating creature" },
      { word: "SNAKE", hint: "Legless reptile that slithers", vagHint: "A long limbless creature" },
      { word: "WHALE", hint: "Largest animal in the ocean", vagHint: "A massive sea creature" },
      { word: "HORSE", hint: "Gallops, can be ridden", vagHint: "A domesticated riding animal" },
      { word: "MOUSE", hint: "Small rodent, likes cheese", vagHint: "A tiny gnawing creature" },
      { word: "CROWN", hint: "Bird known for intelligence", vagHint: "A clever winged animal" },
      { word: "SHARK", hint: "Ocean predator with sharp teeth", vagHint: "A feared marine hunter" }
    ],
    hard: [
      { word: "ELEPHANT", hint: "Largest land animal with a trunk" },
      { word: "GIRAFFE", hint: "Tallest animal with a long neck" },
      { word: "PENGUIN", hint: "Flightless bird that lives in the cold" },
      { word: "DOLPHIN", hint: "Intelligent sea mammal known for acrobatics" },
      { word: "KANGAROO", hint: "Australian marsupial that hops" },
      { word: "CHEETAH", hint: "Fastest land animal" },
      { word: "OCTOPUS", hint: "Eight-armed sea creature" },
      { word: "FLAMINGO", hint: "Tall pink bird that stands on one leg" },
      { word: "CHAMELEON", hint: "Lizard that changes color" },
      { word: "CROCODILE", hint: "Large reptile with powerful jaws" }
    ]
  },
  countries: {
    easy: [
      { word: "PERU", hint: "Home of Machu Picchu" },
      { word: "CUBA", hint: "Caribbean island known for cigars" },
      { word: "IRAN", hint: "Middle Eastern country, ancient Persia" },
      { word: "IRAQ", hint: "Land between two rivers" },
      { word: "CHAD", hint: "Landlocked African nation" },
      { word: "FIJI", hint: "Pacific island paradise" },
      { word: "MALI", hint: "West African country, Timbuktu" },
      { word: "OMAN", hint: "Arabian Peninsula sultanate" },
      { word: "TOGO", hint: "Small West African nation" },
      { word: "LAOS", hint: "Southeast Asian country, landlocked" }
    ],
    medium: [
      { word: "FRANCE", hint: "Home of the Eiffel Tower", vagHint: "A European nation" },
      { word: "BRAZIL", hint: "Largest country in South America", vagHint: "A South American nation" },
      { word: "CANADA", hint: "Has a maple leaf on its flag", vagHint: "A North American nation" },
      { word: "SWEDEN", hint: "Scandinavian country, home of IKEA", vagHint: "A Nordic nation" },
      { word: "MEXICO", hint: "Known for tacos and sombreros", vagHint: "A Latin American nation" },
      { word: "EGYPT", hint: "Home of the ancient pyramids", vagHint: "An African nation" },
      { word: "GREECE", hint: "Birthplace of democracy", vagHint: "A Mediterranean nation" },
      { word: "POLAND", hint: "Central European country, pierogi", vagHint: "An Eastern European nation" },
      { word: "TURKEY", hint: "Straddles Europe and Asia", vagHint: "A transcontinental nation" },
      { word: "NORWAY", hint: "Land of fjords and Vikings", vagHint: "A Scandinavian nation" }
    ],
    hard: [
      { word: "AUSTRALIA", hint: "Continent and country known for kangaroos" },
      { word: "ARGENTINA", hint: "South American country famous for tango" },
      { word: "INDONESIA", hint: "World's largest archipelago" },
      { word: "VENEZUELA", hint: "Angel Falls, the highest waterfall" },
      { word: "KAZAKHSTAN", hint: "Largest landlocked country" },
      { word: "MOZAMBIQUE", hint: "Southeast African nation, long coastline" },
      { word: "SWITZERLAND", hint: "Alps, chocolate, and neutrality" },
      { word: "MADAGASCAR", hint: "Island nation off Africa's east coast" },
      { word: "PHILIPPINES", hint: "Archipelago of over 7000 islands" },
      { word: "AFGHANISTAN", hint: "Landlocked country at the crossroads of Asia" }
    ]
  },
  movies: {
    easy: [
      { word: "JAWS", hint: "Great white shark terrorizes a beach town" },
      { word: "UP", hint: "Flying house with balloons" },
      { word: "IT", hint: "Creepy clown terrorizes kids" },
      { word: "COCO", hint: "Dia de los Muertos, guitar, and family" },
      { word: "LION", hint: "Circle of Life, Simba" },
      { word: "RIO", hint: "Blue macaw in Brazil" },
      { word: "HULK", hint: "Green rage monster" },
      { word: "SALT", hint: "Angelina Jolie spy thriller" },
      { word: "WALL", hint: "Robot left on Earth" },
      { word: "SIGN", hint: "Crop circles, aliens, Mel Gibson" }
    ],
    medium: [
      { word: "FROZEN", hint: "Elsa and Anna's wintry tale", vagHint: "An animated Disney film" },
      { word: "AVATAR", hint: "Blue aliens on Pandora", vagHint: "A sci-fi blockbuster" },
      { word: "MATRIX", hint: "Red pill or blue pill", vagHint: "A mind-bending action film" },
      { word: "SHREK", hint: "Green ogre with a talking donkey", vagHint: "An animated comedy" },
      { word: "BATMAN", hint: "The Dark Knight of Gotham", vagHint: "A superhero film" },
      { word: "JOKER", hint: "Why so serious?", vagHint: "A psychological thriller" },
      { word: "MULAN", hint: "Disney warrior princess", vagHint: "An animated historical film" },
      { word: "GRAVITY", hint: "Lost in space, Sandra Bullock", vagHint: "A space survival film" },
      { word: "SPLIT", hint: "Man with 23 personalities", vagHint: "A psychological horror film" },
      { word: "BRAVE", hint: "Scottish princess defies tradition", vagHint: "An animated fantasy film" }
    ],
    hard: [
      { word: "TITANIC", hint: "Ship romance disaster film" },
      { word: "INCEPTION", hint: "Dream within a dream" },
      { word: "GLADIATOR", hint: "Roman warrior seeks revenge" },
      { word: "ALADDIN", hint: "Magic lamp and a flying carpet" },
      { word: "PARASITE", hint: "Korean Oscar-winning thriller" },
      { word: "FORREST", hint: "Life is like a box of chocolates" },
      { word: "GOODFELLAS", hint: "As far back as I can remember..." },
      { word: "INTERSTELLAR", hint: "Traveling through a wormhole" },
      { word: "JURASSIC", hint: "Dinosaurs brought back to life" },
      { word: "CASABLANCA", hint: "Here's looking at you, kid" }
    ]
  },
  sports: {
    easy: [
      { word: "GOLF", hint: "Clubs, balls, and 18 holes" },
      { word: "JUDO", hint: "Japanese martial art of throws" },
      { word: "POLO", hint: "Sport played on horseback" },
      { word: "DART", hint: "Throw at a circular board" },
      { word: "KARATE", hint: "Striking martial art from Okinawa" },
      { word: "SKI", hint: "Glide down snowy slopes" },
      { word: "BOWL", hint: "Roll a ball to knock down pins" },
      { word: "LUG", hint: "Sled racing on ice" },
      { word: "SURF", hint: "Ride waves on a board" }
    ],
    medium: [
      { word: "TENNIS", hint: "Racket sport played on a court", vagHint: "A racket-based game" },
      { word: "BOXING", hint: "Fighting sport with gloves", vagHint: "A combat sport" },
      { word: "HOCKEY", hint: "Played on ice with a puck", vagHint: "A team sport on a cold surface" },
      { word: "SOCCER", hint: "Kick the ball into the net", vagHint: "A ball-based team sport" },
      { word: "FENCING", hint: "Sword fighting sport", vagHint: "A weapon-based sport" },
      { word: "SQUASH", hint: "Racket sport in a four-walled court", vagHint: "An indoor racket sport" },
      { word: "ARCHERY", hint: "Bow and arrow precision sport", vagHint: "A target shooting sport" },
      { word: "CYCLING", hint: "Racing on two wheels", vagHint: "A wheeled racing sport" },
      { word: "ROWING", hint: "Oars, boat, and teamwork", vagHint: "A water racing sport" },
      { word: "SKATING", hint: "Gliding on blades", vagHint: "A gliding sport" }
    ],
    hard: [
      { word: "FOOTBALL", hint: "The world's most popular sport" },
      { word: "CRICKET", hint: "Bat-and-ball game popular in India" },
      { word: "BASEBALL", hint: "America's pastime" },
      { word: "SWIMMING", hint: "Water-based Olympic sport" },
      { word: "MARATHON", hint: "26.2 mile long-distance run" },
      { word: "TRIATHLON", hint: "Swim, bike, and run endurance race" },
      { word: "BASKETBALL", hint: "Shoot hoops on a court" },
      { word: "VOLLEYBALL", hint: "Spike over a net" },
      { word: "WRESTLING", hint: "Grappling combat sport" },
      { word: "MOUNTAINEER", hint: "Climbing the highest peaks" }
    ]
  },
  food: {
    easy: [
      { word: "PIE", hint: "Filled pastry dessert" },
      { word: "HAM", hint: "Cured pork" },
      { word: "EGG", hint: "Breakfast staple from a chicken" },
      { word: "NUT", hint: "Hard-shelled snack" },
      { word: "JAM", hint: "Sweet fruit spread" },
      { word: "TEA", hint: "Hot steeped beverage" },
      { word: "BUN", hint: "Small round bread roll" },
      { word: "YAM", hint: "Orange sweet root vegetable" },
      { word: "FIG", hint: "Sweet teardrop-shaped fruit" },
      { word: "HOT", hint: "Chili pepper sensation" }
    ],
    medium: [
      { word: "PIZZA", hint: "Italian flatbread with cheese and toppings", vagHint: "A popular baked dish" },
      { word: "SUSHI", hint: "Japanese rice and raw fish rolls", vagHint: "An Asian rice-based dish" },
      { word: "BURGER", hint: "Patty in a bun", vagHint: "A fast food sandwich" },
      { word: "PASTA", hint: "Italian noodles with sauce", vagHint: "A boiled dough dish" },
      { word: "WAFFLE", hint: "Grid-patterned breakfast treat", vagHint: "A breakfast pastry" },
      { word: "TACO", hint: "Mexican folded tortilla with fillings", vagHint: "A handheld ethnic food" },
      { word: "STEAK", hint: "Thick cut of beef", vagHint: "A grilled meat dish" },
      { word: "DONUT", hint: "Fried dough ring with glaze", vagHint: "A sweet fried pastry" },
      { word: "BACON", hint: "Crispy breakfast meat strips", vagHint: "A cured meat product" },
      { word: "MANGO", hint: "Tropical golden fruit", vagHint: "A sweet tropical produce" }
    ],
    hard: [
      { word: "PANCAKE", hint: "Flat round breakfast cake with syrup" },
      { word: "BURRITO", hint: "Wrapped tortilla filled with beans and meat" },
      { word: "OMELETTE", hint: "Folded egg dish" },
      { word: "LASAGNA", hint: "Layered pasta, cheese, and sauce" },
      { word: "AVOCADO", hint: "Creamy green fruit, guacamole" },
      { word: "CHICKEN", hint: "Popular poultry protein" },
      { word: "BROWNIE", hint: "Dense chocolate square dessert" },
      { word: "CROISSANT", hint: "Buttery French crescent pastry" },
      { word: "PAELLA", hint: "Spanish saffron rice dish" },
      { word: "CHEDDAR", hint: "Sharp English cheese" }
    ]
  }
};

const MAX_GUESSES = { easy: 9, medium: 7, hard: 6 };

let state = {
  category: '',
  difficulty: '',
  word: '',
  hint: '',
  vagHint: '',
  guessed: new Set(),
  wrongGuesses: 0,
  maxGuesses: 9,
  hintUsed: false,
  gameOver: false
};

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showStartPage() { showPage('startPage'); }

function showCategoryPage() {
  clearOverlay();
  showPage('categoryPage');
}

function selectCategory(category) {
  state.category = category;
  showPage('difficultyPage');
}

function startGame(difficulty) {
  state.difficulty = difficulty;
  state.maxGuesses = MAX_GUESSES[difficulty];
  const list = WORDS[state.category][difficulty];
  const entry = list[Math.floor(Math.random() * list.length)];
  state.word = entry.word.toUpperCase();
  state.hint = entry.hint;
  state.vagHint = entry.vagHint || '';
  state.guessed = new Set();
  state.wrongGuesses = 0;
  state.hintUsed = false;
  state.gameOver = false;

  const catName = state.category.charAt(0).toUpperCase() + state.category.slice(1);
  const diffName = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  document.getElementById('categoryBadge').textContent = catName;
  document.getElementById('difficultyBadge').textContent = diffName;
  document.getElementById('wrongCount').textContent = `Wrong: 0/${state.maxGuesses}`;
  document.getElementById('hintText').textContent = '';
  const hintBtn = document.getElementById('hintBtn');
  if (difficulty === 'easy') {
    hintBtn.style.display = 'none';
  } else if (difficulty === 'medium') {
    hintBtn.style.display = 'inline-block';
    hintBtn.disabled = true;
    hintBtn.style.opacity = '0';
    hintBtn.style.pointerEvents = 'none';
  } else {
    hintBtn.style.display = 'inline-block';
    hintBtn.style.opacity = '1';
    hintBtn.style.pointerEvents = 'auto';
    hintBtn.disabled = false;
  }
  document.getElementById('wrongLetters').innerHTML = '';

  for (let i = 1; i <= 10; i++) {
    document.getElementById('part' + i).classList.remove('visible');
  }

  renderWord();
  renderKeyboard();
  showPage('gamePage');
  clearOverlay();
}

function renderWord() {
  const container = document.getElementById('wordDisplay');
  container.innerHTML = '';
  for (const ch of state.word) {
    const box = document.createElement('div');
    box.className = 'letter-box';
    if (state.guessed.has(ch) || state.gameOver) {
      box.textContent = ch;
      box.classList.add('revealed');
    }
    container.appendChild(box);
  }
}

function renderKeyboard() {
  const kb = document.getElementById('keyboard');
  kb.innerHTML = '';
  for (let code = 65; code <= 90; code++) {
    const letter = String.fromCharCode(code);
    const btn = document.createElement('button');
    btn.className = 'key';
    btn.textContent = letter;
    if (state.guessed.has(letter)) {
      btn.disabled = true;
      btn.classList.add(state.word.includes(letter) ? 'correct' : 'wrong');
    }
    btn.addEventListener('click', () => handleGuess(letter));
    kb.appendChild(btn);
  }
}

function handleGuess(letter) {
  if (state.gameOver || state.guessed.has(letter)) return;
  state.guessed.add(letter);

  if (state.word.includes(letter)) {
    renderWord();
    renderKeyboard();
    if ([...state.word].every(ch => state.guessed.has(ch))) {
      state.gameOver = true;
      setTimeout(() => showWin(), 400);
    }
  } else {
    state.wrongGuesses++;
    document.getElementById('wrongCount').textContent =
      `Wrong: ${state.wrongGuesses}/${state.maxGuesses}`;
    document.getElementById('part' + state.wrongGuesses).classList.add('visible');

    if (state.difficulty === 'medium' && state.wrongGuesses === 4 && !state.hintUsed) {
      const hintBtn = document.getElementById('hintBtn');
      hintBtn.style.opacity = '1';
      hintBtn.style.pointerEvents = 'auto';
      hintBtn.disabled = false;
    }

    const wrongDiv = document.getElementById('wrongLetters');
    const span = document.createElement('span');
    span.className = 'wrong-letter';
    span.textContent = letter;
    wrongDiv.appendChild(span);

    renderKeyboard();

    if (state.wrongGuesses >= state.maxGuesses) {
      state.gameOver = true;
      renderWord();
      setTimeout(() => showLose(), 500);
    }
  }
}

function useHint() {
  if (state.hintUsed || state.gameOver) return;
  state.hintUsed = true;
  document.getElementById('hintBtn').disabled = true;
  const displayHint = state.difficulty === 'medium' ? state.vagHint : state.hint;
  document.getElementById('hintText').textContent = displayHint;
}

function showWin() {
  submitScore(state.category, state.difficulty, state.word, state.wrongGuesses, true, state.hintUsed);
  document.getElementById('overlayIcon').textContent = '🎉';
  document.getElementById('overlayTitle').textContent = 'You Saved Him!';
  document.getElementById('overlayWord').className = 'overlay-word win-word';
  document.getElementById('overlayWord').textContent = state.word;
  document.getElementById('overlay').classList.add('active');
}

function showLose() {
  submitScore(state.category, state.difficulty, state.word, state.wrongGuesses, false, state.hintUsed);
  document.getElementById('overlayIcon').textContent = '💀';
  document.getElementById('overlayTitle').textContent = 'Game Over';
  document.getElementById('overlayWord').className = 'overlay-word';
  document.getElementById('overlayWord').textContent = state.word;
  document.getElementById('overlay').classList.add('active');
}

function playAgain() {
  clearOverlay();
  startGame(state.difficulty);
}

function clearOverlay() {
  document.getElementById('overlay').classList.remove('active');
}

document.addEventListener('keydown', (e) => {
  const key = e.key.toUpperCase();
  if (/^[A-Z]$/.test(key) && document.getElementById('gamePage').classList.contains('active')) {
    handleGuess(key);
  }
});
