
// eta dynamic vabe displayWordDetails function er modde synonyms gula render korbe.
const createElement = (arr) => {
  const htmlElement = arr.map(item=>`<span class="btn btn-outline">${item}</span>`)
  return htmlElement.join(' ');
}

// spinner fucntion
const toggleSpinner = (isLoading) => {
  if (isLoading === true) {
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('word-container').classList.add('hidden');
  } else {
    document.getElementById('word-container').classList.remove('hidden');
    document.getElementById('spinner').classList.add('hidden');
  }
}


const loadData = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(json => showLessons(json.data));
};

// remove active class from all lesson btn 
const removeActiveClass = () => {
  const allLessonsBtn = document.querySelectorAll('.lesson-btn');
  allLessonsBtn.forEach(btn => btn.classList.remove('btn-active'));
}

const loadwords = (id) => {
  toggleSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass(); // remove active class from all lesson btn
      const clickBtn = document.getElementById(`lesson-${id}`);
      // console.log(clickBtn)
      clickBtn.classList.add('btn-active'); // add active class to the clicked lesson btn
      displayWords(data.data);
    });
}

const loadWordDetails = async(id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  // console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  // console.log(details.data);
  displayWordDetails(details.data);
}
const displayWordDetails = (words) => {
  
  // console.log(words)
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
}

const displayWords = (words) => {
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
    // console.log(word)
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
}

const showLessons = (lessons) => {
  const levelContainer = document.getElementById('level-container')
  levelContainer.innerHTML = '';

  for (const lesson of lessons) {
    const createDiv = document.createElement('div');
    createDiv.innerHTML = `
    <button id="lesson-${lesson.level_no}" onclick="loadwords(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>LESSON - ${lesson.level_no}</button>            
    `;
    levelContainer.appendChild(createDiv);
  }
} 

loadData();