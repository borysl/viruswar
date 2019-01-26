'use strict';

// include VirusWar.js
// include VirusWarView.js

function $(selector, container) {
	return (container || document).querySelector(selector);
}

var VirusWarView = new VirusWarView(document.getElementById('grid'), 10);

(function() {

	var buttons = {
		next: $('button.next'),
		reset: $('button.reset')
	};

	buttons.next.addEventListener('click', function() {
		VirusWarView.next();
	});

	buttons.reset.addEventListener('click', function() {
		VirusWarView.reset();
	});

})();