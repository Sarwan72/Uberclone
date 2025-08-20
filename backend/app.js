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

// const allowedOrigins = [
//   "http://localhost:5173", // local dev
//   "https://uberclone-3-git-main-sarwan-kumars-projects-17476828.vercel.app",
//   "https://uberclone-3-1p1e5dnzx-sarwan-kumars-projects-17476828.vercel.app"
// ];
// app.use(
//   cors({
//     origin: allowedOrigins, // frontend URL
//     credentials: true, // allow cookies & authorization headers
//   })
// );




app.use(
  cors({
    origin: [
 "http://localhost:5173", // local dev
  "https://uberclone-3-sarwan-kumars-projects-17476828.vercel.app",
    ],
     methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // allow cookies/auth headers
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