// // middleware.ts
// import { NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from "jose";
// const ROLE_ROUTES: [string, string[]][] = [
//   ["/a", ["admin"]],
//   ["/p/members", ["project_manager"]],
//   ["/p/projects", ["project_manager", "member"]],
//   ["/m", ["project_manager"]],
//   ["/dashboard", ["admin"]],
// ];

// export async function proxy(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   const token = req.cookies.get("access_token")?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   try {
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//     const { payload } = await jwtVerify(token, secret);
//     const role = payload.role as string;

//     for (const [prefix, allowedRoles] of ROLE_ROUTES) {
//       if (pathname.startsWith(prefix) && !allowedRoles.includes(role)) {
//         return NextResponse.redirect(new URL("/unauthorized", req.url));
//       }
//     }

//     return NextResponse.next();
//   } catch {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }

// export const config = {
//   matcher: ["/a/:path*", "/p/:path*", "/m/:path*", "/dashboard/:path*"],
// };
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ROLE_ROUTES: [string, string[]][] = [
  ["/a", ["admin"]],
  ["/p/members", ["project_manager"]],
  ["/p/projects", ["project_manager", "member"]],
  ["/m", ["project_manager"]],
  ["/dashboard", ["admin"]],
];

// [FIXED] was named 'proxy' — Next.js requires this to be named 'middleware'
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const role = payload.role as string;

    for (const [prefix, allowedRoles] of ROLE_ROUTES) {
      if (pathname.startsWith(prefix) && !allowedRoles.includes(role)) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    return NextResponse.next();
  } catch {
    // [CHANGED] clear bad cookie before redirecting to prevent redirect loop
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("access_token");
    return response;
  }
}

export const config = {
  matcher: ["/a/:path*", "/p/:path*", "/m/:path*", "/dashboard/:path*"],
};
