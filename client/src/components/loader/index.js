import React from 'react'
import './style.css'

class Loader extends React.Component {
    render() {
        if (this.props.active) {
            return <div className='overlay'>
                <img className='loader' src='http://i.imgur.com/GpzwbLE.gif' />
            </div>
        }
        return null
    }
}

Loader.displayName = 'Loader';

export default Loader