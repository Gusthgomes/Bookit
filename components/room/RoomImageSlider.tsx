'use client';

import React from 'react';
import { IImage } from '@/backend/models/Room';
import { Carousel } from 'react-bootstrap';
import Image from 'next/image';

interface Props {
    images: IImage[]
}

const RoomImageSlider = ( { images }: Props) => {
    return (
        <Carousel>
            {images.length > 0 ? (
                images?.map((image) => (
                    <Carousel.Item key={image?.public_id}>
                        <div style={{ widows: '100%', height: '460px'}}></div>
                        <Image 
                            className='d-block m-auto'
                            src={ image?.url }
                            alt={ image?.url }
                            layout='fill'
                            />
                    </Carousel.Item>
                ))
            ) : (
                <Carousel.Item >
                    <div style={{ widows: '100%', height: '460px'}}></div>
                    <Image 
                        className='d-block m-auto'
                        src={'/images/default_room_image.jpg'}
                        alt={'/images/default_room_image.jpg'}
                        layout='fill'
                        />
                </Carousel.Item>
            )}
        </Carousel>
    )
}

export default RoomImageSlider
