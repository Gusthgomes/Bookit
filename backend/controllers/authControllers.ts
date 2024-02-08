import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import User from "../models/User";

// Register user => /api/auth/register
export const registerUser = catchAsyncErrors(async (req: NextRequest) => {
    const body = await req.json();

    const { name, email, password } = body;

    const user = await User.create({
        name,
        email,
        password,
    });

    return NextResponse.json({
        success: true,
    });
});