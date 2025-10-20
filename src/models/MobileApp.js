/**
 * Class representing a mobile application.
 * @param {Express} expressServer - The Express server instance.
 * @param {number} port - The port number the server listens on.
 * @param {object} routes - The routes configuration for the application.
 */
class MobileApp {
    constructor(expressServer, port, routes) {
        this.expressServer = expressServer;
        this.port = port;
        this.routes = routes;
    }
}
module.exports = MobileApp;