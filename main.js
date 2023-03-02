console.log('connected')

const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

const baseURL = 'http://localhost:4000'

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}

// Button and Form functions

function getAllChars(){
  clearCharacters();
  axios.get(`${baseURL}/characters`).then((result) => {
    console.log(result.data)
    result.data.forEach(char => createCharacterCard(char));
  }).catch((err) => console.log({err, "message": "problem getting all characters"}));
}

function getOneChar(name){
  clearCharacters()
  axios.get(`${baseURL}/character/${name}`).then(result => {
    console.log(result.data);
    createCharacterCard(result.data)
  }).catch(err => console.log({err, message: "Problem getting one character"}))
}

function getOlderChars(e){
  e.preventDefault()
  clearCharacters()
  axios.get(`${baseURL}/character?age=${ageInput.value}`).then(result => {
    result.data.forEach(char => createCharacterCard(char));
  }).catch(err => console.log({err, message: "Problem getting older characters"}))
}

function addChar(e){
  e.preventDefault();
  clearCharacters();


  
  const body = {
    firstName: newFirstInput.value,
    lastName: newLastInput.value,
    age: newAgeInput.value,
    gender: newGenderDropDown.value,
    likes: newLikesText.value.split(",")
  }

  axios.post(`${baseURL}/character`, body).then(result => {
    result.data.forEach(char => createCharacterCard(char))
  }).catch(err => console.log({err, message: 'Errps adding character'}))
}


// Event Listeners

getAllBtn.addEventListener('click', getAllChars);
charBtns.forEach(btn => btn.addEventListener('click', () => getOneChar(btn.id)))
ageForm.addEventListener('submit', getOlderChars);
createForm.addEventListener('submit', addChar);