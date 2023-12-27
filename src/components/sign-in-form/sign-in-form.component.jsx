import { useState, useEffect } from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import { getRedirectResult } from 'firebase/auth';
import { auth, signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';

const defaultformFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultformFields);
    const { email, password } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const resetFormFields = () => {
        setFormFields(defaultformFields);
    };

    useEffect(() => {
        async function logGoogleRedirect() {
            const response = await getRedirectResult(auth);
            if(response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
                console.log(userDocRef);
            }
        }

        logGoogleRedirect();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect email or password');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default:
                    console.error(error);
            }
            console.error(error);
        }
    };

    return (
        <div className="sign-in-container">
            <h2>Already have an account ?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Email" type="email" name="email" onChange={handleChange} value={email} required/>

                <FormInput label="Password" type="password" name="password" onChange={handleChange} value={password} required/>

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogleRedirect}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;