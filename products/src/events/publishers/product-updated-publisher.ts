import { Publisher, Subjects, ProductUpdatedEvent } from '@microservices-ecommerce/common';

export class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
  subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
}