import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';


const data = {
  USA: [
    { range: '1-50', salary: 70000, investment: 50000 },
    { range: '51-100', salary: 65000, investment: 48000 },
    { range: '101-150', salary: 60000, investment: 46000 },
    { range: '151-200', salary: 55000, investment: 44000 },
  ],
  Canada: [
    { range: '1-50', salary: 60000, investment: 45000 },
    { range: '51-100', salary: 55000, investment: 42000 },
    { range: '101-150', salary: 50000, investment: 40000 },
    { range: '151-200', salary: 47000, investment: 38000 },
  ],
  Australia: [
    { range: '1-50', salary: 68000, investment: 47000 },
    { range: '51-100', salary: 63000, investment: 46000 },
    { range: '101-150', salary: 59000, investment: 44000 },
    { range: '151-200', salary: 55000, investment: 42000 },
  ],
  Germany: [
    { range: '1-50', salary: 62000, investment: 43000 },
    { range: '51-100', salary: 58000, investment: 41000 },
    { range: '101-150', salary: 54000, investment: 39000 },
    { range: '151-200', salary: 50000, investment: 37000 },
  ],
};

function Test() {
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [selectedRange, setSelectedRange] = useState('1-50');
  const [selectedCourse, setSelectedCourse] = useState('All Courses');

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const filteredData = data[selectedCountry].filter((item) => item.range === selectedRange);

  return (
    <div >
      <h1>College Salary vs Investment Chart</h1>
      <div>
        <label>
          Select Course:
          <select value={selectedCourse} onChange={handleCourseChange}>
            <option value="All Courses">All Courses</option>
            <option value="Engineering">Engineering</option>
            <option value="Business">Business</option>
            <option value="Arts">Arts</option>
          </select>
        </label>
        <label>
          Select Country:
          <select value={selectedCountry} onChange={handleCountryChange}>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
          </select>
        </label>
        <label>
          Select College Range:
          <select value={selectedRange} onChange={handleRangeChange}>
            <option value="1-50">1-50</option>
            <option value="51-100">51-100</option>
            <option value="101-150">101-150</option>
            <option value="151-200">151-200</option>
          </select>
        </label>
      </div>
      <BarChart width={600} height={300} data={filteredData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="salary" fill="#8884d8" />
        <Bar dataKey="investment" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}

export default Test;
