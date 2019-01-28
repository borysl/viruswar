'use strict';

// include VirusWar.js
// include VirusWarView.js

function $(selector, container) {
	return (container || document).querySelector(selector);
}

var virusWarView = new VirusWarView(document.getElementById('grid'), $('#player'), $('#steps'), $('#status'), 10);

(function() {

	var buttons = {
		reset: $('button.reset')
	};

	buttons.reset.addEventListener('click', function() {
		virusWarView.reset();
	});

})();