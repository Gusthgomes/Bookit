import UploadAvatar from '@/components/user/UploadAvatar';
import React from 'react'

export const metadata = {
    title: 'Upload avatar',
    description: 'Upload avatar', 
}

const UploadAvatarPage = () => {
    return (
        <div>
            <UploadAvatar/>
        </div>
    )
}

export default UploadAvatarPage;