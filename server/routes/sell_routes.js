const controller = require('../controllers/sell_controllers');
const jwt = require('../middleware/jwt')
const { permit } = require('../middleware/role_check');

module.exports = (app) => {
    app.route('/sells')
        .get(jwt.checkToken, permit(['admin']), controller.getAll)
        .post(jwt.checkToken, permit(['admin']), controller.post);
    app.route('/sells/:id')
        .get(jwt.checkToken, permit(['admin']), controller.getById)
        .put(jwt.checkToken, permit(['admin']), controller.update)
        .delete(jwt.checkToken, permit(['admin']), controller.delete);
}