import { UserServices } from "@/services/user.services";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    let isAuthinticated = false
    let isAdmin = false
    const { data } = await UserServices.getSession()

    if (data) {
        isAuthinticated = true
        isAdmin = data.user.role === "admin"
    }

    if (!isAuthinticated) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    if (isAdmin && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url))
    }

    if (isAdmin && pathname.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/customer-dashboard", "/customer-dashboard/:path*", "/admin-dashboard", "/admin-dashboard/:path*", "/seller-dashboard/:path*", "/seller-dashboard"]
}