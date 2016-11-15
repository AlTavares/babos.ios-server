import React from 'react';
import service from '../services/plants'
import { Link } from 'react-router'

class EditPlant extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            plant: { loading: true }
        }
        this.plant = {}
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        let id = this.props.params.id
        console.debug('didMount')
        service.getPlant(id, plant => {
            this.plant = plant
            this.setState({
                plant: plant
            })
        }
        )
    }

    handleSave(e) {
        e.preventDefault()
        console.debug(this.state.plant)
        console.log('The link was clicked.');
    }

    handleChange(event) {
        var key = event.target.id
        console.debug(key)
        var value = event.target.value
        eval('this.plant.' + key + ' = value')
        console.debug(value)
        console.debug(this.plant)
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
                            <MultiLanguageEdit plant={plant} prop="name" onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="form-group col-lg-6">
                            <label>Nome Científico</label>
                            <input type="text" className="form-control" id="scientificName" defaultValue={plant.scientificName} onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="form-group col-lg-6">
                            <label>Família</label>
                            <input type="text" className="form-control" id="family" defaultValue={plant.family} onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="form-group col-lg-6">
                            <label>Partes</label>
                            <MultiLanguageEdit plant={plant} prop="parts" onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="form-group col-lg-6">
                            <label>Interações</label>
                            <MultiLanguageEdit plant={plant} prop="interactions" onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="form-group col-lg-6">
                            <label>Precauções</label>
                            <MultiLanguageEdit plant={plant} prop="precautions" onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="form-group col-lg-6">
                            <label>Grupo de Interações(separado por virgulas)</label>
                            <input type="text" className="form-control" id="interactionGroups" defaultValue={plant.interactionGroups.join(', ')} onChange={this.handleChange} />
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
                            <button className="btn btn-primary" onClick={this.handleSave}>Atualizar</button>
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

class MultiLanguageEdit extends React.Component {
    render() {
        var plant = this.props.plant
        var prop = this.props.prop
        var handleChange = this.props.onChange
        return (
            <div>
                <ul className="unstyled-list">
                    <li>
                        <label>Português:</label>
                        <input type="text" className="form-control" id={prop + '.pt'} defaultValue={plant[prop].pt} onChange={handleChange} />
                    </li>
                    <li>
                        <label>Inglês:</label>
                        <input type="text" className="form-control" id={prop + '.en'} defaultValue={plant[prop].en} onChange={handleChange} />
                    </li>
                    <li>
                        <label>Espanhol:</label>
                        <input type="text" className="form-control" id={prop + '.es'} defaultValue={plant[prop].es} onChange={handleChange} />
                    </li>
                </ul>
            </div>
        )
    }
}