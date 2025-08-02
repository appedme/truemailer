import { getCurrentUser } from '@/lib/auth';
import { getUserById } from '@/lib/db/queries';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/handler/sign-in');
  }

  // Get user data from database
  const dbUser = await getUserById(user.id);
  const userData = dbUser[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {userData?.displayName || user.displayName || 'User'}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your TrueMailer account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{userData?.email || user.primaryEmail}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Plan</p>
              <Badge variant={userData?.plan === 'free' ? 'secondary' : 'default'}>
                {userData?.plan?.toUpperCase() || 'FREE'}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium">Status</p>
              <Badge variant={userData?.isActive ? 'default' : 'destructive'}>
                {userData?.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Usage Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
            <CardDescription>Your monthly email validation usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Validations Used</p>
              <p className="text-2xl font-bold">{userData?.emailValidationsUsed || 0}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Monthly Limit</p>
              <p className="text-sm text-muted-foreground">{userData?.emailValidationsLimit || 1000}</p>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ 
                  width: `${Math.min(((userData?.emailValidationsUsed || 0) / (userData?.emailValidationsLimit || 1000)) * 100, 100)}%` 
                }}
              ></div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your TrueMailer account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="outline">
              View API Keys
            </Button>
            <Button className="w-full" variant="outline">
              Usage Analytics
            </Button>
            <Button className="w-full" variant="outline">
              Documentation
            </Button>
            <Button className="w-full">
              Upgrade Plan
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* API Example Card */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>API Example</CardTitle>
          <CardDescription>Test the TrueMailer email validation API</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
{`curl -X POST https://yourdomain.com/api/v1/validate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "test@example.com"}'`}
            </pre>
          </div>
          <div className="mt-4">
            <Button>Generate API Key</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}