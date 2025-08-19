'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '@/lib/firebase';

// This is the correct way to call a Cloud Function from the client
const functions = getFunctions(app, 'europe-west1');
const listUsersFunction = httpsCallable(functions, 'listUsers');

export default function DbTestPage() {
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchUsers = async () => {
    setIsLoading(true);
    setResult('Calling Cloud Function to fetch users...');
    try {
      const response = await listUsersFunction();
      const users = response.data;
      setResult(JSON.stringify(users, null, 2));
    } catch (error: any) {
       console.error("Error calling cloud function:", error);
       setResult(`Error: ${error.message}. Check the browser and function logs for more details.`);
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Cloud Function Test Page</CardTitle>
          <CardDescription>
            Use this button to test the `listUsers` Cloud Function. The raw JSON output from the function will be displayed below. This demonstrates the secure way to fetch a list of all Firebase Authentication users.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-x-4">
            <Button onClick={handleFetchUsers} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Test `listUsers` Function'}
            </Button>
          </div>
          <div>
            <h3 className="font-semibold">Result:</h3>
            <pre className="mt-2 p-4 bg-muted rounded-lg overflow-x-auto text-sm">
              {result || 'Click the button to test the function.'}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
