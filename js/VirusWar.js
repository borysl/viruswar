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

	function opponent(symbol) {
		return symbol === 'x' ? 'o' : 'x'
	}
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
				this.turn = opponent(this.turn);
				this.stepLeft = 3;
			}
			this.board[y][x] = currentField;
			return currentField;
		},
		
		getAvailableTurn: function (whoseTurn) {
			var me = this;
			
			var canMoveHere = cloneArray(me.board);
			var zoneOfControl = cloneArray(me.board);
			var isCheckedAlready = cloneArray(me.board);

			for (var i = 0; i < canMoveHere.length; i++) {
				for (var j = 0; j < canMoveHere[i].length; j++) {
					canMoveHere[i][j] = false;
					zoneOfControl[i][j] = (me.board[i][j] === whoseTurn);
					isCheckedAlready[i][j] = false;
				}
			}

			function check(i,j) {
				if (i == 3 && j == 2) {
					console.warn('!');
				}
				if (i < 0 || i >= me.height || j < 0 || j >= me.width) return false;
				if (isCheckedAlready[i][j]) return false;
				if (me.board[i][j] === 'o') {
					return false;
				}
				if (me.board[i][j] === '' || me.board[i][j] === 'x') {
					canMoveHere[i][j] = true;
					isCheckedAlready[i][j] = true;
					return true;
				} else if (me.board[i][j] === 'xo') {
					zoneOfControl[i][j] = true;
					canMoveHere[i][j] = false;
					isCheckedAlready[i][j] = true;
					brush(i,j);
					return false;
				} else if (me.board[i][j] === 'ox') {
					canMoveHere[i][j] = false;
					isCheckedAlready[i][j] = true;
					return false;
				}
			}

			function brush(i,j) {
				var isEffective = 
					check(i-1,j-1) |
					check(i-1,j) |
					check(i-1,j+1) |
					check(i,j-1) |
					check(i,j+1) |
					check(i+1,j-1) |
					check(i+1,j) |
					check(i+1,j+1);

				return isEffective;
			}

			for (i = 0; i < canMoveHere.length; i++) {
				for (j = 0; j < canMoveHere[i].length; j++) {
					if (isCheckedAlready[i][j]) continue;
					if (zoneOfControl[i][j]) {
						canMoveHere[i][j] = false;
						brush(i,j);
					}
				}
			}
			return canMoveHere;
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
