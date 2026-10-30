import { useMemo, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { ArrowRight, Droplets, Leaf, Shield, Zap, Users, Home, SunMedium, BarChart3, Cpu, Wallet, Settings, Menu, CloudSun, Sprout, Tractor, AlertTriangle, CheckCircle2, Calculator, Repeat2 } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, CartesianGrid, Cell, ComposedChart, Line, Tooltip, ResponsiveContainer, PieChart, Pie } from 'recharts';
import {
  demoFarm,
  weatherData,
  resourcePlan,
  cropRecommendations,
  wasteDetections,
  budgetScenarios,
  buildSimulatorComparison,
  buildAIResponse,
  buildIrrigationPlan,
  buildNutrientBalance,
  buildEnergySummary,
  buildLaborCalendar,
  buildCropProtectionRisk,
  decisions
} from './data/demoData';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: Home },
  { label: 'Water', path: '/water', icon: Droplets },
  { label: 'Fertilizer', path: '/fertilizer', icon: Leaf },
  { label: 'Crop Protection', path: '/crop-protection', icon: Shield },
  { label: 'Energy', path: '/energy', icon: Zap },
  { label: 'Labor', path: '/labor', icon: Users },
  { label: 'Recommendations', path: '/recommendations', icon: Sprout },
  { label: 'Simulator', path: '/simulator', icon: Cpu },
  { label: 'Waste Detector', path: '/waste-detector', icon: AlertTriangle },
  { label: 'Budget', path: '/budget', icon: Wallet },
  { label: 'Weather', path: '/weather', icon: CloudSun },
  { label: 'AI Assistant', path: '/ai-assistant', icon: Bot },
  { label: 'Analytics', path: '/reports', icon: BarChart3 },
  { label: 'Farm Profile', path: '/profile', icon: Settings }
];

const summaryCards = [
  { label: 'Water Status', value: '82% efficient', tone: 'good' },
  { label: 'Fertilizer Balance', value: 'Balanced', tone: 'good' },
  { label: 'Pest Risk', value: 'Moderate', tone: 'warn' },
  { label: 'Energy Load', value: 'Stable', tone: 'good' },
  { label: 'Labor Availability', value: '14 workers', tone: 'good' }
];

