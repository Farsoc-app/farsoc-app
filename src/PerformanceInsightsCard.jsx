import React, { useState } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// We need to register ALL the components we are using for ALL charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// --- DATA FOR LINE CHART (Yearly Earnings) ---
const yearlyData = {
  labels: ['2023', '2024', '2025'],
  datasets: [
    {
      label: 'Total Earnings (in Lakhs)',
      data: [1.2, 1.5, 1.8],
      borderColor: '#4CAF50',
      backgroundColor: 'rgba(76, 175, 80, 0.2)',
      fill: true,
      tension: 0.4,
    },
  ],
};

// --- DATA FOR PIE CHART (By Category - Overall) ---
const categoryData = {
  labels: ['Vegetables', 'Grains', 'Fruits'],
  datasets: [
    {
      label: 'Revenue by Category',
      data: [85, 15, 5],
      backgroundColor: ['#4CAF50', '#FFC107', '#FF6384'],
      borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
      borderWidth: 2,
    },
  ],
};

// --- DATA FOR STACKED BAR CHART (Team Earnings) ---
const detailedTeamData = [
  { name: 'Farmer 1 (Admin)', earnings: { Vegetables: { total: 50000, items: [{ name: 'Tomatoes', value: 30000 }, { name: 'Potatoes', value: 20000 }] }, Grains: { total: 20000, items: [{ name: 'Basmati Rice', value: 20000 }] }, Fruits: { total: 0, items: [] }}},
  { name: 'Farmer 2', earnings: { Vegetables: { total: 35000, items: [{ name: 'Onions', value: 20000 }, { name: 'Carrots', value: 15000 }] }, Grains: { total: 0, items: [] }, Fruits: { total: 25000, items: [{ name: 'Mangoes', value: 25000 }] }}},
  { name: 'Farmer 3', earnings: { Vegetables: { total: 60000, items: [{ name: 'Spinach', value: 25000 }, { name: 'Cabbage', value: 35000 }] }, Grains: { total: 10000, items: [{ name: 'Wheat', value: 10000 }] }, Fruits: { total: 5000, items: [{ name: 'Bananas', value: 5000 }] }}},
];
const teamLabels = detailedTeamData.map(f => f.name);
const categories = ['Vegetables', 'Grains', 'Fruits'];
const colors = { Vegetables: '#4CAF50', Grains: '#FFC107', Fruits: '#FF6384' };
const teamDatasets = categories.map(cat => ({
  label: cat,
  data: detailedTeamData.map(f => f.earnings[cat].total),
  backgroundColor: colors[cat],
}));
const stackedBarData = { labels: teamLabels, datasets: teamDatasets };


// --- CHART OPTIONS ---
const linePieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom' } },
};

const stackedBarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: { display: true, text: 'Team Earnings Breakdown by Category' },
    legend: { position: 'bottom' },
    tooltip: {
      callbacks: {
        footer: function(tooltipItems) {
          const item = tooltipItems[0];
          const farmerIdx = item.dataIndex;
          const catIdx = item.datasetIndex;
          const catName = categories[catIdx];
          const products = detailedTeamData[farmerIdx].earnings[catName].items;
          if (!products.length) return 'No items in this category.';
          let footer = '\n--- Items ---\n';
          products.forEach(p => { footer += `${p.name}: ₹${p.value.toLocaleString('en-IN')}\n`; });
          return footer;
        }
      }
    }
  },
  scales: { x: { stacked: true }, y: { stacked: true, ticks: { callback: value => `₹${value / 1000}k` } } },
};


// --- THE MAIN COMPONENT ---
function PerformanceInsightsCard() {
  const [activeChart, setActiveChart] = useState('yearly'); // yearly, category, or team

  return (
    <div className="performance-card">
      <div className="performance-card-header">
        <h3>Performance Insights</h3>
        <select
          className="chart-switcher"
          value={activeChart}
          onChange={(e) => setActiveChart(e.target.value)}
        >
          <option value="yearly">Yearly Earnings</option>
          <option value="category">By Category</option>
          <option value="team">Team Earnings</option>
        </select>
      </div>

      <div className="chart-container">
        {activeChart === 'yearly' && (
          <Line options={linePieOptions} data={yearlyData} />
        )}
        {activeChart === 'category' && (
          <Pie options={linePieOptions} data={categoryData} />
        )}
        {activeChart === 'team' && (
          <Bar options={stackedBarOptions} data={stackedBarData} />
        )}
      </div>
    </div>
  );
}

export default PerformanceInsightsCard;