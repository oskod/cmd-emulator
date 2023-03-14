const http = require("http")
const fs = require("fs")

const ROOT = process.cwd()

function handleRequest(req, res) {
	const path = req.url.slice(1).split("?")[0].split("/")

	switch (path[0]) {
		case "":
			res.end(fs.readFileSync(`${ROOT}/public/index.html`));

			break;
		default:
			const publicPath = `${ROOT}/public/${path.join("/")}`
			if (fs.existsSync(publicPath) && fs.lstatSync(publicPath).isFile()) {
				res.end(fs.readFileSync(publicPath))
			} else {
				res.writeHead(404)
				res.end("404")
			}

			break;
	}
}

http.createServer(handleRequest).listen(80)