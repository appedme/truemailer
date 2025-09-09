# Extending TRPC API

## Adding New Procedures

To add new API endpoints to your TRPC router, follow these steps:

### 1. Define the Procedure in the Router

In `apps/server/src/routers/index.ts`:

```typescript
import {
  protectedProcedure, publicProcedure,
  router,
} from "../lib/trpc";
import { z } from "zod";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  
  // Example of a public procedure with input validation
  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      // Implementation here
      return { id: input.id, name: "John Doe" };
    }),
  
  // Example of a protected procedure
  updateUser: protectedProcedure
    .input(z.object({ 
      id: z.string(),
      name: z.string().optional(),
      email: z.string().email().optional()
    }))
    .mutation(async ({ input, ctx }) => {
      // Implementation here
      // ctx.session.user is available for authenticated user
      return { success: true };
    }),
    
  // Example of a procedure with database access
  getDashboardData: protectedProcedure
    .query(async ({ ctx }) => {
      // To access database, you would need to add it to the context
      // See "Adding Database Access" section below
      return { 
        userCount: 0,
        // ... other data
      };
    }),
});

export type AppRouter = typeof appRouter;
```

### 2. Use the Procedure in the Frontend

In your frontend components:

```typescript
import { trpc } from "@/utils/trpc";

export default function MyComponent() {
  // Query data
  const { data, isLoading } = trpc.getUserById.useQuery({ id: "123" });
  
  // Mutate data
 const mutation = trpc.updateUser.useMutation();
  
  const handleUpdate = () => {
    mutation.mutate({
      id: "123",
      name: "New Name"
    }, {
      onSuccess: () => {
        // Handle success
      },
      onError: (error) => {
        // Handle error
      }
    });
  };
  
  return (
    // JSX here
  );
}
```

### 3. Adding Database Access to Context

To add database access to your procedures, modify `apps/server/src/lib/context.ts`:

```typescript
import type { Context as HonoContext } from "hono";
import { auth } from "./auth";
import { db } from "../db"; // Import your database instance

export type CreateContextOptions = {
  context: HonoContext;
};

export async function createContext({ context }: CreateContextOptions) {
  const session = await auth.api.getSession({
    headers: context.req.raw.headers,
  });
  
  return {
    session,
    db, // Add database access to context
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
```

Then update your procedures to use the database:

```typescript
// In your router
getUsers: protectedProcedure
  .query(async ({ ctx }) => {
    // Now you can access the database through ctx.db
    // const users = await ctx.db.select().from(usersTable);
    return [];
  }),
```

### 4. Adding Other Services to Context

You can also add other services to the context in a similar way:

```typescript
import type { Context as HonoContext } from "hono";
import { auth } from "./auth";
import { db } from "../db";
import { someService } from "../services/someService";

export type CreateContextOptions = {
  context: HonoContext;
};

export async function createContext({ context }: CreateContextOptions) {
  const session = await auth.api.getSession({
    headers: context.req.raw.headers,
  });
  
  return {
    session,
    db,
    someService, // Add other services
  };
}
```

## Best Practices

1. **Input Validation**: Always use Zod for input validation
2. **Error Handling**: Handle errors appropriately in procedures
3. **Protected vs Public**: Use `protectedProcedure` for authenticated endpoints
4. **Type Safety**: Leverage TRPC's type safety for end-to-end type checking
5. **Database Access**: Use the context to access database and other services
6. **Context Enrichment**: Add services and utilities to the context rather than importing them directly in procedures