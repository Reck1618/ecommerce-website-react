import { useState } from 'react';
import { createUserWithEmailAndPasswordFirebase, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

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
        <div>
            <h1>Sign Up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="displayName">Display Name</label>
                <input type="text" name="displayName" onChange={handleChange} value={displayName} required/>

                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={handleChange} value={email} required/>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={handleChange} value={password} required/>

                <label htmlFor="confirmPassword">Confirm password</label>
                <input type="password" name="confirmPassword" onChange={handleChange} value={confirmPassword} required/>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm;