import React from 'react';
import service from '../services/plants'
import { Link } from 'react-router'
import ArrayList from '../components/array-list'

class Plant extends React.Component {

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
            <div>
                <div className="container">
                    <form id="plantasForm">
                        <h3>Visualizar Planta</h3>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Nome</label>
                                <MultiLanguageView value={plant.name} />
                                <Reference plant={plant} property="name" />
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Nome Científico</label>
                                <p>{plant.scientificName}</p>
                                <Reference plant={plant} property="scientificName" />
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Família</label>
                                <p>{plant.family}</p>
                                <Reference plant={plant} property="family" />
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Partes</label>
                                <MultiLanguageView value={plant.parts} />
                                <Reference plant={plant} property="parts" />
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Interações</label>
                                <MultiLanguageView value={plant.interactions} />
                                <Reference plant={plant} property="interactions" />
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Precauções</label>
                                <MultiLanguageView value={plant.precautions} />
                                <Reference plant={plant} property="precautions" />

                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group col-lg-6">
                                <label>Grupo de Interações</label>
                                <ArrayList values={plant.interactionGroups} />
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

class MultiLanguageView extends React.Component {
    render() {
        var languages = this.props.value
        var array = []
        for (var key in languages) {
            if (languages.hasOwnProperty(key)) {
                array.push(<li key={key}><b>{key.toUpperCase()}</b>: {languages[key]}</li>)
            }
        }
        return (
            <ul>
                {array}
            </ul>
        )
    }
}

class Reference extends React.Component {
    render() {
        var references = this.props.plant.references[this.props.property]
        return (
            <div style={{marginLeft: '20pt'}}>
                <p>Referências:</p>
                <ArrayList key="refs" values={references} />
            </div>
        )
    }
}