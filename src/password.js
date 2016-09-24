'use strict';
var crypto = require('crypto');


(function(module) {
	// var fork = require('child_process').fork;
	const salt = "$AAFFQWf13232";

	module.hash = function(rounds, password, callback) {
		 callback(null, sha512(password));	

		// forkChild({type: 'hash', rounds: rounds, password: password}, callback);
	};

	module.compare = function(password, hash, callback) {
		console.log('compare password');
		let hashed = sha512(password);
		if (hash === hashed) {
			callback(null, true);
		} else {
			console.error('error', 'incorrect password');
			callback(new Error("incorrect password"));
		}
		// forkChild({type: 'compare', password: password, hash: hash}, callback);
	};

	function sha512 (password) {
		 var hash = crypto.createHmac('sha512', salt);
		 hash.update(password);
		 return hash.digest('hex');
	}

	// function forkChild(message, callback) {
	// 	var forkProcessParams = {};
	// 	if(global.v8debug || parseInt(process.execArgv.indexOf('--debug'), 10) !== -1) {
	// 		forkProcessParams = {execArgv: ['--debug=' + (5859), '--nolazy']};
	// 	}
	// 	var child = fork('./bcrypt', [], forkProcessParams);

	// 	child.on('message', function(msg) {
	// 		if (msg.err) {
	// 			return callback(new Error(msg.err));
	// 		}

	// 		callback(null, msg.result);
	// 	});

	// 	child.send(message);
	// }

	return module;
})(exports);