function dce(id){
	return document.createElement(id);
}

function geid(id){
	return document.getElementById(id);

}

var registro = [];

function Persona(c, n, a, t, f){
	this.cedula = c;
	this.nombre = n;
	this.apellido = a;
	this.telefono = t;
	this.foto = f;
}

function getPersona(){
	cedula = geid('txtCedula').value;
	nombre = geid('txtNombre').value;
	apellido = geid('txtApellido').value;
	telefono = geid('txtTelefono').value;
	canvasFoto = geid('canvas');
	foto = canvasFoto.toDataURL();
	persona = new Persona(cedula, nombre, apellido, telefono, foto);
	registro.push(persona);
	guardarDatos();
	limpiarCampos();

}

function mostrarPersonas(){
	destino = geid('tbDatos');
	destino.innerHTML = "";

	for(i = 0 ; i < registro.length ; i++ ){
		tPersona = registro[i];
		tr = dce('tr');
		
		td = dce('td');
		td.innerHTML = tPersona.cedula;
		tr.appendChild(td);

		td = dce('td');
		td.innerHTML = tPersona.nombre;
		tr.appendChild(td);

		td = dce('td');
		td.innerHTML = tPersona.apellido;
		tr.appendChild(td);

		td = dce('td');
		td.innerHTML = tPersona.telefono;
		tr.appendChild(td);

		td = dce('td');
		srt = tPersona.foto;
		td.appendChild(fotoPersona(srt));
		//td.innerHTML = '<img width="16" height="16" src="YourFileName.jpg" />'
		tr.appendChild(td);

		td = dce('td');

		btn = dce('button');
		btn.innerHTML = "Editar";
		btn.setAttribute('onclick', 'editarPersona(this);');
		td.appendChild(btn);

		btn = dce('button');
		btn.innerHTML = "Eliminar";
		btn.setAttribute('onclick', 'eliminarPersona(this);');
		td.appendChild(btn);

		tr.appendChild(td);
		tr.setAttribute('indice', i);



		destino.appendChild(tr);
	}
}

function fotoPersona(dataURL){
	foto = dce('img');
	foto.width = 100;
	foto.height = 100;
	foto.src = dataURL;


	return foto;
}

function editarPersona(btn){
	tr = btn.parentNode.parentNode;
	indice = tr.getAttribute('indice');

	tPersona = registro[indice];
	geid('txtCedula').value = tPersona.cedula;
	geid('txtNombre').value = tPersona.nombre;
	geid('txtApellido').value = tPersona.apellido;
	geid('txtTelefono').value = tPersona.telefono;

	geid('btnGuardar').setAttribute('onclick', 'edicionPersona(indice)');
}

function edicionPersona(indice){
	cedula = geid('txtCedula').value;
	nombre = geid('txtNombre').value;
	apellido = geid('txtApellido').value;
	telefono = geid('txtTelefono').value

	registro[indice].cedula = cedula;
	registro[indice].nombre = nombre;
	registro[indice].apellido = apellido;
	registro[indice].telefono = telefono;
	canvasFoto = geid('canvas');
	foto = canvasFoto.toDataURL();
	registro[indice].foto = foto;

	guardarDatos();

	limpiarCampos();
	mostrarPersonas();

	geid('btnGuardar').setAttribute('onclick', 'getPersona();');

}

function eliminarPersona(btn){
	//alert('Esta seguro que quiere eliminar al pokemon?');
	tr = btn.parentNode.parentNode;
	indiceP = tr.getAttribute('indice');
	tarr = [];

	for (c = 0 ; c < registro.length ; c++){
		if(c != indiceP){
			tarr.push(registro[c]);
		}
	}

	registro = tarr;
	guardarDatos();
	mostrarPersonas();

}





function limpiarCampos(){
	geid('txtCedula').value = "";
	geid('txtNombre').value = "";
	geid('txtApellido').value = "";
	geid('txtTelefono').value = "";
}

function guardarDatos(){
	datos = JSON.stringify(registro);
	localStorage.setItem('datosFotos', datos);
}

function cargarDatos(){
	datos = localStorage.getItem('datosFotos');
	if (datos != null){
		registro = JSON.parse(datos);
		mostrarPersonas();
	}	
}

// Grab elements, create settings, etc.
var video = document.getElementById('video');

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    });
}

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('video');

// Trigger photo take
document.getElementById("snap").addEventListener("click", function() {
	context.drawImage(video, 0, 0, 320, 200);
});

var c=document.getElementById("canvas");
var d=c.toDataURL("image/png");
var w=window.open('about:blank','image from canvas');
w.document.write("<img src='"+d+"' alt='from canvas'/>");



canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

// Create gradient
var grd = ctx.createLinearGradient(0,0,200,0);
grd.addColorStop(0,"blue");
grd.addColorStop(1,"white");

// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(10,10,150,80);

