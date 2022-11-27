module.exports = (express) => {
    let router = express.Router();

    router.get('/', (req, res) => {
        res.send({ data: "Guest Home Route" });
    })

    router.get('/about', (req, res) => {
        res.send({ data: "Guest About Route" });
    })

    return router;
}