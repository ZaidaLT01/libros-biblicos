//express
const express = require('express');
const app= express();
const PORT= 4000; //Pude cambiar 4500 u otro que no este siendo utilizado
//array 
let librosBiblicos=[
{id: 1, nombre:'Genesis', autor:'Moises',añoPublicación:2020},
{id: 2, nombre:'Exodo', autor:'Moises',añoPublicación:2024},
{id: 3, nombre:'Levitico', autor:'Moises',añoPublicación:1990}
];
//manejo de JSON
app.use(express.json());

//endpoint 1 Obtener todos los libros
app.get('/libros',(req,res)=>{
    res.json(librosBiblicos);
});

// endpoint 2 obtener libro por id
app.get('/libros/:id',(req,res)=>{
    const idCapturado =parseInt(req.params.id);
        console.log(idCapturado);
    const libroEncontrado=librosBiblicos.find((libro)=>libro.id===idCapturado);
    if(libroEncontrado){
        res.json(libroEncontrado);
    }else{
        res.status(404).json({mensaje:'Libro no Encontrado'});
    }
});
// endpoint 3 Agregar un libro
app.post('/agregar-libro',(req,res)=>{
    const nuevoLibro=req.body;
    console.log(nuevoLibro);
    librosBiblicos.push(nuevoLibro);
    res.status(201).json('este libro fue mandado exitosamente');
})
// endpoint 4 Actualizar libro
app.put('/actualizar-libro/:id',(req,res)=>{
    const idCapturado =parseInt(req.params.id);
    const indexLibroLocalizado=librosBiblicos.findIndex((libro)=>libro.id===idCapturado);
    if(indexLibroLocalizado !== -1){
    librosBiblicos[indexLibroLocalizado]=req.body;
    res.json(librosBiblicos[indexLibroLocalizado]);
    }else{
        res.status(404).json({mensaje:'Libro no Encontrado'});
    }
});
// endpoint 5 Eliminar
app.delete('/eliminar-libro/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    lBiblico=librosBiblicos.filter(libro => libro.id !== id);
    res.status(201).json({mensaje:'se ha eliminado el libro'});
    console.log(lBiblico);
});
// endpoint 6 Año de publicacion
app.get('/libros/publicacion/:anio',(req,res)=>{
    const year = parseInt(req.params.anio);
    const librosPublicados = librosBiblicos.filter(x => x.añoPublicación===year);
    if(librosPublicados.length > 0 ){
        res.json(librosPublicados);
    }else{
        res.status(404).json({mensaje:'no se han encontrado libros'});
    }
});

app.listen(PORT,()=>{
    console.log("Servidor corriendo en el puerto http://localhost:"+PORT);
});