const express= require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

   
   // res.send("server is up and running");
})
app.post("/",function(req,res){
    // console.log(req.body.cityname);
    // console.log("post request received");
     const query=req.body.cityname;
    const appid="048b93fbcd768c0590e6f9daa9b2f686";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+units;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherdata=JSON.parse(data);
            // const object={
            //     name:"vishnu",
            //     place:"jaipur",
            // }
            // console.log(JSON.stringify(object));
            console.log(weatherdata);
            const temp=weatherdata.main.feels_like;
            console.log(temp);
            const weather_discription=weatherdata.weather[0].description;
            const icon=weatherdata.weather[0].icon;
            const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p> the weather is currently "+ weather_discription);
            res.write("<h1> the temperature in "+query+" is "+temp+" degrees celcius<h1>");
            res.write("<img src="+imageURL+">");
            res.send();
            
        })
    })
})




app.listen(3000,function(){
    console.log("your server is running on port 3000");
})
