'use strict'

const Sequelize = require('sequelize');

const rds = require('./rds')

var User = rds.define('user', {
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	userslug: Sequelize.STRING,
	email: Sequelize.STRING,
	picture: Sequelize.STRING,
	fullname: Sequelize.STRING,
	uploadedpicture: Sequelize.STRING,
	banned: Sequelize.INTEGER
});

User.sync({force: false}).then(function () {
	console.log("user table synchronized");
});

exports.createUser = function(user, cbSuccess, cbFailure) {
	User
	.findOrCreate({where: {username: user.username, email: user.email}, defaults: user})
	.spread( (result, created) => {
		if (created) {
			console.log('new user created');
			cbSuccess(result.id);
		} else {
			console.error("user exists", result)
			cbFailure(new Error("cannot create user"));
		}
	})
}

exports.updatePassword = function(userId, hash, cbSuccess, cbFailure) {
	User
	.update({
		password: hash
	}, {
		where: {id: userId}
	})
	.then(()=>{
		console.log(`user password updated ${userId}`);
		cbSuccess();
	})
	.catch((err) => {
		console.error(err);
		cbFailure();
	})
}

exports.updateFields = function(userId, fields, callback) {
	User
	.update(fields, {
		where: {id: userId}
	})
	.then(()=>{
		console.log(`user updated ${userId}`);
		callback();
	})
	.catch((err) => {
		console.error(err);
		callback();
	})
}
