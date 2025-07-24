import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Shield, AlertTriangle, BarChart2, PieChart, Download, RefreshCw, Check } from 'lucide-react';
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  
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
        borderRadius: 6,
      },
      {
        label: 'Deepfakes Detected',
        data: dashboardStats.deepfakesByDay,
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1,
        borderRadius: 6,
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
        labels: {
          color: '#6B7280',
          font: {
            family: 'Inter, sans-serif',
          },
          usePointStyle: true,
          padding: 20,
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#E5E7EB',
        },
        ticks: {
          color: '#6B7280',
        }
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
        labels: {
          color: '#6B7280',
          font: {
            family: 'Inter, sans-serif',
          },
          usePointStyle: true,
          padding: 20,
        }
      },
    },
  };
  
  // Refresh history data
  const refreshHistory = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setHistoryItems(generateMockHistory(10));
      setIsRefreshing(false);
    }, 800);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View your detection history and statistics
          </p>
        </motion.div>
        
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span className="text-sm text-gray-500 dark:text-gray-400">Time Range:</span>
          <div className="inline-flex rounded-md shadow-sm">
            {['7d', '30d', '3m', 'all'].map((range, index) => (
              <motion.button
                key={range}
                type="button"
                className={`px-3 py-1.5 text-xs font-medium ${
                  index === 0 ? 'rounded-l-md' : ''
                } ${
                  index === 3 ? 'rounded-r-md' : ''
                } border ${
                  timeRange === range
                    ? 'bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/30 dark:to-violet-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
                }`}
                onClick={() => setTimeRange(range)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {range === '7d' ? '7 Days' : 
                 range === '30d' ? '30 Days' : 
                 range === '3m' ? '3 Months' : 'All Time'}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Scans"
          value={dashboardStats.totalScans}
          icon={<Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
          description="Media files analyzed"
          delay={0.2}
        />
        <StatCard 
          title="Deepfakes Detected"
          value={dashboardStats.detectedDeepfakes}
          icon={<AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />}
          description={`${Math.round((dashboardStats.detectedDeepfakes / dashboardStats.totalScans) * 100)}% of all scans`}
          trending="up"
          delay={0.3}
        />
        <StatCard 
          title="Authentic Content"
          value={dashboardStats.authenticContent}
          icon={<Check className="h-6 w-6 text-green-600 dark:text-green-400" />}
          description={`${Math.round((dashboardStats.authenticContent / dashboardStats.totalScans) * 100)}% of all scans`}
          delay={0.4}
        />
        <StatCard 
          title="Detection Rate"
          value={`${Math.round(dashboardStats.detectionRate * 100)}%`}
          icon={<BarChart2 className="h-6 w-6 text-violet-600 dark:text-violet-400" />}
          description="Overall confidence"
          delay={0.5}
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <Card className="h-full">
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
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="h-full">
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
        </motion.div>
      </div>
      
      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
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
                icon={<RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />}
                onClick={refreshHistory}
                disabled={isRefreshing}
              >
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                    <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300 rounded-tl-lg">File</th>
                    <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Type</th>
                    <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Date</th>
                    <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Result</th>
                    <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Confidence</th>
                    <th className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300 rounded-tr-lg">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {historyItems.map((item) => (
                    <motion.tr 
                      key={item.id} 
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
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
                        <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                          View
                        </Button>
                      </td>
                    </motion.tr>
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
      </motion.div>
      
      {/* Common Manipulations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Common Manipulations</CardTitle>
            <CardDescription>Types of deepfake manipulations detected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardStats.commonManipulations.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="w-32 sm:w-48 shrink-0 text-sm text-gray-700 dark:text-gray-300">
                    {item.type}
                  </div>
                  <div className="w-full ml-4">
                    <div className="flex items-center">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-violet-500"
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
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

const StatCard = ({ title, value, icon, description, trending, delay = 0 }) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
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
    </motion.div>
  );
};

export default DashboardPage;