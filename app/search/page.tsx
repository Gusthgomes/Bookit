import React from 'react';
import Search from '@/components/Search';

export const metadata = {
    title: "Search Rooms",
    description: "Search for rooms to book for your meetings and conferences.",
    
}

const searchPage = () => {
    return (
        <div> <Search/> </div>
    )
}

export default searchPage