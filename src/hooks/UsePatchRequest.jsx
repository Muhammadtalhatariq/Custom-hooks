import { useState } from 'react';

const usePatchRequest = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const patchRequest = async (url, body) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (!res.ok) throw new Error(`PATCH request failed: ${res.status}`);
            const userData = await res.json();
            setData(userData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return { patchRequest, data, loading, error };
};

export default usePatchRequest;