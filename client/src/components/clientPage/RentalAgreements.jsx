import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../API/APIService';
import '../../styles/RentalAgreements.css';

function RentalAgreements() {
    const { user } = useAuth();
    const [byYear, setByYear] = useState({});

    useEffect(() => {
        api.get(`rental-agreements/${user.id}`).then(res => {
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
            {years.length === 0 && <p className="agreements-empty">אין הסכמי שכירות</p>}
            {years.map(year => (
                <div key={year} className="agreements-year-group">
                    <div className="agreements-year-badge">{year}</div>
                    <ul className="agreements-list">
                        {byYear[year].map(ag => (
                            <li key={ag.id} className="agreements-item">
                                <a href={ag.file_url} target="_blank" rel="noreferrer">
                                    📄 {ag.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default RentalAgreements;
