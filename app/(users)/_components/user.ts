'use server'

import { useUser } from '@clerk/nextjs';

      // Get the userId from clerk
      const { user } = useUser();
      export const userId = user?.id;