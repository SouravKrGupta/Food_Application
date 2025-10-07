# UML Diagrams for Jalpaan Express Food Delivery Application

## Use Case Diagram

```mermaid
usecase "Register" as UC1
usecase "Login" as UC2
usecase "Browse Food" as UC3
usecase "Add to Cart" as UC4
usecase "Remove from Cart" as UC5
usecase "Place Order" as UC6
usecase "Track Order" as UC7
usecase "Update Profile" as UC8
usecase "Contact Support" as UC9
usecase "Add Food" as UC10
usecase "Edit Food" as UC11
usecase "Remove Food" as UC12
usecase "View Orders" as UC13
usecase "Update Order Status" as UC14
usecase "View Users" as UC15
usecase "View Analytics" as UC16

actor "User" as U
actor "Admin" as A

U --> UC1
U --> UC2
U --> UC3
U --> UC4
U --> UC5
U --> UC6
U --> UC7
U --> UC8
U --> UC9

A --> UC2
A --> UC10
A --> UC11
A --> UC12
A --> UC13
A --> UC14
A --> UC15
A --> UC16
```

## Class Diagram

```mermaid
classDiagram
class User {
  +String name
  +String email
  +Number phone
  +String password
  +String role
  +Object cartData
  +register()
  +login()
  +updateProfile()
}

class Food {
  +String name
  +String description
  +Number price
  +String image
  +String category
  +add()
  +edit()
  +remove()
}

class Order {
  +String userId
  +Array items
  +Number amount
  +Object address
  +String status
  +Date date
  +Boolean payment
  +place()
  +updateStatus()
}

class Contact {
  +String name
  +String email
  +String subject
  +String message
  +Date createdAt
  +submit()
}

User ||--o{ Order : places
Order ||--o{ Food : contains
User --> Food : has in cart
```

## Sequence Diagram (Order Placement)

```mermaid
sequenceDiagram
participant U as User
participant F as Frontend
participant B as Backend
participant DB as Database

U->>F: Browse food items
U->>F: Add items to cart
F->>B: POST /api/cart/add (item details)
B->>DB: Update user.cartData
DB-->>B: Success
B-->>F: Cart updated
U->>F: Proceed to place order
F->>B: POST /api/order/place (order details)
B->>DB: Verify user authentication
B->>DB: Create new order
B->>DB: Clear user.cartData
DB-->>B: Order saved
B-->>F: Order placed successfully
F-->>U: Show order confirmation