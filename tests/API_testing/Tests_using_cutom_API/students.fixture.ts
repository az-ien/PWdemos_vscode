import { test as base, APIRequestContext } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Tell TS we will have a seeded student object available
type MyFixtures = {
  student: { id: number; name: string; location: string; phone: number; courses: [] };
};

export const test = base.extend<MyFixtures>({
  // This runs before tests that use `student`
  student: async ({ request }: { request: APIRequestContext }, use) => {
    // Read JSON for students
    const filePath = path.join(__dirname, 'students.json');
    const datafromjsonfile = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Make it available to tests
    await use(datafromjsonfile);
  }
});

export { expect } from '@playwright/test';