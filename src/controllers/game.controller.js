const Game = require('../models/game.model');
const gameService = require('../services/game.service');

// function validateGuid(guid) {
//   let guidRegex = '^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$';
//   return guid.match(guidRegex);
// }

function createGame(req, res) {
  let size = req.query.size;
  if(!size || Number(size) === NaN) {
    res.serverError(400, 'Size must be a number between 3-5');
    return;    
  }
  size = Number(size);
  if(size < 3 || size > 5) {
    res.serverError(400, 'Size must be a number between 3-5');
    return;    
  }
  res.serverOk(gameService.create(null, size));
}

function loadGame(req, res) {
  let game = req.body.game;
  try {
    game = Game.fromObj(req.body.game); // Validate Game object
    // validation
    res.serverOk(game);
  } catch (e) {
    res.serverError(400, e, game);
  }
}

function moveSwap(req, res) {
  let game = req.body.game;
  try {
    game = Game.fromObj(req.body.game); // Validate Game object
    let x1 = req.body.x1;
    let y1 = req.body.y1;
    let x2 = req.body.x2;
    let y2 = req.body.y2;

    // validation
    if(!x1 || Number(x1) === NaN) {
      res.serverError(400, 'x1 must be a index number inside the board x-axis', game);
      return;    
    }
    if(!y1 || Number(y1) === NaN) {
      res.serverError(400, 'y1 must be a index number inside the board y-axis', game);
      return;    
    }
    if(!x2 || Number(x2) === NaN) {
      res.serverError(400, 'x2 must be a index number inside the board x-axis', game);
      return;    
    }
    if(!y2 || Number(y2) === NaN) {
      res.serverError(400, 'xy2 must be a index number inside the board y-axis', game);
      return;    
    }

    gameService.swap(game, x1, y1, x2, y2);
    if(game.isWon()) {
      res.serverOk({message: `You Won after doing ${game.totalSteps}`});
    }
    res.serverOk(game);
  } catch (e) {
    res.serverError(400, e, game);
  }
}

function moveUndo(req, res) {
  let game = req.body.game;
  try {
    game = Game.fromObj(req.body.game); // Validate Game object

  // validation

    gameService.undo(game);
    res.serverOk(game);
  } catch (e) {
    res.serverError(400, e, game);
  }
}

module.exports = {
  createGame,
  loadGame,
  moveSwap,
  moveUndo
};
