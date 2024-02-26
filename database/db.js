import mongoose from "mongoose";

// mongoose.connect('mongodb://localhost:27017/FinalYearProject'
mongoose.connect('mongodb+srv://asharshahid766:PFBW5HHmyHquaC9g@cluster0.roe15k3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
    // useCreateIndex:true,
    // useFindAndModify:fasle
).then(()=>{console.log("Connection succesful")})
.catch( (error)=>{console.log(`Connection failed ${error}`)})