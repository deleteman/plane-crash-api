var vatican = require("vatican"),
	lib = require("./lib")


var server = new vatican()

startServer()	

server.preprocess(function(req, res, next) {
	function fib(n) {
		if(n > 1){
			return fib(n-1) + fib(n-2)
		} else {
			return n;
		}
	}	
	console.log('"Massaging" data...')
	fib(34)
	next()
})
server.preprocess(function(req, res, next) {
	if(typeof req.params.body == 'string') {
		try { 
			req.params.body = JSON.parse(req.params.body)
		} catch(ex) {
			next({code: 403, message: "Invalid input format"})
		}
	}
	next()
})

server.preprocess(lib.errorHandler)

//Everything is a json
server.postprocess(function(req, res, next) {
	res.setHeader(['Content-Type', 'application/json'])
	next()
})

function startServer() {
	server.start(function() {
		console.log("Server started!")
	})
}
