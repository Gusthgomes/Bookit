'use client';

import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export function GlobalProvider( { children } : { children: React.ReactNode} ){
    return <>
        <Toaster />
        <Provider store={ store }>
            <SessionProvider>
                { children }
            </SessionProvider>
        </Provider>
    </>
}