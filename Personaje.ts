import mongoose from "npm:mongoose@7.6.3";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PersonajeSchema=new Schema({
    nombre: {type:String,required:true},
    raza : {type:String,required:true},
    descripcion: {type:String,required:true},
    habilidades:{type:String,required:true},
    
});

export type PersonajeModelType={
    nombre: string,
    raza : string,
    descripcion: string,
    habilidades: string
   }

export const PersonajeModel = mongoose.model<PersonajeModelType>("TierraMedia",PersonajeSchema);