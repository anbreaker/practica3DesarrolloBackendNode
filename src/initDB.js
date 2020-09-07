'use strict';

require('dotenv').config();

const readline = require('readline');
const conn = require('./mongoose_database');
const Advert = require('./models/Advert');

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
  console.log('Delete Adverts');
  await Advert.deleteMany();

  // Init Documents
  console.log('Loads Adverts.');
  const result = await Advert.insertMany([
    {
      name: 'Vant Pc ultraMOOVE-s',
      onSale: true,
      cost: 789,
      imagePath: 'computer.jpg',
      tags: ['tecnology', 'developer', 'work'],
    },
    {
      name: 'OnePlus 8',
      onSale: false,
      cost: 425,
      imagePath: 'oneplus.jpg',
      tags: ['tecnology', 'lifestyle'],
    },
    {
      name: 'NIKON D610',
      onSale: true,
      cost: 707,
      imagePath: 'nikon.jpg',
      tags: ['tecnology', 'lifestyle'],
    },
  ]);
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
