const controller = require('../controllers/car_controllers');
const jwt = require('../middleware/jwt')
const { permit } = require('../middleware/role_check');

module.exports = (app) => {
    app.route('/cars')
        .get(jwt.checkToken, permit(['admin', 'user']), controller.getAll)
        .post(jwt.checkToken, permit(['admin', 'user']), controller.post);
    app.route('/cars/:id')
        .get(jwt.checkToken, permit(['admin', 'user']), controller.getById)
        .put(jwt.checkToken, permit(['admin', 'user']), controller.update)
        .delete(jwt.checkToken, permit(['admin', 'user']), controller.delete);
}