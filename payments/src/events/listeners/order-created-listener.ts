import { Listener, OrderCratedEvent, Subjects } from "@microservices-ecommerce/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";

export class OrderCreatedListener extends Listener<OrderCratedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = 'payments-service'

  async onMessage(data: OrderCratedEvent['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      price: data.product.price,
      status: data.status,
      userId: data.userId,
      version: data.version
    });
    await order.save();
    msg.ack();
  }
}