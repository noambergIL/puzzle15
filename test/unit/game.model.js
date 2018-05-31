'use strict';

const {describe, it, afterEach} = require('mocha');
const sinon = require('sinon');
const chai = require('chai');

let Game = require('../../src/models/game.model');
const GAME_ID = '00000000-0000-0000-0000-000000000001';


describe('Testing game.model', function() {

  describe('Test Constroction', function() {
    it('should create default game', function () { 
    });

    it('should create game with board with 3*4', function () { 
    });
  });

  describe('Test Steps', function() {
    it('should be try 3 steps', function () {
    });

    it('should be try 3 steps + 3 undo and return to same', function () {
    });

  });

  describe('Test Done', function() {
    it('should be return done', function () {
      // prepare
      let game = new Game(GAME_ID, 20, new Board(3,3, [1,2,3,4,5,6,7,8,0]), []);
      // call
      let isDone = game.isWon();
      //assert
      chai.assert.isOk(isDone, "Not Won");
    });
  });
});
