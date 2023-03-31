import { NextResponse, NextRequest } from "next/server";

const secret = process.env.JWT_SECRET!;

export const config = {
  matcher: ["/((?!api|_next|fonts|500|examples|[\\w-]+\\.\\w+).*)"],
};

export default function middleware(req: NextRequest) {
  const url = req.url;
  const token = req.cookies.get("token");
  const urlToken = req.nextUrl.searchParams.get("token")!;

  if (url.includes("/auth/newPassword")) {
    // try {
    //   verify(token, secret);
    //   return NextResponse.next();
    // } catch (e) {
    //   return NextResponse.redirect("http://localhost:3000/auth/signin");
    // }
  }

  if (url.includes("/auth") && !url.includes("/auth/newPassword")) {
    if (token === undefined) {
      return NextResponse.next();
    }
    if (token) {
      return NextResponse.redirect(`https://replicaz.vercel.app//`);
    }
  }
}
