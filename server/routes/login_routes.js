const controller = require('../controllers/login_controllers');
const jwt = require('../middleware/jwt')

module.exports = (app) => {
  app.route('/login').post(controller.login);
}