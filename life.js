'use strict';

// 
function $(selector, container) {
	return (container || document).querySelector(selector);
}

(function() {
	var _ = self.VirusWar = function(seed) {
		this.seed = seed;
		this.height = seed.length;
		this.width = seed[0].length;
		this.stepLeft = 3;
		this.turn = 'x';
		
		this.prevBoard = [];
		this.board = cloneArray(seed);
	};

	_.prototype = {
		next: function () {
			this.prevBoard = cloneArray(this.board);
			
			for (var y=0; y<this.height; y++) {
				for (var x=0; x<this.width; x++) {
					var neighbors = this.aliveNeighbors(this.prevBoard, x, y);
					var alive = !!this.board[y][x];
					
					if (alive) {
						if (neighbors < 2 || neighbors > 3) {
							this.board[y][x] = 0;
						}
					}
					else {
						if (neighbors == 3) {
							this.board[y][x] = 1;
						}
					}
				}
			}
		},

		step: function (x,y) {
			var currentField = this.board[y][x];
			if (currentField.length >= 2) return 0;
			if (currentField.length == 1 && currentField == this.turn) return 0;
			if (currentField == '0') currentField = '';
			this.stepLeft--;
			currentField = currentField ? this.turn : currentField + this.turn;

			if (!this.stepLeft) {
				this.turn = this.turn === 'x' ? 'o' : 'x';
				this.stepLeft = 3;
			}
			this.board[y][x] = currentField;
			return currentField;
		},
		
		aliveNeighbors: function (array, x, y) {
			var prevRow = array[y-1] || [];
			var nextRow = array[y+1] || [];
			
			return [
				prevRow[x-1], prevRow[x], prevRow[x+1],
				array[y][x-1], array[y][x+1],
				nextRow[x-1], nextRow[x], nextRow[x+1]
			].reduce(function (prev, cur) {
				return prev + +!!cur;
			}, 0);
		},
		
		toString: function () {
			return this.board.map(function (row) { return row.join(' '); }).join('\n');
		}
	};

	// Helpers
	// Warning: Only clones 2D arrays
	function cloneArray(array) {
		return array.slice().map(function (row) { return row.slice(); });
	}

})();

(function(){

	var _ = self.VirusWarView = function (table, size) {
		this.grid = table;
		this.size = size;
		this.autoplay = false;
		
		this.createGrid();
		this.game = new VirusWar(this.boardArray);
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

					// X starting position
					if ((x == 0) && (y == 0)) {
						checkbox.classList = 'x';
						checkbox.checked = true;
					}

					// O starting position
					if ((x == this.size - 1) && (y == this.size - 1)) {
						checkbox.classList = 'o';
						checkbox.checked = true;
					}

					// O starting position
					if ((x == this.size - 1) && (y == 0)) {
						checkbox.classList = 'xo';
						checkbox.checked = true;
					}

															// O starting position
					if ((x == 0) && (y == this.size - 1)) {
						checkbox.classList = 'ox';
						checkbox.checked = true;
					}

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
		
		next: function () {
			var me = this;
			
			this.game.next();
			
			var board = this.game.board;
			
			for (var y=0; y<this.size; y++) {
				for (var x=0; x<this.size; x++) {
					this.checkboxes[y][x].checked = !!board[y][x];
				}
			}
			
			if (this.autoplay) {
				this.timer = setTimeout(function () {
					me.next();
				}, 1000);
			}
		}
	};

})();

var VirusWarView = new VirusWarView(document.getElementById('grid'), 10);

(function() {

	var buttons = {
		next: $('button.next')
	};

	buttons.next.addEventListener('click', function() {
		VirusWarView.next();
	});

	$('#autoplay').addEventListener('change', function() {
		buttons.next.disabled = this.checked;
		
		if (this.checked) {
			VirusWarView.autoplay = this.checked;
			VirusWarView.next();
		}
		else {
			clearTimeout(VirusWarView.timer);
		}
	});
})();