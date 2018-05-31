'use strict';

//let Step = require("step.model");

const DEFAULT_SIZE = 4;
const MIN_SIZE = 3;
const MAX_SIZE = 5;

class Board {
  constructor (xlen, ylen, pieces) {
    if (!xlen || xlen < MIN_SIZE || xlen > MAX_SIZE) {
      xlen = DEFAULT_SIZE;
    }
    if (!ylen || ylen < MIN_SIZE || ylen > MAX_SIZE) {
      ylen = DEFAULT_SIZE;
    }
    this.xlen = xlen;
    this.ylen = ylen;
    this.len = xlen*ylen;
    this.pieces = !pieces ? [] : pieces;
  }

  init(xlen, ylen) {
    if (!xlen || xlen < MIN_SIZE || xlen > MAX_SIZE) {
      xlen = DEFAULT_SIZE;
    }
    if (!ylen || ylen < MIN_SIZE || ylen > MAX_SIZE) {
      ylen = DEFAULT_SIZE;
    }
    this.xlen = xlen;
    this.ylen = ylen;
    this.len = xlen*ylen;
    this.pieces = [];
    randomize(this);    
  }

  swap({x1, y1, x2, y2}) {
    if (x1 < 0 || x1 >= this.xlen || y1 < 0 || y1 >= this.ylen || x2 < 0 || x2 >= this.xlen || y2 < 0 || y2 >= this.ylen) {
      throw new Error("must give valid board location for swap");
    }
    let n1 = x1 * this.xlen + y1;
    let n2 = x2 * this.xlen + y2;
    if (n1 === n2 ) {
      return; // nothing to do
    }
    if (this.pieces[n1] !== 0 && this.pieces[n2] !== 0)
    {
      throw new Error('must move to an empty space');
      return;
    }
    if ( (y1 === y2 && Math.abs(x1 - x2) === 1) || (x1 === x2 && Math.abs(y1 - y2) === 1) ) {
      [this.pieces[n1], this.pieces[n2]] = [this.pieces[n2], this.pieces[n1]]; // eslint-disable-line no-param-reassign 
    }
    else {
      throw new Error('can only move to adjecent empty space');
    }
  }
  
  isDone() {
    for (let i = 0; i < this.pieces.length - 2; i++) {
      if (this.pieces[i] !== (i + 1)) {
        return false;
      }
    } 
    return true;  
  }

  static fromObj({xlen, ylen, pieces}) {
    try {
      return new Board(xlen, ylen, pieces);
    } catch (e) {
      throw new Error (`Error parsing Board ${e.message}`);
    }
  }

  static Default() { return new Board(); }
  static MinSize() { return MinSize; }
  static MaxSize() { return MaxSize; }
}

function randomize(board) {
  // create ordered board without last piece
  for (let i = 1; i < board.len; i++) {
    board.pieces.push(i);
  }

  // just in case.
  for (let i = 0; i < 10;i++) {
    shuffle(board);
    if(!board.isDone()) {
      break;
    }
  }

  // remember last place is always started with 0
  board.pieces.push(0);
}

function shuffle(board) {
  // Durstenfeld shuffle 
  for (let i = board.pieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [board.pieces[i], board.pieces[j]] = [board.pieces[j], board.pieces[i]]; // eslint-disable-line no-param-reassign
  }    
}

module.exports = Board;