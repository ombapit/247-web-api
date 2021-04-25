import response from '../helpers/response';

module.exports = function(router){
  router.use(response.setHeadersForCORS);

  router.get('/', (req, res) => {
    res.status(200).json({ message: 'Ok' });
  });

  router.use(function(req, res) {
    response.sendNotFound(res);
  });

	return router;
}