import { Fragment } from 'react';
import './authentication.styles.scss';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

const Authentication = () => {

    return (
        <Fragment>
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
        </Fragment>
    )
}

export default Authentication;