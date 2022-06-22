const express = require('express')

const requests = require('./data/requests.json')

const app = express()
const port = 3000

app.use(express.json())

app.get('/requests', (req, res) => {
    res.json(requests)
})

const parseIfString = (value) =>  {
    if (typeof value === 'string') return value
    if (value.toLowerCase() === 'true') return true
    if (value.toLowerCase() === 'false') return false
    if (value.match(/^\d+$/)) return Number.parseInt(value)
    if (value.match(/^\d+\.\d+$/)) return Number.parseInt(value)
}

app.use((req, res) => {
    const path = req.path
    const method = req.method
    const params = method === 'GET' ?  req.query : req.body

    const request = requests.find(r => r.path === path && r.method === r.method)

    const sample =
      !!request?.samples ?
        request.samples.find(s => Object.keys(params).every(key => s.params[key] === parseIfString(params[key]))) :
        null

    if (sample) {
        res.json(sample)
    } else {
        res.status(404)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})