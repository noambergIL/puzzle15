const winston = require('winston');
const uuid = require('uuid/v4');

const Game = require('../models/game.model');
//const db = require('../databases/mongo.db');

const logPrefix = 'GameService: ';

function create(gameId = null, xlen = null, ylen = null) {
  winston.debug(`${logPrefix}Got request for to create game with gameId ${gameId} xlen ${xlen} ylen ${ylen}.`);
  let game = new Game(gameId === null ? uuid() : gameId);
  game.init(xlen, ylen);
  winston.log(`${logPrefix}New Game created with gameId ${gameId} xlen ${xlen} ylen ${ylen}.`)
  return game;
}

// funciton save
// function load


function swap(game, x1, y1, x2, y2) {
  try {
    game.board.swap({x1, y1, x2, y2});
    game.totalSteps++;
    game.lastSteps.push({x1, y1, x2, y2});
    if (game.lastSteps.length > Game.MaximumStep ){
      game.lastSteps.shift();
    }
    return game;
  } catch (e) {
    throw e;
  }
}

function undo(game) {
  if (game.lastSteps.length > 0) {
    let lastStep = game.lastSteps.pop();
    try {
      game.board.swap(lastStep);
      game.totalSteps--;
      return game;
    } catch (e) {
      throw e;
    }
  } else {
    throw new Error('No more undo steps.');
  }
}

module.exports = {
  create,
  swap,
  undo
};
