module.exports = (express) => {
    let router = express.Router();

    router.get("/home", (req, res) => {
        res.send({ data: "User Home Router" });
    })

    return router;
}