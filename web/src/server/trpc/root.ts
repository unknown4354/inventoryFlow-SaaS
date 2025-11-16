import { router } from './trpc';
import { inventoryRouter } from '../routers/inventory';
import { warehouseRouter } from '../routers/warehouse';
import { clientRouter } from '../routers/client';
import { projectRouter } from '../routers/project';
import { checkoutRouter } from '../routers/checkout';

export const appRouter = router({
  inventory: inventoryRouter,
  warehouse: warehouseRouter,
  client: clientRouter,
  project: projectRouter,
  checkout: checkoutRouter,
});

export type AppRouter = typeof appRouter;
