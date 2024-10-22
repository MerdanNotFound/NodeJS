const http = require("http")
const fs = require("fs")

const chattingHistory = []

const server = http.createServer(async (req, res) => {
    if (req.url === "/") {
        const data = fs.readFileSync("./index.html")
        res.writeHead(200, {
            "Content-Type": "text/html"
        })
        res.write(data)
        res.end()
    } else if (req.url === "/index.js") {
        const data = fs.readFileSync("./client.js")
        res.writeHead(200, {
            "Content-Type": "text/javascript"
        })
        res.write(data)
        res.end()
    } else if (req.url === "/form/data" && req.method === "POST") {
        const buffers = []
        for await (const chunk of req) {
            buffers.push(chunk)
        }
        const data = Buffer.concat(buffers).toString()
        const result = JSON.parse(data)
        result.sms = result.sms.slice(0, 50)
        result.ady = result.ady.slice(0, 10)
        chattingHistory.push(result)
        res.writeHead(200, {
            "Content-Type": "application/json"
        })
        res.write(JSON.stringify({status: "ok"}))
        res.end()
    } else if (req.url === "/form/data" && req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "application/json"
        })
        res.write(JSON.stringify([...chattingHistory].reverse().slice(0, 10)))
        res.end()
    }
})

server.listen("4000", () => console.log("server ishe bashlady..."))
