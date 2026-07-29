import { Router } from 'express';
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  addCustomerNotes,
} from '../controllers/customerController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

router.get('/', authorizeRoles('ADMIN', 'SALES', 'ACCOUNTS'), getCustomers);
router.post('/', authorizeRoles('ADMIN', 'SALES'), createCustomer);
router.put('/:id', authorizeRoles('ADMIN', 'SALES'), updateCustomer);
router.post('/:id/notes', authorizeRoles('ADMIN', 'SALES'), addCustomerNotes);

export default router;
