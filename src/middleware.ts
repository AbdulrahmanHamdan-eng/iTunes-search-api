import { NextResponse , NextRequest} from "next/server";


export default function middleware(request:NextRequest){
    const path=request.nextUrl.pathname;
    if(path=="/")
        return NextResponse.redirect(new URL("/search", request.nextUrl));
}


export const config={
    matcher: [
       "/",
       "/search",
       
    ]
}