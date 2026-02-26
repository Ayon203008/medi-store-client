import { NextRequest, NextResponse } from "next/server";
import { UserServices } from "./services/user.services";
import { Roles } from "./types/role.type";

export async function proxy(req: NextRequest) {
    const pathname = req.nextUrl.pathname
    const { data } = await UserServices.getSession()

    const user = data?.user
    if (!user) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    const role = user.role

    if (pathname === '/dashboard') {
        if (role === Roles.ADMIN) {
            return NextResponse.redirect(new URL('/admin-dashboard/manage-user', req.url))
        }
        if (role === Roles.SELLER) {
            return NextResponse.redirect(new URL('/seller-dashboard/add-medicine', req.url))
        }
        if (role === Roles.CUSTOMER) {
            return NextResponse.redirect(new URL('/customer-dashboard/manage-profile', req.url))
        }
    }

    if (pathname.startsWith("/admin-dashboard") && role !== Roles.ADMIN) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    if (pathname.startsWith("/customer-dashboard") && role !== Roles.CUSTOMER) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    if (pathname.startsWith("/seller-dashboard") && role !== Roles.CUSTOMER) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard',
        '/admin-dashboard',
        '/customer-dashboard',
        '/seller-dashboard',
        "/admin-dashboard/:path*",
        "/customer-dashboard/:path*",
        "/seller-dashboard/:path*"]
}

