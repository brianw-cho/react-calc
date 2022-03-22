const express = require("express")
const app = express()
const port = 3080
const math = require("mathjs")

app.get('/calculator', (req, res) => {

    let expr = req.query.expr
    expr = expr.replaceAll("p", "+")

    let result

    try {
        result = math.evaluate(expr)
        result = math.format(result, { precision: 14 })
    } catch (error) {
        result = "SyntaxError"
    }

    res.setHeader('content-type', 'text/plain')
    res.send(JSON.stringify(result))
})

app.listen(port, () => {
    console.log(`Calculator Server Listening on Port ${ port }`)
})