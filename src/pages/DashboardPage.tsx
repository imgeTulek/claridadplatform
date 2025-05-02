
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  Download, 
  Share2, 
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Database,
  FileText,
  Settings
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const sampleTimeData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 1000 },
];

const pieData = [
  { name: 'Desktop', value: 400 },
  { name: 'Mobile', value: 300 },
  { name: 'Tablet', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-1">Analytics Dashboard</h1>
            <p className="text-gray-500">Overview of your data analytics</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" /> Share
            </Button>
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" /> New Dashboard
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex flex-col space-y-0">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <CardDescription>All registered users</CardDescription>
              </div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25,431</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" /> +12.3%
                </span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex flex-col space-y-0">
                <CardTitle className="text-sm font-medium">Data Sources</CardTitle>
                <CardDescription>Active connections</CardDescription>
              </div>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" /> +2
                </span> new sources this month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex flex-col space-y-0">
                <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </div>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600 flex items-center gap-1">
                  <ArrowDownRight className="h-3 w-3" /> -4.5%
                </span> from previous period
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>User signups over time</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={sampleTimeData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Device Distribution</CardTitle>
                  <CardDescription>User devices breakdown</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Reports generated in the last 30 days</CardDescription>
              </div>
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" /> View All Reports
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left font-medium">Report Name</th>
                    <th className="px-4 py-3 text-left font-medium">Created By</th>
                    <th className="px-4 py-3 text-left font-medium">Date</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b">
                      <td className="px-4 py-3">
                        <div className="font-medium">Monthly Sales Report {i + 1}</div>
                        <div className="text-xs text-muted-foreground">
                          {i % 2 === 0 ? 'Financial Analysis' : 'User Engagement'}
                        </div>
                      </td>
                      <td className="px-4 py-3">User {i + 1}</td>
                      <td className="px-4 py-3">2023-0{i + 1}-15</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          i % 3 === 0 
                            ? 'bg-green-100 text-green-800' 
                            : i % 3 === 1 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'In Progress' : 'Scheduled'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
