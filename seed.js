const db = require('./models');

const seedUserData = [
  {name: "Joe Doe", username: "joe", email: "joe@ga.com", currentCity: "San Fran"},
  {name: "Dan John", username: "dan", email: "dan@ga.com", currentCity: "London"},
  {name: "Tim Timson", username: "tim", email: "tim@ga.com", currentCity: "Paris"},
  {name: "John Smith", username: "john", email: "john@ga.com", currentCity: "San Jose"},
]

// Remove all data
db.UserData.deleteMany({})
  .catch(err => console.log({error: err}))
  .then(deletedUsers => {
    console.log('Deleted all existing users successfully.');

    // Populate Mongo with new seed
    db.UserData.create(seedUserData)
      .catch(err => console.log({error: err}))
      .then(newUsers => {
        console.log(`Created ${newUsers.length} new users successfully.`);
        process.exit();
    });

  })
