import React, { Component } from 'react';

import Header from './header';

export default class App extends Component {
	render() {
		return (
			<div>			
				<Header />
				<div className="main-container">
					<div className="bee bee-1"><img src="/assets/images/bee-1.png"/></div>
					<div className="bee bee-2"><img src="/assets/images/bee-2.png"/></div>
					<div className="bee bee-3"><img src="/assets/images/bee-3.png"/></div>
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								{this.props.children}
							</div>
						</div>				
					</div>		
				</div>		
			</div>
		);
	}
}