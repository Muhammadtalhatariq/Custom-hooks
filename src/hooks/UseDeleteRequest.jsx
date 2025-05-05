import { useState } from 'react';

const useDeleteRequest = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteRequest = async (url, body) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (!res.ok) throw new Error(`Delete request failed: ${res.status}`);
            const userData = await res.json();
            setData(userData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return { deleteRequest, data, loading, error };
};

export default useDeleteRequest;