function App() {
  const [farm, setFarm] = useState(demoFarm);
  const [scenario, setScenario] = useState({
    water: demoFarm.waterAvailability,
    electricityPrice: demoFarm.electricityPrice,
    dieselPrice: demoFarm.dieselPrice,
    fertilizerBudget: demoFarm.fertilizerBudget,
    farmSize: demoFarm.farmArea,
    crop: demoFarm.crop,
    labor: demoFarm.laborAvailability,
    rainfall: demoFarm.expectedRainfall
  });
  const [aiQuestion, setAiQuestion] = useState('How can I reduce water usage on my tomato field?');
  const [aiAnswer, setAiAnswer] = useState(buildAIResponse('How can I reduce water usage on my tomato field?'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const plan = useMemo(() => resourcePlan(farm), [farm]);
  const irrigationPlan = useMemo(() => buildIrrigationPlan(farm), [farm]);
  const nutrientBalance = useMemo(() => buildNutrientBalance(farm), [farm]);
  const energySummary = useMemo(() => buildEnergySummary(farm), [farm]);
  const laborCalendar = useMemo(() => buildLaborCalendar(farm), [farm]);
  const protectionRisk = useMemo(() => buildCropProtectionRisk(farm), [farm]);
  const simulation = useMemo(() => buildSimulatorComparison(farm, scenario), [farm, scenario]);
  const reportData = useMemo(() => [{ name: 'Water', value: plan.waterRequirement }, { name: 'Fertilizer', value: plan.fertilizerCost }, { name: 'Energy', value: plan.energyCost }, { name: 'Labor', value: plan.laborCost }], [plan]);

  const updateScenario = (key, value) => setScenario(prev => ({ ...prev, [key]: value }));
  const resetDemo = () => {
    setFarm(demoFarm);
    setScenario({
      water: demoFarm.waterAvailability,
      electricityPrice: demoFarm.electricityPrice,
      dieselPrice: demoFarm.dieselPrice,
      fertilizerBudget: demoFarm.fertilizerBudget,
      farmSize: demoFarm.farmArea,
      crop: demoFarm.crop,
      labor: demoFarm.laborAvailability,
      rainfall: demoFarm.expectedRainfall
    });
  };

  const handleAskAI = () => {
    setAiAnswer(buildAIResponse(aiQuestion));
  };

  const renderForecast = (items) => (
    <div className="forecast-grid">
      {items.map(item => (
        <div className="forecast-tile" key={item.day}>
          <h4>{item.day}</h4>
          <p>{item.temp}°C</p>
          <span>{item.rain}% rain</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><Tractor size={24} /></div>
          <div>
            <strong>AgroSense</strong>
            <small>Resource intelligence</small>
          </div>
        </div>

        <nav>
          <div className="nav-group">
            <NavLink to="/" onClick={() => setMobileOpen(false)} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <Home size={16} /> Landing
            </NavLink>
            <NavLink to="/login" onClick={() => setMobileOpen(false)} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <Settings size={16} /> Login
            </NavLink>
          </div>
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink key={path} to={path} onClick={() => setMobileOpen(false)} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu size={18} />
          </button>
          <div>
            <p className="eyebrow">Buildathon 2.0</p>
            <h1>Smarter Farming. Better Resources. Higher Productivity.</h1>
          </div>
          <div className="header-actions">
            <button className="ghost-button">Demo mode</button>
            <button className="primary-button" onClick={resetDemo}>Reset Demo</button>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage farm={farm} plan={plan} weather={weatherData} summaryCards={summaryCards} reportData={reportData} />} />
          <Route path="/water" element={<WaterPage farm={farm} plan={plan} irrigationPlan={irrigationPlan} />} />
          <Route path="/fertilizer" element={<FertilizerPage farm={farm} nutrientBalance={nutrientBalance} />} />
          <Route path="/crop-protection" element={<CropProtectionPage farm={farm} protectionRisk={protectionRisk} />} />
          <Route path="/energy" element={<EnergyPage farm={farm} energySummary={energySummary} />} />
          <Route path="/labor" element={<LaborPage farm={farm} laborCalendar={laborCalendar} />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/simulator" element={<SimulatorPage farm={farm} scenario={scenario} setScenario={updateScenario} simulation={simulation} />} />
          <Route path="/waste-detector" element={<WastePage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/ai-assistant" element={<AIPage aiQuestion={aiQuestion} setAiQuestion={setAiQuestion} aiAnswer={aiAnswer} handleAskAI={handleAskAI} />} />
          <Route path="/reports" element={<ReportsPage reportData={reportData} />} />
          <Route path="/profile" element={<ProfilePage farm={farm} setFarm={setFarm} resetDemo={resetDemo} />} />
        </Routes>
      </main>
    </div>
  );
}

function LandingPage() {
  return (
    <section className="page-surface hero-layout">
      <div>
        <p className="eyebrow">AgroSense</p>
        <h2>Connected farm intelligence for efficient resource use.</h2>
        <p className="lead">A decision-support platform for water, fertility, crop protection, energy, and labor planning designed for practical farm operations.</p>
        <div className="cta-row">
          <a className="primary-button" href="/dashboard">Open dashboard</a>
          <a className="ghost-button" href="/simulator">Run simulator</a>
        </div>
        <div className="mini-metrics">
          <div><strong>5 domains</strong><span>connected</span></div>
          <div><strong>2.5x</strong><span>resource visibility</span></div>
          <div><strong>Demo</strong><span>ready</span></div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-card large">
          <div className="stat-row">
            <span>Water savings</span>
            <strong>18%</strong>
          </div>
          <div className="stat-row">
            <span>Fertilizer balance</span>
            <strong>94%</strong>
          </div>
          <div className="stat-row">
            <span>Energy efficiency</span>
            <strong>87%</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function LoginPage() {
  return (
    <section className="page-surface auth-box">
      <div className="auth-panel">
        <h3>Login / Registration</h3>
        <label>
          Email
          <input type="email" defaultValue="farmer@agrosense.in" />
        </label>
        <label>
          Password
          <input type="password" defaultValue="demo123" />
        </label>
        <button className="primary-button">Access dashboard</button>
        <button className="ghost-button">Create account</button>
      </div>
    </section>
  );
}

function DashboardPage({ farm, plan, weather, summaryCards, reportData }) {
  const chartData = [
    { month: 'Jan', water: 105, fertilizer: 100, energy: 90 },
    { month: 'Feb', water: 120, fertilizer: 110, energy: 95 },
    { month: 'Mar', water: 118, fertilizer: 122, energy: 112 },
    { month: 'Apr', water: 128, fertilizer: 126, energy: 118 },
    { month: 'May', water: 116, fertilizer: 112, energy: 100 }
  ];

  return (
    <section className="page-surface">
      <div className="section-header">
        <div>
          <p className="eyebrow">Farm overview</p>
          <h2>{farm.farmName}</h2>
        </div>
        <span className="badge">Demo data</span>
      </div>

      <div className="summary-grid">
        {summaryCards.map(card => (
          <div key={card.label} className={`summary-card ${card.tone}`}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </div>
        ))}
      </div>

      <div className="dashboard-grid two-col">
        <div className="panel">
          <h3>Resource consumption</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="waterArea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#2a9d71" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#2a9d71" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#dfe8dd" />
              <Tooltip />
              <Area type="monotone" dataKey="water" stroke="#2a9d71" fill="url(#waterArea)" />
              <Area type="monotone" dataKey="fertilizer" stroke="#4f8b5d" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <h3>Current weather</h3>
          <div className="weather-box">
            <div>
              <CloudSun size={28} />
              <strong>{weather.current.temp}°C</strong>
            </div>
            <ul>
              <li>Humidity: {weather.current.humidity}%</li>
              <li>Rainfall: {weather.current.rainfall} mm</li>
              <li>Wind: {weather.current.wind} km/h</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="dashboard-grid two-col">
        <div className="panel">
          <h3>Top recommendations</h3>
          <ul className="check-list">
            <li><CheckCircle2 size={16} /> Shift drip irrigation by 1 hour to avoid peak load.</li>
            <li><CheckCircle2 size={16} /> Reduce nitrogen application by 8% during vegetative stage.</li>
            <li><CheckCircle2 size={16} /> Spray at sunrise to maintain spray suitability.</li>
            <li><CheckCircle2 size={16} /> Reallocate labor to tomato harvesting during week 3.</li>
          </ul>
        </div>

        <div className="panel">
          <h3>Resource allocation</h3>
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie data={reportData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={80} fill="#2a9d71" paddingAngle={1}>
                {reportData.map((entry, index) => <Cell key={entry.name} fill={['#2a9d71', '#4f8b5d', '#7abf8f', '#a6d7b7'][index % 4]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

function WaterPage({ farm, plan, irrigationPlan }) {
  return (
    <section className="page-surface">
      <div className="section-header">
        <div>
          <p className="eyebrow">Domain 1</p>
          <h2>Water intelligence</h2>
        </div>
        <span className="badge">Crop-wise water planning</span>
      </div>

      <div className="stats-grid">
        <StatCard title="Water requirement" value={`${plan.waterRequirement} mm`} detail="Estimated for 2 acres of tomato" />
        <StatCard title="Groundwater use" value={`${plan.groundwaterUse}%`} detail="Controlled by limited water availability" />
        <StatCard title="Water shortage risk" value={plan.shortageRisk} detail="Shortage forecast for 7-day window" />
        <StatCard title="Harvest efficiency" value={`${plan.efficiency}%`} detail="Compared with previous season" />
      </div>

      <div className="two-column-grid">
        <div className="panel">
          <h3>Growth-stage allocation</h3>
          <ul className="list-table">
            {irrigationPlan.map(item => (
              <li key={item.stage}><span>{item.stage}</span><strong>{item.allocation} mm</strong></li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h3>Water shortage prediction</h3>
          <div className="alert-box warning">
            <AlertTriangle size={18} />
            Below-normal rainfall in the next 10 days may reduce usable water by 15–20% unless scheduled allocation is adjusted.
          </div>
          <div className="small-list">
            <p>Rainwater harvesting potential: 1.9 lakh liters</p>
            <p>Managed groundwater dependency: Moderate</p>
            <p>Irrigation history: 6 cycles in the last 14 days</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FertilizerPage({ farm, nutrientBalance }) {
  return (
    <section className="page-surface">
      <div className="section-header">
        <div>
          <p className="eyebrow">Domain 2</p>
          <h2>Fertilizer intelligence</h2>
        </div>
        <span className="badge">Nutrient balance engine</span>
      </div>

      <div className="stats-grid">
        <StatCard title="N" value={`${nutrientBalance.nitrogen} kg/acre`} detail="Current gap vs target" />
        <StatCard title="P" value={`${nutrientBalance.phosphorus} kg/acre`} detail="Phosphorus adequacy" />
        <StatCard title="K" value={`${nutrientBalance.potassium} kg/acre`} detail="Potassium trend" />
        <StatCard title="Cost" value={`₹${nutrientBalance.cost}`} detail="Estimated fertilizer spend" />
      </div>

      <div className="two-column-grid">
        <div className="panel">
          <h3>Crop-stage plan</h3>
          <ul className="list-table">
            {nutrientBalance.plan.map(item => (
              <li key={item.stage}><span>{item.stage}</span><strong>{item.recommendation}</strong></li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h3>Balance analysis</h3>
          <div className="progress-stack">
            {Object.entries(nutrientBalance.status).map(([label, value]) => (
              <div className="progress-row" key={label}>
                <div className="label-wrap"><span>{label}</span><strong>{value}%</strong></div>
                <div className="progress-bar"><span style={{ width: `${value}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CropProtectionPage({ farm, protectionRisk }) {
  return (
    <section className="page-surface">
      <div className="section-header">
        <div>
          <p className="eyebrow">Domain 3</p>
          <h2>Crop protection intelligence</h2>
        </div>
        <span className="badge">Preventive risk engine</span>
      </div>

      <div className="upload-panel">
        <div className="upload-box">
          <h3>Leaf disease image upload</h3>
          <p>Upload crop images for visual review. This is a demo implementation and does not claim disease confirmation.</p>
          <button className="ghost-button">Upload sample image</button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="Pest risk" value={protectionRisk.riskLevel} detail="Risk estimated before visible damage" />
        <StatCard title="Spray window" value={protectionRisk.sprayWindow} detail="Recommended suitable hours" />
        <StatCard title="Weather trigger" value={protectionRisk.weatherTrigger} detail="Humidity and temperature index" />
        <StatCard title="Safety reminder" value={protectionRisk.safetyNote} detail="Label-based caution" />
      </div>
    </section>
  );
}

function EnergyPage({ farm, energySummary }) {
  return (
    <section className="page-surface">
      <div className="section-header">
        <div>
          <p className="eyebrow">Domain 4</p>
          <h2>Energy intelligence</h2>
        </div>
        <span className="badge">Smart energy comparison</span>
      </div>

      <div className="stats-grid">
        <StatCard title="Electricity" value={`₹${energySummary.electricityCost}`} detail="Monthly operating cost" />
        <StatCard title="Diesel" value={`₹${energySummary.dieselCost}`} detail="Pump operation cost" />
        <StatCard title="Solar feasibility" value={energySummary.solarFeasibility} detail="Estimated viability" />
        <StatCard title="Savings" value={`₹${energySummary.savings}`} detail="Possible reduction" />
      </div>

      <div className="panel mt-16">
        <h3>Operating cost comparison</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={energySummary.comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#dfe8dd" />
            <Tooltip />
            <Bar dataKey="cost" fill="#2a9d71" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function LaborPage({ farm, laborCalendar }) {
  return (
    <section className="page-surface">
      <div className="section-header">
        <div>
          <p className="eyebrow">Domain 5</p>
          <h2>Labor intelligence</h2>
        </div>
        <span className="badge">Farm workforce planner</span>
      </div>

      <div className="stats-grid">
        <StatCard title="Workers needed" value={laborCalendar.requiredWorkers} detail="Current activity estimate" />
        <StatCard title="Workdays" value={laborCalendar.workdays} detail="Planned working days" />
        <StatCard title="Seasonal demand" value={laborCalendar.seasonalDemand} detail="High labor period" />
        <StatCard title="Cost" value={`₹${laborCalendar.cost}`} detail="Estimated labor spend" />
      </div>

      <div className="panel mt-16">
        <h3>Labor allocation calendar</h3>
        <ul className="calendar-list">
          {laborCalendar.activities.map(item => (
            <li key={item.week}><span>{item.week}</span><strong>{item.task}</strong><em>{item.workers} workers</em></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function RecommendationsPage() {
  return (
    <section className="page-surface">
      <div className="section-header">
        <div>
          <p className="eyebrow">Recommendation engine</p>
          <h2>Season-wise crop recommendation</h2>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Crop</th>
              <th>Season</th>
              <th>Water need</th>
              <th>Soil</th>
              <th>Duration</th>
              <th>Suitability</th>
            </tr>
          </thead>
          <tbody>
            {cropRecommendations.map(item => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.season}</td>
                <td>{item.waterNeed}</td>
                <td>{item.soil}</td>
                <td>{item.duration}</td>
                <td>{item.suitability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function SimulatorPage({ scenario, setScenario, simulation }) {
  return (
    <section className="page-surface">
      <div className="section-header">
        <div>
          <p className="eyebrow">What-if simulator</p>
          <h2>Farming scenario comparison</h2>
        </div>
      </div>

      <div className="simulator-grid">
        <div className="panel">
          <h3>Inputs</h3>
          <div className="field-grid">
            <label>Water availability <input type="number" value={scenario.water} onChange={(e) => setScenario('water', Number(e.target.value))} /></label>
            <label>Electricity price <input type="number" value={scenario.electricityPrice} onChange={(e) => setScenario('electricityPrice', Number(e.target.value))} /></label>
            <label>Diesel price <input type="number" value={scenario.dieselPrice} onChange={(e) => setScenario('dieselPrice', Number(e.target.value))} /></label>
            <label>Fertilizer budget <input type="number" value={scenario.fertilizerBudget} onChange={(e) => setScenario('fertilizerBudget', Number(e.target.value))} /></label>
            <label>Farm size <input type="number" value={scenario.farmSize} onChange={(e) => setScenario('farmSize', Number(e.target.value))} /></label>
            <label>Labor availability <input type="number" value={scenario.labor} onChange={(e) => setScenario('labor', Number(e.target.value))} /></label>
          </div>
        </div>

        <div className="panel">
          <h3>Scenario summary</h3>
          <ul className="check-list">
            <li><CheckCircle2 size={16} /> Current scenario: {simulation.currentSavings} potential savings</li>
            <li><CheckCircle2 size={16} /> Modified scenario: {simulation.modifiedCost} total estimated cost</li>
            <li><CheckCircle2 size={16} /> Cost delta: ₹{simulation.costDelta}</li>
            <li><CheckCircle2 size={16} /> Trade-off: {simulation.tradeoff}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function WastePage() {
  return (
    <section className="page-surface">
      <div className="section-header">
        <div>
          <p className="eyebrow">Resource waste detector</p>
          <h2>Operational inefficiencies</h2>
        </div>
      </div>
      <div className="waste-list">
        {wasteDetections.map(item => (
          <div key={item.id} className="alert-box">
            <strong>{item.domain}</strong>
            <p>{item.issue}</p>
            <small>Recommended action: {item.action}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

function BudgetPage() {
  const budgetData = [
    { label: 'Seeds', value: 24000 },
    { label: 'Water', value: 18000 },
    { label: 'Fertilizer', value: 38000 },
    { label: 'Pesticides', value: 22000 },
    { label: 'Energy', value: 16000 },
    { label: 'Labor', value: 30000 },
    { label: 'Equipment', value: 12000 }
  ];

  return (
    <section className="page-surface">
      <div className="section-header">
        <div>
          <p className="eyebrow">Smart budget</p>
          <h2>Farm cost analysis</h2>
        </div>
      </div>

      <div className="two-column-grid">
        <div className="panel">
          <h3>Cost breakdown</h3>
          <table>
            <thead>
              <tr>
                <th>Line item</th>
                <th>Estimate</th>
              </tr>
            </thead>
            <tbody>
              {budgetData.map(item => (
                <tr key={item.label}><td>{item.label}</td><td>₹{item.value}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel">
          <h3>Total cultivation cost</h3>
          <div className="big-number">₹1,60,000</div>
          <p>Estimated operating cost only. This is a planning estimate and does not guarantee yield or profit.</p>
        </div>
      </div>
    </section>
  );
}

function WeatherPage() {
  return (
    <section className="page-surface">
      <div className="section-header">
        <div>
          <p className="eyebrow">Weather intelligence</p>
          <h2>Karnataka field conditions</h2>
        </div>
      </div>
      <div className="panel">
        <div className="weather-box large-box">
          <div>
            <CloudSun size={28} />
            <strong>{weatherData.current.temp}°C</strong>
          </div>
          <ul>
            <li>Humidity: {weatherData.current.humidity}%</li>
            <li>Rainfall: {weatherData.current.rainfall} mm</li>
            <li>Wind: {weatherData.current.wind} km/h</li>
          </ul>
        </div>
        {renderForecast(weatherData.forecast)}
      </div>
    </section>
  );
}

function AIPage({ aiQuestion, setAiQuestion, aiAnswer, handleAskAI }) {
  return (
    <section className="page-surface">
      <div className="section-header">
        <div>
          <p className="eyebrow">AI Farming Assistant</p>
          <h2>Ask AgroSense AI</h2>
        </div>
      </div>
      <div className="ai-panel">
        <textarea value={aiQuestion} onChange={(e) => setAiQuestion(e.target.value)} rows={4} />
        <button className="primary-button" onClick={handleAskAI}>Get guidance</button>
      </div>
      <div className="panel mt-16">
        <h3>Response</h3>
        <p>{aiAnswer}</p>
      </div>
    </section>
  );
}

function ReportsPage({ reportData }) {
  return (
    <section className="page-surface">
      <div className="section-header">
        <div>
          <p className="eyebrow">Analytics & reports</p>
          <h2>Resource performance summary</h2>
        </div>
      </div>

      <div className="panel mt-16">
        <ResponsiveContainer width="100%" height={250}>
          <ComposedChart data={reportData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#dfe8dd" />
            <Tooltip />
            <Bar dataKey="value" fill="#2a9d71" radius={[8, 8, 0, 0]} />
            <Line type="monotone" dataKey="value" stroke="#133d2d" strokeWidth={2} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function ProfilePage({ farm, setFarm, resetDemo }) {
  return (
    <section className="page-surface">
      <div className="section-header">
        <div>
          <p className="eyebrow">Farm profile</p>
          <h2>Profile and settings</h2>
        </div>
      </div>
      <div className="field-grid">
        <label>Farm name <input value={farm.farmName} onChange={(e) => setFarm(prev => ({ ...prev, farmName: e.target.value }))} /></label>
        <label>Location <input value={farm.location} onChange={(e) => setFarm(prev => ({ ...prev, location: e.target.value }))} /></label>
        <label>Crop <input value={farm.crop} onChange={(e) => setFarm(prev => ({ ...prev, crop: e.target.value }))} /></label>
        <label>Season <input value={farm.season} onChange={(e) => setFarm(prev => ({ ...prev, season: e.target.value }))} /></label>
        <label>Soil type <input value={farm.soilType} onChange={(e) => setFarm(prev => ({ ...prev, soilType: e.target.value }))} /></label>
        <label>Farm area <input type="number" value={farm.farmArea} onChange={(e) => setFarm(prev => ({ ...prev, farmArea: Number(e.target.value) }))} /></label>
      </div>
      <button className="primary-button" onClick={resetDemo}>Reset demo values</button>
    </section>
  );
}

function StatCard({ title, value, detail }) {
  return (
    <div className="stat-card">
      <span>{title}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

export default App;
