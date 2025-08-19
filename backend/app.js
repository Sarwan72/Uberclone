const dotenv=require('dotenv');
dotenv.config();
const express= require('express');
const cors= require('cors');
const app=express();
const connectToDb= require('./db/db.js');
const userRoutes= require('./routes/user.routes'); 
const captainRoutes = require('./routes/captain.routes');
const cookieParser= require('cookie-parser');
const mapsRoutes= require('./routes/maps.routes');
const rideRoutes=require('./routes/ride.routes');
connectToDb();


// app.use(cors());



app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // allow cookies & authorization headers
  })
);

app.use(express.json());
app.use(express.urlencoded({extend: true}));
app.use(cookieParser());


app.get('/', (req, res)=> {

    res.send('Hello World');
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/ride', rideRoutes);

  //=mongodb+srv://sarwan72:sarwan321@cluster0.6jqo2ei.mongodb.net/ubel_clone

module.exports= app;