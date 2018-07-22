import { Router, Request, Response } from 'express';
import { Drug, DrugController } from '@worldsibu/convector-example-dsc-cc-drug';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');

});

router.get('/:name', (req: Request, res: Response) => {
  let { name } = req.params;

  res.send(`Hello, ${name}!`);
});

export const DrugCtrl: Router = router;
