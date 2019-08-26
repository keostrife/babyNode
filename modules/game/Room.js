const Client = require('./Client');

class Room {
	constructor(opts) {
		this.id = opts.id;
		this.clients = [];
		this.data = null;
	}

	addPlayer(socket) {
		let client = new Client(socket);
		this.clients.push(player);
		return true;
		//adding socket to player list
	}




}

module.exports = Room;