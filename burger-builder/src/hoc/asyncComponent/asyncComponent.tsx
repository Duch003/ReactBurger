import React from 'react';

interface IProps {
    importComponent(): Promise<any>
}

interface IState {
    component: React.Component | null

}

const asyncComponent = (importComponent: () => Promise<any>) => {
    
    return class extends React.Component<any, IState> {
        state = {
            component: null
        };

        componentDidMount() {
            importComponent()
                .then((component: React.Component) => {
                    this.setState({component: component});
                })
        }

        render() {
            const C = this.state.component;
             // @ts-ignore: Object is possibly 'null'.
            return C !== null ? <C {...this.props} /> : null;
        }
    };
}

export default asyncComponent;