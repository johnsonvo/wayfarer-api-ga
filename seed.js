const db = require('./models');

const seedUserData = [
  {name: "Joe Doe", username: "joe", email: "joe@ga.com", currentCity: "San Fran"},
  {name: "Dan John", username: "dan", email: "dan@ga.com", currentCity: "London"},
  {name: "Tim Timson", username: "tim", email: "tim@ga.com", currentCity: "Paris"},
  {name: "John Smith", username: "john", email: "john@ga.com", currentCity: "San Jose"},
]

const seedCityData = [
  {cityName: 'San Francisco', cityURL: 'san-francisco', cityImage: '', country: 'USA'},
  {cityName: 'London', cityURL: 'london', cityImage: '', country: 'UK'},
  {cityName: 'Sydney', cityURL: 'sydney', cityImage: '', country: 'Australia'},
  {cityName: 'Seattle', cityURL: 'seattle', cityImage: '', country: 'USA'},
]

const sampleText = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut faucibus pulvinar elementum integer enim neque volutpat ac.",
  "Ac turpis egestas sed tempus urna et pharetra pharetra.",
  "Nunc id cursus metus aliquam eleifend.",
  "In ante metus dictum at tempor commodo ullamcorper.",
  "Lobortis feugiat vivamus at augue.",
  "Nibh nisl condimentum id venenatis.",
  "Donec ac odio tempor orci dapibus ultrices.",
  "Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque.",
  "Sed pulvinar proin gravida hendrerit.",
]

// const seedUserPostData = [
//   {username: 'joe', cityName: 'London', title: 'Lorem', content: ''}
// ]

const seedUserPostData = [];

const numOfPosts = 10;
for (let i = 0; i < numOfPosts; i++) {
  const randomUser = seedUserData[Math.floor(Math.random() * seedUserData.length)];
  const randomText = sampleText[Math.floor(Math.random() * sampleText.length)];
  const randomCity = seedCityData[Math.floor(Math.random() * seedCityData.length)];
  const randomTitle = randomText.substring(0, 10);

  seedUserPostData.push = {
    username: randomUser.username,
    cityName: randomCity.cityName,
    title: randomTitle,
    content: randomText,
  };
}

console.log(seedUserPostData);

// // Remove all data
// db.UserData.deleteMany({})
//   .catch(err => console.log({error: err}))
//   .then(deletedUsers => {
//     console.log('Deleted all existing users successfully.');

//     // Populate Mongo with new seed
//     db.UserData.create(seedUserData)
//       .catch(err => console.log({error: err}))
//       .then(newUsers => {
//         console.log(`Created ${newUsers.length} new users successfully.`);
//         process.exit();
//     });

//   })
