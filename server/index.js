const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const authRoute = require("./routes/auth.js");
const listingsRoute = require("./routes/listing.js");
const bookingRoute = require("./routes/booking.js");
const userRoute = require("./routes/user.js");

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//routes
app.use("/auth", authRoute);
app.use("/properties", listingsRoute);
app.use("/bookings", bookingRoute);
app.use("/users", userRoute);

//mongoose setup
const PORT = 3001
mongoose.connect(process.env.MONGO_URL, {
    dbName: "Utopia",
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((err) => console.log(`${err} did not connect`));