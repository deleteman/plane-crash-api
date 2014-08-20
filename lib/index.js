
module.exports = {
	db: {
		model: function(name) {
			var path = __dirname + "/../models/" + name + ".js"
			var m = require(path)
			return new m()
		}
	},
	errorHandler: require("./errorHandler")
}