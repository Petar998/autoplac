const controller = require('../controllers/buyer_controllers');
const jwt = require('../middleware/jwt')
const { permit } = require('../middleware/role_check');

module.exports = (app) => {
    app.route('/buyers')
        .get(jwt.checkToken, permit(['admin', 'user']), controller.getAll);
}