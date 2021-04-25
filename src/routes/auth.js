import response from '../helpers/response';
import auth from '../controllers/auth';

module.exports = function(router){
  router.use(response.setHeadersForCORS);

	router.route('/authenticate')
  .post(auth.authenticate);

	return router;
}