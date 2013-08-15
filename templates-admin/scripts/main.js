

$(document).ready(function() {

	// if there are buttons in the format "a button" without ID attributes, copy them into the masthead
	// or buttons in the format button.head_button_clone with an ID attribute.
	var $buttons = $("#content a:not([id]) button:not([id]), #content button.head_button_clone[id!=]");
	if($buttons.size() > 0 && !$.browser.msie) {
		var $head = $("<div id='head_button'></div>").appendTo("#masthead .container").show();
		$buttons.each(function() {
			var $t = $(this);
			var $a = $t.parent('a');
			if($a.size()) {
				$button = $t.parent('a').clone();
				$head.append($button);
			} else if($t.is('.head_button_clone')) {
				$button = $t.clone();
				$button.attr('data-from_id', $t.attr('id')).attr('id', $t.attr('id') + '_copy');
				$a = $("<a></a>").attr('href', '#');
				$button.click(function() {
					$("#" + $(this).attr('data-from_id')).click(); // .parents('form').submit();
					return false;
				});
				$head.append($a.append($button));
			}
		});
	}

	// jQuery UI button states
	$(".ui-button").hover(function() {
		$(this).removeClass("ui-state-default").addClass("ui-state-hover");
	}, function() {
		$(this).removeClass("ui-state-hover").addClass("ui-state-default");
	}).click(function() {
		$(this).removeClass("ui-state-default").addClass("ui-state-active").effect('highlight', {}, 500);
	});


	// make buttons with <a> tags click to the href of the <a>
	$("a > button").click(function() {
		window.location = $(this).parent("a").attr('href');
	});

	// we don't even want to go there
	if($.browser.msie && $.browser.version < 8) {
		$("#content .container").html("<h2>ProcessWire does not support IE7 and below at this time. Please try again with a newer browser.</h2>").show();
	}

	// add focus to the first text input, where applicable
	jQuery('#content input[type=text]:visible:enabled:first').each(function() {
		var $t = $(this);
		if(!$t.val() && !$t.is(".no_focus")) $t.focus();
	});

	/// for FOUC fix
	jQuery('#content').removeClass('fouc_fix');


/* added by teflon custom theme  */
	$('#topnav').droppy({
		hoverIntent:{
				sensitivity:3,
				timeout:300,
				interval:30
			},
			showFX: 'fadeIn',
			hideFX: 'slideUp',
			sticky: false,
			speed : 100
		}
	);

	$('#content form').has(".WireTabs").css({'margin-top':'44px'});
	$('#content form').addClass('clearfix');

});


$(window).load(function(){
	var hash = window.location.hash;
	if (hash){
		var $target = $(hash);
		$(window).scrollTo( $target , 600, {offset:{top:-100}});
	}

	$('#topnav a.notinstalled').click(function(e){

		if(window.location.href.search('module') == -1){
			// if not on module page alrady
		} else {
			e.preventDefault();
			var name = $(this).attr('rel');
			var $target = $("span#"+name);
			$(window).scrollTo( $target , 600, {offset:{top:-100}});
		}

	});

});

/* Teflon Theme specific ----------------------------------------- */

// get a urls get param
function getParam(variable){
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++){
		var pair = vars[i].split("=");
		if(pair[0] == variable) return unescape(pair[1]);
	}
	return(false);
}
