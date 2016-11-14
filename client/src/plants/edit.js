import React from 'react';
import service from '../services/plants'
import env from '../services/environment'
import { Link } from 'react-router'

class EditPlant extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            plant: { loading: true }
        }
    }

    componentDidMount() {
        let id = this.props.params.id
        console.debug('didMount')
        service.getPlant(id, plant =>
            this.setState({
                plant: plant
            })
        )
    }

    render() {
        console.debug(this.state)
        let plant = this.state.plant
        if (!plant) {
            return <h2> Item não encontrado </h2>
        }
        if (plant.loading) {
            return <h2> Carregando... </h2>
        }
        return (
            <div className="container">
                <form id="plantasForm">
                    <h3>Editar Planta</h3>

                    <div className="col-lg-12">
                        <div className="form-group col-lg-6">
                            <label>Nome</label>
                            <input type="text" className="form-control" id="plant.name" value={plant.name[env.lang]} />
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="form-group col-lg-6">
                            <label>Nome Científico</label>
                            <input type="text" className="form-control" id="referencia" />
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="form-group col-lg-6">
                            <label>Família</label>
                            <input type="text" className="form-control" id="referencia" />
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="form-group col-lg-6">
                            <label>Partes</label>
                            <input type="text" className="form-control" id="referencia" />
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="form-group col-lg-6">
                            <label>Interações</label>
                            <input type="text" className="form-control" id="referencia" />
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="form-group col-lg-6">
                            <label>Precauções</label>
                            <input type="text" className="form-control" id="referencia" />
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="form-group col-lg-6">
                            <label>Grupo de Interações</label>
                            <input type="text" className="form-control" id="referencia" />
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="form-group col-lg-6">
                            <label>Referências</label>
                            <input type="text" className="form-control" id="referencia" />
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="form-group col-lg-6">
                            <button type="submit" className="btn btn-primary">Atualizar</button>
                            <Link to="/plants">
                                <input name='Voltar' type='button' className="btn btn-primary" value='Voltar' style={{ float: 'right' }} />
                            </Link>
                        </div>
                    </div>


                </form>
            </div>
        )
    }
}

EditPlant.displayName = 'EditPlant';


export default EditPlant