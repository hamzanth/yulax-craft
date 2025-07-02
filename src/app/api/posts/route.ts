import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   res.status(200).json({ message: "Hello from the backend" });
// }
export async function GET(request: Request) {
  return NextResponse.json(
    { postsMessage: "Hello from the backend" },
    { status: 200 }
  );
}
