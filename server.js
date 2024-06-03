
let mongoose = require("mongoose");
let cors = require("cors");
let express = require("express");

let app = express();
app.use(cors());

app.get("/countryList", async (req, res) => {
    let countryList = await Employee.find().distinct("country");
    res.json(countryList);
});
app.get("/departmentList", async (req, res) => {
    let departmentList = await Employee.find().distinct("department");
    res.json(departmentList);
});
app.get("/genderList", async (req, res) => {
    let genderList = await Employee.find().distinct("gender");
    res.json(genderList);
});

app.get("/employees", async (req, res) => {
    console.log(req.query);
    let employees = await Employee.find().and([{ country: req.query.country }, { department: req.query.department }, { gender: req.query.gender }]);
    // distinct("gender");
    // and([{ country: "Russia" }, { gender: "Male" }]);
    // and([{ country: "Russia" }, { gender: "Male" }]).count();
    // and({ country: "Russia" }).count();
    // select(["firstName", "gender", "country", "salary", "-_id"]);
    // select(["firstName", "gender", "country", "salary"]);
    // sort("-country");
    // and([{ country: "Russia" }, { gender: "Male" }, { age: { $lte: 25 } }, { department: { $in: ["Accounting", "Legal"] } }]);
    // limit(100).skip(200);
    res.json(employees);

});
app.listen(4567, () => {
    console.log("Listening to port 4567");
});


let creatEmployeeScheema = new mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String,
    email: String,
    gender: String,
    age: Number,
    department: String,
    country: String,
    profilePic: String,
    salary: String,
});

let Employee = new mongoose.model("employee", creatEmployeeScheema);

let connectToMongoDatabase = async () => {
    try {
        await mongoose.connect("mongodb+srv://nirmalirish1234:Nirman%4024@nirmal.p9uda40.mongodb.net/airtel?retryWrites=true&w=majority&appName=Nirmal");
        console.log("Data is Successfully connected to Database ");
    }
    catch (err) {
        console.log("Exception in Mongo Database" + err)
    }
}
connectToMongoDatabase();
