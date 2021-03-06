import React from 'react'
import service from '../services/plants'
import { Link } from 'react-router'
import Modal from '../components/modal'
import $ from 'jquery'
import Textarea from 'react-textarea-autosize'
import Loader from '../components/loader'
import remumeService from '../services/remume'
import env from '../services/environment'

class EditPlant extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            plant: { loading: true },
            remumeList: []
        }
        this.plant = service.newPlant()
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    componentDidMount() {
        remumeService.getList((error, remumeList) => {
            if (!error) {
                this.setState({
                    remumeList: remumeList,
                })
            }
        })
        let id = this.props.params.id
        if (id == 'new') {
            this.setState({ plant: service.newPlant() })
            return
        }
        service.getPlant(id, plant => {
            this.plant = plant
            this.setState({
                plant: plant
            })
        })
    }

    handleSave(e) {
        e.preventDefault()
        console.debug(this.plant)
        console.log('The link was clicked.')
        this.setState({ loading: true })
        var fileUploadControl = $("#image")[0];
        if (fileUploadControl.files.length > 0) {
            var file = fileUploadControl.files[0];
            this.plant.image = file
        }
        service.update(this.plant, (error, result) => {
            this.setState({ loading: false })
            if (error) {
                alert(error.message)
                return
            }
            console.debug(result)
            alert('Alterações salvas com sucesso!')
        })
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
        this.setState({plant: this.plant})
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
                <Loader active={this.state.loading} />
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
                                {plant.interactionGroups.sort(sortInteractions).map((value, index) =>
                                    <li key={value}>{value + ' - ' + remumeService.descriptionForGroup(value)} <button type="button" className="btn btn-link" onClick={() => this.deleteInteractionAtIndex(index)}><span className="glyphicon glyphicon-remove" aria-hidden="true" style={{ color: 'red' }}></span></button></li>
                                )}
                            </ul>
                            <div style={{ marginLeft: '30px' }}>
                                <select className="form-control" id='add-interaction'>
                                    {
                                        remumeService.listIgnoringGroups(this.state.remumeList, plant.interactionGroups).map(item =>
                                            <option key={item.group} value={item.group}>{item.group + ' - ' + item.description[env.lang]}</option>
                                        )
                                    }
                                </select>
                                <button type="button" style={{ marginTop: '10px' }} className="btn btn-primary btn-success" onClick={() => this.addInteractionGroup($('#add-interaction'))}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="form-group col-lg-6">
                            <label>Imagem</label>
                            <br />
                            <img className='plant-image-edit' src={plant.image ? plant.image.url : 'https://placehold.it/400.jpg'} />
                            <input type="file" id="image" accept="image/*" />
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

EditPlant.displayName = 'EditPlant'

var sortInteractions = function(a, b) {
    return a.localeCompare(b)
}

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
            var item = props[i]
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

