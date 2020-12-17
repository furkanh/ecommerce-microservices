import express, { Request, Response } from 'express';
import { Product } from '../models/product';
import { NotFoundError } from '@microservices-ecommerce/common';

const router = express.Router();

router.get(
  '/api/products/:id',
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new NotFoundError();
    }
    res.send(product);
  }
);

export { router as showProductRouter };