let idEditar = null;
const API =
"https://galeria-multimedia.onrender.com/api/multimedia";

const formulario =
document.getElementById(
"formulario"
);

formulario.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const formData =
new FormData();

formData.append(
"titulo",
document.getElementById(
"titulo"
).value
);

formData.append(
"descripcion",
document.getElementById(
"descripcion"
).value
);

formData.append(
"imagen",
document.getElementById(
"imagen"
).files[0]
);

formData.append(
"audio",
document.getElementById(
"audio"
).files[0]
);

await fetch(API,{

method:"POST",
body:formData

});

cargar();

formulario.reset();

});

async function cargar(){

const res =
await fetch(API);

const datos =
await res.json();

const lista =
document.getElementById(
"lista"
);

lista.innerHTML = "";

datos.forEach(d=>{

lista.innerHTML += `

<div class="border p-4 mb-4">

<h2 class="font-bold text-xl">
${d.titulo}
</h2>

<p>
${d.descripcion}
</p>

<br>

<img
src="${d.imagenUrl}"
width="250">

<br><br>

<audio
controls
src="${d.audioUrl}">
</audio>

<br><br>

<button
onclick="editar(
'${d._id}',
'${d.titulo}',
'${d.descripcion}'
)"
class="bg-yellow-500 text-white p-2 rounded">

Editar

</button>

<button
onclick="eliminar('${d._id}')"
class="bg-red-600 text-white p-2 rounded">

Eliminar

</button>

</div>

`;

});

}

async function eliminar(id){

await fetch(
API + "/" + id,
{
method:"DELETE"
}
);

cargar();

}

function editar(
id,
titulo,
descripcion
){

idEditar = id;

document.getElementById(
"editTitulo"
).value = titulo;

document.getElementById(
"editDescripcion"
).value = descripcion;

document.getElementById(
"formEditar"
).style.display = "block";

}

document.getElementById(
"formEditar"
).addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const formData =
new FormData();

formData.append(
"titulo",
document.getElementById(
"editTitulo"
).value
);

formData.append(
"descripcion",
document.getElementById(
"editDescripcion"
).value
);

const imagen =
document.getElementById(
"editImagen"
).files[0];

if(imagen){

formData.append(
"imagen",
imagen
);

}

const audio =
document.getElementById(
"editAudio"
).files[0];

if(audio){

formData.append(
"audio",
audio
);

}

await fetch(
API + "/" + idEditar,
{
method:"PUT",
body:formData
}
);

document.getElementById(
"formEditar"
).reset();

document.getElementById(
"formEditar"
).style.display = "none";

cargar();

});

cargar();