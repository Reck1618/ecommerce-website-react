import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';
import { createUserWithEmailAndPasswordFirebase, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';

const defaultformFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultformFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const resetFormFields = () => {
        setFormFields(defaultformFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const user = await createUserWithEmailAndPasswordFirebase(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch(error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Email already in use');
            }
            console.error(error);
        }
    };

    return (
        <div className="sign-up-container">
            <h2>I do not have an account</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="DisplayName" type="text" name="displayName" onChange={handleChange} value={displayName} required/>

                <FormInput label="Email" type="email" name="email" onChange={handleChange} value={email} required/>

                <FormInput label="Password" type="password" name="password" onChange={handleChange} value={password} required/>

                <FormInput label="ConfirmPassword" type="password" name="confirmPassword" onChange={handleChange} value={confirmPassword} required/>

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;