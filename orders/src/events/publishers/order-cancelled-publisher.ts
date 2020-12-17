import { Subjects, Publisher, OrderCancelledEvent } from '@microservices-ecommerce/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}