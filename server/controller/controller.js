var Userdb = require('../model/model');

exports.create = (req, res)=>{
    if(!req.body){
        res.status(400).send({message: "Error, no puede estar vacio el espacio"});
        return;
    }

    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
    })

    user
        .save(user)
        .then(data => {
            res.redirect('/new_user');
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Parece que hay un error con la creacion de usuario"
            });
        });

}

exports.find = (req, res) =>{
    
    if(req.query.id){
        const id = req.query.id;
        
        Userdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message: "No se encuentra el usuario"+id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error con usuario " +id})
            })
    }else{
        Userdb.find()
            .then(user=>{
                res.send(user)
            })
        .catch(err =>{
            res.status(500).send({
                message:err.message || "Error al obtener info"
            });
        });   
    }
}

exports.update = (req, res) =>{
    if(!req.body){
        return res
            .status(400)
            .send({message: "La info no puede ser actualizada si falta una casilla"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data=>{
            if(!data){
               res.status(404).send({message: `No se puede actualizar el usuario ${id}.Talvez no exista`}) 
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message: "Error para actualizar informacion"})
        })
}

exports.delete = (req, res) =>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message: `No se puede eliminar el usaurio con id ${id}. Algo salio mal`})
            }else{
                res.send({
                    message: "Usuario eliminado exitosamente"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "No se puede eliminar el usuario con id="+id
            });
        });
}