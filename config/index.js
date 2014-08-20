var _ = require("lodash")


var config = {
	development: {
	
	},
	production: {
		
	}
}

var global = {
	report: {
		storagePath: __dirname + '/../reports/'
	}
}

var env = process.env.NODE_ENV || 'development'

var finalConfig = _.extend(global, config[env])
module.exports = finalConfig