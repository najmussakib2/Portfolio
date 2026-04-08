import { Settings } from "@/types";
import { useEffect, useState } from "react";

const useGetMe = () => {
    const [data, setData] = useState<Settings | null>(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/admin/settings').then(r => r.json()).then(d => {
            setData(d.data); setLoading(false)
        })
    }, [])
    return {data, setData, isLoading}
};

export default useGetMe;