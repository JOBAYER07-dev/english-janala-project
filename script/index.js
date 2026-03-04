// [1] Entry point: loadData() theke shob kichu shuru hoy -> showLessons() ke call kore
const createElement = arr => {
  const htmlElement = arr.map(
    item => `<span class="btn btn-outline">${item}</span>`,
  );
  return htmlElement.join(' ');
};

// [5] toggleSpinner() -> loadwords() & displayWords() theke call hoy
const toggleSpinner = isLoading => {
  if (isLoading === true) {
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('word-container').classList.add('hidden');
  } else {
    document.getElementById('word-container').classList.remove('hidden');
    document.getElementById('spinner').classList.add('hidden');
  }
};

// [1] Shob kichu er shuru ekhane, API theke data fetch kore showLessons() ke pathay
const loadData = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(json => showLessons(json.data));
};

// [4] loadwords() er vitore call hoy, active class remove kore
const removeActiveClass = () => {
  const allLessonsBtn = document.querySelectorAll('.lesson-btn');
  allLessonsBtn.forEach(btn => btn.classList.remove('btn-active'));
};

// [3] Lesson button click korle call hoy -> toggleSpinner(), removeActiveClass(), displayWords() ke call kore
const loadwords = id => {
  toggleSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      removeActiveClass();
      const clickBtn = document.getElementById(`lesson-${id}`);
      clickBtn.classList.add('btn-active');
      displayWords(data.data);
    });
};

// [6] Info button click korle call hoy -> displayWordDetails() ke call kore
const loadWordDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

// [8] loadWordDetails() er por call hoy -> createElement() ke call kore, modal open kore
const displayWordDetails = words => {
  const detailsContainer = document.getElementById('detais-container');
  detailsContainer.innerHTML = `<div>
        <h2 class="text-2xl font-bold">${words.word}(<i class="fa-solid fa-microphone-lines"></i>: ${words.pronunciation})</h2>
      </div>
      <div>
        <h2 class="font-bold">MEANING</h2>
        <p>${words.meaning ? words.meaning : 'No meaning available'}</p>
      </div>
      <div>
        <h2 class="font-bold">Example</h2>
        <p>${words.sentence ? words.sentence : 'No example available'}</p>
      </div>
      <div>
        <h2 class="font-bold">Synonyms</h2>
        <div class="">${createElement(words.synonyms)}</div>
        
      </div>
      <div>
        <button class="btn btn-primary">COMPLETE LEARNING</button>
      </div>
  
  `;
  document.getElementById('my_modal_5').showModal();
};

// [5] loadwords() er por call hoy -> toggleSpinner() band kore, card render kore
const displayWords = words => {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = '';
  if (words.length === 0) {
    wordContainer.innerHTML = `
    <div class="space-y-6 col-span-full text-center">
    <img class="mx-auto" src="./assets/alert-error.png" alt="alert error image">
  <p class="bangla text-xl text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
  <h2 class="bangla text-4xl font-bold">নেক্সট Lesson এ যান</h2>
</div>
    `;
    toggleSpinner(false);
    return;
  }
  words.forEach(word => {
    const createCard = document.createElement('div');
    createCard.innerHTML = `
    <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-5">
  <h2 class="text-2xl font-bold">${word.word ? word.word : 'শিগ্রই যুক্ত করা হবে'}</h2>
  <p class="font-semibold">Meaning /Pronounciation</p>
  <h2 class="bangla text-2xl font-medium">"${word.meaning ? word.meaning : 'শিগ্রই যুক্ত করা হবে'} / ${word.pronunciation ? word.pronunciation : 'শিগ্রই যুক্ত করা হবে'}"</h2>
  <div class="flex justify-between items-center">
    <button onclick="loadWordDetails(${word.id})" class="btn [#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
    <button class="btn [#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
  </div>
</div>
    `;
    wordContainer.appendChild(createCard);
  });
  toggleSpinner(false);
};

// [2] loadData() er por call hoy, lesson buttons render kore
const showLessons = lessons => {
  const levelContainer = document.getElementById('level-container');
  levelContainer.innerHTML = '';

  for (const lesson of lessons) {
    const createDiv = document.createElement('div');
    createDiv.innerHTML = `
    <button id="lesson-${lesson.level_no}" onclick="loadwords(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>LESSON - ${lesson.level_no}</button>            
    `;
    levelContainer.appendChild(createDiv);
  }
};

loadData();
