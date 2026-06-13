const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

require("dotenv").config();

const Multimedia =
require("./models/multimedia");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
"/uploads",
express.static("uploads")
);

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000
})
.then(() => {
  console.log("MongoDB conectado");
})
.catch(err => {
  console.error("ERROR COMPLETO:");
  console.error(err);
});

const storage =
multer.diskStorage({

destination:(req,file,cb)=>{
cb(null,"uploads/");
},

filename:(req,file,cb)=>{
cb(
null,
Date.now() + "-" +
file.originalname
);
}

});

const upload =
multer({storage});

// CREATE
app.post(
"/api/multimedia",
upload.fields([
{name:"imagen"},
{name:"audio"}
]),
async(req,res)=>{

try{

const nuevo =
new Multimedia({

titulo:req.body.titulo,

descripcion:
req.body.descripcion,

imagenUrl:
"http://localhost:3000/uploads/" +
req.files.imagen[0].filename,

audioUrl:
"http://localhost:3000/uploads/" +
req.files.audio[0].filename

});

await nuevo.save();

res.json(nuevo);

}catch(error){

res.status(500)
.json(error);

}

});

// READ
app.get(
"/api/multimedia",
async(req,res)=>{

try{

const datos =
await Multimedia.find();

res.json(datos);

}catch(error){

res.status(500)
.json(error);

}

});

// UPDATE
app.put(
"/api/multimedia/:id",
async(req,res)=>{

try{

const actualizado =
await Multimedia.findByIdAndUpdate(

req.params.id,

req.body,

{new:true}

);

res.json(actualizado);

}catch(error){

res.status(500)
.json(error);

}

});

// DELETE
app.delete(
"/api/multimedia/:id",
async(req,res)=>{

try{

await Multimedia.findByIdAndDelete(
req.params.id
);

res.json({
mensaje:"Eliminado"
});

}catch(error){

res.status(500)
.json(error);

}

});

app.listen(
process.env.PORT,
()=>{
console.log(
"Servidor ejecutándose en puerto " +
process.env.PORT
);
});