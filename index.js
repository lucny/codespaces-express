const express = require('express')
const app = express()
const port = 3000

// Nastavení složky public jako statický adresář
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Marek')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
