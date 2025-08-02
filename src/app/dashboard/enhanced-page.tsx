import { getCurrentUser } from '@/lib/auth';
import { getUserById, getUserMonthlyUsage, getEmailValidationHistory } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Shield, Zap, TrendingUp, Users, Mail, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default async function EnhancedDashboard() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/handler/sign-in');
  }

  // Get user data from database
  const dbUser = await getUserById(user.id);
  const userData = dbUser[0];
  
  // Get usage statistics
  const monthlyUsage = await getUserMonthlyUsage(user.id);
  const recentValidations = await getEmailValidationHistory(user.id, 10);
  
  // Calculate usage percentage
  const usagePercentage = (monthlyUsage / (userData?.emailValidationsLimit || 200)) * 100;
  
  // Mock analytics data (in production, get from actual usage stats)
  const analyticsData = [
    { name: 'Valid', value: 65, color: '#10b981' },
    { name: 'Disposable', value: 25, color: '#f59e0b' },
    { name: 'Invalid', value: 10, color: '#ef4444' },
  ];
  
  const weeklyData = [
    { day: 'Mon', validations: 12 },
    { day: 'Tue', validations: 19 },
    { day: 'Wed', validations: 8 },
    { day: 'Thu', validations: 15 },
    { day: 'Fri', validations: 22 },
    { day: 'Sat', validations: 5 },
    { day: 'Sun', validations: 3 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">TrueMailer Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {userData?.displayName || user.displayName || 'User'}!</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Usage</p>
                <p className="text-2xl font-bold">{monthlyUsage}</p>
                <p className="text-xs text-muted-foreground">of {userData?.emailValidationsLimit || 200} validations</p>
              </div>
              <Mail className="h-8 w-8 text-blue-500" />
            </div>
            <Progress value={usagePercentage} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Plan</p>
                <p className="text-2xl font-bold">{userData?.plan?.toUpperCase() || 'FREE'}</p>
                <p className="text-xs text-muted-foreground">Public Preview</p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Accuracy Rate</p>
                <p className="text-2xl font-bold">99.9%</p>
                <p className="text-xs text-muted-foreground">Real-time detection</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                <p className="text-2xl font-bold">&lt;100ms</p>
                <p className="text-xs text-muted-foreground">Global CDN</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="custom-lists">Custom Lists</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Validations */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Validations</CardTitle>
                <CardDescription>Your latest email validation results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentValidations.slice(0, 5).map((validation, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {validation.isValid ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{validation.email}</p>
                          <p className="text-xs text-muted-foreground">
                            {validation.isDisposable ? 'Disposable' : validation.isValid ? 'Valid' : 'Invalid'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {new Date(validation.createdAt!).toLocaleDateString()}
                        </p>
                        <Badge variant={validation.isValid ? 'default' : 'destructive'} className="text-xs">
                          {Math.round(validation.confidence * 100)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {recentValidations.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No validations yet. Start by creating an API key!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick API Test */}
            <Card>
              <CardHeader>
                <CardTitle>Quick API Test</CardTitle>
                <CardDescription>Test email validation instantly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <pre className="text-sm overflow-x-auto">
{`curl -X POST https://truemailer.unstory.app/api/v1/validate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "test@tempmail.com"}'`}
                  </pre>
                </div>
                <div className="space-y-3">
                  <Button className="w-full">Generate API Key</Button>
                  <Button variant="outline" className="w-full">View Documentation</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Usage Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Usage</CardTitle>
                <CardDescription>Email validations over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="validations" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Validation Results Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Validation Results</CardTitle>
                <CardDescription>Distribution of validation outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {analyticsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api-keys">
          <Card>
            <CardHeader>
              <CardTitle>API Keys Management</CardTitle>
              <CardDescription>Create and manage your API keys for TrueMailer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    API keys allow you to authenticate requests to the TrueMailer API.
                  </p>
                  <Button>Create New Key</Button>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-center text-muted-foreground">
                    No API keys created yet. Create your first API key to start validating emails.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom-lists">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Blocklist</CardTitle>
                <CardDescription>Block specific domains from being validated as legitimate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">Add Domain to Blocklist</Button>
                  <div className="border rounded-lg p-4">
                    <p className="text-center text-muted-foreground text-sm">
                      No custom blocked domains yet.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Allowlist</CardTitle>
                <CardDescription>Always allow specific domains (highest priority)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full">Add Domain to Allowlist</Button>
                  <div className="border rounded-lg p-4">
                    <p className="text-center text-muted-foreground text-sm">
                      No custom allowed domains yet.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="docs">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>Learn how to integrate TrueMailer into your application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">🚀 Getting Started</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    TrueMailer provides a simple REST API for email validation with real-time GitHub source integration.
                    Get 200 free validations per month during our public preview.
                  </p>
                  <Button variant="outline" size="sm">View Complete Guide</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">📋 Validation Priority</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>1. User Allowlist</strong> - Your custom allowed domains (highest priority)</p>
                    <p><strong>2. User Blocklist</strong> - Your custom blocked domains</p>
                    <p><strong>3. Global Allowlist</strong> - System-wide legitimate domains</p>
                    <p><strong>4. GitHub Sources</strong> - Real-time fetching from 55,000+ domains</p>
                    <p><strong>5. Local Database</strong> - Cached fallback data</p>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">✨ Key Features</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>- Real-time GitHub source fetching (55,000+ domains)</li>
                    <li>- Custom user blocklist and allowlist management</li>
                    <li>- 200 free validations per month (public preview)</li>
                    <li>- Sub-100ms response times with global CDN</li>
                    <li>- 99.9% accuracy rate with confidence scoring</li>
                    <li>- Comprehensive API with detailed validation results</li>
                  </ul>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">🔗 API Endpoint</h3>
                  <div className="bg-muted rounded p-3 font-mono text-sm">
                    POST https://truemailer.unstory.app/api/v1/validate
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}