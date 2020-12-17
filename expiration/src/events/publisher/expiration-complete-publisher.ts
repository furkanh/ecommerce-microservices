import { ExpirationCompleteEvent, Publisher, Subjects } from "@microservices-ecommerce/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
  subject: Subjects.ExpirationCompelete = Subjects.ExpirationCompelete;
}