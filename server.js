const express = require("express")
const app = express()
const port = 9000
const math = require("mathjs")

app.get('/calculator', (req, res) => {
    console.log("GET REQUEST")

    let expr = req.query.expr
    expr = expr.replaceAll("p", "+")

    let result = math.evaluate(expr)
    result = math.format(result, {precision: 14})

    console.log(result)

    res.setHeader('content-type', 'text/plain')
    res.send(JSON.stringify(result))
})

app.listen(port, () => {
    console.log(`Calculator Server Listening on Port ${port}`)
})