'use strict';

const {describe, it, afterEach} = require('mocha');
const sinon = require('sinon');
const chai = require('chai');
const mock = require('mock-require');

let gameService = require('../../src/services/game.service');
let Game = require('../../src/models/game.model');
let Board = require('../../src/models/board.model');

const gameId = '00000000-0000-0000-0000-000000000001';

let sandbox = sinon.createSandbox();
describe('Testing game.service', function() {
  describe('Testing Create Game', function () {
    afterEach(() => {
      sandbox.restore();
    });

    it('should succeed to create default game', function () {
      // call
      let game = gameService.create(gameId);
      // assert
      chai.assert.equal(game.gameId, gameId, "Game id wrong");
      chai.assert.equal(game.totalSteps, 0, "Game steps is not 0");
      chai.assert.deepEqual(game.lastSteps, [], "Game last steps is not empty");
      chai.assert.equal(game.board.len, 16, "Game board wrong size");
      chai.assert.equal(game.board.pieces[15], 0, "Game board last piece");
    });

  });

  describe('Testing Swap', function () {
    afterEach(() => {
      sandbox.restore();
    });

    it('should succeed to swap specific step', function () {
      // prepare
      let gameAfter = new Game(gameId, 1, 
        [
          {"x1": 3, "y1": 3, "x2": 2, "y2": 3 }
        ],
        new Board(4,4, [7,3,14,2,8,12,9,6,15,13,10,0,5,1,4,11])
      );
      let gameBefore = new Game(gameId, 0, [],
        new Board(4,4, [7,3,14,2,8,12,9,6,15,13,10,11,5,1,4,0])
      );
      // call
      let result = gameService.swap(gameBefore, 3,3,2,3)
      // assert
      chai.assert.deepEqual(result, gameAfter, "Game swap failed");
    });
    
    it('Should succeed to swap random step', function () {
    });

    it('Should succeed to swap random n step', function () {
    });

    it('Should succeed to swap random n > 10 steps but only keep last 10', function () {
    });

  });

  describe('Testing Undo', function () {
    afterEach(() => {
      sandbox.restore();
    });

    it('should succeed to undo specific step', function () {
      // prepare
      let gameBefore = new Game(gameId, 1, 
        [
          {"x1": 3, "y1": 3, "x2": 2, "y2": 3 }
        ],
        new Board(4,4, [7,3,14,2,8,12,9,6,15,13,10,0,5,1,4,11])
      );
      let gameAfter = new Game(gameId, 0, [],
        new Board(4,4, [7,3,14,2,8,12,9,6,15,13,10,11,5,1,4,0])
      );
      // call
      let result = gameService.undo(gameBefore)
      // assert
      chai.assert.deepEqual(result, gameAfter, "Game undo failed");
    });
    
    it('Should succeed to undo random step', function () {
    });

    it('Should succeed to undo random n step', function () {
    });

    it('Should succeed to undo random n > 10 steps but only keep last 10', function () {
    });

    it('Should fail to undo with no last steps', function () {
    });

  });


});

mock.stopAll();