
const express = require('express') //commonjs
const app = express()
const port = 3000
app.use(express.json())
const connection = require("./database/db")

app.get('/', (req, res) => { //desde de la / sele conoce como path o ruta
  res.send('Hola tuki')
}) //callback


app.post('/users',async (req, res)=>{
  const data = req.body;
  const db = await connection;
  const nombre_usuario = data.nombre_usuario;
  const contrasena = data.contrasena;
  const nombre_completo = data.nombre_completo;
  const correo_electronico = data.correo_electronico;
  const telefono = data.telefono;
  const rol = data.rol;

  const sql =
    'INSERT INTO `usuarios`(`nombre_usuario`, `contrasena`,`nombre_completo`, `correo_electronico`,`telefono`, `rol`)' +
    `VALUES ("${nombre_usuario}","${contrasena}","${nombre_completo}","${correo_electronico}","${telefono}","${rol}")`;

  const [result, fields] = await db.query(sql);
  res.send(result);

})

app.put('/users', async (req, res)=>{
  const data = req.body;
  const db = await connection;
  const opcion = data.opcion;
  const nombre_usuario = data.nombre_usuario;

  try {
    const sql = 'UPDATE `usuarios` SET `nombre_usuario` = ? WHERE `nombre_usuario` = ? LIMIT 1';
    const [result] = await db.query(sql, [nombre_usuario, opcion]);
    res.send(result);

  } catch (err) {
    console.error("Usuario invalido", err);
    res.status(500).send("Error actualizando el usuario");
  }
})

app.delete('/users', async (req, res)=>{
  const data = req.body;
  const db = await connection;
  const nombre_usuario = data.nombre_usuario;
  
  try {
    const sql = 'DELETE FROM `usuarios` WHERE `nombre_usuario` = ? LIMIT 1';
  
    const [result] = await db.query(sql, [nombre_usuario]);
    res.send(result);

  } catch (err) {
    console.error("Usuario invalido", err);
    res.status(500).send("Error eliminando el usuario");
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//instalar postman API platform
//instalar mysql2
//Instalar CORS
