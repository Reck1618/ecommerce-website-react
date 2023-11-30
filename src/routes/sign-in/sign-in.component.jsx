import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils';


const SignIn = () => {

    useEffect(() => {
        async function logGoogleRedirect() {
            const response = await getRedirectResult(auth);
            if(response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        }

        logGoogleRedirect();
    }, []);

    const logGooglePopUp = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={logGooglePopUp}>Sign In with Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign In with Google redirect</button>
        </div>
    )
}

export default SignIn;