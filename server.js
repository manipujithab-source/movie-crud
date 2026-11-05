const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/movies");

const Movie = mongoose.model("Movie", {
    title: String,
    genre: String,
    year: Number,
    rating: Number,
    director: String
});

app.post("/add", async (req, res) => {
    await Movie.create(req.body);
    res.send("Movie Added");
});

app.get("/movies", async (req, res) => {
    res.json(await Movie.find());
});

app.get("/search/:title", async (req, res) => {
    res.json(await Movie.find({
        title: { $regex: req.params.title, $options: "i" }
    }));
});

app.put("/update/:id", async (req, res) => {
    await Movie.findByIdAndUpdate(req.params.id, req.body);
    res.send("Updated");
});

app.delete("/delete/:id", async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id);
    res.send("Deleted");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});