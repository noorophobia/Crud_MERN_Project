# Crud_MERN_Project
Simple User adding deleting updating MERN app 

# CRUD MERN Project

## Installation

### Client-side

1. Initialize a Vite project with React and JavaScript:

    ```bash
    npm init vite@latest crud-client -- --template react
    ```

2. Navigate into the `crud-client` directory:

    ```bash
    cd crud-client
    ```

3. Install the necessary dependencies:

    ```bash
    npm install
    ```

4. Run the development server:

    ```bash
    npm run dev
    ```

5. Install additional dependencies:

    ```bash
    npm install bootstrap react-router-dom axios
    ```

### Server-side

1. Create the `server` folder and navigate into it:

    ```bash
    mkdir server
    cd server
    ```

2. Initialize a Node.js project:

    ```bash
    npm init -y
    ```

3. Install the necessary dependencies:

    ```bash
    npm install express mongoose cors nodemon multer path bcrypt cookie-parser jsonwebtoken
    ```

4. Update the `package.json` file. In the `scripts` section, add the following line:

    ```json
    "scripts": {
      "start": "nodemon index.js"
    }
    ```

5. To start the server, use the following command inside the `server` directory:

    ```bash
    npm start
    ```

6. Make sure to update your MongoDB connection string in your `index.js` or your main server file:

    ```javascript
    mongoose.connect("mongodb://localhost/your-schema-in-mongodb");
    ```

## Usage

Follow the instructions above to set up both the client-side and server-side of the project. Once both are running, you should be able to use your CRUD application.

## Contributing

If you wish to contribute to this project, please fork the repository and submit a pull request.

 
