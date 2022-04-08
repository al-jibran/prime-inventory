<div align="center">
  <h1>Prime Inventory</h1>
  <p>
    A beautiful and simple inventory app.
  </p>
</div>

<br />

<!-- Table of Contents -->

# Table of Contents

- [About the Project](#about-the-project)
  - [Screenshots](#screenshots)
  - [Tech Stack](#tech-stack)
  - [Features](#features)
  - [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Run Locally](#run-locally)
- [Usage](#usage)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- About the Project -->

## About the Project

An inventory app created in React Native (thus supports Android and iOS) that has bulking, history, custom units and user provided database. The application does not use the mobile storage to store data. Rather, it provides a backend which can be used to connect to a personal database ensuring safety and persistence of data and security to the user.

<!-- Screenshots -->

### Screenshots

<div>
  <img src="/brand/screenshots/homepage.png" alt="home page" width=200/>
  <img src="/brand/screenshots/add-product.png" alt="add product modal" width=200 />
  <img src="/brand/screenshots/filters.png" alt="filter modal" width=200/>
  <img src="/brand/screenshots/edit-product.png" alt="edit product modal " width=200/>
  <img src="/brand/screenshots/history.png" alt="history page" width=200/>
</div>

<!-- TechStack -->

### Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://www.reactnative.dev/">React Native</a></li>
    <li><a href="https://expo.dev/">Expo</a></li>
    <li><a href="https://styled-components.com/">Styled Components</a></li>
    <li><a href="https://apollographql.com/docs/react">Apollo Client</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://www.apollographql.com/docs/apollo-server/">Apollo Server</a></li>
    <li><a href="https://graphql.org/">GraphQL</a></li>
    <li><a href="https://jestjs.io/">Jest</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.mongodb.com/">MongoDB</a></li>
  </ul>
</details>

<!-- Features -->

### Features

- Custom Database - Clone the app, fill in the environment variables to use your own database for the app.
- Bulking - Add/Remove stock in bulk.
- Pagination - The server sends only a specified amount of items to the client.
- Infinite scrolling - Thanks to the cursor based pagination, scrolling through products is seamless.

<!-- Env Variables -->

### Environment Variables

To run this project, you will need to add the following values to the environment.js file

### Frontend

`prodUrl`: Url for the backend if you'll be building the app in production mode.
`apiUrl`: Url for the backend if you'll be building the app development mode.

### Backend

To run the backend, you will need to add the following values to .env file

`MONGODB_DEV_URI`: Url for the database used.
`MONGODB_TEST_URI`: Url used for testing the application.
`PORT`: Port that the server will run on.

<!-- Getting Started -->

## Getting Started

<!-- Prerequisites -->

### Prerequisites

This project uses npm as package manager.

Git clone the repository

<!-- Installation -->

### Installation

### Frontend

Clone the project

```bash
  git clone https://github.com/al-jibran/prime-inventory.git
```

Go to the project directory

```bash
  cd prime-inventory
```

Install dependencies

```bash
  npm install
```

Install Expo-Cli globally

```bash
  npm install -g expo-cli
```

Start expo

```bash
  npm start
```

### Backend

Install the backend with npm:

```bash
  npm install
```

Start the server

```bash
  npm start
```

<!-- Running Tests -->

### Running Tests

To run tests, run the following command in the backend

```bash
  npm test
```

## License

Distributed under the GNU General Public License v3.0. See COPYING for more information.

<!-- Contact -->

## Contact

Al Jibran - [@LinkedIn](https://linkedin.com/in/al-jibran) - [@Portfolio](https://al-jibran.netlify.app)

<!-- Acknowledgments -->

## Acknowledgements

- [Formik](https://formik.org/)
- [Yup Schema Validator](https://github.com/jquense/yup)
- [date-fns](https://github.com/date-fns/date-fns)
- [Use-debounce](https://github.com/xnimorz/use-debounce)
