const Router = require('koa-router');

const router = new Router();

router.use('/audio/', require('./audio/router').routes());
router.use('/video/', require('./video/router').routes());
//router.use('/img/', require('./image/router').routes());


module.exports = router;