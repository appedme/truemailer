import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, Clock, ExternalLink } from 'lucide-react';

interface ValidationResult {
  id: string;
  email: string;
  domain: string;
  isValid: boolean;
  isDisposable: boolean;
  confidence: number;
  createdAt: Date;
  responseTime?: number;
}

interface RecentValidationsProps {
  validations: ValidationResult[];
  isLoading?: boolean;
}

export function RecentValidations({ validations, isLoading }: RecentValidationsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Validations</CardTitle>
          <CardDescription>Loading validation history...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-4 w-4 bg-muted rounded-full animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Validations</CardTitle>
          <CardDescription>Your latest email validation results</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          <ExternalLink className="h-4 w-4 mr-2" />
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {validations.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No validations yet</p>
            <p className="text-sm text-muted-foreground">Start by creating an API key</p>
          </div>
        ) : (
          <div className="space-y-4">
            {validations.slice(0, 5).map((validation) => (
              <div key={validation.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {validation.isValid ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{validation.email}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-muted-foreground">
                        {validation.isDisposable ? 'Disposable' : validation.isValid ? 'Valid' : 'Invalid'}
                      </p>
                      {validation.responseTime && (
                        <>
                          <span className="text-xs text-muted-foreground">•</span>
                          <p className="text-xs text-muted-foreground">
                            {validation.responseTime}ms
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={validation.isValid ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {Math.round(validation.confidence * 100)}%
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(validation.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}