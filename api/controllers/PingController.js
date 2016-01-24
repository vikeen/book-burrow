/**
 * PingController
 * @description :: Server-side logic that checks if app is alive
 */

module.exports = {
    index: index
};

function index(req, res) {
    return res.ok({message: 'HTTP server is working'}, {});
}
