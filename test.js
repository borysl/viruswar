'use strict';
/* global chai, describe, it, VirusWar */
/// <reference path='VirusWar.js' />
/// <reference path='../node_modules/mocha/mocha.js' />
/// <reference path='../node_modules/chai/chai.js' />

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

	function testBoard() {
		return [
			['o', 'o', 'x', 'x', 'x'],
			['xo', 'xo', '', '' , 'o'],
			['xo', 'ox', 'ox', 'ox', ''],
			['x', '', '', 'xo', 'x']
		];
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

		it('на тестовій дошці нулики можуть походити на 8 клітинок', function() {
			var vgame = new VirusWar(testBoard());
			var availableTurns = vgame.getAvailableTurn('o');
			var checkAvailableTurns = [
				[false, false, true, true, true],
				[false, false, true, true, false],
				[false, false, false, false, true],
				[true, true, false, false, false]
			];

			for (var i = 0; i < checkAvailableTurns.length; i++) {
				for (var j = 0; j < checkAvailableTurns[i].length; j++) {
					expect(availableTurns[i][j]).to.equal(checkAvailableTurns[i][j], 'cell (' + i + ',' + j + ') contains wrong data!');
				}
			}
		});

		it('на тестовій дошці хрестики можуть походити на 7 клітинок', function() {
			var vgame = new VirusWar(testBoard());
			var availableTurns = vgame.getAvailableTurn('x');
			var checkAvailableTurns = [
				[false, true, false, false, false],
				[false, false, true, true, true],
				[false, false, false, false, true],
				[false, true, true, false, false]
			];

			for (var i = 0; i < checkAvailableTurns.length; i++) {
				for (var j = 0; j < checkAvailableTurns[i].length; j++) {
					expect(availableTurns[i][j]).to.equal(checkAvailableTurns[i][j], 'cell (' + i + ',' + j + ') contains wrong data!');
				}
			}
		});

	});
});