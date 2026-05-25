import { useEffect, useState } from "react";


export function useFetch<T>(url: string): { data: T | null, isLoading: boolean, error: string | null} {

    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {


        async function fetchData() {

            try {
                setIsLoading(true);
                const response = await fetch(url);

                if (response.ok) {
                    const data = await response.json();
                    setData(data);
                } else {
                    throw new Error(`${response.statusText} Error: ${response.status}`);
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : "Error");
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [url])

    return {data, isLoading, error}


}