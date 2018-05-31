const gameController = require('../controllers/game.controller');
const playController = require('../controllers/play.controller');

module.exports = function (app) {
  /*
   * This is an example of how to implement API
   * Run it and send some request (see below)
   * You can debug it to better understand the code
   * Good luck!
   * */
  
  /**
   * @swagger
   * definitions:
   *   Game:
   *     type: object
   *     description: The game object
   *     properties:
   *       gameId:
   *         type: string
   *         example: 8b9fd044-cc08-479d-bb6e-bb6dda58a7fd
   *       totalSteps:
   *         type: integer
   *         example: 1
   *       lastSteps:
   *         type: array
   *         items:
   *           $ref: '#/definitions/Move'
   *       board:
   *         $ref: '#/definitions/Board'
   * 
   *   Board:
   *     type: object
   *     description: Board of one game
   *     properties:
   *       xlen:
   *         type: integer
   *         description: x-edge size
   *         example: 4
   *       ylen:
   *         type: integer
   *         description: y-edge size
   *         example: 4
   *       len:
   *         type: integer
   *         description: size (x-edge * y-edge)
   *         example: 16
   *       pieces:
   *         type: array
   *         items:
   *           type : integer
   *         example:
   *           - 7
   *           - 3
   *           - 14
   *           - 2
   *           - 8
   *           - 12
   *           - 9
   *           - 6
   *           - 15
   *           - 13
   *           - 10
   *           - 4
   *           - 5
   *           - 1
   *           - 0
   *           - 11
   * 
   *   Move:
   *     type: object
   *     description: A single move
   *     properties:
   *       x1:
   *         type: integer
   *         description: x position of cell 1
   *         example: 3
   *       y1:
   *         type: integer
   *         description: y position of cell 1
   *         example: 3
   *       x2:
   *         type: integer
   *         description: x position of cell 2
   *         example: 3
   *       y2:
   *         type: integer
   *         description: y position of cell 2
   *         example: 2
*/

  /**
   * @swagger
   * /games:
   *   get:
   *     tags:
   *      - Rest API
   *     description: Emulates Playbuzz user authentication
   *     parameters:
   *      - name: size
   *        in: query
   *        description: the size of the squar board edge
   *        required: true
   *        type: integer
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Game Object
   *         schema:
   *           $ref: '#/definitions/Game'
   *       400:
   *         description: invalid input
   *       500:
   *         description: Error has occurred
   */
  app.get('/games',
    gameController.createGame
  );

  /**
   * @swagger
   * /games:
   *   post:
   *     tags:
   *      - Rest API
   *     description: Emulates using a previous game to play
   *     parameters:
   *       - name : game
   *         in : body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Game'
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Game
   *         schema:
   *           $ref: '#/definitions/Game'
   *       400:
   *         description: Error has occurred
   */
  app.post('/games',
    gameController.loadGame
  );

  /**
   * @swagger
   * /games/moves/swap:
   *   post:
   *     tags:
   *      - Rest API
   *     description: Emulates using a previous game to play
   *     parameters:
   *       - name: data
   *         in : body
   *         required: true
   *         schema:
   *           type : object
   *           properties:
   *             game:
   *               description: User Id to delete (GUID case insensitive)
   *               $ref: '#/definitions/Game'
   *             x1:
   *               description: User Id to delete (GUID case insensitive)
   *               type: integer
   *               example: 3
   *             y1:
   *               description: User Id to delete (GUID case insensitive)
   *               type: integer
   *               example: 2
   *             x2:
   *               description: User Id to delete (GUID case insensitive)
   *               type: integer
   *               example: 3
   *             y2:
   *               description: User Id to delete (GUID case insensitive)
   *               type: integer
   *               example: 1
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Game
   *         schema:
   *           $ref: '#/definitions/Game'
   *       400:
   *         description: Error has occurred
   */

  app.post('/games/moves/swap',
    gameController.moveSwap
  );
  
  /**
   * @swagger
   * /games/moves/undo:
   *   post:
   *     tags:
   *      - Rest API
   *     description: Emulates using a previous game to play
   *     parameters:
   *       - name : game
   *         in : body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Game'
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Game
   *         schema:
   *           $ref: '#/definitions/Game'
   *       400:
   *         description: Error has occurred
   */
  app.post('/games/moves/undo',
    gameController.moveUndo
  );

  // gui
  app.get('/welcome',
    playController.welcomePage
  );
  app.get('/start',
    playController.startPage
  );
  app.post('/play',
    playController.playPage
  );

};
