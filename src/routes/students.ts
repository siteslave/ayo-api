import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { Student } from '../models/student';

const studentModel = new Student();

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  let db = req.db;
  console.log(req.decoded);
  
  studentModel.getStudent(db)
    .then((rs: any) => {
      res.send({ ok: true, rows: rs, code: HttpStatus.OK });
    })
    .catch((error: any) => {
      res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    });
});

router.get('/:id', (req: Request, res: Response) => {
  let db = req.db;
  let id = req.params.id;
  studentModel.getDetail(db, id)
    .then((rs: any) => {
      res.send({ ok: true, info: rs[0], code: HttpStatus.OK });
    })
    .catch((error: any) => {
      res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    });
});

router.post('/', (req: Request, res: Response) => {
  let db = req.db;

  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;

  let obj: any = {};
  obj.first_name = first_name;
  obj.last_name = last_name;
  obj.email = email;

  studentModel.save(db, obj)
    .then((rs: any) => {
      let id = rs[0];
      res.send({ ok: true, id: id, code: HttpStatus.OK });
    })
    .catch((error: any) => {
      res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    });
});

// /students/1000
router.put('/:id', (req: Request, res: Response) => {
  let db = req.db;

  let id = req.params.id;

  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;

  let obj: any = {};
  obj.first_name = first_name;
  obj.last_name = last_name;
  obj.email = email;

  studentModel.update(db, id, obj)
    .then((rs: any) => {
      res.send({ ok: true, code: HttpStatus.OK });
    })
    .catch((error: any) => {
      res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    });
});

// /students/1000
router.delete('/:id', (req: Request, res: Response) => {
  let db = req.db;

  let id = req.params.id;

  studentModel.delete(db, id)
    .then((rs: any) => {
      res.send({ ok: true, code: HttpStatus.OK });
    })
    .catch((error: any) => {
      res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
    });
});

export default router;