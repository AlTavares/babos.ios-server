import React from 'react';

class ArrayList extends React.Component {
    render() {
        var array = this.props.values
        if(!array) return null
        return (
            <ul>
                {array.map(value =>
                    <li key={value}>{value}</li>
                )}
            </ul>
        )
    }
}

export default ArrayList