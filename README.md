# 📊 Trends Dashboard - Vue.js Practical

A modern and dynamic dashboard built using **Vue.js**, **Tailwind CSS**, **Pinia**, and **ApexCharts**, featuring location-wise statistics, metrics, and chart visualizations.

---
## 🎯 Objective

To create a responsive, clean, and dynamic dashboard that includes:
- Location dropdown
- Metric cards with key KPIs
- Location-wise historical charts

## 🗂️ Data Files Used

- `locations.json` – Dropdown population
- `trends.json` – Metric cards data
- `trends-history.json` – Chart data


## 🚀 Features

- **Tailwind CSS** based design – no custom CSS used
- **Location Dropdown** from JSON
  - Updates: Location name, description, mobile, review
- **Review Calculation** – Location-wise average displayed
- **Metric Cards** with:
  - Dynamic data
  - Icons & visual effects
- **Pinia** for global state management
- **Code Optimization** using reusable components & computed logic
- **ApexCharts Integration**
  - Location-wise date average
  - Top 3% chart
  - Market share chart
  - Chart updates on location/radio change

---

## 🛠️ Setup Instructions

### Required Versions
- **Node.js:** `v22.15.0`
- **npm:** `v11.3.0`

### Steps to Run

```bash
# Clone project
git clone <your-repo-url>
cd Practical

# Install dependencies
npm install

# Run locally
npm run dev

# Open in browser
http://localhost:5173
