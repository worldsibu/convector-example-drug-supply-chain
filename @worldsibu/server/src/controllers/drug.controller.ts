import * as crypto from 'crypto';
import { Router, Request, Response } from 'express';

import { Helper } from '../utils';
import { Drug, Models, DrugController, Participant, ParticipantController } from '../utils';

const router: Router = Router();

ParticipantController.init();

/** Get all the users */
router.get('/users', async (req: Request, res: Response) => {
  try {
    res.send(await Models.getAllParticipants());
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/** Get all the drugs! */
router.get('/', async (req: Request, res: Response) => {
  console.log('get');
  const channel = Helper.channel;
  const cc = Helper.drugCC;
  // _drug is equivalent to the name of your chaincode
  // it gets generated on the world state
  const dbName = `${channel}_${cc}`;
  const viewUrl = '_design/drugs/_view/all';

  const queryOptions = { startKey: [''], endKey: [''] };

  try {
    const result = <Drug[]>(await Models.Drug.query(Models.Drug, dbName, viewUrl, queryOptions));

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


// router.get('/users', (req: Request, res: Response) => {
//   const list = [
//     { org: 'org1', user: 'user1', name: 'Manufacturer Acme', },
//     { org: 'org1', user: 'user2', name: 'Manufacturer W. White' },
//     { org: 'org1', user: 'user3', name: 'Manufacturer Gus' },
//     { org: 'org2', user: 'user1', name: 'Springfield General Hospital' },
//     { org: 'org2', user: 'user2', name: 'Arkham Asylum' },
//     { org: 'org2', user: 'user3', name: 'Mercy Hospital' }];

//   res.send(Users.GetUsers(list));
// });

/** Transfer the holder of the drug in the value chain. */
router.post('/:id/transfer/', async (req: Request, res: Response) => {
  let { id } = req.params;
  let { to, reportHash, reportUrl } = req.body;

  try {
    let cntrl = await DrugController.init();
    await cntrl.transfer(id, to, reportHash, reportUrl, Date.now());

    const updatedDrug = await Models.formatDrug(await Models.Drug.getOne(id));
    res.send(updatedDrug);

  } catch (err) {
    console.log('err');
    console.log(err);
    res.status(500).send(err);
  }
});

/** Insert one drug. */
router.post('/', async (req: Request, res: Response) => {
  let { id, name } = req.body;

  const fId = id || crypto.randomBytes(16).toString('hex');

  try {
    let cntrl = await DrugController.init();
    await cntrl.create(id, name, Date.now());

    const updatedDrug = await Models.formatDrug(await Models.Drug.getOne(fId));

    res.send(updatedDrug);

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export const DrugCtrl: Router = router;
