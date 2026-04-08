'use client'

import { useRouter } from "next/navigation";

const NotFound = () => {
    const router = useRouter()
    return router.push('/')
};

export default NotFound;