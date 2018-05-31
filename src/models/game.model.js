'use strict';

let Board = require("./board.model");

const DEFAULT_GAME_ID = '00000000-0000-0000-0000-000000000000';
const MAXIMUM_STEPS = 10;

class Game {
  constructor (gameId = null, totalSteps = 0, lastSteps = [], board = null){
    this.gameId = gameId;
    this.totalSteps = totalSteps;
    this.board = board;
    this.lastSteps = lastSteps;
  }

  init(xlen = null, ylen = null) {
    this.totalSteps = 0;
    this.board = new Board();
    this.board.init(xlen, ylen);
    this.lastSteps = [];
  }

  isWon() {
    return this.board.isDone();
  }

  getNextMoves() {
    let n0 = 0;
    for(let i = 0;i< this.board.len; i++) {
      if(this.board.pieces[i] === 0){
        n0 = i;
        break;
      }
    }
    let x0 = Math.floor(n0 / this.board.xlen);
    let y0 = n0 % this.board.ylen;
    let moves = [];
    if (y0 > 0) {
      pushMove(moves, x0, y0, x0, y0-1);
    }
    if (x0 < (this.board.xlen-1)) {
      pushMove(moves, x0, y0, x0+1, y0);
    }
    if (y0 < (this.board.ylen-1)) {
      pushMove(moves, x0, y0, x0, y0+1);
    }
    if (x0 > 0) {
      pushMove(moves, x0, y0, x0-1, y0);
    }
    return moves;
   }

  static fromObj({gameId, totalSteps, lastSteps, board}) {
    try {
      return new Game(gameId, totalSteps, lastSteps, Board.fromObj(board));
    } catch (e) {
      throw new Error (`Error parsing Game ${e.message}`);
    }
  }

  static Default() { return new Game(Game.DefaultId()); }
  static DefaultId() { return DEFAULT_GAME_ID; }
  static MaximumSteps() { return MAXIMUM_STEPS; }
}

function pushMove(moves, x1, y1, x2, y2) {
  moves.push({x1, y1, x2, y2}); 
}

module.exports = Game;