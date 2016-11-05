import React from 'react';
import service from '../services/plants'

class Home extends React.Component {

  componentDidMount() {
    service.get( plants => 
      console.debug(plants)
    )
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}

Home.displayName = 'Home';

export default Home