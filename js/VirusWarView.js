'use strict';
/* global VirusWar */

(function(){
	var _ = self.VirusWarView = function (table, playerElement, stepCounter, statusLine, size) {
		this.grid = table;
		this.playerElement = playerElement;
		this.stepCounter = stepCounter;
		this.statusLine = statusLine;
		this.size = size;
		
		this.createGrid();
		this.game = new VirusWar(this.boardArray);
		this.game.reset();
		this.refresh();

	};

	_.prototype = {
		createGrid: function () {
			var me = this;
			
			var fragment = document.createDocumentFragment();
			this.grid.innerHTML = '';
			this.checkboxes = [];
			
			for (var y=0; y<this.size; y++) {
				var row = document.createElement('tr');
				this.checkboxes[y] = [];
				
				for (var x=0; x<this.size; x++) {
					var cell = document.createElement('td');
					var checkbox = document.createElement('input');
					checkbox.type = 'checkbox';
					
					this.checkboxes[y][x] = checkbox;
					checkbox.coords = [y, x];

					cell.appendChild(checkbox);
					row.appendChild(cell);
				}
				
				fragment.appendChild(row);
			}
			
			this.grid.addEventListener('change', function(evt) {
				if (evt.target.nodeName.toLowerCase() == 'input') {
					var coords = evt.target.coords;
					var y = coords[0];
					var x = coords[1];

					var result = me.game.step(x, y);
					me.updateCounters();
					me.updateAvailability();
					me.updateStatus();
					if (result) evt.target.classList = result;
				}
			});
			
			this.grid.addEventListener('keyup', function(evt) {
				var checkbox = evt.target;
				
				if (checkbox.nodeName.toLowerCase() == 'input') {
					var coords = checkbox.coords;
					var y = coords[0];
					var x = coords[1];
					
					switch (evt.keyCode) {
						case 37: // left
							if (x > 0) {
								me.checkboxes[y][x-1].focus();
							}
							break;
						case 38: // up
							if (y > 0) {
								me.checkboxes[y-1][x].focus();
							}
							break;
						case 39: // right
							if (x < me.size - 1) {
								me.checkboxes[y][x+1].focus();
							}
							break;
						case 40: // bottom
							if (y < me.size - 1) {
								me.checkboxes[y+1][x].focus();
							}
							break;
					}
				}
			});
			
			this.grid.appendChild(fragment);
		},
		
		get boardArray() {
			return this.checkboxes.map(function (row) {
				return row.map(function (checkbox) {
					return +checkbox.checked;
				});
			});
		},

		updateCounters: function() {
			this.playerElement.innerText = this.game.turn;
			this.stepCounter.innerText = this.game.stepLeft;
		},

		updateAvailability: function() {
			var availableTurns = this.game.getAvailableTurn(this.game.turn);
			for (var y=0; y<this.size; y++) {
				for (var x=0; x<this.size; x++) {
					if (availableTurns[y][x]) this.checkboxes[y][x].removeAttribute('disabled'); else this.checkboxes[y][x].disabled = true; 
				}
			}
		},

		updateStatus: function() {
			this.statusLine.classList = this.game.status;
			switch(this.game.status) {
				case 'o':
					this.statusLine.innerText = 'Хрестики перемогли!';
					alert(this.statusLine.innerText);
					return;
				case 'x':
					this.statusLine.innerText = 'Нулики перемогли!';
					alert(this.statusLine.innerText);
					return;
				default:
					this.statusLine.innerText = 'Гра триває!';
			}
		},

		refresh: function() {
			var board = this.game.board;
			
			for (var y=0; y<this.size; y++) {
				for (var x=0; x<this.size; x++) {
					this.checkboxes[y][x].checked = !!board[y][x];
					this.checkboxes[y][x].classList = board[y][x];
				}
			}
			this.updateCounters();
			this.updateAvailability();
			this.updateStatus();
		},
		
		reset: function () {
			this.game.reset();
			this.refresh();
		}
	};

})();