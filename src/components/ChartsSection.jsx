import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, ReferenceLine
} from 'recharts';
import NeoDropdown from './NeoDropdown';

// Generate hourly OEE data for each machine (24 hours)
const generateHourlyData = () => {
  const hours = [];
  for (let h = 0; h < 24; h++) {
    hours.push({
      time: `${h.toString().padStart(2, '0')}:00`,
      value: Math.floor(Math.random() * 40) + 50
    });
  }
  return hours;
};

// Pre-generate data for all 21 machines
const machineData = {};
for (let i = 1; i <= 21; i++) {
  const id = `PCK${i.toString().padStart(2, '0')}`;
  machineData[id] = generateHourlyData();
}

const dataMachines = [
  { name: 'PCK01', value: 72 },
  { name: 'PCK02', value: 65 },
  { name: 'PCK03', value: 80 },
  { name: 'PCK04', value: 55 },
  { name: 'PCK05', value: 74 },
  { name: 'PCK06', value: 82 },
  { name: 'PCK07', value: 68 },
  { name: 'PCK08', value: 77 },
  { name: 'PCK09', value: 45 },
  { name: 'PCK10', value: 85 },
  { name: 'PCK11', value: 60 },
  { name: 'PCK12', value: 73 },
  { name: 'PCK13', value: 69 },
  { name: 'PCK14', value: 78 },
  { name: 'PCK15', value: 71 },
  { name: 'PCK16', value: 63 },
  { name: 'PCK17', value: 75 },
  { name: 'PCK18', value: 48 },
  { name: 'PCK19', value: 81 },
  { name: 'PCK20', value: 67 },
  { name: 'PCK21', value: 76 },
];

const machineOptions = Array.from({ length: 21 }, (_, i) => {
  const id = `PCK${(i + 1).toString().padStart(2, '0')}`;
  return { value: id, label: `${id} - PACKER ${(i + 1).toString().padStart(2, '0')}` };
});

const shiftOptions = [
  { value: 'pagi', label: 'SHIFT PAGI' },
  { value: 'siang', label: 'SHIFT SIANG' },
  { value: 'malam', label: 'SHIFT MALAM' },
];

const ChartsSection = () => {
  const [selectedMachine, setSelectedMachine] = useState('PCK01');
  const [selectedShift, setSelectedShift] = useState('pagi');

  const trendData = machineData[selectedMachine];

  return (
    <>
      <div className="neo-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ fontWeight: 900, fontSize: '0.9rem', textTransform: 'uppercase' }}>
            OEE TREND - {selectedMachine}
          </h3>
          <NeoDropdown 
            options={machineOptions}
            value={selectedMachine}
            onChange={setSelectedMachine}
            width="220px"
          />
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 8, fontWeight: 700 }} 
                interval={1}
              />
              <YAxis tick={{ fontSize: 10, fontWeight: 700 }} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ border: '3px solid black', fontWeight: 900, background: 'white' }}
                labelStyle={{ fontWeight: 900 }}
              />
              <ReferenceLine y={70} stroke="orange" strokeDasharray="5 5" label={{ value: 'TARGET', position: 'right', fontSize: 8, fontWeight: 900, fill: 'orange' }} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="var(--aj-red)" 
                strokeWidth={3} 
                dot={{ r: 4, fill: 'var(--aj-red)', stroke: 'black', strokeWidth: 2 }} 
                activeDot={{ r: 7, stroke: 'black', strokeWidth: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="neo-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ fontWeight: 900, fontSize: '0.9rem', textTransform: 'uppercase' }}>OEE Per Mesin</h3>
          <NeoDropdown 
            options={shiftOptions}
            value={selectedShift}
            onChange={setSelectedShift}
            width="180px"
          />
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataMachines}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 8, fontWeight: 700 }} angle={-45} textAnchor="end" height={50} interval={0} />
              <YAxis tick={{ fontSize: 10, fontWeight: 700 }} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ border: '3px solid black', fontWeight: 900, background: 'white' }}
                labelStyle={{ fontWeight: 900 }}
              />
              <ReferenceLine y={70} stroke="orange" strokeDasharray="5 5" label={{ value: 'TARGET', position: 'right', fontSize: 8, fontWeight: 900, fill: 'orange' }} />
              <Bar dataKey="value" stroke="black" strokeWidth={2}>
                {dataMachines.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.value > 70 ? 'var(--aj-green)' : entry.value > 60 ? 'var(--aj-yellow)' : 'var(--aj-red)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default ChartsSection;
