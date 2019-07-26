if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const stripe = require("stripe")("sk_test_8g6aMIUlk2LCMpNPHQZOkkDF00Qat5UV3s");
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index.hbs", {
    stripePublicKey: stripePublicKey
  });
});

app.post("/", (req, res) => {
  payment = {};
  payment.name = req.body.name;
  payment.email = req.body.email;
  payment.phone = req.body.phone;
  payment.cost = 0;
  console.log(payment);
  stripe.charges
    .create({
      amount: 5000,
      source: "tok_mastercard",
      currency: "usd"
    })
    .then(function() {
      console.log("Charge Successful");
      res.json({ message: "Successfully purchased items" });
    })
    .catch(function(err) {
      console.log(err);
      console.log("Charge Fail");
      res.status(500).end();
    });
});

app.listen(port, () => {
  console.log("listening at port: ", port);
});
