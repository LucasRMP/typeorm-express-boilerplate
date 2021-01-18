import { Router } from 'express';

import UserController from '@controllers/UserController';

const router = Router();

router.get('/', UserController.index);
router.get('/:slug', UserController.show);

router.post('/', UserController.store);

export default router;
