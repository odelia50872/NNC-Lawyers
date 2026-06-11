import { useState, useRef } from 'react';
import { api } from '../API/APIService';

function useClientSearch() {
    const [clientSearch, setClientSearch] = useState('');
    const [selectedClient, setSelectedClient] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const timeout = useRef(null);

    const handleSearch = (value) => {
        setClientSearch(value);
        setSelectedClient('');
        setResults([]);
        if (!value.trim()) return;
        clearTimeout(timeout.current);
        timeout.current = setTimeout(async () => {
            const res = await api.get('clients/search', { q: value });
            setResults(res.data);
            setShowDropdown(true);
        }, 300);
    };

    const selectClient = (client) => {
        setSelectedClient(client.id);
        setClientSearch(client.full_name);
        setShowDropdown(false);
        setResults([]);
    };

    const clearClient = () => {
        setClientSearch('');
        setSelectedClient('');
        setResults([]);
        setShowDropdown(false);
    };

    return { clientSearch, selectedClient, results, showDropdown, setShowDropdown, handleSearch, selectClient, clearClient };
}

export default useClientSearch;
