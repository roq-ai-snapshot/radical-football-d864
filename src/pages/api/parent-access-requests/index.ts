import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { parentAccessRequestValidationSchema } from 'validationSchema/parent-access-requests';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getParentAccessRequests();
    case 'POST':
      return createParentAccessRequest();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getParentAccessRequests() {
    const data = await prisma.parent_access_request
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'parent_access_request'));
    return res.status(200).json(data);
  }

  async function createParentAccessRequest() {
    await parentAccessRequestValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.parent_access_request.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
