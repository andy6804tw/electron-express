import express from 'express';
// Router
import data from './data.route';

const router = express.Router();

/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`server started on ${process.env.PORT} PORT (${process.env.NODE_ENV})`);
});
/** Data Router */
router.use('/data', data);

export default router;