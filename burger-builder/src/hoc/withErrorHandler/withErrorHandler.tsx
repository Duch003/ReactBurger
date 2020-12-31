import React  from 'react';
import Modal  from './../../components/UI/Modal/Modal';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

const withErrorHandler = (WrappedComponent: any, axios: AxiosInstance) => {

    return class extends React.Component<any, {error: Error | null}> {
        state = {
            error: null
        }
        requestInterceptior: number | undefined;
        responseInterceptior: number | undefined;

        componentWillMount() {
            this.requestInterceptior = axios.interceptors.request.use((req: AxiosRequestConfig) => {
                this.setState({ error: null });
                return req;
            });
            this.responseInterceptior =axios.interceptors.response.use(res => res, (error: Error) => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptior as number);
            axios.interceptors.response.eject(this.responseInterceptior as number);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            // @ts-ignore: Object is possibly 'null'.
            const message = this.state.error ? this.state.error.message : null
            return (
                <React.Fragment>
                    <Modal show={this.state.error !== null} 
                        modalClosed={this.errorConfirmedHandler}>
                        {message}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            )
        }
    } 
}

export default withErrorHandler;