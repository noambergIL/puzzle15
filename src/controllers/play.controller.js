'use strict';

// Import modules.
const ejs = require('ejs');
const fs = require('fs');
const winston = require('winston');

const Game = require('../models/game.model');
const gameService = require('../services/game.service');

const welcomeFile = fs.readFileSync('./views/welcome.ejs', 'utf-8');
const playFile = fs.readFileSync('./views/play.ejs', 'utf-8');
const winFile = fs.readFileSync('./views/win.ejs', 'utf-8');
    
function welcomePage(req, res) {
  res.setHeader('content-type', 'text/html');
  let html = ejs.render(welcomeFile);
  res.status(200).send(html);
  winston.debug(`viewing welcome.`);
}

async function startPage(req, res) {
  try {
    let game = gameService.create(null, 4, 4)
    let moves = game.getNextMoves();
    let html = ejs.render(playFile, {game, moves});
    res.setHeader('content-type', 'text/html');
    res.status(200).send(html);
    winston.debug(`viewing start.`);
  } catch (e) {
    res.serverError(400, e);
  }
}

async function playPage(req, res) {
  let game = req.body.game;
  try {
    game = JSON.parse(game);
    let move = JSON.parse(req.body.move);
    res.setHeader('content-type', 'text/html');
    game = Game.fromObj(game);
    if(move.undo) {
      game = gameService.undo(game);
    } else {
      game = gameService.swap(game, move.x1, move.y1, move.x2, move.y2);
    }
    let isWin = game.isWon();
    let moves = game.getNextMoves();
    let html = ejs.render(isWin ? winFile : playFile, {game, moves});
    res.setHeader('content-type', 'text/html');
    res.status(200).send(html);
    winston.debug(`viewing ${isWin ? "Win page" : "Next Move"}.`);
  } catch (e) {
    res.serverError(400, e, game);
  }
}

module.exports = {
  welcomePage,
  startPage,
  playPage
};