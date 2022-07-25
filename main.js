class Usuario{
    constructor(nombre, email, constraseña, capital, activo, precioC, precioV, apalancamiento){
        this.nombre = nombre
        this.email = email 
        this.constraseña = constraseña
        this.capital = capital
        this.activo = activo
        this.precioC = precioC
        this.precioV = precioV
        this.apalancamiento = apalancamiento
       
        
    }
   
}
let usuarios = []
 

if(localStorage.getItem("usuarios")){
    usuarios = JSON.parse(localStorage.getItem("usuarios"))
}else{
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
}


const form = document.getElementById("idForm")
const botonUsuarios = document.getElementById("botonUsuarios")
const divUsuarios = document.getElementById("divUsuarios")
const botonGanancia = document.getElementById("botonGanancia")
const divGanancia = document.getElementById("divGanancia")



form.addEventListener("submit", (e) =>{
    e.preventDefault()
    console.log(e.target)
    let datForm = new FormData(e.target)
    let usuario = new Usuario(datForm.get("nombre"), datForm.get("email"), datForm.get("constraseña"), datForm.get("capital"), datForm.get("activo"), datForm.get("PrecioC"), datForm.get("PrecioV"), datForm.get("PrecioV"), datForm.get("apalancamiento"))
    usuarios.push(usuario)
    console.log(usuarios)
    
    
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
    formTareas.reset()
    
})


botonUsuarios.addEventListener("click", () => {
    let arrayStorage = JSON.parse(localStorage.getItem("usuarios"))
divUsuarios.innerHTML = ""
arrayStorage.forEach((usuario, indice) => {
    divUsuarios.innerHTML +=  `
    <div class="card border-dark mb-3" id="usuario${indice}" style="max-width: 20rem; margin: 4px;">
        <div class="card-header"><h2>${usuario.nombre}</h2></div>
        <div class="card-body">
            <p class="card-title">${usuario.email}</p>
            <button class="btn btn-danger">Eliminar Tarea</button>
        </div>
    </div>
    
    `
});

arrayStorage.forEach((usuario, indice) => {
    let botonCard = document.getElementById(`usuario${indice}`).lastElementChild.lastElementChild
    botonCard.addEventListener("click", () => {
        document.getElementById(`usuario${indice}`).remove()
        usuarios.splice(indice,1)
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
console.log (`${usuario.nombre} Eliminada`)   

    })
})


})


botonGanancia.addEventListener("click", () => {

    let arrayResultado = JSON.parse(localStorage.getItem("usuarios"))
    divGanancia.innerHTML = ""
    arrayResultado.forEach((usuario, indice) => {
        divGanancia.innerHTML =   `
        <div class="card" id="usuario${indice}" style="max-width: 20rem; margin: 4px;">
  <div class="card-header">
  nombre de activo:  ${usuario.activo}
  </div>
  <div class="card-body">
    <blockquote class="blockquote mb-0">
      <p>capital inicial: ${usuario.capital} $</p>
      <footer class="blockquote-footer">Sus ganancias en ${usuario.activo} son de: <cite title="Source Title">  +${((100*usuario.apalancamiento)*usuario.capital)/100} $</cite></footer>
    </blockquote>
    <button class="btn btn-danger">Eliminar Tarea</button>
  </div>
</div>
         `

    })
})

arrayResultado.forEach((usuario, indice) => {
    let botonBorrar = document.getElementById(`usuario${indice}`).lastElementChild.lastElementChild.lastElementChild
    botonBorrar.addEventListener("click", () => {
        document.getElementById(`usuario${indice}`).remove()
        usuarios.splice(indice, 1)
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
        console.log(`${usuario.nombre} Eliminada`)
    })
})



//calcular ganancia total:
//(porcentaje*usuario.apalancamiento)*usuario.capital)/100



//calcular porcentaje:
//((usuario.precioV-usuario.precioC)/usuario.precioC)*100