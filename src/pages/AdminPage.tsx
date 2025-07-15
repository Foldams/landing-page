import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { migrateSubscribersToSupabase, hasLocalSubscribers, getLocalSubscribersCount } from "@/utils/migrateSubscribers";

interface Subscriber {
  id: string;
  email: string;
  source: string;
  created_at: string;
}

export default function AdminPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [migrationStatus, setMigrationStatus] = useState<{
    inProgress: boolean;
    migrated: number;
    errors: number;
    message: string;
  }>({
    inProgress: false,
    migrated: 0,
    errors: 0,
    message: "",
  });
  const [localCount, setLocalCount] = useState(0);
  const [hasLocal, setHasLocal] = useState(false);

  // Fetch subscribers from Supabase
  const fetchSubscribers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('app_756f9e3ca9454cb782f1af778d02d691_subscribers')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setSubscribers(data || []);
    } catch (e: Error) {
      console.error('Error fetching subscribers:', e);
      setError(e.message || 'Failed to fetch subscribers');
    } finally {
      setLoading(false);
    }
  };

  // Check for local subscribers
  const checkLocalSubscribers = () => {
    try {
      const hasSubscribers = hasLocalSubscribers();
      const count = hasSubscribers ? getLocalSubscribersCount() : 0;
      setHasLocal(hasSubscribers);
      setLocalCount(count);
    } catch (e) {
      console.error('Error checking local subscribers:', e);
    }
  };

  // Handle migration of subscribers from localStorage to Supabase
  const handleMigration = async () => {
    setMigrationStatus({
      inProgress: true,
      migrated: 0,
      errors: 0,
      message: "Migration in progress...",
    });
    
    try {
      const result = await migrateSubscribersToSupabase();
      
      setMigrationStatus({
        inProgress: false,
        migrated: result.migrated,
        errors: result.errors,
        message: `Migration complete! ${result.migrated} subscribers migrated with ${result.errors} errors.`,
      });
      
      // Refresh the subscriber list and local count
      fetchSubscribers();
      checkLocalSubscribers();
    } catch (e: Error) {
      setMigrationStatus({
        inProgress: false,
        migrated: 0,
        errors: 0,
        message: `Migration failed: ${e.message || 'Unknown error'}`,
      });
    }
  };

  useEffect(() => {
    fetchSubscribers();
    checkLocalSubscribers();
    
    // Set up interval to refresh data every minute
    const interval = setInterval(() => {
      fetchSubscribers();
      checkLocalSubscribers();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Newsletter Admin</h1>
          <p className="text-gray-500">Manage newsletter subscribers and migrations</p>
        </div>
        <div className="flex items-center gap-4">
          {hasLocal && (
            <Button 
              variant="default" 
              onClick={handleMigration}
              disabled={migrationStatus.inProgress || localCount === 0}
            >
              {migrationStatus.inProgress ? "Migrating..." : `Migrate ${localCount} Local Subscribers`}
            </Button>
          )}
          <Button 
            variant="outline" 
            onClick={() => {
              fetchSubscribers();
              checkLocalSubscribers();
            }}
          >
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Migration status card */}
      {migrationStatus.message && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Migration Status</CardTitle>
            <CardDescription>Status of localStorage to Supabase migration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>{migrationStatus.message}</p>
              {(migrationStatus.migrated > 0 || migrationStatus.errors > 0) && (
                <div className="flex gap-4 mt-2">
                  <Badge variant="success" className="bg-green-600">
                    {migrationStatus.migrated} Migrated
                  </Badge>
                  {migrationStatus.errors > 0 && (
                    <Badge variant="destructive">
                      {migrationStatus.errors} Errors
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="subscribers">
        <TabsList className="mb-6">
          <TabsTrigger value="subscribers">Subscribers ({subscribers.length})</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subscribers">
          <Card>
            <CardHeader>
              <CardTitle>All Subscribers</CardTitle>
              <CardDescription>List of all newsletter subscribers</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-8 text-center">Loading subscribers...</div>
              ) : error ? (
                <div className="py-8 text-center text-red-500">{error}</div>
              ) : subscribers.length === 0 ? (
                <div className="py-8 text-center">No subscribers found</div>
              ) : (
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {subscribers.map((subscriber) => (
                        <tr key={subscriber.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subscriber.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <Badge variant="outline">{subscriber.source || 'unknown'}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(subscriber.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="text-sm text-gray-500">
                Showing {subscribers.length} subscribers
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="sources">
          <Card>
            <CardHeader>
              <CardTitle>Subscriber Sources</CardTitle>
              <CardDescription>Breakdown of subscribers by source</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-8 text-center">Loading data...</div>
              ) : error ? (
                <div className="py-8 text-center text-red-500">{error}</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from(new Set(subscribers.map(s => s.source || 'unknown'))).map(source => {
                    const count = subscribers.filter(s => (s.source || 'unknown') === source).length;
                    const percentage = subscribers.length > 0 ? Math.round((count / subscribers.length) * 100) : 0;
                    
                    return (
                      <div key={source} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{source}</h3>
                          <Badge>{count}</Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{percentage}% of total</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}