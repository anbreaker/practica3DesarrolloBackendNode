'use strict';

require('dotenv').config();

const readline = require('readline');
const conn = require('./mongooseDatabase');
const Advert = require('./models/Advert');
const fs = require('fs-extra'); //fs with Promise implement

const jsonAdverts = fs.readFileSync('src/db.json', 'utf-8');
const ads = JSON.parse(jsonAdverts);

conn.once('open', async () => {
  try {
    const response = await askUser('Are you sure want to initialize DataBase? (y/n)\n');

    if (response.toLowerCase() !== 'y') {
      console.log('Process is aborted.');
      return process.exit(0);
    }

    await initAdverts();

    conn.close();
  } catch (error) {
    console.log('Error :$', error);
    process.close(1);
  }
});

async function initAdverts() {
  // Delet database
  console.log('Delete all Adverts');
  await Advert.deleteMany();

  // Init Documents
  console.log('Loads initial Database Adverts.');
  const result = await Advert.insertMany(ads);
  console.log(`\tAds created ${result.length}.`);
}

const askUser = (ask) => {
  return new Promise((resolve, reject) => {
    const readLine = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readLine.question(ask, (userResponse) => {
      readLine.close();
      resolve(userResponse);
    });
  });
};
