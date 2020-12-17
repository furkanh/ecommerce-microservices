import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@microservices-ecommerce/common';
import { body } from 'express-validator';
import { Product } from '../models/product';
import { ProductCreatedPublisher } from '../events/publishers/product-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post('/api/products',
requireAuth,
[
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than 0')
],
validateRequest,
async (req: Request, res: Response) => {
  const { title, price } = req.body;
  const product = Product.build({
    title,
    price,
    userId: req.currentUser!.id
  });
  await product.save();
  await new ProductCreatedPublisher(natsWrapper.client).publish({
    id: product._id,
    title: product.title,
    price: product.price,
    userId: product.userId,
    version: product.version
  });
  res.status(201).send(product);
}); 

export { router as createProductRouter };