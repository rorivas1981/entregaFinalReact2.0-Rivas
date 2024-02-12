import { useState, useEffect } from "react";

export const useAsync = (asyncFunction, dependencies = []) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true);

        asyncFunction()
            .then(data => {
                setData(data)
            })
            .catch(error => {
                setError(error)
            })
            .finally(() => {
                setLoading(false);
            })

    }, dependencies);

    return {
        loading,
        data,
        error
    }

}