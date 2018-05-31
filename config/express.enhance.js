'use strict';

module.exports = function (express) {
  /**
   * Server serverOk (resultJson): 200
   * @param {*} resultJson (optional)
   **/
  express.response.serverOk = function serverOk(resultJson) {
    if (resultJson) {
        this.status(200).json({result : resultJson});
    } else {
        this.status(200).send();
    }
  };

  /**
   * Server Error: code
   * @param {*} code
   * @param {*} msg - if message is error open it.
   * @param {*} resultJson (optional)
  **/
  express.response.serverError = function (code, msg, resultJson) {
      let niceMsg = {status: code, message: msg instanceof Error ? msg.message : msg};
      if (resultJson) {
        niceMsg.result = resultJson;
      }
      this.status(code).send(niceMsg);
  }
  
};
