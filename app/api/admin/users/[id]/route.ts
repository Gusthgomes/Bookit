import { dbConnect } from "@/backend/config/dbConnect";
import {
  deleteUser,
  getUserDetail,
  updateUser,
} from "@/backend/controllers/authControllers";
import { authorizeRoles, isAuthenticated } from "@/backend/middleware/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticated, authorizeRoles("admin"));

router.get(getUserDetail);
router.put(updateUser);
router.delete(deleteUser);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}

export async function DELETE(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
