import React from 'react';
import AuthTemplate from '../containers/auth/AuthTemplate';
import RegisterForm from '../containers/auth/RegisterForm';

export default function RegisterPage() {
    return (
        <div>
            <AuthTemplate>
                <RegisterForm/>
            </AuthTemplate>
        </div>
    )
}