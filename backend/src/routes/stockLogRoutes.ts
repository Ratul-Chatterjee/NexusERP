import { Router } from 'express';
import { getStockLogs, createStockLog } from '../controllers/stockLogController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

router.get('/', authorizeRoles('ADMIN', 'WAREHOUSE', 'ACCOUNTS'), getStockLogs);
router.post('/', authorizeRoles('ADMIN', 'WAREHOUSE'), createStockLog);

export default router;
