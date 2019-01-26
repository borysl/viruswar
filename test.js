'use strict';
/* global chai, describe, it, VirusWar */
/// <reference path='js/VirusWar.js' />
/// <reference path='node_modules/mocha/mocha.js' />
/// <reference path='node_modules/chai/chai.js' />

// var describe = 
var expect = chai.expect;
	
describe('VirusWar', function() {

	function newBoardArray() {
		var board = [];
		for (var i = 0; i < 10; i++) {
			var row = [];
			for (var j = 0; j < 10; j++) {
				row.push('');
			}
			board.push(row);
		}
		return board;
	}

	describe('setup', function() {
		it('should have cross in position 0,0', function() {
			var vgame = new VirusWar(newBoardArray());
			vgame.reset();
			expect(vgame.board[0][0]).to.equal('x');
		});

		it('should have zero in position n-1,n-1', function() {
			var vgame = new VirusWar(newBoardArray());
			vgame.reset();
			expect(vgame.board[vgame.height - 1][vgame.width - 1]).to.equal('o');
		});
	});
});