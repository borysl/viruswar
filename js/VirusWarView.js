'use strict';
/* global VirusWar */

(function(){
	var _ = self.VirusWarView = function (table, size) {
		this.grid = table;
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

		refresh: function() {
			var board = this.game.board;
			
			for (var y=0; y<this.size; y++) {
				for (var x=0; x<this.size; x++) {
					this.checkboxes[y][x].checked = !!board[y][x];
					this.checkboxes[y][x].classList = board[y][x];
				}
			}
		},
		
		next: function () {
			this.game.next();
			this.refresh();
		},

		reset: function () {
			this.game.reset();
			this.refresh();
		}
	};

})();