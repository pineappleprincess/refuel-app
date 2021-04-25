const express = require('express');
const cors = require('cors');

class Server {
  constructor({ config, router, logger, authenticationMiddleWare }) {
    this.config = config;
    this.logger = logger;
    this.express = express();

    this.express.disable('x-powered-by');
    this.express.use(cors());
    this.express.use(...authenticationMiddleWare);

    this.express.use(router);
  }

  start() {
    return new Promise(resolve => {
      const http = this.express.listen(this.config.web.port, () => {
        const { port } = http.address();
        this.logger.info(`[p ${process.pid}] Listening at port ${port}`);
        resolve();
      });
    });
  }
}

module.exports = Server;
