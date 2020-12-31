import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { logout } from '../store/AuthActionCreators';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component<Props> {
    componentDidMount() {
        this.props.onLogout();
    }
    
    render() {
        return <Redirect to="/"/>;
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        onLogout: () => logout()
    }, dispatch);
}

type Props = ReturnType<typeof mapDispatchToProps>

export default connect(null, mapDispatchToProps)(Logout);