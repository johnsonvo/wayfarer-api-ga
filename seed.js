const db = require('./models');



// Remove all data
db.UserData.deleteMany((err, deletedUserData) => {
  if (err) console.log(err);
  console.log('Deleted User Data successfully');

  // Populate Mongo with new seed
  db.UserData.create(UserData, (err, newUserData) => {
    if (err) console.log(err);
    console.log(`Created ${newUserData.length} new Data successfully`);
    process.exit();
  });
});