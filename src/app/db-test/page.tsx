
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { testListUsers } from '@/app/actions/db-test';
import type { User } from '@/lib/types';

export default function DbTestPage() {
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchUsers = async () => {
    setIsLoading(true);
    setResult('Fetching users...');
    const { users, error } = await testListUsers();
    if (error) {
      setResult(`Error: ${error}`);
    } else {
      setResult(JSON.stringify(users, null, 2));
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Database Connection Test Page</CardTitle>
          <CardDescription>
            Use these buttons to test Data Connect queries and mutations. The raw JSON output will be displayed below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-x-4">
            <Button onClick={handleFetchUsers} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Test `listUsers` Query'}
            </Button>
          </div>
          <div>
            <h3 className="font-semibold">Result:</h3>
            <pre className="mt-2 p-4 bg-muted rounded-lg overflow-x-auto text-sm">
              {result || 'Click a button to test a query.'}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
