import React from 'react';
import service from '../services/plants'
import { Link } from 'react-router'
import Modal from '../components/modal'
import $ from 'jquery'
import Textarea from 'react-textarea-autosize';

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

    addInteractionGroup(input) {
        this.plant.interactionGroups.push(input.val())
        input.val('')
        input.focus()
        this.forceUpdate()
    }

    openInteractionModal() {
        var id = 'newInteractionGroup'
        var footer = <div>
            <button type="button" className="btn btn-primary btn-success" onClick={() => this.addInteractionGroup($('#' + id).val())}>Adicionar</button>
            <button type="button" className="btn btn-default" data-dismiss="modal">Cancelar</button>
        </div>
        var body = <div>
            <label>Grupo</label>
            <input type="text" className="form-control" id={id} />
        </div>
        var modal = <Modal id='addInteractionGroup-modal' title='Adicionar Grupo' body={body} footer={footer} />
        this.setState({ modal: modal }, () => $("#addInteractionGroup-modal").modal())
    }

    deleteInteractionAtIndex(index) {
        this.plant.interactionGroups.splice(index, 1)
        this.forceUpdate()
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
                {this.state.modal}
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
                            <Textarea type="text" className="form-control" id="scientificName" defaultValue={plant.scientificName} onChange={this.handleChange} ></Textarea>
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
                            <label>Grupo de Interações</label>
                            <ul>
                                {plant.interactionGroups.map((value, index) =>
                                    <li key={value}>{value} <button type="button" className="btn btn-link" onClick={() => this.deleteInteractionAtIndex(index)}><span className="glyphicon glyphicon-remove" aria-hidden="true" style={{ color: 'red' }}></span></button></li>
                                )}
                            </ul>
                            <div className="form-inline" style={{ marginLeft: '30px' }}>
                                <input type="text" className="form-control" id='add-interaction' placeholder='Novo grupo' />
                                <button type="button" className="btn btn-primary btn-success" onClick={() => this.addInteractionGroup($('#add-interaction'))}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                            </div>
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
                            <button className="btn btn-success" onClick={this.handleSave}>Atualizar</button>
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
        var props = [
            {
                label: 'Português',
                prop: 'pt'
            },
            {
                label: 'Inglês',
                prop: 'en'
            },
            {
                label: 'Espanhol',
                prop: 'es'
            }
        ]
        var content = []
        for (var i = 0; i < props.length; i++) {
            var item = props[i];
            var input
            var defaultValue = plant[prop][item.prop]
            var id = prop + '.' + item.prop
            if (this.props.input) {
                input = <input type="text" className="form-control" id={id} defaultValue={defaultValue} onChange={handleChange} />
            }
            else {
                input = <Textarea className="form-control" id={id} defaultValue={defaultValue} onChange={handleChange}></Textarea>
            }
            content.push(
                <li key={id}>
                    <label>{item.label}:</label>
                    {input}
                </li>
            )
        }

        return (
            <div>
                <ul className="unstyled-list">
                    {content}
                </ul>
            </div>
        )
    }
}

