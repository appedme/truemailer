import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Copy, Play, Key, BookOpen } from 'lucide-react';
import { useState } from 'react';

interface ApiTestCardProps {
  hasApiKey: boolean;
  onCreateApiKey: () => void;
}

export function ApiTestCard({ hasApiKey, onCreateApiKey }: ApiTestCardProps) {
  const [testEmail, setTestEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleTest = async () => {
    if (!testEmail || !hasApiKey) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResult({
        email: testEmail,
        valid: !testEmail.includes('tempmail'),
        disposable: testEmail.includes('tempmail'),
        confidence: 0.95,
        response_time_ms: 45
      });
      setIsLoading(false);
    }, 1000);
  };

  const curlCommand = `curl -X POST https://truemailer.unstory.app/api/v1/validate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "${testEmail || 'test@example.com'}"}'`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5" />
          API Testing
        </CardTitle>
        <CardDescription>Test email validation instantly</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Test */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="test-email">Test Email</Label>
            <div className="flex gap-2">
              <Input
                id="test-email"
                placeholder="Enter email to validate"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                disabled={!hasApiKey}
              />
              <Button 
                onClick={handleTest} 
                disabled={!testEmail || !hasApiKey || isLoading}
                size="sm"
              >
                {isLoading ? 'Testing...' : 'Test'}
              </Button>
            </div>
          </div>

          {!hasApiKey && (
            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800 mb-2">
                You need an API key to test email validation
              </p>
              <Button onClick={onCreateApiKey} size="sm" variant="outline">
                <Key className="h-4 w-4 mr-2" />
                Create API Key
              </Button>
            </div>
          )}

          {result && (
            <div className="p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Result:</span>
                <Badge variant={result.valid ? 'default' : 'destructive'}>
                  {result.confidence * 100}% confidence
                </Badge>
              </div>
              <div className="space-y-1 text-sm">
                <p>Email: {result.email}</p>
                <p>Valid: {result.valid ? 'Yes' : 'No'}</p>
                <p>Disposable: {result.disposable ? 'Yes' : 'No'}</p>
                <p>Response Time: {result.response_time_ms}ms</p>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* cURL Example */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>cURL Example</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigator.clipboard.writeText(curlCommand)}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
              {curlCommand}
            </pre>
          </div>
        </div>

        <Separator />

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            <BookOpen className="h-4 w-4 mr-2" />
            Documentation
          </Button>
          <Button variant="outline" className="flex-1">
            <Key className="h-4 w-4 mr-2" />
            Manage Keys
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}