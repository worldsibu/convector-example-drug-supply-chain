import { Router, Request, Response } from 'express';
import { Helper } from '../utils';
import { Drug, Models, DrugController } from '../utils';
import * as crypto from 'crypto';


const router: Router = Router();

/** Get all the drugs! */
router.get('/', async (req: Request, res: Response) => {
  const channel = Helper.channel;
  // _drug is equivalent to the name of your chaincode
  // it gets generated on the world state
  const dbName = channel + '_drug';
  const viewUrl = '_design/drugs/_view/all';

  console.log(`${dbName} ${viewUrl}`);
  const queryOptions = { startKey: [''], endKey: [''] };

  try {
    console.log(Drug);
    const result = await Drug.query(Drug, dbName, viewUrl, queryOptions);
    console.log(result);
    res.send(await Promise.all(result.map(Models.formatDrug)));
  } catch (err) {
    console.log(err);
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
  console.log('object built');

  try {
    result = await DrugController.create(id, name);

    res.send({ id: id });
  } catch (err) {
    console.log('err');
    console.log(err);
    res.status(500).send(err);
  }
});

export const DrugCtrl: Router = router;
