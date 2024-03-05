import type { NextResponse } from "next/server";

export function middleware(request: NextResponse) {
        if ( !localStorage.getItem("token") ) {
                return Response.redirect(new URL("/login", request.url));
        }

        
}