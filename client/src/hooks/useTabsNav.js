import { useState } from 'react';

function useTabsNav(tabs) {
    const [activeTab, setActiveTab] = useState(tabs[0]?.key || '');
    return { activeTab, setActiveTab };
}

export default useTabsNav;
