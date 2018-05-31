'use strict';

const {describe, it, afterEach} = require('mocha');
const sinon = require('sinon');
const chai = require('chai');
const {createMockExpress} = require('../support/fakeExpress');

let gameService = require('../../src/services/game.service');
let gameController = require('../../src/controllers/game.controller');
// Test the example service level
let Game = require('../../src/models/game.model');

const gameId = '00000000-0000-0000-0000-000000000001';
const gameSize = 4;
let game = new Game(gameId, 0, [], null); // fake game internal doesn't matter here

let sandbox = sinon.createSandbox();
describe('Testing example.controller', function() {

  describe('Testing - GET:/games - create game', function () {
    afterEach(() => {
      sandbox.restore();
    });

    it('should return 200 with normal game', async function () {
      // prepare
      let gameServiceMock = sandbox.mock(gameService);
      gameServiceMock.expects("create").once().withArgs(null, gameSize).resolves(game);
      gameServiceMock.expects("swap").never();
      gameServiceMock.expects("undo").never();
      const request = {
        query: {
          size: gameSize
        }
      };
      const fakeExpress = createMockExpress(request);
      // call
      await gameController.createGame(fakeExpress.request, fakeExpress.response);
      // verify
      gameServiceMock.verify(); 
      chai.assert(fakeExpress.response.status.calledWith(200));
      //chai.assert(fakeExpress.response.json.calledWith({result : game })); // TODO figure this out
    });

    it('should return 400 with bad size', async function () {
      // prepare
      let gameServiceMock = sandbox.mock(gameService);
      gameServiceMock.expects("create").never();
      gameServiceMock.expects("swap").never();
      gameServiceMock.expects("undo").never();
      const request = {
        query: {
          size: 6
        }
      };
      const fakeExpress = createMockExpress(request);
      // call
      await gameController.createGame(fakeExpress.request, fakeExpress.response);
      // verify
      gameServiceMock.verify(); 
      chai.assert(fakeExpress.response.status.calledWith(400));
    });

  });

  describe('Testing - Post:/games/moves/swap', function () {
    afterEach(() => {
      sandbox.restore();
    });

    it('should return 200 with swap', async function () {
    });

    it('should return 400 with bad positions value (input)', async function () {
    });

    it('should return 400 with bad logic position values', async function () {
    });
  });

  describe('Testing - Post:/games/moves/undo', function () {
    afterEach(() => {
      sandbox.restore();
    });

    it('should return 200 with undo', async function () {
    });

    it('should return 400 with no undo items left', async function () {
    });

  });

  describe('Testing - Post:/games - load a game (verify)', function () {
    afterEach(() => {
      sandbox.restore();
    });

  });
  
});
