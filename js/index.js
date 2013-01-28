var current = getUrlVars();
var curradd = current[0]+splitkey+current[1];
var article = false;
var articleStore = [];
var popupStatus = 0;
var $bodyheader = $('#body-header');
var $body = $("body");
var $background = $("#background");
var $content = $("#content");
var $root = $('html, body');

$(document).ready(function(){

	$background.live('click', function () {
		popupClose();
	});
	//Press Escape event!
	$(document).keypress(function(e){
		if(e.keyCode==27 && popupStatus==1){
			popupClose();
		}
	});

	determineContent();
	menuAjax();
	welcome();

	var sidemenu = assembleMenu(current[0]);

	$('#menu-con a[href$="'+ajaxkey+sidemenu+'"]').find('span').addClass('selected-mi');

	$('#content-menu .menu-item').live('click', function () {

		$(this).parent().find('.selected-mi').removeClass('selected-mi');
		$(this).find('span').addClass('selected-mi');

		setTimeout(function () {

			var request = getUrlVars();

			if(stringeq(current[0],request[0]) && stringeq(current[1],request[1]) && !article){
				//do nothing if they are equal
			}else{
				determineContent();
			}

		}, 300);
    });

	$('.pictures img').live('click', function () {
		popupimage(this);
	});

	$('.image').live('click', function () {
		popupimage(this);
	});

	$('#menu-con .menu-item').live('click', function () {

		$(this).parent().find('.selected-mi').removeClass('selected-mi');
		$(this).find('span').addClass('selected-mi');

		setTimeout(function () {

			var request = getUrlVars();

			if(stringeq(current[0],request[0]) && stringeq(current[1],request[1]) && !article){
				//do nothing if they are equal
			}else{
				determineContent();
				menuAjax(); //loads new menu
			}

		}, 300);
    });

	$('#content a').live('click', function () {
		linkhandler(this);

	});

	$(window).resize(function () {
		centerPopup();
	});

});//end of document ready

function linkhandler(link){

	var anchor = $(link).attr('anchor');

	console.log(anchor);

    if(anchor == null || anchor == " " || anchor == ""){
    	setTimeout(function () {

			var request = getUrlVars();

			if(stringeq(current[0],request[0]) && stringeq(current[1],request[1]) && !article){
				//do nothing if they are equal
			}else if(request.length > 4 || request.length < 2){
				//do nothing if it cannot understand the request
			}else{
				determineContent();
				setTimeout(function(){menuAjax();}, 300);
			}

		}, 300);

    	return false;

    }else{

	    $root.animate({
	        scrollTop: $(anchor).offset().top - 100
	    }, 700, function () {
	        window.location.hash = current[0]+splitkey+current[1];
	    });

	    return false;
	}

}

function welcome(){

	setTimeout(function () {

		$bodyheader.animate({height: '42px', padding: '10px'}, 700);

		setTimeout(function () {

			$bodyheader.animate({height: '0px'}, 700);

			setTimeout(function () {
				$bodyheader.attr('style', '');
			},1000);

			$bodyheader.attr('style', '');

		}, 3500);

	}, 400);


}

function popupimage(obj){
	var toURL = $(obj).attr('alt');

	$('#nodice').html('<img id="nodiceimg" src="'+toURL+'" />');
	$('#nodiceimg').load(popupImgDisplay(document.getElementById('nodiceimg')));

}

function determineContent(){

	current = getUrlVars();

	if(stringeq(current[0],"")){
		current[0] = "portfolio";
		current[1] = "grid";
		curradd = current[0]+splitkey+current[1];
	}else if(stringeq(current[0],"http:")){
		current[0] = "portfolio";
		current[1] = "grid";
		curradd = current[0]+splitkey+current[1];
	}else if(stringeq(current[0],"article")){//doesn't correctly set current[1]
		article = true;
		articleStore[0] = current[0];
		articleStore[1] = current[1];
		current[0] = "portfolio";
		current[1] = "design";
		curradd = current[0]+splitkey+current[1];
	}else if(stringeq(current[0],"blogid")){
		article = true;
		articleStore[0] = current[0];
		articleStore[1] = current[1];
		current[0] = "blog";
		current[1] = "web";
		curradd = current[0]+splitkey+current[1];
	}else{
		article = false;
	}

	if(article){
		contentAjax(articleStore[0],articleStore[1]);
	}else{
		contentAjax(current[0],current[1]);
	}

}

