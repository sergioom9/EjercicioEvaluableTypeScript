# Práctica 4 

### Deno Deploy
[]()

## Endpoints

### TARDIS

#### Obtener información de la TARDIS mediante su ID 
GET: ` /get_tardis/:id  `


#### Crear nueva TARDIS 
POST: ` /post_tardis `

Formato del Body:
  ```json
  {
    "nombre": "Juanete",
    "raza": "Humano",
    "descripcion": "Soy una prueba",
    "habilidades": "Se programar mas o menos"
  } 

#### Actualizar informacion Tardis mediante su ID
PUT: /put_tardis/:id
(necesario un body)


#### Borrar TARDIS mediante su ID 
DELETE: /delete_tardis/:id




## Explicaciones especificas

He añadido try y catch para facilitar el uso de las cosas y he añadido respuestas con status y frases para entender donde falla, en cuanto a las razas y datos de los bodys he verificado que todo llegara correctamente y no faltara nada.


