var fs = require("fs"),
	config = require("../config")



var Model = function() {
	this.loadedReport = ""
	this.data = {
		author: {
			name: null,
			email: null
		},
		content: "",
		version: 0
	}
}

Model.prototype.create = function(json, cb) {
	var validationErrors = null
	var self = this
	var validationErrors = validateInput(json)
	if(validationErrors.length == 0) {
		self.data = json
		self.save(function(err) {
			if(err) return cb({code: 500, message: "Error storing report: " + err})
			cb(null, self.data)
		})
		
	} else {
		cb({code: 403, message: "Invalid input: " + validationErrors.join("-")})
	}
}

Model.prototype.save = function(fname, cb) {
	if(typeof fname == 'function') {
		cb = fname
		fname = getReportPath() 
	}
	var self = this
	fs.writeFile(fname, JSON.stringify(self.data), cb )
}

Model.prototype.load = function(cb) {
	var self = this
	fs.readdir(config.report.storagePath, function(err, files) {
		if(err) return cb({code: 500, message: "Error loading latest report: " + err})
		var latest = files.pop()
		if(!latest) return cb({code: 404, message: "No report found!"})
		self.loadedReport = config.report.storagePath + latest
		fs.readFile(self.loadedReport, function(err, content) {
			if(err) return cb({code: 500, message: "Error loading latest article: " + err})	
			self.data = JSON.parse(content)
			cb(null, self.data)
		})
	})	
}

Model.prototype.update = function(json, cb) {
	var self = this
	var errors = validateInput(json)
	if(errors.length == 0) {
		this.load(function(err) {
			if(err) return cb(err)
			self.data = json
			self.save(self.loadedReport, function(err) {
				if(err) return cb({code: 500, message: "Error updating report: " + err})
				cb(null, self.data)
			})
		})	
	} else {
		cb({code: 403, message: "Invalid input: " + errors.join("-")})
	}
}

function getReportPath() {
	return config.report.storagePath + (new Date()).getTime() + ".txt"
}

//Basic validation
function validateInput(json) {
	var errors = []

	if(!json.author) {
		errors.push('Author is required')
	} else {
		if(!json.author.name) {
			errors.push('Authors name is required')
		}
		if(!json.author.email) {
			errors.push('Authors email is required')
		}
	}
	if(!json.content) {
		errors.push(["No content found, please try again with something interesting!"])
	}

	return errors
}

module.exports = Model
