const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials('partials_absolute_path');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);
      res.render('beers', { beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  // const randomBeer = punkAPI.getRandom();
  // console.log(randomBeer);
  punkAPI
    .getRandom()
    .then(randomBeer => {
      console.log(randomBeer);
      const [a, b, c] = randomBeer[0].food_pairing;
      randomBeer[0].a = a;
      randomBeer[0].b = b;
      randomBeer[0].c = c;
      res.render('random-beer', { randomBeer });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
console.log(4);
