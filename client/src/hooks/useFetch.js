import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isError, setErrorState] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async() => {
        await fetch(url)
            .then((response) => {
                if(!response.ok) {
                    throw new Error('Failed to fetch.');
                }
                return response.json()
            })
            .then((json) => {
                setTimeout(() => {
                    setData(json);
                    setIsLoading(false);
                }, 300)
                setErrorState(null);
            })
            .catch((error) => {
                setIsLoading(false);
                setErrorState(error.message);
            })
        }

        fetchData();
    }, [url]);
    
    return {data, isLoading, isError};

}

export default useFetch;

