//SET THESE VARS
var $transitionLength = 400;
var $timeBetweenTransitions = 4000;

//STORAGE
var imageCount = 0;
var currentImageIndex = 0;
var currentScrollIndex = 0;
var $imageBank = [];
var $thumbBank = [];
var $mainContainer = $("#gallery-main");
var $thumbContainer = $("#thumbcon");
var currentElement;

//CONTROLS
var $go = true;

$(document).ready(function(){

	$("#gallery-hidden img").each(function() {
		$imageBank.push($(this).attr("id", imageCount));
		imageCount++;
	});

	generateThumbs();

	setTimeout(function () {
		imageScroll(0);
	}, $timeBetweenTransitions);

	$('#left-arrow').click(function () {
		thumbScroll("left");
		toggleScroll(true);
    });

	$('#right-arrow').click(function () {
		thumbScroll("right");
		toggleScroll(true);
    });

	$('#thumbcon img').on('click',function () {
		for(var i = 0; i < imageCount; i++){
			if($imageBank[i].attr('src') == $(this).attr('src')){
				$mainContainer.fadeOut($transitionLength);
				$thumbBank[currentImageIndex].removeClass("selected");
				setTimeout(function () {
					$mainContainer.html($imageBank[i]);
					$thumbBank[i].addClass("selected");
					$mainContainer.fadeIn($transitionLength);
				}, $transitionLength);

				currentImageIndex = i;

				return false;
			}
		}
	});

	$('#playtoggle').click(function () {
		toggleScroll(false);
	});
});

function toggleScroll(bool){
	if($go){
		$go = false;
		$('#playtoggle').removeClass('icon-pause').addClass('icon-play');
	}else{
		$go = true;
		$('#playtoggle').removeClass('icon-play').addClass('icon-pause');
	}

	if(bool){
		$go = false;
		$('#playtoggle').removeClass('icon-pause').addClass('icon-play');
	}
}

function thumbScroll(direction){

	if(currentScrollIndex >= 0 || currentScrollIndex < imageCount){
		var marginTemp = currentScrollIndex*200 - 5;
		if(direction == "right"){
			$thumbBank[0].animate({ marginLeft: -marginTemp }, 1000);
			currentScrollIndex++;
		}else if(direction == "left"){
			$thumbBank[0].animate({ marginLeft: -marginTemp+200 }, 1000);
			currentScrollIndex--;
		}
	}
}

function generateThumbs(){
	for(var i = 0; i < imageCount; i++){

		var $tempObj = $('<img id="'+i+'t" class="thumb" src="'+$imageBank[i].attr('src')+'" />');

		if(i == 0)
			$tempObj.addClass("selected");

		$thumbContainer.append($tempObj);
		$thumbBank.push($tempObj);

	}
}

function imageScroll(c){
	if($go){

		$thumbBank[c].removeClass("selected");

		c++

		if(c == $imageBank.length)
			c = 0;

		$mainContainer.fadeOut($transitionLength);
		setTimeout(function () {
			$mainContainer.html($imageBank[c]);
			$thumbBank[c].addClass("selected");
			thumbScroll("left");
			$mainContainer.fadeIn($transitionLength);
		}, $transitionLength);

	}

	setTimeout(function () {
		imageScroll(currentImageIndex);
	}, $timeBetweenTransitions);

	currentImageIndex = c;
	currentScrollIndex = c;
}

