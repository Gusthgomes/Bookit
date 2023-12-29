import { dbConnect } from "@/backend/config/dbConnect";
import { allRooms, newRoom } from "@/backend/controllers/roomControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
    params: { id: string }
}

const route = createEdgeRouter<NextRequest, RequestContext>()

dbConnect();

route.get(allRooms);
route.post(newRoom);

export async function GET(request: NextRequest, ctx: RequestContext) {
    return route.run(request, ctx);
}

export async function POST(request: NextRequest, ctx: RequestContext) {
    return route.run(request, ctx);
}