import { useState } from 'react';

const usePostRequest = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postRequest = async (url, body) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (!res.ok) throw new Error(`POST request failed: ${res.status}`);
            const userData = await res.json();
            setData(userData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return { postRequest, data, loading, error };
};

export default usePostRequest;