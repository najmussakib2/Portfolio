import { Skill } from "@/types";
import { useEffect, useState } from "react";


const useGetSkills = () => {
    const [data, setData] = useState<Skill | null>(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/admin/skills').then(r => r.json()).then(d => {
            setData(d.data || []); setLoading(false)
        })
    }, [])
    return { data, setData, isLoading }
};
export default useGetSkills;