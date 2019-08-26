const RoomManager = require('./RoomManager');

class Game {
	constructor(io) {
		this.roomManager = new RoomManager(io);
	}
}

module.exports = Game;