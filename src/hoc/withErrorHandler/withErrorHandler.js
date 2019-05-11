import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, Axios) => {
    return class extends Component {

        constructor() {
            super();
            this.state = {
                error: null
            };
            this.reqInterceptor = Axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = Axios.interceptors.response.use(res => res, err => {
                this.setState({error: err});
            });

        }

        componentWillUnmount() {
            Axios.interceptors.request.eject(this.reqInterceptor);
            Axios.interceptors.response.eject(this.resInterceptor);
        }

        errorComfirmedHandler = () => {
            this.setState({error: null});
        };

        render() {
            return (
            <Aux>
                <Modal show={this.state.error} modalClosed={this.errorComfirmedHandler}>
                {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Aux>);
        }
        
    }
    
}

export default withErrorHandler;
