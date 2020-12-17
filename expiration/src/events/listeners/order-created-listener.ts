import { Listener, OrderCratedEvent, Subjects } from "@microservices-ecommerce/common";
import { Message } from 'node-nats-streaming';
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCratedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = 'expiration-service';

  async onMessage(data: OrderCratedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    await expirationQueue.add(
      {orderId: data.id},
      {
        delay: delay
      }
    );
    msg.ack();
  }
}