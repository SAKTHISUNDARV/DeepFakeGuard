import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Shield, AlertTriangle, BarChart2, PieChart, Download, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { generateMockHistory } from '../utils/mockData';
import { dashboardStats } from '../utils/mockData';
import { formatDate } from '../utils/helpers';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [historyItems, setHistoryItems] = useState(generateMockHistory(10));
  
  // Chart data for scans by day
  const scanChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Total Scans',
        data: dashboardStats.scansByDay,
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
      },
      {
        label: 'Deepfakes Detected',
        data: dashboardStats.deepfakesByDay,
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1,
      },
    ],
  };
  
  // Chart options
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  // Pie chart data for detection results
  const pieChartData = {
    labels: ['Authentic', 'Deepfake', 'Inconclusive'],
    datasets: [
      {
        data: [
          dashboardStats.authenticContent, 
          dashboardStats.detectedDeepfakes, 
          dashboardStats.totalScans - dashboardStats.authenticContent - dashboardStats.detectedDeepfakes
        ],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',  // Green for authentic
          'rgba(239, 68, 68, 0.7)',   // Red for deepfake
          'rgba(245, 158, 11, 0.7)',  // Yellow for inconclusive
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(239, 68, 68)',
          'rgb(245, 158, 11)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Pie chart options
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };
  
  // Refresh history data
  const refreshHistory = () => {
    setHistoryItems(generateMockHistory(10));
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View your detection history and statistics
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Time Range:</span>
          <div className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className={`px-3 py-1.5 text-xs font-medium rounded-l-md border ${
                timeRange === '7d'
                  ? 'bg-primary-50 text-primary-600 border-primary-300 dark:bg-primary-900/30 dark:text-primary-400 dark:border-primary-700'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
              onClick={() => setTimeRange('7d')}
            >
              7 Days
            </button>
            <button
              type="button"
              className={`px-3 py-1.5 text-xs font-medium border-t border-b ${
                timeRange === '30d'
                  ? 'bg-primary-50 text-primary-600 border-primary-300 dark:bg-primary-900/30 dark:text-primary-400 dark:border-primary-700'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
              onClick={() => setTimeRange('30d')}
            >
              30 Days
            </button>
            <button
              type="button"
              className={`px-3 py-1.5 text-xs font-medium border-t border-b ${
                timeRange === '3m'
                  ? 'bg-primary-50 text-primary-600 border-primary-300 dark:bg-primary-900/30 dark:text-primary-400 dark:border-primary-700'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
              onClick={() => setTimeRange('3m')}
            >
              3 Months
            </button>
            <button
              type="button"
              className={`px-3 py-1.5 text-xs font-medium rounded-r-md border ${
                timeRange === 'all'
                  ? 'bg-primary-50 text-primary-600 border-primary-300 dark:bg-primary-900/30 dark:text-primary-400 dark:border-primary-700'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
              }`}
              onClick={() => setTimeRange('all')}
            >
              All Time
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Scans"
          value={dashboardStats.totalScans}
          icon={<Shield className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
          description="Media files analyzed"
        />
        <StatCard 
          title="Deepfakes Detected"
          value={dashboardStats.detectedDeepfakes}
          icon={<AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />}
          description={`${Math.round((dashboardStats.detectedDeepfakes / dashboardStats.totalScans) * 100)}% of all scans`}
          trending="up"
        />
        <StatCard 
          title="Authentic Content"
          value={dashboardStats.authenticContent}
          icon={<Check className="h-6 w-6 text-green-600 dark:text-green-400" />}
          description={`${Math.round((dashboardStats.authenticContent / dashboardStats.totalScans) * 100)}% of all scans`}
        />
        <StatCard 
          title="Detection Rate"
          value={`${Math.round(dashboardStats.detectionRate * 100)}%`}
          icon={<BarChart2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
          description="Overall confidence"
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Scans Over Time</CardTitle>
            <CardDescription>Daily scan activity and detection results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <Bar data={scanChartData} options={barChartOptions} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Detection Results</CardTitle>
            <CardDescription>Distribution of analysis outcomes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity */}
      <Card className="mb-8">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your most recent detection history</CardDescription>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button 
              variant="outline" 
              size="sm" 
              icon={<RefreshCw size={14} />}
              onClick={refreshHistory}
            >
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                  <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">File</th>
                  <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Type</th>
                  <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Date</th>
                  <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Result</th>
                  <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Confidence</th>
                  <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {historyItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                      <div className="flex items-center gap-3">
                        {item.thumbnailUrl && (
                          <div className="w-10 h-10 rounded bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0">
                            <img src={item.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <span className="truncate max-w-[200px]">{item.fileName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 capitalize">
                      {item.sourceType}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {formatDate(item.timestamp)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge 
                        variant={
                          item.status === 'deepfake' 
                            ? 'danger' 
                            : item.status === 'authentic' 
                              ? 'success' 
                              : 'warning'
                        }
                      >
                        {item.status === 'deepfake' 
                          ? 'Deepfake' 
                          : item.status === 'authentic' 
                            ? 'Authentic' 
                            : 'Inconclusive'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {Math.round(item.confidence * 100)}%
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {historyItems.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No detection history available</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Common Manipulations */}
      <Card>
        <CardHeader>
          <CardTitle>Common Manipulations</CardTitle>
          <CardDescription>Types of deepfake manipulations detected</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dashboardStats.commonManipulations.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-32 sm:w-48 shrink-0 text-sm text-gray-700 dark:text-gray-300">
                  {item.type}
                </div>
                <div className="w-full ml-4">
                  <div className="flex items-center">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-500 dark:bg-primary-400"
                        style={{ 
                          width: `${(item.count / dashboardStats.detectedDeepfakes) * 100}%` 
                        }}
                      />
                    </div>
                    <span className="ml-4 text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                      {item.count}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const StatCard = ({ title, value, icon, description, trending }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          {icon}
        </div>
        <div className="flex items-baseline">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {trending && (
            <span className={`ml-2 text-xs font-medium ${
              trending === 'up' 
                ? 'text-green-600 dark:text-green-400' 
                : trending === 'down' 
                  ? 'text-red-600 dark:text-red-400' 
                  : 'text-gray-600 dark:text-gray-400'
            }`}>
              {trending === 'up' ? '↑' : trending === 'down' ? '↓' : '→'} 
              {trending === 'up' ? '+12%' : trending === 'down' ? '-8%' : '0%'}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

const Check = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
};

export default DashboardPage;
