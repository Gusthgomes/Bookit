import { dbConnect } from "@/backend/config/dbConnect";
import { newRoom } from "@/backend/controllers/roomControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
    
}

const route = createEdgeRouter<NextRequest, RequestContext>()

dbConnect();

route.post(newRoom);

export async function POST(request: NextRequest, ctx: RequestContext) {
    return route.run(request, ctx);
}