$("#new_user").submit(function(event){
    alert("El usuario fue agregado con exito!");
})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost:3000/api/users/${id}`,
            "method": "DELETE"
        }

        if(confirm("Seguro de eliminar este usuario?")){
            $.ajax(request).done(function(response){
                alert("Eliminado!");
                location.reload();
            })
        }
    })
}