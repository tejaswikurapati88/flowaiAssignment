### Finance Management
This project named Finance Management is a Assignment given by Floww.ai company. It is a backend project where I have to perform RESTful operations for managing personal financial records. 
In this application, Users can record their income and expenses, retrieve past transactions, and get summaries by category or time period.

#### Tools and Technologies
- Backend Framework: Node.js with Express.js
- Database: SQLite (for simplicity)

#### Initialization:
- npm init -y
- npm install <packages>

#### Packages to be installed:
- express, path, sqlite, sqlite3, cors

#### sqlite tables :
- transactions: id, type (income or expense), category, amount, date, description
- categories: id, name, type (income or expense)

#### **API Endpoints**
- `POST /transactions`: Adds a new transaction (income or expense).
- `GET /transactions`: Retrieves all transactions.
- `GET /transactions/:id`: Retrieves a transaction by ID.
- `PUT /transactions/:id`: Updates a transaction by ID.
- `DELETE /transactions/:id`: Deletes a transaction by ID.
- `GET /summary`: Retrieves a summary of transactions, such as total income, total expenses, and balance. Optionally, this can be filtered by date range or category.




