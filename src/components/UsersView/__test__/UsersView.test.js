import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get(
    `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
  ),
  async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          name: "Basanta Sharma",
          email: "bsbickysharma@gmail.com",
          role: "member",
        },
      ])
    );
  }
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
