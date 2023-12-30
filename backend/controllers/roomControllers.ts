import { NextRequest, NextResponse } from "next/server";

import Room from "../models/Room";

export const allRooms = async (req: NextRequest) => {

    const resPerPage: number = 8;

    const rooms = await Room.find();

    return NextResponse.json({
        success: true,
        resPerPage,
        rooms
    });
}

export const newRoom = async (req: NextRequest) => {
    const body = await req.json();

    const room = await Room.create(body);

    return NextResponse.json({
        success: true,
        room,
    });
}