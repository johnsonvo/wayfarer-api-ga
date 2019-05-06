const db = require('./models');

const pass1234 = '$2a$10$u5j5gwgDwDO53lzy3eUqWOsq5YCDBv4GLCVbpzXnxgn1nnYNtSvOK';
const seedUserData = [
  {name: "Joe Doe", password: pass1234, username: "joe", email: "joe@ga.com", currentCity: "San Fran"},
  {name: "Dan John", password: pass1234, username: "dan", email: "dan@ga.com", currentCity: "London"},
  {name: "Tim Timson", password: pass1234, username: "tim", email: "tim@ga.com", currentCity: "Paris"},
  {name: "John Smith", password: pass1234, username: "john", email: "john@ga.com", currentCity: "San Jose"},
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

const numOfPosts = 100;

const seedUserPostData = [];
for (let i = 0; i < numOfPosts; i++) {
  const randomUser = seedUserData[Math.floor(Math.random() * seedUserData.length)];
  const randomText = sampleText[Math.floor(Math.random() * sampleText.length)];
  const randomCity = seedCityData[Math.floor(Math.random() * seedCityData.length)];
  const randomTitle = randomText.substring(5, 25);

  seedUserPostData.push({
    username: randomUser.username,
    cityURL: randomCity.cityURL,
    title: randomTitle,
    content: randomText,
  });
};

// Remove all users
db.UserData.deleteMany({})
  .catch(err => console.log({action: 'deleting users', error: err}))
  .then(deletedUsers => {
    console.log('Deleted all existing users successfully.');

    // Populate Mongo with new Users seed data
    db.UserData.create(seedUserData)
      .catch(err => console.log({action: 'creating users', error: err}))
      .then(newUsers => {
        console.log(`Created ${newUsers.length} new users successfully.`);

        // Remove all posts
        db.UserPost.deleteMany({})
          .catch(err => console.log({action: 'deleting posts', error: err}))
          .then(deletedUsers => {
            console.log('Deleted all existing posts successfully.');

            // Populate Mongo with new UserPosts seed data
            db.UserPost.create(seedUserPostData)
            .catch(err => console.log({action: 'creating posts', error: err}))
            .then(newPosts => {
              console.log(`Created ${newPosts.length} new user posts successfully.`)

              // Delete ALL cities
              db.City.deleteMany({})
                .catch(err => console.log({action: 'deleting posts', error: err}))
                .then(deletedCities => {
                  console.log('Deleted all existing cities success')

                  // Populate Mongo with new City seed data
                  db.City.create(seedCityData)
                    .catch(err => console.log({action: 'creating cities', error: err}))
                    .then(newCities => {
                      console.log(`Created ${newCities.length} new cities`)
                      process.exit();
                    })
                })
            });
          });
      });
  });