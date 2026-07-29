import { Router } from 'express';
import {
  getProducts,
  createProduct,
  updateProduct,
} from '../controllers/productController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.use(authenticateToken);

router.get('/', authorizeRoles('ADMIN', 'SALES', 'WAREHOUSE', 'ACCOUNTS'), getProducts);
router.post('/', authorizeRoles('ADMIN', 'WAREHOUSE'), upload.single('image'), createProduct);
router.put('/:id', authorizeRoles('ADMIN', 'WAREHOUSE'), updateProduct);

export default router;
