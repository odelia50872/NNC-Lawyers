import { useEffect, useState } from 'react';
import { api } from '../API/APIService';

function useDocuments(endpoint, id) {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        if (!id) return setDocs([]);
        api.get(`${endpoint}/${id}`).then(res => setDocs(res.data));
    }, [endpoint, id]);

    const byYear = docs.reduce((acc, doc) => {
        acc[doc.year] = acc[doc.year] || [];
        acc[doc.year].push(doc);
        return acc;
    }, {});

    const years = Object.keys(byYear).sort((a, b) => b - a);

    return { docs, setDocs, byYear, years };
}

export default useDocuments;
