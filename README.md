# Yodoor

Yodoor is a room booking marketplace that allows users to list rooms or book rooms online. It provides an easy search bar to help users find their desired property as quickly as possible.

## Getting Started
To get started with this project, developers who want to clone this project should consider the following backend details:

Create a .env file and add the following environment variables:
```bash
PORT
MONGO_URI
JWT_SECRET
ACCESS_TOKEN
CLIENT_URL
MAILING_SERVICE_CLIENT_ID
MAILING_SERVICE_CLIENT_SECRET
MAILING_SERVICE_REFRESH_TOKEN
SENDER_EMAIL_ADDRESS
EMAIL_SERVICE
EMAIL_USERNAME
EMAIL_PASSWORD
EMAIL_FROM
CLOUD_NAME
CLOUD_API_KEY
CLOUD_API_SECRET
STRIPE_SECRET
STRIPE_REDIRECT
STRIPE_SETTING_REDIRECT_URL
STRIPE_SUCCESS_URL
```

## Backend Details

Yodoor's backend requires the following environment variables:

- PORT: Port number for the server
- MONGO_URI: MongoDB connection string
- JWT_SECRET: Secret key for JSON Web Token encryption
- ACCESS_TOKEN: Access token for Yodoor API
- CLIENT_URL: URL of Yodoor client-side app
- MAILING_SERVICE_CLIENT_ID: Client ID for mailing service
- MAILING_SERVICE_CLIENT_SECRET: Client secret for mailing service
- MAILING_SERVICE_REFRESH_TOKEN: Refresh token for mailing service
- SENDER_EMAIL_ADDRESS: Email address of sender
- EMAIL_SERVICE: Email service provider
- EMAIL_USERNAME: Email service provider username
- EMAIL_PASSWORD: Email service provider password
- EMAIL_FROM: Email address of sender
- CLOUD_NAME: Cloudinary name
- CLOUD_API_KEY: Cloudinary API key
- CLOUD_API_SECRET: Cloudinary API secret
- STRIPE_SECRET: Stripe secret key
- STRIPE_REDIRECT: Stripe redirect URL
- STRIPE_SETTING_REDIRECT_URL: Stripe settings redirect URL
- STRIPE_SUCCESS_URL: Stripe success URL

Once you have the environment variables set up,install all the dependecies  by running the command 
```bash
npm install
```
Then  start developing by running this command below.
```bash
npm start
```
## Contributing
If you want to contribute to this project, please follow these steps:

- Fork this repository.
- Clone the forked repository to your local machine.
- Create a new branch and make your changes.
- Push your changes to your forked repository.
- Create a pull request to the original repository.



