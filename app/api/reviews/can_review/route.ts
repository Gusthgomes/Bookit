import { dbConnect } from "@/backend/config/dbConnect";
import { canReview } from "@/backend/controllers/roomControllers";
import { isAuthenticated } from "@/backend/middleware/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const route = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

route.use(isAuthenticated).get(canReview);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return route.run(request, ctx);
}
