import express, { Request, Response } from "npm:express@4.18.2";
import { PersonajeModel, PersonajeModelType } from "./Personaje.ts";
import mongoose from "npm:mongoose@7.6.3";




console.log("Intentando conectarme a mongoo...");
try{

await mongoose.connect("mongodb+srv://sergioom9:nebrija22@cluster0.9dzkoo1.mongodb.net/?retryWrites=true&w=majority");
console.log("Conectado a mongo...");

//creacion de express y metodo para usar datos en formato JSON 
const miapp =express();
miapp.use(express.json());

//METODO POST AÑADIR DISCO
miapp.post("/api/tierramedia/personajes", async (req: Request, res: Response) => {
    //creamos variable de tipo Disco usando DiscoModelType y le asignamos body request
    const body: Partial<Omit<PersonajeModelType, "_id">> = req.body;
    const { nombre, raza, descripcion, habilidades} = body;
    //comprobamos que tengamos todos los datos necesarios 
    if (!nombre || !raza || !descripcion || !habilidades) {
        res.status(300).send("Faltan datos");
        return;
    }
    //BUscamos si hay algun Disco con el mismo ID
    const exists = await PersonajeModel.findOne({ nombre : body.nombre, raza:body.raza, descripcion:body.descripcion,habilidades:body.habilidades }).exec();
    if (exists) {
        res.status(503).send("Ya existe una disco con esos datos");
        return;
    }
    if(raza=="Humano" || raza=="Hobbit" || raza=="Elfo" || raza=="Enano" || raza=="Ents"){
    //al comprobar que no hay Disco con el mismo Id creamos el disco en Mongo
    const newPersonaje = await PersonajeModel.create({
        nombre,
        raza,
        descripcion,
        habilidades
    });
    //enviamos respuesta con los Datos Disco creado
    res.status(200).send({
        nombre: newPersonaje.nombre,
        raza: newPersonaje.raza,
        descripcion: newPersonaje.descripcion,
        habilidades: newPersonaje.habilidades                
    });
}else{
    res.status(500).send("Que tipo es ese de raza?");
}});



 //METODO GET ALL HOBBITS
 miapp.get("/api/tierramedia/personajes", async (req: Request, res: Response) => {
    try{
    const Hobbit = await PersonajeModel.find().exec();
    res.send(Hobbit);
    }catch(e){
        res.status(500).send("Get Hobbit failed");
    }
});

//METODO GET HOBBITS BY ID
miapp.get("/api/tierramedia/personajes/:id", async (req: Request, res: Response) => {
    try{
    const id = req.params.id;
    const Hobbit = await PersonajeModel.findById(id).exec();
    res.send(Hobbit);
    }catch(e){
        res.status(500).send("Get Hobbit by ID failed");
    }
  });


//METODO DELETE HOBBIT BY ID 
miapp.delete("/api/tierramedia/personajes/:id",async (req:Request,res:Response)=>{
    try{
    const id = req.params.id;
    const Hobbit = await PersonajeModel.findByIdAndDelete(id).exec();
    if(!Hobbit) res.send("No se ha encontrado el personaje a borrar")
    else res.json("Personaje eliminado"); 
    }catch(e){
        res.status(500).send("Delete Personaje failed");
    }    
})

//METODO PUT PARA ACTUALIZAR DATOS PERSONAJE
miapp.put("/api/tierramedia/personajes/:id",async (req: Request,res: Response)=>{
    try{
    const personaje = req.body; //Especifico que el disco tiene la información en el body del request
    const identifier = req.params.id;
    if (!personaje.nombre || !personaje.raza || !personaje.descripcion || !personaje.habilidades) {
        res.status(500).send();
            return;
    }
    if(personaje.raza=="Humano" || personaje.raza=="Hobbit" || personaje.raza=="Elfo" || personaje.raza=="Enano" || personaje.raza=="Ents"){
        const actualizar_personaje = await PersonajeModel.findByIdAndUpdate(identifier,personaje).exec();
    }else{
        res.status(500).send("Personaje de raza rarita...")
    }
    

    res.send("Actualizacion completada");
    }catch(e){
        res.status(500).send("Update personaje failed");
    }
    
});




//ponemos servidor a escuchar en el puerto 3000
miapp.listen(3000,()=>{
    console.log("Escuchando en puerto 3000");

});
}catch(e){
    console.log("No ha sido posible conectarse a MongoDb");
}