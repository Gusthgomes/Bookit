import { IUser } from "@/backend/models/User";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { NextRequest } from "next/server";

declare module '@reduxjs/toolkit/query/react' {
    interface FetchBaseQueryError {
        data?:any
    };
};

declare module 'next/server' {
    interface NextRequest {
        user: IUser
    };
};