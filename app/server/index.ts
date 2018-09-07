import express from 'express'

const PORT = process.env.PORT || 5000
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}.`)
})
