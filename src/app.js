const path = require("path");
const express = require("express");
const hbs = require("hbs");

const forecast = require("./utils/forecast.js");
const geocode = require("./utils/geocode.js");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.status(200).render("index", {
    title: "Weather App",
    name: "Alfonso Garcia"
  });
});

app.get("/about", (req, res) => {
  res.status(200).render("about", {
    title: "About Us",
    name: "Alfonso Garcia"
  });
});

app.get("/help", (req, res) => {
  res.status(200).render("help", {
    title: "Help",
    message: "Example message",
    name: "Alfonso Garcia"
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(401).json({
      error: "You must provide an address!"
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.json({ error });
    }

    forecast(
      latitude,
      longitude,
      (error, { temperature, summary, humidity, rainChance }) => {
        if (error) {
          return res.status(400).json({ error });
        }

        res.status(200).json({
          temperature,
          summary,
          humidity,
          rainChance,
          location
        });
      }
    );
  });

  // res.status(200).json([
  //   {
  //     forecast: "It is sunny",
  //     location: "Anaheim",
  //     address
  //   }
  // ]);
});

app.get("/products", (req, res) => {
  const { search, limit } = req.query;

  if (!search) {
    return res.status(401).json({
      error: "You must provide a search term!"
    });
  }

  res.status(200).json({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.status(200).render("404", {
    title: "404 Page",
    name: "Alfonso Garcia",
    error: "Help article not found."
  });
});

app.get("*", (req, res) => {
  res.status(200).render("404", {
    title: "404 Page",
    name: "Alfonso Garcia",
    error: "Page not found."
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
