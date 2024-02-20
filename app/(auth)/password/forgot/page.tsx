import ForgotPassword from '@/components/user/ForgotPassword';
import React from 'react'

export const metadata = {
    title: 'Forgot password',
    description: 'Forgot password',
}

const UpdateProfilePage = () => {
    return (
        <div>
            <ForgotPassword/>
        </div>
    )
}

export default UpdateProfilePage;