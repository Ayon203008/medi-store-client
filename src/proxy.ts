import { NextRequest, NextResponse } from "next/server"

// কোন routes শুধু কোন role এর জন্য
const ADMIN_ROUTES = [
    "/dashboard/manage-categories",
    "/dashboard/manage-medicines",
    "/dashboard/manage-orders",
    "/dashboard/manage-users",
]

const SELLER_ROUTES = [
    "/dashboard/add-medicine",
    "/dashboard/manage-orders",
    "/dashboard/medicine-management",
]

const CUSTOMER_ROUTES = [
    "/dashboard/manage-profile",
    "/dashboard/my-cart",
    "/dashboard/orders",
]


const ROLE_HOME: Record<string, string> = {
    ADMIN: "/dashboard/manage-user",
    SELLER: "/dashboard/add-medicine",
    CUSTOMER: "/dashboard/manage-profile",
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl


    let session = null
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`,
            {
                headers: {
                    cookie: request.headers.get("cookie") || ""
                }
            }
        )
        session = await res.json()
    } catch {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    
    if (!session?.user) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    const role = session.user.role as string 

   
    if (pathname === "/dashboard") {
        return NextResponse.redirect(new URL(ROLE_HOME[role], request.url))
    }

  
    const isAdminRoute = ADMIN_ROUTES.includes(pathname)
    const isSellerRoute = SELLER_ROUTES.includes(pathname)
    const isCustomerRoute = CUSTOMER_ROUTES.includes(pathname)

    if (isAdminRoute && role !== "ADMIN") {
        return NextResponse.redirect(new URL(ROLE_HOME[role], request.url))
    }

    if (isSellerRoute && role !== "SELLER") {
        return NextResponse.redirect(new URL(ROLE_HOME[role], request.url))
    }

    if (isCustomerRoute && role !== "CUSTOMER") {
        return NextResponse.redirect(new URL(ROLE_HOME[role], request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*"]
}