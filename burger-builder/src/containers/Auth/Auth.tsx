import React from 'react';
import InputElementFactory from '../../Services/Factories/IInputElementFactory';
import IInputElement from '../../Types/IInputElement';
import IValidationRuleSet from '../../Types/ValidationRuleSet';
import Input from './../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Styles from './Auth.module.css';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { signUp, logIn, setAuthRedirectPath } from './store/AuthActionCreators';
import Spinner from './../../components/UI/Spinner/Spinner';
import { RootState } from '../../reduxSetup';
import { Redirect } from 'react-router-dom';

interface ILoginForm {
    email: IInputElement<string>,
    password: IInputElement<string>,
    [key: string]: IInputElement<any>
}

interface State {
    controls: ILoginForm,
    isSignUp: boolean
}

class Auth extends React.Component<Props, State> {

    private _inputElementFactory: InputElementFactory;

    constructor(props: Props) {
        super(props);
        this._inputElementFactory = new InputElementFactory();
        this.state = {
            controls: { 
                email: this._inputElementFactory.getTextInput('Email', {required: true, isEmail: true}),
                password: this._inputElementFactory.getPasswordInput('Password', {required: true, minLength: 6}),
            },
            isSignUp: true
        }
    }

    isFormValid = (): boolean => {
        for(let control in this.state.controls) {
            if(!this.state.controls[control].valid) {
                return false;
            }
        }

        return true;
    }

    checkValidity = (value: string, rules?: IValidationRuleSet) => {
        if(rules === undefined) {
            return true;
        }

        let isValid = true;

        if(rules.required) {
            isValid = isValid && value?.toString()?.trim() !== '';
        }

        if(rules.minLength) {
            isValid = isValid && (value?.toString()?.length as number) >= rules.minLength;
        }

        if(rules.maxLength) {
            isValid = isValid && (value?.toString()?.length as number) <= rules.maxLength;
        }

        return isValid;
    }

    inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement>, controlName: string) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        this.setState({controls: updatedControls});
    }

    submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(this.state.isSignUp){
            this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
        } else {
            this.props.onRegister(this.state.controls.email.value, this.state.controls.password.value);
        }
        
    }

    switchAuthModeHandler = () => {
        this.setState((prevState: State) => {
            return { isSignUp: !prevState.isSignUp };
        })
    }

    componentDidMount() {
        if(!this.props.isBuildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    render() {
        const signMode = this.state.isSignUp ? 'SIGN UP' : 'LOG IN';

        const errorMessage = this.props.error !== null
            ? <p>{this.props.error?.message}</p>
            : null;
        
        const form = this.props.loading
            ? <Spinner/>
            : Object.keys(this.state.controls).map((key, index) => {
                return <Input key={index} 
                    touched={this.state.controls[key].touched}
                    shouldValidate={this.state.controls[key].validation !== undefined}
                    invalid={!this.state.controls[key].valid}
                    changed={(event: React.ChangeEvent<HTMLInputElement>) => this.inputChangedHandler(event, key)}
                    elementType={this.state.controls[key].elementType}
                    elementConfig={this.state.controls[key].elementConfig}
                    value={this.state.controls[key].value}
                />
            });

        const authRedirect = this.props.isLoggedIn
            ? <Redirect to={this.props.authRedirectPath}/>
            : null;

        return (
            <div className={Styles['Auth']}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button buttonType="Success" disabled={!this.isFormValid()} clicked={() => {}}>SUBMIT</Button>
                </form>
                <Button buttonType="Danger" disabled={false} clicked={this.switchAuthModeHandler}>SWITCH TO {signMode}</Button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        onAuth: (email: string, password: string) => logIn(email, password),
        onRegister: (email: string, password: string) => signUp(email, password),
        onSetAuthRedirectPath: () => setAuthRedirectPath('/')
    }, dispatch)
}

const mapStateToProps = (state: RootState) => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isLoggedIn: state.authReducer.token !== '',
        isBuildingBurger: state.burgerBuilderReducer.buildingBurger,
        authRedirectPath: state.authReducer.authRedirectPath
    }
}

type Props = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Auth);