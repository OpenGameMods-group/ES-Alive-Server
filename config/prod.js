// prod.js - production keys stored in process.env

module.exports = {
  mongoURI: process.env.MONGODB_URI,
  SECRET_KEY: process.env.SECRET_KEY
}
