const express = require('express')
const util = require('./util')

const app = express()
const port = 3000

app.use(express.json())




app.post('/', (req, res) => {
    console.log(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})