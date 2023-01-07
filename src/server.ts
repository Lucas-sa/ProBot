import morgan = require("morgan");
import cors = require("cors");
import express = require('express')

const app = express()
const port = 3000

app.use(morgan('dev'))
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})