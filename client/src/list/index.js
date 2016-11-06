
import React from 'react';

class List extends React.Component {
    render() {
        return (
            <div id="list" className="row">

                <div className="table-responsive col-md-12">
                    <table className="table table-striped" cellSpacing="0" cellPadding="0">
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

