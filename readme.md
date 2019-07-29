# `Jungle Scout Code Challenge`

Web Application that searches based on Amazon Standard Indentification Number (ASIN) to parse product page to store Product Dimension, Rank, Category using [JSDOM](https://github.com/jsdom/jsdom). This application is built with [React](https://reactjs.org/), and [Redux](https://redux.js.org/) on frontend and [MLAB Sandbox](https://mlab.com/), [Mongoose](https://mongoosejs.com/), [Express](https://expressjs.com/), and [Node](https://nodejs.org/en/) on backend.

## Production Site

Live application is deployed using [Heroku](https://www.heroku.com/) at [https://junglescout-challenge.herokuapp.com/](https://junglescout-challenge.herokuapp.com/)

## Getting Started

On the root directory run:

    npm run dev-install

Once installation is complete, run:

    npm run dev

Then [http://localhost:3000/](http://localhost:3000) will automatically open.
Port for backend is [http://localhost:5000](http://localhost:5000).

## Dependencies

### Frontend

    "availity-reactstrap-validation": "^2.6.0",
    "axios": "^0.19.0",
    "bootstrap": "^4.3.1",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-redux": "^7.1.0",
    "react-scripts": "3.0.1",
    "react-transition-group": "^4.2.1",
    "reactstrap": "^8.0.1",
    "redux": "^4.0.4",
    "redux-thunk": "^2.3.0"

### Backend

    "@babel/cli": "^7.5.5",
    "@babel/core": "^7.5.5",
    "@babel/node": "^7.5.5",
    "@babel/plugin-syntax-dynamic-import": "^7.2.0",
    "@babel/plugin-syntax-import-meta": "^7.2.0",
    "@babel/preset-env": "^7.5.5",
    "@hapi/joi": "^15.1.0",
    "concurrently": "^4.1.1",
    "config": "^3.2.2",
    "cors": "^2.8.5",
    "dotenv": "^8.0.0",
    "express": "^4.17.1",
    "express-promise-router": "^3.0.3",
    "jsdom": "^15.1.1",
    "lodash": "^4.17.15",
    "mongoose": "^5.6.6"

    "@types/hapi__joi": "^15.0.3",
    "nodemon": "^1.19.1"
