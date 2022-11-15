import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret: any = process.env.JWT_SECRET!;

export const config = {
  matcher: ["/((?!api|_next|fonts|500|examples|[\\w-]+\\.\\w+).*)"],
};

export default function middleware(req: NextRequest) {
  const url = req.url;
  const token: any = req.cookies.get("token");
  const urlToken = req.nextUrl.searchParams.get("token")!;

  if (url.includes("/auth/newPassword")) {
    console.log(urlToken);
  }
  // try {
  //   verify(token, secret);
  //   return NextResponse.next();
  // } catch (e) {
  //   return NextResponse.redirect("http://localhost:3000/auth/signin");
  // }

  if (url.includes("/auth")) {
    if (token === undefined) {
      return NextResponse.next();
    }
    if (token)
      try {
        console.log(token);
        const verify = jwtVerify(token, secret);
        console.log(verify);
        return NextResponse.redirect("http://localhost:3000/");
      } catch (e) {
        return NextResponse.next();
      }
  }
}
