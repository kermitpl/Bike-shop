# bike-shop
Bike shop with Express server, JWT, Passport and MondoDB database in NodeJS.

Provided api lets you make transaction of purchasing bikes by users. 
User can register and browse bikes (simple sort and filtering methods) with JWT Token aquired by authentication.
There are 4 collections (bike manufacturers, bike models, transactions and users). Each one has implemented CRUD methods with control of access (some actions can be performed by admin only).
