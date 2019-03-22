import * as crypto from 'crypto';
import { Router, Request, Response } from 'express';

import {
  ModelHelpers, InitTransportController
} from '../convectorUtils';

const router: Router = Router();

/** Get all the drugs! */
router.get('/', async (req: Request, res: Response) => {
  try {
    res.send((await ModelHelpers.getAllTransport()).reverse());
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/** Insert one drug. */
router.post('/', async (req: Request, res: Response) => {
  let { id, company, transportType, ownerId } = req.body;

  const fId = id || crypto.randomBytes(16).toString('hex');

  try {
    let cntrl = await InitTransportController();
    await cntrl.create(
      fId,
      company,
      Number.parseInt(transportType),
      ownerId
    );
    // Return the newly created drug
    res.send(await ModelHelpers.formatTransport(await ModelHelpers.Transport.getOne(fId)));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export const TransportCtrl: Router = router;
