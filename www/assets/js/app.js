var player = {
	x: 0,
	y: 0,
	room: "",
	name: ""
}

var App = function(){

	return {
		init: function(){
			//start coding
			while(!player.name)
				player.name = prompt("What's ur nickname?");

			bN.on('room joined', (data)=>{
				player.room = data;
			});

			bN.on('new join', (data)=>{
				console.log("new join");
				console.log(data);
			});


			bN.emit("join", player);

			$(document).on("keydown", function(e){
				if(e.which == 38) player.y--;
				if(e.which == 40) player.y++;
				if(e.which == 37) player.x--;
				if(e.which == 39) player.x++;
			})

			setInterval(this.render, 1000/60)
		},
		render: function() {
			$("body").html(`
				x: ${player.x} <br>
				y: ${player.y} <br>
				room: ${player.room} <br>
				name: ${player.name}
			`);
		}
	}
}();

$(document).ready(function(){
	bN.init(App.init.bind(App));
});