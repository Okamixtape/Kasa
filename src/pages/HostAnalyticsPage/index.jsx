import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import Meta from '../../components/Meta';
import './_host-analytics-page.scss';

const HostAnalyticsPage = () => {
    // Mock data for now
    const analytics = {
        totalRevenue: '4,520€',
        occupancyRate: '78%',
        averageNightlyRate: '112€',
        totalBookings: 41,
    };

    const revenueData = [
        { name: 'Jan', revenue: 400 },
        { name: 'Fév', revenue: 300 },
        { name: 'Mar', revenue: 600 },
        { name: 'Avr', revenue: 800 },
        { name: 'Mai', revenue: 700 },
        { name: 'Jui', revenue: 900 },
    ];

    const occupancyData = [
        { name: 'Villa vue mer', occupancy: 85, color: '#8884d8' },
        { name: 'Appartement cosy', occupancy: 72, color: '#82ca9d' },
        { name: 'Chalet montagnard', occupancy: 65, color: '#ffc658' },
        { name: 'Studio urbain', occupancy: 91, color: '#ff8042' },
    ];

    return (
        <>
            <Meta 
                title="Analyse de performance" 
                description="Suivez vos revenus, votre taux d'occupation et d'autres statistiques clés."
            />
            <main className="kasa__wrapper fade-in kasa__main-container host-analytics-page">
                <h1>Analyse de performance</h1>
                <p>Aperçu de l'activité de vos propriétés.</p>

                <div className="analytics-summary">
                    <div className="summary-card">
                        <h2>Revenu total</h2>
                        <p>{analytics.totalRevenue}</p>
                    </div>
                    <div className="summary-card">
                        <h2>Taux d'occupation</h2>
                        <p>{analytics.occupancyRate}</p>
                    </div>
                    <div className="summary-card">
                        <h2>Tarif moyen par nuit</h2>
                        <p>{analytics.averageNightlyRate}</p>
                    </div>
                    <div className="summary-card">
                        <h2>Réservations totales</h2>
                        <p>{analytics.totalBookings}</p>
                    </div>
                </div>

                <div className="charts-grid">
                    <div className="chart-container">
                        <h2>Évolution des revenus (6 derniers mois)</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#ff6060" activeDot={{ r: 8 }} name="Revenu (€)" />
                        </LineChart>
                    </ResponsiveContainer>
                    </div>
                    <div className="chart-container">
                        <h2>Taux d'occupation par propriété</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={occupancyData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" domain={[0, 100]} unit="%" />
                                <YAxis type="category" dataKey="name" width={120} />
                                <Tooltip formatter={(value) => `${value}%`} />
                                <Bar dataKey="occupancy" name="Taux d'occupation">
                                    {occupancyData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </main>
        </>
    );
};

export default HostAnalyticsPage;
