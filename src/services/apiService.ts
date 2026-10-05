// API Service to communicate with Node.js & Express.js backend and MongoDB/MySQL database

export interface StackInfo {
  system: string;
  frontend: {
    canvas: string;
    framework: string;
    styling: string;
  };
  backend: {
    runtime: string;
    framework: string;
    architecture: string;
  };
  database: {
    supported: string[];
    activeDriver: string;
    preferred: 'mongodb' | 'mysql';
    connected: boolean;
    engineDetails: string;
    collectionsOrTables: {
      users: number;
      orders: number;
      measurements: number;
      fabrics: number;
      configs: number;
    };
    message: string;
  };
}

export const apiService = {
  async getStackInfo(): Promise<StackInfo | null> {
    try {
      const res = await fetch('/api/stack-info');
      if (!res.ok) return null;
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[API Service] getStackInfo error:', err);
      return null;
    }
  },

  async getDbStatus() {
    try {
      const res = await fetch('/api/db/status');
      if (!res.ok) return null;
      const data = await res.json();
      return data.status;
    } catch (err) {
      console.warn('[API Service] getDbStatus error:', err);
      return null;
    }
  },

  async switchDbType(type: 'mongodb' | 'mysql') {
    try {
      const res = await fetch('/api/db/switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.status;
    } catch (err) {
      console.warn('[API Service] switchDbType error:', err);
      return null;
    }
  },

  async getExportSql(): Promise<string> {
    const res = await fetch('/api/db/export/sql');
    return res.text();
  },

  async getExportMongo(): Promise<string> {
    const res = await fetch('/api/db/export/mongo');
    return res.text();
  },

  async fetchOrders(customerId?: string) {
    try {
      const url = customerId ? `/api/orders?customerId=${encodeURIComponent(customerId)}` : '/api/orders';
      const res = await fetch(url);
      if (!res.ok) return null;
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[API Service] fetchOrders error:', err);
      return null;
    }
  },

  async createOrder(orderPayload: any) {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[API Service] createOrder error:', err);
      return null;
    }
  },

  async updateOrderStage(orderId: string, stage: string, status?: string) {
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}/stage`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage, status }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[API Service] updateOrderStage error:', err);
      return null;
    }
  },

  async fetchMeasurements(userId: string) {
    try {
      const res = await fetch(`/api/measurements/${encodeURIComponent(userId)}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[API Service] fetchMeasurements error:', err);
      return null;
    }
  },

  async saveMeasurements(userId: string, measurementsData: any) {
    try {
      const res = await fetch(`/api/measurements/${encodeURIComponent(userId)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(measurementsData),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.warn('[API Service] saveMeasurements error:', err);
      return null;
    }
  },
};
