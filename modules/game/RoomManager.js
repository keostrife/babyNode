const Room = require('./Room');
const config = require('./_config');

class RoomManager {
	constructor() {
		this.rooms = [];
	}

	//generate unique room id using random string and timestamp
	generateRoomId() {
		return `r${Date.now()}`;
	}

	createRoom() {
		let newRoomId = this.generateRoomId();
		let room = new Room({
			id: newRoomId
		});

		this.rooms.push(room);

		return room;
	}


}

module.exports = RoomManager;