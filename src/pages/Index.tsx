
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Database, 
  FileText, 
  ChartBar, 
  Search, 
  Upload, 
  Shield, 
  ArrowRight, 
  CheckCircle2,
  Code
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [activeSection, setActiveSection] = useState('database');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white border-b py-4 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6 text-brand-600" />
            <h1 className="text-xl font-bold">ReportFlow</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium">Features</a>
            <a href="#how-it-works" className="text-sm font-medium">How It Works</a>
            <a href="#pricing" className="text-sm font-medium">Pricing</a>
          </div>
          
          <div className="flex items-center gap-3">
            <Link to="/connections">
              <Button variant="outline">Get Started</Button>
            </Link>
            <Link to="/">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="py-20 px-8 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Transform Your Data into <span className="animated-gradient-text">Actionable Insights</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              A powerful analytics platform that connects to your data sources, transforms raw data, and creates beautiful reports with AI-powered insights.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/connections">
                <Button size="lg" className="gap-2">
                  Connect Your Data <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/import">
                <Button size="lg" variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" /> Upload CSV
                </Button>
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-16 bg-white rounded-xl shadow-xl overflow-hidden border"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="ReportFlow Dashboard" 
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ReportFlow combines data connectivity, transformation capabilities, and AI-powered insights to streamline your analytics workflow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Database className="h-8 w-8 text-brand-600" />,
                title: "Database Connections",
                description: "Connect to any SQL database, including PostgreSQL, MySQL, Oracle, and MS SQL Server."
              },
              {
                icon: <Upload className="h-8 w-8 text-brand-600" />,
                title: "CSV/Excel Import",
                description: "Upload your spreadsheets and CSV files for immediate analysis and transformation."
              },
              {
                icon: <Search className="h-8 w-8 text-brand-600" />,
                title: "Natural Language Queries",
                description: "Use plain English to query your data with our AI-powered translation to SQL."
              },
              {
                icon: <ChartBar className="h-8 w-8 text-brand-600" />,
                title: "Interactive Dashboards",
                description: "Create beautiful visualizations and interactive dashboards from your data."
              },
              {
                icon: <FileText className="h-8 w-8 text-brand-600" />,
                title: "Scheduled Reports",
                description: "Automate report generation and distribution on your preferred schedule."
              },
              {
                icon: <Shield className="h-8 w-8 text-brand-600" />,
                title: "Enterprise Security",
                description: "Keep your data secure with role-based access control and data encryption."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg p-8 border shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-brand-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ReportFlow streamlines your data workflow from connection to insights in just a few steps.
            </p>
          </div>
          
          <div>
            <Tabs 
              defaultValue={activeSection}
              onValueChange={setActiveSection}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="database">Connect</TabsTrigger>
                <TabsTrigger value="transform">Transform</TabsTrigger>
                <TabsTrigger value="analyze">Analyze</TabsTrigger>
                <TabsTrigger value="share">Share</TabsTrigger>
              </TabsList>
              
              <div className="mt-8">
                <TabsContent value="database" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Connect to Your Data</h3>
                    <p className="text-gray-600 mb-6">
                      Easily connect to any database or upload your CSV files. Our platform supports all major database engines and file formats.
                    </p>
                    <ul className="space-y-3">
                      {['PostgreSQL', 'MySQL', 'Oracle', 'Microsoft SQL Server', 'CSV/Excel Upload'].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg border shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80" 
                      alt="Database Connection" 
                      className="rounded-lg w-full h-auto object-cover"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="transform" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Transform Your Data</h3>
                    <p className="text-gray-600 mb-6">
                      Clean, normalize, and prepare your data for analysis. Our ETL tools make it easy to handle complex transformations.
                    </p>
                    <ul className="space-y-3">
                      {['Data cleaning and normalization', 'Column mapping and renaming', 'Data type conversion', 'Handle missing values', 'Remove duplicates'].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg border shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1599658880436-c61792e70672?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                      alt="Data Transformation" 
                      className="rounded-lg w-full h-auto object-cover"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="analyze" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Analyze with AI Power</h3>
                    <p className="text-gray-600 mb-6">
                      Use natural language or SQL to query your data. Our AI assistant helps you build complex queries without SQL expertise.
                    </p>
                    <ul className="space-y-3">
                      {['Natural language to SQL', 'Interactive visualizations', 'AI-powered insights', 'Anomaly detection', 'Trend analysis'].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg border shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80" 
                      alt="Data Analysis" 
                      className="rounded-lg w-full h-auto object-cover"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="share" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Share Your Insights</h3>
                    <p className="text-gray-600 mb-6">
                      Create reports, share dashboards, and export your findings in multiple formats to collaborate with your team.
                    </p>
                    <ul className="space-y-3">
                      {['PDF, Excel, CSV exports', 'Scheduled email reports', 'Interactive dashboard sharing', 'Embeddable visuals', 'Team collaboration'].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg border shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                      alt="Report Sharing" 
                      className="rounded-lg w-full h-auto object-cover"
                    />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-8 bg-brand-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Data?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Start connecting your data sources and create powerful insights in minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/connections">
              <Button size="lg" variant="default" className="bg-white text-brand-600 hover:bg-gray-100 gap-2">
                Get Started Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-brand-500">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Database className="h-6 w-6 text-brand-400" />
                <h3 className="text-xl font-bold">ReportFlow</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Transform your data into actionable insights with our powerful analytics platform.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Case Studies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Testimonials</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API Reference</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2023 ReportFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
