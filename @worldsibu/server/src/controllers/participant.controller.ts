import { Router, Request, Response } from 'express';

import {
  ModelHelpers} from '../convectorUtils';

const router: Router = Router();

// To enroll default server identity

/** Get all the users */
router.get('/', async (req: Request, res: Response) => {
  try {
    res.send(await ModelHelpers.getAllParticipants());
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export const ParticipantCtrl: Router = router;
