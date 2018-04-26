
import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { Hos } from '../models/hos';

const hosModel = new Hos();
const router: Router = Router();

router.post('/register', async (req: Request, res: Response) => {
  let cid = req.body.cid;
  let dbHos = req.dbHos;

  try {
    let rs: any = await hosModel.getPatient(dbHos, cid);
    // let rsConfig: any = await hosModel.getSysConfig(dbHos);

    if (rs.length) {
      // res.send({ ok: true, hn: rs[0].hn, hospcode: rsConfig[0].hospitalcode, code: HttpStatus.OK });
      res.send({
        ok: true,
        hn: rs[0].hn,
        hospcode: '123456',
        hospname: 'โรงพยาบาลทดสอบ',
        code: HttpStatus.OK
      });
    } else {
      res.send({ ok: false, error: 'ไม่พบข้อมูลในระบบ', code: HttpStatus.OK });
    }
  } catch (error) {
    console.log(error);
    res.send({
      ok: false,
      error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
      code: HttpStatus.INTERNAL_SERVER_ERROR
    })
  }
});

export default router;