const mongoose = require('mongoose');
const {config} = require("../config/secret");


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${config.userDb}:${config.passDb}@cluster0.rnllwmz.mongodb.net/black22`);
  console.log("mongo connect project atlas")

}