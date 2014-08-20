var lib = require("../lib")
	_ = require("lodash")


module.exports = PlaneCrash;


function PlaneCrash() {}

//@endpoint (url: /planecrash method: get)
PlaneCrash.prototype.getLast = function(req, res, next) {
	getLastArticle(renderArticle)
	

	function renderArticle(err, art) {
		if(err) return next(err)
		if(!art) return next({code: 404, message: "There  are no crash reports on the database"})
		res.send(art)
	}
}

//@endpoint (url: /planecrash method: post) 
PlaneCrash.prototype.newCrash = function(req, res, next) {
	lib.db.model("planeCrash")
		.create(req.params.body, renderArticle)

	function renderArticle(err, art) {
		if(err) return next(err)
		res.send(art)
	}
}

//@endpoint (url: /planecrash method: put)
PlaneCrash.prototype.updateLast = function(req, res, next) {
	lib.db.model("planeCrash")
		.update(req.params.body, function(err, article) {
			if(err) return next(err)
			res.send(article)
		})
}

function getLastArticle(cb) {
	lib.db.model("planeCrash")
		.load(cb)
}