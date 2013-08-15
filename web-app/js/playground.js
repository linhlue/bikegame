/**
 * Created with JetBrains PhpStorm.
 * User: duylinhludde
 * Date: 08.08.13
 * Time: 08:30
 * To change this template use File | Settings | File Templates.
 */

$(function (){
	var canvas = $('#myCanvas').get(0);
	var context = canvas.getContext('2d');
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var world = new worldObject();
	var radius = 20;
	world.x = centerX;
	world.y = centerY;
	var draw = function() {
		context.clearRect(0,0,canvas.width,canvas.height);

		buildGrids(10, "#eee", 50);


		context.beginPath();
		context.arc(world.x,world.y, radius, 0, 2 * Math.PI, false);
		context.fillStyle = '#dd0033';
		context.fill();
		context.lineWidth = 1;
		context.strokeStyle = '#ee0011';
		context.stroke();
	}
	var buildGrids = function (gridPixelSize, color, gap)
	{
		context.lineWidth = 0.5;
		context.strokeStyle = color;


// horizontal grid lines
		for(var i = 0; i <= canvas.height; i = i + gridPixelSize)
		{
			context.beginPath();
			context.moveTo(0, i);
			context.lineTo(canvas.width, i);
			if(i % parseInt(gap) == 0) {
				context.lineWidth = 2;
			} else {
				context.lineWidth = 0.5;
			}
			context.closePath();
			context.stroke();
		}

// vertical grid lines
		for(var j = 0; j <= canvas.width; j = j + gridPixelSize)
		{
			context.beginPath();
			context.moveTo(j, 0);
			context.lineTo(j, canvas.height);
			if(j % parseInt(gap) == 0) {
				context.lineWidth = 2;
			} else {
				context.lineWidth = 0.5;
			}
			context.closePath();
			context.stroke();
		}

	}

	draw();
	$('canvas').keydown(function(e){
		$('#yAxe').val(world.y);
		$('#xAxe').val(world.x);
		switch(e.keyCode) {
			case 65:
				world.move('left');
				break;
			case 83:
				world.move('top');
				break;
			case 68:
				world.move('right');
				break;
			case 87:
				world.move('down');
				break;
			case 191:
				alert("go");
			default:
				;
		}
		draw();

		ajaxCall(world);
	});
});
var ajaxCall = function(world) {
	var fbUrl= ajaxAction;
	$.ajax({
		dataType: "json",
		url: fbUrl ,
		data: { x: world.x, y: world.y },
		type: 'POST',
		success: function (resp) {
			console.log(resp);
			$('#ajaxData').text(JSON.stringify(resp));
		},
		error: function(e){
			alert('shit happes');
			$('#ajaxData').text(e);
		}
	});
}
var worldObject = function() {
	var me = this;
	me.x = 0;
	me.y = 0;

	me.move = function(direction) {
		switch(direction) {
			case 'left':
				if(me.x == 0) {
					break;
				}
				me.x -= 1;
				break;
			case 'top':
				me.y += 1;
				break;
			case 'right':
				me.x += 1;
				break;
			case 'down':
				if(me.y == 0) {
					break;
				}
				me.y -= 1;
				break;
			default:
				alert('crap');
		}
	}
}