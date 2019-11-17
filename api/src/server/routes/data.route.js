import express from 'express';
import dataCtrl from '../controllers/data.controller';

const router = express.Router();

router.route('/')
  .get(dataCtrl.dataGet) /** 取得 Data 資料 */


  export default router;