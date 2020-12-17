import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, NotFoundError, NotAuthorizedError, requireAuth, currentUser, BadRequestError } from '@microservices-ecommerce/common';
import { Product } from '../models/product';
import { ProductUpdatedPublisher } from '../events/publishers/product-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put(
  '/api/products/:id',
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
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new NotFoundError();
    }

    if (product.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (product.orderId) {
      throw new BadRequestError("The product cannot be edited while another using is still processing the purchasing.");
    }

    product.set({
      title: req.body.title,
      price: req.body.price
    });
    await product.save();
    await new ProductUpdatedPublisher(natsWrapper.client).publish({
      id: product._id,
      title: product.title,
      price: product.price,
      userId: product.userId,
      version: product.version
    });
    res.send(product);
  }
);

export { router as updateProductRouter };