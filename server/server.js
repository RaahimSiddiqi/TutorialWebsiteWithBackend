const express = require("express")
const path = require("path")

const app = express()

const PORT = 3001
const distPath = path.join(__dirname, '../client/dist')

app.use(express.static(distPath))

app.post('/login', (req, res) => {
    res.json({status: 200, message: "Login Successful"})
}) 

app.get('/*', (req, res) => {
    res.sendFile('index.html', { root : distPath })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})