import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Mail, Shield, TrendingUp, Zap } from 'lucide-react';

interface StatsOverviewProps {
  monthlyUsage: number;
  monthlyLimit: number;
  plan: string;
  accuracyRate: number;
  responseTime: string;
}

export function StatsOverview({ 
  monthlyUsage, 
  monthlyLimit, 
  plan, 
  accuracyRate, 
  responseTime 
}: StatsOverviewProps) {
  const usagePercentage = (monthlyUsage / monthlyLimit) * 100;
  
  const stats = [
    {
      title: 'Monthly Usage',
      value: monthlyUsage.toLocaleString(),
      subtitle: `of ${monthlyLimit.toLocaleString()} validations`,
      icon: Mail,
      color: 'text-blue-600',
      progress: usagePercentage,
    },
    {
      title: 'Current Plan',
      value: plan.toUpperCase(),
      subtitle: 'Public Preview',
      icon: Shield,
      color: 'text-green-600',
      badge: 'FREE',
    },
    {
      title: 'Accuracy Rate',
      value: `${accuracyRate}%`,
      subtitle: 'Real-time detection',
      icon: TrendingUp,
      color: 'text-purple-600',
    },
    {
      title: 'Response Time',
      value: responseTime,
      subtitle: 'Global CDN',
      icon: Zap,
      color: 'text-yellow-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            {stat.progress !== undefined && (
              <Progress value={stat.progress} className="mt-3" />
            )}
            {stat.badge && (
              <Badge variant="secondary" className="mt-2">
                {stat.badge}
              </Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}