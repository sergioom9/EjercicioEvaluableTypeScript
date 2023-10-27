# EjercicioEvaluableTypeScript
Ejercicio de Arquitectura y Programación de Sistemas en Internet


Deno Deploy:



## EndPoints

### GET

- Obtener todos los personajes existentes
  `/api/tierramedia/personajes`

- Obtener un personaje mediante id
  `/api/tierramedia/personajes/:id`


### DELETE

- Eliminar un Personaje por su ID
  `/api/tierramedia/personajes/:id`

### POST

- Crear un Personaje
  `/api/tierramedia/personajes`

  Formato del Body:
  ```json
  {
    "nombre": "Juanete",
    "raza": "Humano",
    "descripcion": "Soy una prueba",
    "habilidades": "Se programar mas o menos"
  }

### PUT
- Actualizar un Personaje por su ID
    `/api/tierramedia/personajes/:id`



## Explicaciones especificas

He añadido try y catch para facilitar el uso de las cosas y he añadido respuestas con status y frases para entender donde falla, en cuanto a las razas y datos de los bodys he verificado que todo llegara correctamente y no faltara nada.


