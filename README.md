# ecommerce-microservices
An e-commerce web app implementation with microservices architecture.

This project is created while following a Udemy course "Micorservices with Node JS and React".

You can pull this project and run it easily with kubernetes and skaffold using "skaffold dev" command.

The project has the following microservices.

### Auth
  This microservice handles user resource and authentication with JWT.
  
### Client
   This microservice handles the front end.
  
### Products
  This microservice handles product resouce.
  
### Orders
 This microservice creates and emits events for order resource. It creates orders for existing products. It also listens for events that are published from the Products service.
  
### Expiration
  This microservice emits an expiration event to expire an order after some specified time.
  
### Payments
  This microservice handles payments for orders. It publishes a payment complete event to indicate a user has paid for the product. It uses the Stripe API to handle transactions.
