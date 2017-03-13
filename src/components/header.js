import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
	render() {
		return (
			<header className="header">
				<div className="container">
					<div className="row">
						<div className="col-xs-4">
							<div className="row">
								<div className="col-xs-12 col-md-8">
									<h1 className="logo">
										<Link to="/">Honeytrap</Link>
									</h1>
								</div>
							</div>
						</div>
						<div className="col-xs-8 text-right">
							<ul className="social-tools">
								
							</ul>
						</div>
					</div>
				</div>
			</header>
		);
	}
}

export default Header;