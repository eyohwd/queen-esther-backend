const express = require("express");
const dotevn = require("dotenv")
dotevn.config()
const mongoose = require("mongoose")
         mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DBconnection sucessfull")).catch((err)=>{console.log(err)})

const app = express();
const cors = require("cors")


//app.get("/api/test", ()=>{
 //   console.log("test is sucessful")
//})

const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const stripeRoute = require("./routes/stripe")

app.use(express.json())
app.use(cors())

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)
app.use("/api/orders", orderRoute)
app.use("/api/checkout", stripeRoute)

app.listen(process.env.PORT || 5000, ()=>{console.log("Backend server is running")});

