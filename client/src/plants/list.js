import React from 'react';
import service from '../services/plants'
import List from '../list'
import env from '../services/environment'
import TopBar from '../topBar'
import { Link } from 'react-router'

class Plants extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      plants: []
    }
  }

  componentDidMount() {
    service.get(plants =>
      this.setState({
        plants: plants
      })
    )
  }

  body() {
        console.debug(this.state)
    let plants = this.state.plants
    return plants.map(plant =>
      <tr key={plant.objectId}>
        <td className="plant-name">{plant.name[env.lang]}</td>
        <td>{plant.scientificName}</td>
        <td>{plant.family}</td>
        <td className="actions">
          <Link className="btn btn-success btn-xs" to={"/plant/" + plant.objectId}>Visualizar</Link>
          <Link className="btn btn-warning btn-xs" to={"/plant/" + plant.objectId + "/edit"}>Editar</Link>
          <a className="btn btn-danger btn-xs" href="#" data-toggle="modal" data-target="#delete-modal">Excluir</a>
        </td>
      </tr>
    )

  }

  render() {
    return (
      <div>
        <TopBar title='Plantas' />
        <List header={header} body={this.body()} />
      </div>
    );
  }
}

Plants.displayName = 'Plants';

let header =
  <tr>
    <th className="col-md-4">Nome</th>
    <th className="col-md-4">Nome Científico</th>
    <th className="col-md-4">Família</th>
    <th className="actions">Ações</th>
  </tr>

export default Plants