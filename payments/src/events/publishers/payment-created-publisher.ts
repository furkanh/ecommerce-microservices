import { PaymentCreatedEvent, Publisher, Subjects } from "@microservices-ecommerce/common";


export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}