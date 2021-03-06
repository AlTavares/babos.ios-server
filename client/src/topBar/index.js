import React from 'react';
import { Link } from 'react-router'

class TopBar extends React.Component {

	render() {
		return (
			<div id="top" className="row">
				<div className="col-sm-3">
					<h2>{this.props.title}</h2>
				</div>
				<div className="col-sm-6">
					{/* 
					<div className="input-group h2">
						<input name="search" className="form-control" id="search" type="text" placeholder={'Pesquisar ' + this.props.title} />
						<span className="input-group-btn">
							<button className="btn btn-primary" type="submit">
								<span className="glyphicon glyphicon-search"></span>
							</button>
						</span>
					</div>
					*/}
					<div className="col-sm-3">
						<Link to='/plant/new' className="btn btn-primary pull-right h2">Cadastrar</Link>
					</div>

				</div>
			</div>
		)
	}
}

export default TopBar