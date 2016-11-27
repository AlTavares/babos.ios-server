import React from 'react';
import service from '../services/plants'
import List from '../list'
import env from '../services/environment'
import TopBar from '../topBar'
import { Link } from 'react-router'
import Modal from '../components/modal'
import $ from 'jquery'
import Loader from '../components/loader'

class Plants extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      plants: []
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    service.get(plants =>
      this.setState({
        loading: false,
        plants: plants
      })
    )
  }

  handleDelete(plant) {
    console.debug('delete', plant)
    var footer = <div>
      <button type="button" className="btn btn-primary btn-danger" onClick={() => this.deletePlant(plant)}>Sim</button>
      <button type="button" className="btn btn-default" data-dismiss="modal">Não</button>
    </div>
    var modal = <Modal id='delete-modal' title='Excluir Item' body={'Tem certeza que deseja excluir ' + plant.name[env.lang] + '?'} footer={footer} />
    this.setState({ modal: modal }, () => $("#delete-modal").modal())
  }

  deletePlant(plant) {
    this.setState({ loading: true })
    service.delete(plant, (error, result) => {
      $("#delete-modal").modal('hide')
      if (error) {
        this.setState({ loading: false })
        alert(error.message)
        return
      }
      console.debug(result)
      this.getData()
    })
  }

  body() {
    console.debug(this.state)
    let plants = this.state.plants
    return plants.map(plant =>
      <tr key={plant.objectId}>
        <td><img className='plant-image' src={plant.image ? plant.image.url : 'http://placehold.it/200.jpg'} /></td>
        <td className="plant-name">{plant.name[env.lang]}</td>
        <td>{plant.scientificName}</td>
        <td>{plant.family}</td>
        <td className="actions">
          <Link className="btn btn-success" to={"/plant/" + plant.objectId}>Visualizar</Link>
          <Link className="btn btn-warning" to={"/plant/" + plant.objectId + "/edit"}>Editar</Link>
          <button className="btn btn-danger" onClick={() => { this.handleDelete(plant) } }>Excluir</button>
        </td>
      </tr>
    )
  }

  render() {
    return (
      <div>
        <TopBar title='Plantas' />
        <Loader active={this.state.loading} />
        <List header={header} body={this.body()} />
        {this.state.modal}
      </div>
    );
  }
}

Plants.displayName = 'Plants';

let header =
  <tr>
    <th className="col-md-1">Imagem</th>  
    <th className="col-md-2">Nome</th>
    <th className="col-md-4">Nome Científico</th>
    <th className="col-md-2">Família</th>
    <th className="actions">Ações</th>
  </tr>

export default Plants