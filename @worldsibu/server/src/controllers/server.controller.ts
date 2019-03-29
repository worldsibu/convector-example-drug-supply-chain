import * as crypto from 'crypto';
import { Router, Request, Response } from 'express';

import {
  ModelHelpers, userCert, identity, Participant
} from '../convectorUtils';
import { InitServerIdentity, InitParticipantController } from '../convectorUtils/convectorControllers';

const router: Router = Router();

/** Get all the drugs! */
router.get('/', async (req: Request, res: Response) => {
  try {
    const resGet = await (await InitParticipantController()).get(identity);
    const serverIdentity = new Participant(resGet).toJSON();

    res.send(serverIdentity);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export const ServerCtrl: Router = router;
