'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const UserSidebar = () => {

    const menuItem = [
        {
            name: 'Update Profile',
            url: '/me/update',
            icon: 'fas fa-user',
        },
        {
            name: 'Upload Avatar',
            url: '/me/upload_avatar',
            icon: 'fas fa-user-circle',
        },
        {
            name: 'Update Password',
            url: '/me/update_password',
            icon: 'fas fa-lock',
        },
    ]

    const [activeMenu, setActiveMenu] = useState(menuItem[0].name);

    const handlerMenuItemClick = (menuItem: string) => {
        setActiveMenu(menuItem);
    };

    return (
        <div className="list-group mt-5 pl-4">
            { menuItem.map( (menItem, index) => (
                <Link
                key={ index }
                href={ menItem.url }
                className={`fw-bold list-group-item list-group-item-action ${ activeMenu === menItem.name ? 'active' : ''}`}
                onClick={ () => handlerMenuItemClick(menItem.name)}
                aria-current={ activeMenu === menItem.name ? 'true' : 'false'}
                >
                <i className={`${menItem.icon} fa-fw pe-2`}></i> { menItem.name }
            </Link>
            ))}
            
        </div>
    )
}

export default UserSidebar