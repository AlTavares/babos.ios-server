import React from 'react';
import service from '../services/plants'
import env from '../services/environment'
import { Link } from 'react-router'

class Plant extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            plant: {loading: true}
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
            <div>
                <div className="container">
                    <form id="plantasForm">
                        <h3>Visualizar Planta</h3>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Nome</label>
                                <p>{plant.name[env.lang]}</p>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Nome Científico</label>
                                <p>{plant.scientificName}</p>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Família</label>
                                <p>{plant.family}</p>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Partes</label>
                                <p>partes</p>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Interações</label>
                                <p>interacoes</p>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Precauções</label>
                                <p align="justify" >{plant.precautions[env.lang]}</p>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Grupo de Interações</label>
                                <p>grupo</p>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Referências</label>
                                <p>referencia</p>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <Link to="/plants">
                                    <input name='Voltar' type='button' className="btn btn-primary" value='Voltar' />
                                </Link>
                            </div>
                        </div>


                    </form>
                </div>

            </div >
        );
    }
}

Plant.displayName = 'Plant';


export default Plant