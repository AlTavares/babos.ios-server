import React from 'react';
import service from '../services/plants'
import List from '../list'
import env from '../services/environment'
import TopBar from '../topBar'

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
    let plants = this.state.plants
    return plants.map(plant =>
      <tr key={plant.objectId}>
        <td>{plant.name[env.lang]}</td>
        <td>{plant.scientificName}</td>
        <td>{plant.family}</td>
        <td className="actions">
          <a className="btn btn-success btn-xs" href="view.html">Visualizar</a>
          <a className="btn btn-warning btn-xs" href="edit.html">Editar</a>
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
    <th>Nome</th>
    <th>Nome Científico</th>
    <th>Família</th>
    <th className="actions">Ações</th>
  </tr>

export default Plants