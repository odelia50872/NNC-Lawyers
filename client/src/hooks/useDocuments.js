import { useEffect, useState } from 'react';
import { api } from '../API/APIService';

function useDocuments(endpoint, id) {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setDocs([]);
        setLoading(true);
        const url = id ? `${endpoint}/${id}` : endpoint;
        api.get(url)
            .then(res => setDocs(res.data))
            .finally(() => setLoading(false));
    }, [endpoint, id]);

    const byYear = docs.reduce((acc, doc) => {
        acc[doc.year] = acc[doc.year] || [];
        acc[doc.year].push(doc);
        return acc;
    }, {});

    Object.keys(byYear).forEach(year => {
        byYear[year].sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }));
    });

    const years = Object.keys(byYear).sort((a, b) => b - a);

    return { docs, setDocs, byYear, years, loading };
}

export default useDocuments;
