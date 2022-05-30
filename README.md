<div align="center">
  <h1>Thumbnail generator API</h1>

  ![Github API Cover](https://user-images.githubusercontent.com/76404798/170848770-edc9d324-8cc3-44bb-8392-b06c22e9886a.png)
</div>  

---

This application is in charge of generating thumbnails based on an image received from the client side.

The image is processed by Cloudinary, which generates a link to the original image and thumbnails with defined dimensions.

You can check the SWAGGER documentation of the application at: [Thumbnail generator API docs](https://thumbnail-generator-backend.herokuapp.com/api-docs/)

---

## Environment variables

The following environment variables need to be set so that images can be processed with [Cloudinary](https://cloudinary.com/):

`CLOUDINARY_CLOUD_NAME`

`CLOUDINARY_API_KEY`

`CLOUDINARY_API_SECRET`

To get the values of these environment variables you must create a free account in [Cloudinary](https://cloudinary.com/) and from the dashboard you can get the data needed to run the application:

![Group 5](https://user-images.githubusercontent.com/76404798/170901184-a4763b18-1bc1-466a-abee-c35caeb6618a.png)

In the application you will find an `.env.sample` file which you can use as a template to generate the `.env` file in which to place the corresponding values of the environment variables.

---

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to make requests to server.

### `yarn dev`

Run the application locally on the port defined in the environment variables or on port 4000.
It uses nodemon to restart the server every time there is a change in the application.
Open [http://localhost:4000](http://localhost:4000) to make requests to server.

### `yarn test`

Launches the test runner in the interactive watch mode.
