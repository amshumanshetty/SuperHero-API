import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port  = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.post("/stats", async(req,res)=>{
    const id = req.body.id;
    try{
        const response = await axios.get("https://www.superheroapi.com/api.php/e04da9a105b52782c95d27a6b0d3e618/"+id);
        const Herodata = response.data;
        const HeroImage = Herodata.image.url;
        const HeroName = Herodata.name;
        const HeroStats = Herodata.powerstats;
        console.log(`Image:${HeroImage}`);
        console.log(`Stats:${HeroStats}`)
        res.render("stats.ejs",{heroImg: HeroImage, herostat : HeroStats, heroName : HeroName});

    }
    catch(error){
        console.log(error.response.data);
    }
})

app.get("/id",(req,res)=>{
    res.render("id.ejs");
})


app.listen(port,()=>{
    console.log(`App running on port ${port}`);
})

