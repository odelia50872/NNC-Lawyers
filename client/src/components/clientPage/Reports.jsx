import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../API/APIService';
import '../../styles/RentalAgreements.css';

function Reports() {
    const { user } = useAuth();
    const [byYear, setByYear] = useState({});

    useEffect(() => {
        api.get(`financial-reports/${user.id}`).then(res => {
            const grouped = res.data.reduce((acc, item) => {
                acc[item.year] = acc[item.year] || [];
                acc[item.year].push(item);
                return acc;
            }, {});
            setByYear(grouped);
        });
    }, []);

    const years = Object.keys(byYear).sort((a, b) => b - a);

    return (
        <div className="agreements-container">
            {years.length === 0 && <p className="agreements-empty">אין דוחות כספיים</p>}
            {years.map(year => (
                <div key={year} className="agreements-year-group">
                    <div className="agreements-year-badge">{year}</div>
                    <ul className="agreements-list">
                        {byYear[year].map(report => (
                            <li key={report.id} className="agreements-item">
                                <a href={report.file_url} target="_blank" rel="noreferrer">
                                    📊 {report.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Reports;
