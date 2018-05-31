'use strict';

const {describe, it, afterEach} = require('mocha');
const sinon = require('sinon');
const chai = require('chai');

let Board = require('../../src/models/board.model');

const DEFAULT_SIZE = 4;
const MIN_SIZE = 3;
const MAX_SIZE = 5;

const defaultEmptyBoard = {
  xlen : DEFAULT_SIZE,
  ylen : DEFAULT_SIZE,
  len : DEFAULT_SIZE*DEFAULT_SIZE,
  pieces : []
}


describe('Testing board.model', function() {

  describe('Test Constroction', function() {
    it('should create default board', function () { 
      // prepare
      let empty = Object.assign({}, defaultEmptyBoard);
      // call
      let board = new Board();
      //assert
      chai.assert.deepEqual(board, empty, "Not equal");
    });

    it('should create board with 3*4', function () { 
      // prepare
      let empty = {xlen : 3, ylen : 4, len : 12, pieces : []};
      // call
      let board = new Board(3,4);
      //assert
      chai.assert.deepEqual(board, empty, "Not equal");
    });

    it('should create board with maximum 5*5 for anything bigger', function () { 
      // prepare
      let empty = Object.assign({xlen : MAX_SIZE , ylen : MAX_SIZE, len : 25}, defaultEmptyBoard);
      // call
      let board = new Board(6);
      //assert
      chai.assert.deepEqual(board, empty, "Not equal");
    });

    it('should create board with minimum 3*3 for anything smaller', function () { 
      // prepare
      let empty = Object.assign({xlen : MIN_SIZE , ylen : MIN_SIZE, len : 9}, defaultEmptyBoard);
      // call
      let board = new Board(2);
      //assert
      chai.assert.deepEqual(board, empty, "Not equal");
    });
  });

  describe('Test isDone', function() {
    it('should be done', function () {
      // prepare
     let board = new Board(3,3, [1,2,3,4,5,6,7,8,0]);
      // call
      let isDone = board.isDone();
      //assert
      chai.assert.isOk(isDone, "Not Done");
    });

    it('should be not be done', function () {
      // prepare
      let board = new Board(3);
      board.init(3)
      // call
      let isDone = board.isDone();
      //assert
      chai.assert.isNotOk(isDone, "Is Done");
    });

  });

  describe('Test Swaps', function() {
    it('should allow to swap', function () {
      // prepare
      let board = new Board(3,3, [1,2,3,4,5,6,7,8,0]);
      // call
      board.swap({x1 : 2, y1 : 2, x2: 1, y2: 2})
      //assert
      chai.assert.deepEqual(board, new Board(3,3, [1,2,3,4,5,0,7,8,6]), "Not equal");
    });

    it('should be not allow to swap non agecent', function () {
      // prepare
      let board = new Board(3,3, [1,2,3,4,5,6,7,8,0]);
      // call
      
      //assert
      try {
        board.swap({x1 : 2, y1 : 2, x2: 2, y2: 0});
        chai.assert.isOk(false, "Didn't throw");
      } catch (e){
        chai.assert.isOk(true, "throw");
     }
    });

    it('should be not allow to not with "empty"', function () {
      // prepare
      let board = new Board(3,3, [1,2,3,4,5,6,7,8,0]);
      // call
      
      //assert
      try {
        board.swap({x1 : 0, y1 : 0, x2: 1, y2: 0});
        chai.assert.isOk(false, "Didn't throw");
      } catch (e){
        chai.assert.isOk(true, "throw");
     }
    });
  });


  describe('Test Randomizer', function() {
    it('should be randon', function () {
      // prepare
      // call
      //assert
    });
  });
});
