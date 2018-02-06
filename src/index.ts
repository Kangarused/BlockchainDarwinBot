import app from './app/app';

// Get the heroku index page and display message to show successfull deployment
app.express.get("/", (req, res) => {
    res.send("Deployment Successful");
});