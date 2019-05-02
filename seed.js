const db = require('./models');

const seedData = [
  {
    name: "John Doe",
    username: "JDoe",
    email: "jdoe@ga.com",
    fCity: "SF",
  },
  {
    name: "Foo Bar",
    username: "FBar",
    email: "fbar@ga.com",
    fCity: "GA",
  },
  {
    name: "Too Low",
    username: "Tlow",
    email:"tlow@ga.com",
    fCity:"SF",
  }

]

// Remove all data
db.UserData.deleteMany((err, deletedUserData) => {
  if (err) console.log(err);
  console.log('Deleted User Data successfully');

  // Populate Mongo with new seed
  db.UserData.create(seedData, (err, newUserData) => {
    if (err) console.log(err);
    console.log(`Created ${newUserData.length} new Data successfully`);
    process.exit();
  });
});