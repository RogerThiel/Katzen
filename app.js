const express = require('express');
const pets = require('./petList');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <h1>Adopt a Pet!</h1>
    <p>Browse through the links below to find your new furry friend:</p>
    <ul>
      <li><a href="/animals/dogs">Dogs</a></li>
      <li><a href="/animals/cats">Cats</a></li>
      <li><a href="/animals/rabbits">Rabbits</a></li>
    </ul>
  `);
});

app.get('/animals/:pet_type', (req, res) => {
  const petType = req.params.pet_type;
  const petList = pets[petType];
  let response = `<h1>List of ${petType}</h1><ul>`;
  petList.forEach((pet, index) => {
    response += `<li><a href="/animals/${petType}/${index}">${pet.name}</a></li>`;
  });
  response += '</ul>';
  res.send(response);
});

app.get('/animals/:pet_type/:pet_id', (req, res) => {
  const petType = req.params.pet_type;
  const petId = req.params.pet_id;
  const pet = pets[petType][petId];
  res.send(`
    <h1>${pet.name}</h1>
    <img src="${pet.url}" alt="${pet.name}">
    <p>${pet.description}</p>
    <ul>
      <li>Breed: ${pet.breed}</li>
      <li>Age: ${pet.age}</li>
    </ul>
  `);
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});