import React from 'react';
import AuthTemplate from '../containers/auth/AuthTemplate'
import LoginForm from '../containers/auth/LoginForm';


export default function LoginPage() {
    return (
        <div>
            <AuthTemplate>
                <LoginForm/>
            </AuthTemplate>
        </div>
    )
}