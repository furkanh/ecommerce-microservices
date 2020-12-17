import { Listener, OrderCancelledEvent, OrderStatus, Subjects } from "@microservices-ecommerce/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { Payment } from "../../models/payment";
import { stripe } from "../../stripe";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = 'payments-service'

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const order = await Order.findById(data.id);
    if (!order){
      throw new Error('Order not found');
    }
    const payment = await Payment.findOne({orderId: order.id});
    if (payment) {
      // There is a payment for a cancelled order
      stripe.refunds.create({
        charge: payment.stripeId
      });
    }
    order.set({status: OrderStatus.Cancelled});
    await order.save();
    msg.ack();
  }
}