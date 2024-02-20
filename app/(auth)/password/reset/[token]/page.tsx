import NewPassword from '@/components/user/NewPassword';
import React from 'react'

export const metadata = {
    title: 'Reset password',
    description: 'Reset password',
}

interface Props {
    params:{ token: string }
}

const UpdateProfilePage = ({ params }: Props) => {
    return (
        <div>
            <NewPassword token={ params?.token } />
        </div>
    )
}

export default UpdateProfilePage;