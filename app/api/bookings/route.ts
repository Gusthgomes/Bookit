import { dbConnect } from "@/backend/config/dbConnect";
import { newBooking } from "@/backend/controllers/bookingController";
import { isAuthenticated } from "@/backend/middleware/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const route = createEdgeRouter<NextRequest, RequestContext>()

dbConnect();

route.use(isAuthenticated).post(newBooking);

export async function POST(request: NextRequest, ctx: RequestContext) {
    return route.run(request, ctx);
}
