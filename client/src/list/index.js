
import React from 'react';

class List extends React.Component {
    render() {
        return (
            <div id="list" className="row">

                <div>
                    <table className="table table-striped">
                        <thead>
                            {this.props.header}
                        </thead>
                        <tbody>
                            {this.props.body}
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

export default List

