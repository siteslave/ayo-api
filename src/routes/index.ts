import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});

router.get('/hello/world', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Hello world!', code: HttpStatus.OK });
});
//  /test?name=xxxx&lname=yyyyy
router.get('/test', (req: Request, res: Response) => {
  console.log(req.query);
  res.send({ ok: true, message: `Hello ${req.query.name}!`, code: HttpStatus.OK });
});

// /test/Angular/Express
router.get('/test/:name/:lname', (req: Request, res: Response) => {
  console.log(req.params);
  res.send({ ok: true, message: `Hello ${req.params.name}!`, code: HttpStatus.OK });
});

router.post('/test', (req: Request, res: Response) => {
  console.log(req.body);
  res.send({ ok: true, action: 'CREATE', message: `Hello ${req.body.name}!`, code: HttpStatus.OK });
});

router.put('/test', (req: Request, res: Response) => {
  console.log(req.body);
  res.send({ ok: true, action: 'UPDATE', message: `Hello ${req.body.name}!`, code: HttpStatus.OK });
});

router.delete('/test/:id', (req: Request, res: Response) => {
  console.log(req.params);
  res.send({ ok: true, action: 'DELETE', id: req.params.id, code: HttpStatus.OK });
});

router.post('/notify/register', (req: Request, res: Response) => {
  let cid = req.body.cid;
  // db
  res.send({ ok: true, hn: '123456', hospcode: 'xxxx', hospname: 'yyyyy', code: HttpStatus.OK });
});


export default router;