// Import the Express application from the './backend/app.js' file.
// This 'app' object is expected to be a fully configured Express application instance.
const app = require('./backend/app');

// Start the HTTP server to listen on port 3000.
// The callback function is executed once the server is ready, logging a confirmation message.
// The application will be accessible at http://localhost:3000
app.get('/', (req, res) => {
    res.json({ message: "Backend Express fonctionne 🚀" });
});

app.listen(3000, () => {
    console.log("server is listening on port 3000 ....");
});