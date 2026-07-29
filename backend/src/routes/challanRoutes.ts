import { Router } from 'express';
import {
  getChallans,
  createChallan,
  confirmChallan,
  cancelChallan,
} from '../controllers/challanController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

router.get('/', authorizeRoles('ADMIN', 'SALES', 'WAREHOUSE', 'ACCOUNTS'), getChallans);
router.post('/', authorizeRoles('ADMIN', 'SALES'), createChallan);
router.patch('/:id/confirm', authorizeRoles('ADMIN', 'SALES', 'WAREHOUSE'), confirmChallan);
router.patch('/:id/cancel', authorizeRoles('ADMIN', 'SALES'), cancelChallan);

export default router;
