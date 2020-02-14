const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data'); // Import of the data from './data.json'

const MONGODB_URI = 'mongodb://localhost/recipeApp';

// Connection to the database "recipeApp"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
    return Recipe.create({
      title: 'Felipes Orange and Milk-Braised Pork Carnitas',
      level: 'UltraPro Chef',
      ingredients: [
        '3 1/2 pounds boneless pork shoulder, cut into large pieces',
        '1 tablespoon freshly ground black pepper',
        '1 tablespoon kosher salt, or more to taste',
        '2 tablespoons vegetable oil',
        '2 bay leaves',
        '2 teaspoons ground cumin',
        '1 teaspoon dried oregano',
        '1/4 teaspoon cayenne pepper',
        '1 orange, juiced and zested'
      ],
      cuisine: 'American',
      dishType: 'Dish',
      image: 'https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg',
      duration: 160,
      creator: 'Chef John'
    });
  })
  .then(recipe => {
    console.log(recipe.title);
    return Recipe.insertMany(data);
  })

  .then(() => {
    return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })

  .then(() => {
    console.log('Rigatoni duration updated successfully');
  })

  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })

  .then(() => {
    console.log('Carrot cake deleted successfully');
  })

  .then(recipes => console.log(recipes))

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
