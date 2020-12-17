import { Publisher, OrderCratedEvent, Subjects } from '@microservices-ecommerce/common';

export class OrderCreatedPublisher extends Publisher<OrderCratedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}