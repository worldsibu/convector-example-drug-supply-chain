import { Router, Request, Response } from 'express';
import { Helper } from '../utils';
import { Drug, Models, DrugController } from '../utils';
import * as crypto from 'crypto';


const router: Router = Router();

/** Get all the drugs! */
router.get('/', async (req: Request, res: Response) => {
  const channel = Helper.channel;
  const dbName = channel + '_tellus';
  const viewUrl = '_design/apiKeys/_view/all';

  const queryOptions = { startKey: [''], endKey: [''] };

  try {
    const result = await Drug.query(Drug, dbName, viewUrl, queryOptions);
    console.log(result);
    res.send(await Promise.all(result.map(Models.formatDrug)));
  } catch (err) {
    if (err.code === 'EDOCMISSING') {
      res.send([]);
    } else {
      res.status(500).send(err);
    }
  }

});

router.get('/:name', (req: Request, res: Response) => {
  let { name } = req.params;

  res.send(`Hello, ${name}!`);
});

/** Insert one drug. */
router.post('/:name', async (req: Request, res: Response) => {
  console.log('post');
  let { name } = req.params;

  let result;
  const id = req.body.id || crypto.randomBytes(16).toString('hex');

  console.log(id);
  const drugObj = new Drug({
    id,
    name: req.body.name
  });
  console.log('object built');

  console.log(drugObj);

  try {
    result = await DrugController.create(drugObj);
    console.log(result);
    res.send({ id: result });
  } catch (err) {
    console.log('err');
    console.log(err);
    res.status(500).send(err);
  }
});

export const DrugCtrl: Router = router;
