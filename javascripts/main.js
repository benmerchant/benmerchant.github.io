$(document).ready(function(){
	var clockDiv = $('#clock-div');

	// the date it will all work out
	var bonfire = new Date("Sept 25, 2017 00:00:00").getTime();

	// 1 second update interval
	var timeANDdistance = setInterval(function(){

		// when is now?
		var current = new Date().getTime();

		// distance between present and future
		var distance = bonfire - current;

		// calculations for day, hour, minute, sec
		var days = Math.floor(distance / (1000*60*60*24));
		var hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
		var minutes = Math.floor((distance % (1000*60*60))/(1000*60));
		var seconds = Math.floor((distance % (1000*60))/1000);

		// insert the result into the DOM
		var insert_this = numberPad(days) + ':' + numberPad(hours) + ':' + numberPad(minutes) + ':' + numberPad(seconds);
		// console.info(insert_this);
		clockDiv.html(insert_this);

		
		// when the countdown is completed
		if(distance<0){
			clearInterval(timeANDdistance);
			clockDiv.html('Shia should be 4 months gestated!');
		} // tested, it works



	}, 1000); // the 1000 is the 1 second interval

});

function numberPad(num){
	var numString = num+'';
	while(numString.length < 2){
		numString = '0' + numString;
	}
	return numString;
}