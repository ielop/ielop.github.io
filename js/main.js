// Encapsula
(function() {

	// Define vaiables to be used in this function
	var menuLinks = document.getElementsByClassName('menu-link'),
	// elBg = document.getElementById('background'),
	elLogo = document.getElementsByClassName('logo')[0],
	eventListenerName = 'addEventListener',
	prefixNameListener='';

	// Detect eventListener
	if( !document.addEventListener ){
		eventListenerName = 'attachEvent',
		prefixNameListener='on';
	}
	// Generic add event listener
	function addEvent( el, eventName, eventfunction )
	{
		el[eventListenerName](prefixNameListener+eventName, eventfunction);
	}

	// centralize logo when the image is fully loaded
	function logoLoad(){
		var windowHeight = ('innerHeight' in window)?window.innerHeight:document.documentElement.clientHeight,
		windowWidth = ('innerWidth' in window)?window.innerWidth:document.documentElement.clientWidth,
		imgWidth = 580, imgHeight=293, ar = 580/293,// image size
		newWidth=windowWidth*0.395, newHeight=newWidth/ar;

		var elHome = document.getElementById('home-container'),
		elMenu = document.getElementsByClassName('menu')[0],
		elSubtitle = document.getElementsByClassName('subtitle')[0];

		elHome.style.marginTop = ((windowHeight-newHeight)/2) +'px';
		elHome.style.height = newHeight +'px';
		elMenu.style.top = ((windowHeight-180)/2)+'px';
	}

	// Show and hide menu title
	function showMenuTitle(event){
		var sibling = event.target.previousSibling;
		if( sibling ) sibling.style.opacity=1;
	}
	function hideMenuTitle(event){
		var sibling = event.target.previousSibling;
		if( sibling ) sibling.style.opacity=0;
	}
	function changeBgColor(event) {
		event.preventDefault();
		var clicked = event.target.tagName!="SPAN"?event.target:event.target.parentNode,
		menuItem = clicked.parentNode,
		menuActive = document.querySelector('.menu-item.active');

		// Check if is the same object/element
		if( menuActive!=clicked ){
			if(menuActive) menuActive.className = menuActive.className.replace('active','');
			document.body.className = menuItem.getAttribute('alt');
			menuItem.className = menuItem.className+" active";
		}
	}

	// Add eventlistener to the menu links
	for (var i = 0; i < menuLinks.length; i++) {
		addEvent(menuLinks[i],'click',changeBgColor);
	}

	// Add load listener to centralize the logo
	logoLoad();

})();
