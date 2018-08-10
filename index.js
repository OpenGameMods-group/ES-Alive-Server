// index.js - start server and listen on port

const { PORT } = require('./config/host')
const app = require('./app')

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`)
})
