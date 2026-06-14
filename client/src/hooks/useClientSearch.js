import { useState, useCallback } from 'react';
import { api } from '../API/APIService';

function useClientSearch() {
    const [clientSearch, setClientSearch] = useState('');
    const [selectedClient, setSelectedClient] = useState('');
    const [results, setResults] = useState([]);

    const loadAll = useCallback(async () => {
        try {
            const res = await api.get('clients/paginated', { limit: 100, offset: 0 });
            const data = res.data.clients || res.data;
            const sorted = data.sort((a, b) => a.full_name.localeCompare(b.full_name));
            setResults(sorted);
        } catch (err) {
            console.error("Failed to load clients", err);
        }
    }, []);

    const handleSearch = (value) => {
        setClientSearch(value);
        if (!value.trim()) {
            loadAll();
            return;
        }
        setResults(prev => prev.filter(c => 
            c.full_name.toLowerCase().includes(value.toLowerCase()) || 
            (c.email && c.email.toLowerCase().includes(value.toLowerCase()))
        ));
    };

    const selectClient = (client) => {
        setSelectedClient(client.id);
        setClientSearch(client.full_name);
    };

    const clearClient = () => {
        setClientSearch('');
        setSelectedClient('');
        loadAll();
    };

    return { clientSearch, selectedClient, results, handleSearch, selectClient, clearClient, loadAll };
}

export default useClientSearch;