const respond = require('../utils/response');

module.exports = (req, res) => respond.resBadRequest(res, 'Request Not Found');
