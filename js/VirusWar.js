'use strict';

(function() {
	var _ = self.VirusWar = function(seed) {
		this.seed = seed;
		this.height = seed.length;
		this.width = seed[0].length;
		this.stepLeft = 3;
		this.turn = 'x';
		
		this.prevBoard = [];
		this.board = cloneArray(seed);

		this.reset = function () {
			for (var y=0; y<this.height; y++) {
				for (var x=0; x<this.width; x++) {
					this.board[y][x] = '';
				}
			}
			
			this.board[0][0] = 'x';
			this.board[this.height - 1][this.width - 1] = 'o';
			this.board[this.height - 1][0] = 'ox';
			this.board[0][this.width - 1] = 'xo';
		};
	};

	_.prototype = {
		next: function () {
			this.prevBoard = cloneArray(this.board);

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
