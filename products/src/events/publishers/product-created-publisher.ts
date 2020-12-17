import { Publisher, Subjects, ProductCreatedEvent } from '@microservices-ecommerce/common';

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated;
}