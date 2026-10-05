import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { dbService } from './src/server/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  // Body parser middlewares
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Initialize Database Service (MongoDB & MySQL)
  await dbService.initialize();

  // =========================================================================
  // BACKEND REST API ROUTES (NODE.JS & EXPRESS.JS)
  // =========================================================================

  // 1. Tech Stack & Architecture Information
  app.get('/api/stack-info', (req, res) => {
    const dbStatus = dbService.getStatus();
    res.json({
      success: true,
      data: {
        system: 'Bespoke Suit Couture Web System',
        frontend: {
          canvas: 'HTML5 Canvas 2D Context API (Bespoke Suit & Trousers Realtime Engine)',
          framework: 'JavaScript (ES6+) / React.js 19 + TypeScript',
          styling: 'Tailwind CSS v4',
        },
        backend: {
          runtime: `Node.js ${process.version}`,
          framework: 'Express.js v4',
          architecture: 'RESTful API Services',
        },
        database: {
          supported: ['MongoDB', 'MySQL'],
          activeDriver: dbStatus.activeType,
          preferred: dbStatus.preferredType,
          connected: dbStatus.connected,
          engineDetails: dbStatus.details.engine,
          collectionsOrTables: dbStatus.counts,
          message: dbStatus.message,
        },
      },
    });
  });

  // 2. Database Status & Switch API
  app.get('/api/db/status', (req, res) => {
    res.json({ success: true, status: dbService.getStatus() });
  });

  app.post('/api/db/switch', (req, res) => {
    const { type } = req.body;
    if (type === 'mongodb' || type === 'mysql') {
      const updatedStatus = dbService.switchPreferredType(type);
      return res.json({ success: true, status: updatedStatus });
    }
    res.status(400).json({ success: false, message: 'Invalid DB type. Must be "mongodb" or "mysql"' });
  });

  // 3. Database Schema Exports (SQL & MongoDB)
  app.get('/api/db/export/sql', (req, res) => {
    try {
      const sqlPath = path.join(__dirname, 'src', 'server', 'schema.sql');
      const content = fs.readFileSync(sqlPath, 'utf-8');
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.send(content);
    } catch (err) {
      res.status(500).json({ success: false, error: 'Could not read SQL schema' });
    }
  });

  app.get('/api/db/export/mongo', (req, res) => {
    try {
      const mongoPath = path.join(__dirname, 'src', 'server', 'schema.mongo.js');
      const content = fs.readFileSync(mongoPath, 'utf-8');
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.send(content);
    } catch (err) {
      res.status(500).json({ success: false, error: 'Could not read MongoDB schema' });
    }
  });

  // 4. Orders CRUD API (MongoDB collection 'orders' / MySQL table 'orders')
  app.get('/api/orders', async (req, res) => {
    try {
      const { customerId } = req.query;
      const orders = await dbService.getOrders(customerId as string | undefined);
      res.json({ success: true, data: orders });
    } catch (err) {
      res.status(500).json({ success: false, error: (err as Error).message });
    }
  });

  app.get('/api/orders/:id', async (req, res) => {
    try {
      const order = await dbService.getOrderById(req.params.id);
      if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
      res.json({ success: true, data: order });
    } catch (err) {
      res.status(500).json({ success: false, error: (err as Error).message });
    }
  });

  app.post('/api/orders', async (req, res) => {
    try {
      const newOrder = await dbService.createOrder(req.body);
      res.status(201).json({ success: true, data: newOrder });
    } catch (err) {
      res.status(500).json({ success: false, error: (err as Error).message });
    }
  });

  app.patch('/api/orders/:id/stage', async (req, res) => {
    try {
      const { stage, status } = req.body;
      const updated = await dbService.updateOrderStage(req.params.id, stage, status);
      if (!updated) return res.status(404).json({ success: false, message: 'Order not found' });
      res.json({ success: true, data: updated });
    } catch (err) {
      res.status(500).json({ success: false, error: (err as Error).message });
    }
  });

  // 5. Body Measurements API (MongoDB collection 'measurements' / MySQL table 'body_measurements')
  app.get('/api/measurements/:userId', async (req, res) => {
    try {
      const measurements = await dbService.getMeasurements(req.params.userId);
      res.json({ success: true, data: measurements });
    } catch (err) {
      res.status(500).json({ success: false, error: (err as Error).message });
    }
  });

  app.put('/api/measurements/:userId', async (req, res) => {
    try {
      const saved = await dbService.saveMeasurements(req.params.userId, req.body);
      res.json({ success: true, data: saved });
    } catch (err) {
      res.status(500).json({ success: false, error: (err as Error).message });
    }
  });

  // 6. User Accounts API (MongoDB collection 'users' / MySQL table 'users')
  app.get('/api/accounts', async (req, res) => {
    try {
      const accounts = await dbService.getAccounts();
      res.json({ success: true, data: accounts });
    } catch (err) {
      res.status(500).json({ success: false, error: (err as Error).message });
    }
  });

  app.post('/api/accounts', async (req, res) => {
    try {
      const newAccount = await dbService.createAccount(req.body);
      res.status(201).json({ success: true, data: newAccount });
    } catch (err) {
      res.status(500).json({ success: false, error: (err as Error).message });
    }
  });

  // 7. Saved Suit Customizations (Configurator)
  app.get('/api/config/:userId', async (req, res) => {
    try {
      const config = await dbService.getSuitConfig(req.params.userId);
      res.json({ success: true, data: config });
    } catch (err) {
      res.status(500).json({ success: false, error: (err as Error).message });
    }
  });

  app.post('/api/config/:userId', async (req, res) => {
    try {
      const result = await dbService.saveSuitConfig(req.params.userId, req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      res.status(500).json({ success: false, error: (err as Error).message });
    }
  });

  // =========================================================================
  // FRONTEND INTEGRATION: VITE MIDDLEWARE (DEV) OR STATIC FILES (PROD)
  // =========================================================================
  if (isProd && fs.existsSync(path.join(__dirname, 'dist'))) {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Bespoke Server] Node.js & Express.js server running at http://0.0.0.0:${PORT}`);
    console.log(`[Bespoke Server] Frontend: HTML5 Canvas API + React.js (ES6+)`);
    console.log(`[Bespoke Server] Database: MongoDB / MySQL Adapter Ready`);
  });
}

startServer().catch((err) => {
  console.error('[Bespoke Server] Failed to start:', err);
  process.exit(1);
});
