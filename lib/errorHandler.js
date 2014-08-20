


module.exports = function(err, req, res, next) {
	res.statusCode = err.code || 500
	res.setHeader(['content-type', 'application/json'])
	res.send(JSON.stringify(err))
}