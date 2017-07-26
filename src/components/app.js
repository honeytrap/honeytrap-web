import React, { Component } from 'react';

import Header from './header';

import Navigation from './navigation'
import Search from './search'
import Dashboard from './dashboard'

class App extends Component {
	render() {
		return (
        <div className="container">
            <div className="row">
                <div className="col-sm-3 sidebar">
                    <nav className="sidebar-nav">
                        <div className="sidebar-header">
                            <button className="nav-toggler nav-toggler-sm sidebar-toggler" type="button" data-toggle="collapse" data-target="#nav-toggleable-sm">
                                <span className="sr-only">Toggle nav</span>
                            </button>
                            <a className="sidebar-brand img-responsive" href="index.html">
                                <span className="icon">Honeytrap</span>
                            </a>
                        </div>
                        <div className="collapse nav-toggleable-sm" id="nav-toggleable-sm">
                            <Search />
                            <Navigation />
                            <hr className="visible-xs m-t" />
                        </div>
                    </nav>
                </div>
                <Dashboard />
            </div>
        </div>

        /*
        <div id="docsModal" className="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title" id="myModalLabel">Example modal</h4>
        </div>
        <div className="modal-body">
        <p>You're looking at an example modal in the dashboard theme.</p>
        </div>
        <div className="modal-footer">
        <button type="button" className="btn btn-primary" data-dismiss="modal">Cool, got it!</button>
        </div>
        </div>
        </div>
        </div>
        */
        /*
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
         */
		);
	}
}

export default App;
