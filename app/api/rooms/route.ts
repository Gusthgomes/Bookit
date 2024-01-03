import { dbConnect } from "@/backend/config/dbConnect";
import { allRooms } from "@/backend/controllers/roomControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
    
}

const route = createEdgeRouter<NextRequest, RequestContext>()

dbConnect();

route.get(allRooms);

export async function GET(request: NextRequest, ctx: RequestContext) {
    return route.run(request, ctx);
}
