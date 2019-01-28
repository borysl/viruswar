'use strict';

// include VirusWar.js
// include VirusWarView.js

function $(selector, container) {
	return (container || document).querySelector(selector);
}

var virusWarView = new VirusWarView(document.getElementById('grid'), $('#player'), $('#steps'), 10);

(function() {

	var buttons = {
		next: $('button.next'),
		reset: $('button.reset')
	};

	buttons.next.addEventListener('click', function() {
		virusWarView.next();
	});

	buttons.reset.addEventListener('click', function() {
		virusWarView.reset();
	});

})();