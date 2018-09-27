BUILD A FULLSTACK FINISHED PRODUCT: Fast-Food-Fast
Project Overview
Fast-Food-Fast is a food delivery service app for a restaurant. The project is built with html and css with no external library. The ui template of the restaurant can be found at the link and the api at the link. However, the develop is the most up-to-date with new features.

Features (UI)
User can create an account
User can login to their account
User can order for food
User can see a history of ordered food
Admin can manage order
Admin can manage food menu

Endpoints Features (API)
POST api/v1/user/register: Register a new user 
POST api/v1/user/authenticate: Authenticate user
DELETE api/v1/user/me: Admin can delete user
POST api/v1/user/order: user can place a new order
GET api/v1/user/order: user can get user order
GET api/v1/order: Admin can get all order
UPDATE api/v1/order/: Admin can update status
POST api/v1/item: Admin can add new item
GET api/v1/item/: User can get a specific item
GET api/v1/item: User can get all item
UPDATE api/v1/item/: Admin can update item

Todo
Challenge 4

How To Run
clone the repo or download the repo
run the cmd : npm install
run the command npm run start - to start the app
npm run test - to test api implementation
npm run cover -to test coverall output