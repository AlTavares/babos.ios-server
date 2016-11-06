import React from 'react';
import service from '../services/plants'
import env from '../services/environment'

class Plants extends React.Component {

    constructor(props) {
        super(props)
        console.debug(this.props.params)
        this.state = {
            plant: {}
        }
    }

    componentDidMount() {
        service.getPlant(plants =>
            this.setState({
                plants: plants
            })
        )
    }

    render() {
        return (
            <div>
                <div className="container">
                    <form id="plantasForm">
                        <h3>Visualizar Planta</h3>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Nome</label>
                                <p>{nome}</p>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Nome Científico</label>
                                <p>{nomeCientifico}</p>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Fam�lia</label>
                                <p>{familia}</p>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Partes</label>
                                <p>{partes}</p>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Interações</label>
                                <p>{interacoes}</p>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Precau��es</label>
                                <p>{precaucoes}</p>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Grupo de Intera��es</label>
                                <p>{grupo}</p>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Refer�ncias</label>
                                <p>{referencia}</p>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <input name='Voltar' type='button' className="btn btn-primary" onclick='javascript:history.back();self.location.reload();' value='Voltar' />
                            </div>
                        </div>


                    </form>
                </div>

            </div>
        );
    }
}

Plant.displayName = 'Plant';


export default Plant