function assembleMenu(page){
	if(stringeq(page,"portfolio")){
		return page+splitkey+"grid";
	}else if(stringeq(page,"profile")){
		return page+splitkey+"who";
	}else if(stringeq(page,"blog")){
		return page+splitkey+"web";
	}

	return page+splitkey+"business";

}

function contentAjax(page, doc){
	$content.fadeOut(300);
	$.ajax({ url: '_listeners/listn.index.php',
		  type: 'post',
		  cache: false,
		  data: {submitType: '0', submitPage: page, submitDoc: doc},
		  success: function(data) {
			  setTimeout(function() {
				  $content.html(data);
				  $content.fadeIn(500);
			  }, 200);
		  }
	});
}

function menuAjax(){
	setTimeout(function () {

		if(current.length > 4)
			return false;

		var curradd = current[0]+splitkey+current[1];

		$("#content-menu").load("./content/menu/"+current[0]+".php");

		var interval = setInterval(function() {
	        if($('#content-menu a[href$="'+ajaxkey+curradd+'"]').length > 0) {
	           clearInterval(interval);
	           $('#content-menu a[href$="'+ajaxkey+curradd+'"]').find('span').addClass('selected-mi');
	        }
	    }, 300);
	}, 100);
}

function check(data){
	if(data == "false"){
		return false;
	}

	return true;
}

function stringeq(string1, string2){

	var check1 = new String(string1).valueOf();
	var check2 = new String(string2).valueOf();

	if(check1 == check2){
		return true;
	}

	return false;
}

function getUrlVars(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf(ajaxkey)+ajaxkey.length).split(splitkey);
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function popupImgDisplay(img){
	setTimeout(function () {

		if(img.width <= 10){
			popupImgDisplay(img);
			recurse = true;
		}else if(img.height <= 10){
			popupImgDisplay(img);
			recurse = true;
		}

		if(recurse)
			return recurse;

		popupStatus = 1;
		var bodysize = false;
		var recurse = false;
		var $window = $(window);
		var windowWidth = $window.width();
		var windowHeight = $window.height();
		var popupHeight = img.height;
		var popupWidth = img.width;

		var topnum = (windowHeight/2)-((popupHeight+20)/2);
		var widthnum = (windowWidth/2)-((popupWidth+20)/2);

		if(topnum < 0){topnum = 0;bodysize = true;}
		if(topnum > 200){topnum = 200;}
		if(widthnum < 0){widthnum = 0;bodysize = true;}

		if(bodysize){
			$body.css("overflow", "show");
		}else{
			$body.css("overflow", "hidden");
		}

		csshash = {
			"width": img.width,
			"height": img.height,
			"position": "fixed",
			"top": topnum,
			"left": widthnum
		};

		$("#nodice").css(csshash);

		$background.css("z-index", "10");
		$background.animate({opacity: 1}, 700);

	}, 50);
}

function popupClose(){
	popupStatus = 0;
	$background.animate({opacity: 0}, 700, function() {
		$background.css({
			"z-index": "-1"
		});
	});
	$body.css("overflow", "auto");
}

function centerPopup(){
	if(popupStatus == 1){
		var bodysize = false;
		var $window = $(window);
		var img = document.getElementById('nodiceimg');
		var windowWidth = $window.width();
		var windowHeight = $window.height();
		var popupHeight = img.height;
		var popupWidth = img.width;

		var topnum = (windowHeight/2)-((popupHeight+20)/2);
		var widthnum = (windowWidth/2)-((popupWidth+20)/2);

		if(topnum < 0){topnum = 0;bodysize = true;}
		if(topnum > 200){topnum = 200;}
		if(widthnum < 0){widthnum = 0;bodysize = true;}

		if(bodysize){
			$body.css("overflow", "show");
		}else{
			$body.css("overflow", "hidden");
		}

		csshash = {
			"width": img.width,
			"height": img.height,
			"position": "fixed",
			"top": topnum,
			"left": widthnum
		};

		$("#nodice").css(csshash);
	}
}