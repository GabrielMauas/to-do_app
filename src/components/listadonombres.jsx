import React, {useState} from 'react';
import uniqid from 'uniqid';


const ListadoNombres = () => {

    // Estados
    const [nombre, setNombre] = useState('')
    const [listanombres, setListanombres] = useState([])
    const [edicion, setEdicion] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState(null)


    // Funciones
    const addName = e => {
        e.preventDefault()
        
        if(!nombre.trim()) {
            setError('El campo está vacio')
            return
        }
        const nuevoNombre = {
            id: uniqid(),
            tituloNombre: nombre
        }
        setListanombres([...listanombres,nuevoNombre])
        setNombre('')
        setError(null)
    }

    const delName = id => {
        const nuevoArray = listanombres.filter(item => item.id !== id)
        setListanombres(nuevoArray)
    }

    const editar = item => {
        setEdicion(true)
        setNombre(item.tituloNombre)
        setId(item.id)
    }

    const editarNombre = e => {
        e.preventDefault()

        if(!nombre.trim()) {
            setError('El campo está vacio')
            return
        }

        const nuevoArray = listanombres
            .map(item => item.id === id ? {id: id, tituloNombre: nombre} : item)
        setListanombres(nuevoArray)
        setEdicion(false)
        setNombre('')
        setError(null)
    }


    return(
        <div className="">
            <h1 className="">TO-DO APP</h1>
            <div className="contenedor">

                <div className="mt-3"> {/* Bloque para agregar */}
                        <h2 className="">Añadir</h2>
                        <form onSubmit={edicion ? editarNombre : addName} className="form-group">
                            <input 
                                onChange={ e => setNombre(e.target.value)} 
                                className="" type="text" 
                                placeholder="Escribe algo..."
                                value={nombre}
                            />
                            <input 
                                className="bton" 
                                type="submit" 
                                value={edicion ? 'Editar' : 'Registrar' }
                            />
                        </form>
                        {error != null ? <div className="alert alert-danger p-1 text-center">Campo Vacio</div> : <div></div>}
                </div>

                <div className="border border- my-4 mx-3"></div> {/* Divisor */}

                <div className="mt-3 padre"> {/* Bloque para mostrar */}
                    <h2 className="">TO-DO</h2>
                    <ul className="list-group">
                        {
                            listanombres.map( item => {
                                return(
                                    <li key={item.id}
                                        className="list-group-item text-capitalize my-1 d-flex align-items-center justify-content-between">
                                        {item.tituloNombre}
                                        <div>
                                            <button 
                                            className="btn btn-outline-info btn-sm"
                                            onClick={() => editar(item)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                            className="btn btn-outline-danger btn-sm ml-2"
                                            onClick={() => delName(item.id)}
                                            >
                                                X
                                            </button>
                                        </div>
                                    </li>
                                )                                
                            })
                        }
                    </ul>
                </div>

            </div> {/* Contenedor 2 */}
        </div> /* Contenedor Gral */
    )
}

export default ListadoNombres;