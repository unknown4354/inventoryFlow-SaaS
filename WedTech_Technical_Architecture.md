# WedTech SaaS - Complete Technical Architecture
## Multi-Tenant Wedding Management Platform with Web & Mobile Apps

**Author:** V Anant AI  
**Version:** 1.0  
**Date:** November 2025

---

## 🎯 Architecture Overview

### System Design Principles

1. **Multi-Tenancy**: Complete data isolation per customer
2. **Scalability**: Handle 10,000+ concurrent users
3. **Mobile-First**: Offline-capable mobile apps
4. **API-First**: Everything accessible via APIs
5. **Cloud-Native**: Containerized microservices
6. **Security-First**: Enterprise-grade security
7. **Cost-Effective**: Optimize for India pricing

---

## 🏗️ System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         EXTERNAL USERS                               │
├──────────────┬──────────────┬──────────────┬──────────────┬─────────┤
│  Web Users   │ Planner App  │  Client App  │ Coordinator  │  APIs   │
│   (Browser)  │  (iOS/And.)  │ (iOS/And.)   │     App      │ (3rd)   │
└──────┬───────┴──────┬───────┴──────┬───────┴──────┬───────┴────┬────┘
       │              │              │              │            │
       └──────────────┴──────────────┴──────────────┴────────────┘
                                     │
                     ┌───────────────┴───────────────┐
                     │   CLOUDFLARE CDN & SECURITY   │
                     │  - DDoS Protection             │
                     │  - Rate Limiting               │
                     │  - SSL/TLS Termination         │
                     │  - Static Asset Delivery       │
                     └───────────────┬───────────────┘
                                     │
       ┌─────────────────────────────┴────────────────────────────┐
       │              LOAD BALANCER (Nginx/HAProxy)                │
       │              - Health Checks                              │
       │              - SSL Termination                            │
       │              - Request Routing                            │
       └─────────────────────────────┬────────────────────────────┘
                                     │
       ┌─────────────────────────────┴────────────────────────────┐
       │                  APPLICATION LAYER                        │
       │  ┌──────────────────────────────────────────────────┐   │
       │  │         WEB APPLICATION (Next.js 15)              │   │
       │  │  - Server-Side Rendering (SSR)                    │   │
       │  │  - Static Site Generation (SSG)                   │   │
       │  │  - API Routes                                     │   │
       │  │  - Real-time Updates (WebSockets)                 │   │
       │  └──────────────────┬───────────────────────────────┘   │
       │                     │                                     │
       │  ┌──────────────────┴───────────────────────────────┐   │
       │  │          API GATEWAY (Fastify + tRPC)             │   │
       │  │  - Type-safe APIs                                 │   │
       │  │  - Authentication & Authorization                 │   │
       │  │  - Request Validation                             │   │
       │  │  - Rate Limiting                                  │   │
       │  │  - Logging & Monitoring                           │   │
       │  └──────────────────┬───────────────────────────────┘   │
       │                     │                                     │
       └─────────────────────┼─────────────────────────────────────┘
                             │
       ┌─────────────────────┴─────────────────────────────┐
       │              BUSINESS LOGIC LAYER                  │
       │  ┌───────────────────────────────────────────┐   │
       │  │  CORE SERVICES (Node.js/TypeScript)        │   │
       │  │                                            │   │
       │  │  ┌──────────────┬──────────────────┐     │   │
       │  │  │ Auth Service │  Tenant Service  │     │   │
       │  │  ├──────────────┼──────────────────┤     │   │
       │  │  │Wedding Svc   │  Client CRM Svc  │     │   │
       │  │  ├──────────────┼──────────────────┤     │   │
       │  │  │ Vendor Svc   │  Financial Svc   │     │   │
       │  │  ├──────────────┼──────────────────┤     │   │
       │  │  │  Task Svc    │   Guest Svc      │     │   │
       │  │  ├──────────────┼──────────────────┤     │   │
       │  │  │Inventory Svc │ Notification Svc │     │   │
       │  │  └──────────────┴──────────────────┘     │   │
       │  └───────────────────┬───────────────────────┘   │
       │                      │                            │
       │  ┌───────────────────┴───────────────────────┐   │
       │  │       JOB PROCESSING (BullMQ)             │   │
       │  │  - Background Tasks                       │   │
       │  │  - Email/SMS Sending                      │   │
       │  │  - Report Generation                      │   │
       │  │  - Data Import/Export                     │   │
       │  │  - AI Processing Queue                    │   │
       │  └───────────────────────────────────────────┘   │
       └────────────────────────────────────────────────────┘
                             │
       ┌─────────────────────┴─────────────────────────────┐
       │                  DATA LAYER                        │
       │  ┌───────────────────────────────────────────┐   │
       │  │   POSTGRESQL 16 (Multi-Tenant)            │   │
       │  │   Database per Tenant Architecture        │   │
       │  │                                            │   │
       │  │   tenant_a_db  │ tenant_b_db │ ...        │   │
       │  │   - Weddings   │ - Weddings  │            │   │
       │  │   - Clients    │ - Clients   │            │   │
       │  │   - Vendors    │ - Vendors   │            │   │
       │  │   - ...        │ - ...       │            │   │
       │  │                                            │   │
       │  │   + pgAI Extension (Vector Search)        │   │
       │  │   + Full-Text Search                      │   │
       │  └───────────────────────────────────────────┘   │
       │                                                    │
       │  ┌───────────────────────────────────────────┐   │
       │  │   REDIS CLUSTER (Caching & Sessions)      │   │
       │  │   - Session Storage                       │   │
       │  │   - API Response Cache                    │   │
       │  │   - Job Queue                             │   │
       │  │   - Real-time Data                        │   │
       │  │   - Rate Limiting Counters                │   │
       │  └───────────────────────────────────────────┘   │
       │                                                    │
       │  ┌───────────────────────────────────────────┐   │
       │  │   OBJECT STORAGE (S3/Cloudflare R2)       │   │
       │  │   - User Uploads                          │   │
       │  │   - Documents/Contracts                   │   │
       │  │   - Photos/Videos                         │   │
       │  │   - Generated Reports                     │   │
       │  │   - Backups                               │   │
       │  └───────────────────────────────────────────┘   │
       └────────────────────────────────────────────────────┘
                             │
       ┌─────────────────────┴─────────────────────────────┐
       │              AI & ANALYTICS LAYER                  │
       │  ┌───────────────────────────────────────────┐   │
       │  │   AI SERVICES                             │   │
       │  │                                            │   │
       │  │   Anthropic Claude Sonnet 4 (Primary)     │   │
       │  │   - Natural Language Queries              │   │
       │  │   - Document Processing                   │   │
       │  │   - Smart Recommendations                 │   │
       │  │   - Content Generation                    │   │
       │  │                                            │   │
       │  │   OpenAI (Embeddings)                     │   │
       │  │   - Text Embeddings                       │   │
       │  │   - Similarity Search                     │   │
       │  │   - Classification                        │   │
       │  └───────────────────────────────────────────┘   │
       │                                                    │
       │  ┌───────────────────────────────────────────┐   │
       │  │   ANALYTICS & MONITORING                  │   │
       │  │   - Prometheus (Metrics)                  │   │
       │  │   - Grafana (Visualization)               │   │
       │  │   - Sentry (Error Tracking)               │   │
       │  │   - ELK Stack (Logs)                      │   │
       │  └───────────────────────────────────────────┘   │
       └────────────────────────────────────────────────────┘
                             │
       ┌─────────────────────┴─────────────────────────────┐
       │           EXTERNAL INTEGRATIONS                    │
       │  ┌───────────────────────────────────────────┐   │
       │  │   PAYMENT GATEWAY (Razorpay)              │   │
       │  │   EMAIL SERVICE (SendGrid/AWS SES)        │   │
       │  │   SMS SERVICE (Twilio/MSG91)              │   │
       │  │   WHATSAPP API (Meta/Twilio)              │   │
       │  │   PUSH NOTIFICATIONS (Firebase FCM)       │   │
       │  │   CALENDAR SYNC (Google/Outlook)          │   │
       │  │   ACCOUNTING (Tally/Zoho Books)           │   │
       │  └───────────────────────────────────────────┘   │
       └────────────────────────────────────────────────────┘
```

---

## 🔐 Multi-Tenancy Architecture

### Database-Per-Tenant Model

**Why Database-Per-Tenant?**
- ✅ Complete data isolation
- ✅ Customer-specific backups
- ✅ Easy data export
- ✅ Compliance with data residency
- ✅ Better security posture
- ✅ Flexible scaling per tenant

**Implementation:**

```typescript
// Tenant routing middleware
export async function tenantMiddleware(req: Request, res: Response, next: NextFunction) {
  // Extract tenant from subdomain or custom domain
  const host = req.hostname;
  
  // Examples:
  // veecap.wedtechsaas.com -> tenant: veecap
  // mycustom.com -> lookup custom domain mapping -> tenant: xyz
  
  const tenant = await getTenantFromHost(host);
  
  if (!tenant) {
    return res.status(404).json({ error: 'Tenant not found' });
  }
  
  // Attach tenant to request
  req.tenant = tenant;
  
  // Switch database connection
  req.db = await getPrismaClient(tenant.databaseName);
  
  next();
}

// Dynamic Prisma client creation
const prismaClients = new Map<string, PrismaClient>();

export function getPrismaClient(databaseName: string): PrismaClient {
  if (prismaClients.has(databaseName)) {
    return prismaClients.get(databaseName)!;
  }
  
  const client = new PrismaClient({
    datasources: {
      db: {
        url: `postgresql://user:pass@host:5432/${databaseName}`
      }
    }
  });
  
  prismaClients.set(databaseName, client);
  return client;
}
```

### Tenant Provisioning Flow

```typescript
// When new customer signs up
export async function provisionTenant(data: {
  companyName: string;
  subdomain: string;
  email: string;
  plan: 'starter' | 'professional' | 'premium' | 'enterprise';
}) {
  // 1. Validate subdomain availability
  const existing = await prisma.tenant.findUnique({
    where: { subdomain: data.subdomain }
  });
  
  if (existing) {
    throw new Error('Subdomain already taken');
  }
  
  // 2. Create tenant record in master database
  const tenant = await prisma.tenant.create({
    data: {
      companyName: data.companyName,
      subdomain: data.subdomain,
      databaseName: `tenant_${generateId()}`,
      plan: data.plan,
      status: 'provisioning'
    }
  });
  
  // 3. Create dedicated database
  await createDatabase(tenant.databaseName);
  
  // 4. Run migrations on new database
  await runMigrations(tenant.databaseName);
  
  // 5. Seed initial data
  await seedTenantData(tenant.databaseName, data);
  
  // 6. Create admin user
  const tenantDb = getPrismaClient(tenant.databaseName);
  await tenantDb.user.create({
    data: {
      email: data.email,
      role: 'ADMIN',
      // ... other fields
    }
  });
  
  // 7. Update tenant status
  await prisma.tenant.update({
    where: { id: tenant.id },
    data: { status: 'active' }
  });
  
  // 8. Send welcome email
  await sendWelcomeEmail(data.email, {
    subdomain: data.subdomain,
    loginUrl: `https://${data.subdomain}.wedtechsaas.com`
  });
  
  return tenant;
}
```

---

## 📱 Mobile App Architecture

### React Native Application Structure

```
mobile-app/
├── ios/                    # iOS native code
├── android/                # Android native code
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/        # Buttons, Inputs, etc.
│   │   ├── wedding/       # Wedding-specific components
│   │   ├── client/        # Client-specific components
│   │   └── vendor/        # Vendor-specific components
│   │
│   ├── screens/           # Screen components
│   │   ├── auth/          # Login, Register
│   │   ├── dashboard/     # Home dashboard
│   │   ├── wedding/       # Wedding management
│   │   ├── tasks/         # Task management
│   │   ├── clients/       # Client CRM
│   │   ├── vendors/       # Vendor management
│   │   └── settings/      # App settings
│   │
│   ├── navigation/        # React Navigation setup
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   └── MainNavigator.tsx
│   │
│   ├── services/          # API and data services
│   │   ├── api/           # API client
│   │   ├── auth/          # Authentication
│   │   ├── sync/          # Data synchronization
│   │   └── storage/       # Local storage
│   │
│   ├── store/             # State management (Zustand)
│   │   ├── auth.store.ts
│   │   ├── wedding.store.ts
│   │   ├── task.store.ts
│   │   └── offline.store.ts
│   │
│   ├── database/          # Realm offline database
│   │   ├── schemas/       # Realm schemas
│   │   ├── migrations/    # Database migrations
│   │   └── queries/       # Database queries
│   │
│   ├── utils/            # Utility functions
│   │   ├── date.ts
│   │   ├── format.ts
│   │   ├── validation.ts
│   │   └── permissions.ts
│   │
│   └── config/           # App configuration
│       ├── api.config.ts
│       ├── theme.config.ts
│       └── app.config.ts
│
└── package.json
```

### Offline-First Architecture

**Strategy**: Realm database for local storage with automatic sync

```typescript
// Realm Schema for Wedding (local storage)
import Realm from 'realm';

export class Wedding extends Realm.Object<Wedding> {
  _id!: string;
  name!: string;
  brideName!: string;
  groomName!: string;
  weddingDate!: Date;
  status!: string;
  
  // Sync metadata
  syncStatus!: 'synced' | 'pending' | 'conflict';
  lastSyncedAt?: Date;
  updatedAt!: Date;
  
  static schema: Realm.ObjectSchema = {
    name: 'Wedding',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      name: 'string',
      brideName: 'string',
      groomName: 'string',
      weddingDate: 'date',
      status: 'string',
      syncStatus: { type: 'string', default: 'pending' },
      lastSyncedAt: 'date?',
      updatedAt: 'date'
    }
  };
}

// Offline sync service
export class SyncService {
  private realm: Realm;
  private apiClient: ApiClient;
  
  async syncWeddings() {
    // 1. Get all pending changes from local Realm
    const pendingWeddings = this.realm
      .objects<Wedding>('Wedding')
      .filtered('syncStatus = "pending"');
    
    // 2. Push changes to server
    for (const wedding of pendingWeddings) {
      try {
        await this.apiClient.updateWedding(wedding._id, {
          name: wedding.name,
          brideName: wedding.brideName,
          // ... other fields
        });
        
        // Mark as synced
        this.realm.write(() => {
          wedding.syncStatus = 'synced';
          wedding.lastSyncedAt = new Date();
        });
      } catch (error) {
        console.error('Sync error:', error);
        // Handle conflicts
      }
    }
    
    // 3. Pull changes from server
    const lastSyncTime = await this.getLastSyncTime();
    const serverChanges = await this.apiClient.getWeddingsSince(lastSyncTime);
    
    // 4. Update local database
    this.realm.write(() => {
      for (const change of serverChanges) {
        this.realm.create('Wedding', {
          ...change,
          syncStatus: 'synced',
          lastSyncedAt: new Date()
        }, Realm.UpdateMode.Modified);
      }
    });
  }
}
```

### Push Notifications

```typescript
// Firebase Cloud Messaging setup
import messaging from '@react-native-firebase/messaging';

export class PushNotificationService {
  async requestPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
    if (enabled) {
      console.log('Authorization status:', authStatus);
      await this.getToken();
    }
  }
  
  async getToken() {
    const token = await messaging().getToken();
    // Send token to backend
    await this.apiClient.registerDevice(token);
  }
  
  setupNotificationHandlers() {
    // Foreground notifications
    messaging().onMessage(async remoteMessage => {
      console.log('Foreground notification:', remoteMessage);
      // Show in-app notification
    });
    
    // Background/quit state notifications
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background notification:', remoteMessage);
    });
    
    // Notification tap handler
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open:', remoteMessage);
      // Navigate to relevant screen
    });
  }
}
```

---

## 🔒 Security Architecture

### Authentication Flow

```typescript
// JWT-based authentication with refresh tokens

export interface AuthTokens {
  accessToken: string;   // Short-lived (15 minutes)
  refreshToken: string;  // Long-lived (7 days)
}

// Login flow
export async function login(email: string, password: string): Promise<AuthTokens> {
  // 1. Validate credentials
  const user = await prisma.user.findUnique({
    where: { email },
    include: { tenant: true }
  });
  
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new UnauthorizedError('Invalid credentials');
  }
  
  // 2. Generate tokens
  const accessToken = jwt.sign(
    {
      userId: user.id,
      tenantId: user.tenantId,
      role: user.role
    },
    process.env.JWT_SECRET!,
    { expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    {
      userId: user.id,
      tenantId: user.tenantId
    },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: '7d' }
  );
  
  // 3. Store refresh token
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  });
  
  // 4. Log login
  await prisma.auditLog.create({
    data: {
      userId: user.id,
      tenantId: user.tenantId,
      action: 'USER_LOGIN',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    }
  });
  
  return { accessToken, refreshToken };
}

// Token refresh flow
export async function refreshAccessToken(refreshToken: string): Promise<AuthTokens> {
  // 1. Verify refresh token
  const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
  
  // 2. Check if token exists in database
  const storedToken = await prisma.refreshToken.findUnique({
    where: { token: refreshToken }
  });
  
  if (!storedToken || storedToken.expiresAt < new Date()) {
    throw new UnauthorizedError('Invalid refresh token');
  }
  
  // 3. Generate new tokens
  // ... (similar to login flow)
}
```

### Authorization Middleware

```typescript
// Role-based access control
export enum Permission {
  // Weddings
  WEDDING_VIEW = 'wedding:view',
  WEDDING_CREATE = 'wedding:create',
  WEDDING_EDIT = 'wedding:edit',
  WEDDING_DELETE = 'wedding:delete',
  
  // Clients
  CLIENT_VIEW = 'client:view',
  CLIENT_CREATE = 'client:create',
  CLIENT_EDIT = 'client:edit',
  CLIENT_DELETE = 'client:delete',
  
  // Financial
  FINANCIAL_VIEW = 'financial:view',
  FINANCIAL_CREATE = 'financial:create',
  FINANCIAL_EDIT = 'financial:edit',
  
  // Settings
  SETTINGS_VIEW = 'settings:view',
  SETTINGS_EDIT = 'settings:edit',
  
  // ... other permissions
}

export const rolePermissions: Record<Role, Permission[]> = {
  ADMIN: Object.values(Permission), // All permissions
  PLANNER: [
    Permission.WEDDING_VIEW,
    Permission.WEDDING_EDIT,
    Permission.CLIENT_VIEW,
    Permission.CLIENT_EDIT,
    // ... other planner permissions
  ],
  COORDINATOR: [
    Permission.WEDDING_VIEW,
    Permission.CLIENT_VIEW,
    // ... coordinator permissions
  ],
  CLIENT: [
    Permission.WEDDING_VIEW, // Only their own wedding
  ]
};

// Permission check middleware
export function requirePermission(...permissions: Permission[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userPermissions = rolePermissions[req.user.role];
    
    const hasPermission = permissions.every(p => 
      userPermissions.includes(p)
    );
    
    if (!hasPermission) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'You do not have permission to perform this action'
      });
    }
    
    next();
  };
}

// Usage in routes
router.post(
  '/weddings',
  authenticate,
  requirePermission(Permission.WEDDING_CREATE),
  async (req, res) => {
    // Create wedding
  }
);
```

### Data Encryption

```typescript
// Encryption for sensitive data
import crypto from 'crypto';

export class EncryptionService {
  private algorithm = 'aes-256-gcm';
  private key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');
  
  encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    // Return iv + authTag + encrypted data
    return iv.toString('hex') + authTag.toString('hex') + encrypted;
  }
  
  decrypt(encryptedData: string): string {
    const iv = Buffer.from(encryptedData.slice(0, 32), 'hex');
    const authTag = Buffer.from(encryptedData.slice(32, 64), 'hex');
    const encrypted = encryptedData.slice(64);
    
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}

// Usage in Prisma model
// Store credit card info encrypted
const encryptionService = new EncryptionService();

await prisma.payment.create({
  data: {
    amount: 50000,
    cardLast4: '1234',
    // Encrypt sensitive data
    cardToken: encryptionService.encrypt(cardToken)
  }
});
```

---

## 🚀 Scaling Strategy

### Horizontal Scaling

```yaml
# Kubernetes deployment configuration
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wedtech-api
spec:
  replicas: 3  # Start with 3, auto-scale up to 10
  selector:
    matchLabels:
      app: wedtech-api
  template:
    metadata:
      labels:
        app: wedtech-api
    spec:
      containers:
      - name: api
        image: wedtech/api:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: database-secrets
              key: url
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5

---
# Horizontal Pod Autoscaler
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: wedtech-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: wedtech-api
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### Database Scaling

```typescript
// Read replicas for database scaling
import { PrismaClient } from '@prisma/client';

export class DatabaseService {
  private primaryDb: PrismaClient;
  private replicaDbs: PrismaClient[];
  
  constructor() {
    // Primary database (writes)
    this.primaryDb = new PrismaClient({
      datasources: {
        db: { url: process.env.DATABASE_PRIMARY_URL }
      }
    });
    
    // Read replicas (reads)
    this.replicaDbs = [
      new PrismaClient({
        datasources: {
          db: { url: process.env.DATABASE_REPLICA_1_URL }
        }
      }),
      new PrismaClient({
        datasources: {
          db: { url: process.env.DATABASE_REPLICA_2_URL }
        }
      })
    ];
  }
  
  // Use primary for writes
  async write<T>(operation: (db: PrismaClient) => Promise<T>): Promise<T> {
    return operation(this.primaryDb);
  }
  
  // Use replica for reads (round-robin)
  async read<T>(operation: (db: PrismaClient) => Promise<T>): Promise<T> {
    const replica = this.replicaDbs[
      Math.floor(Math.random() * this.replicaDbs.length)
    ];
    return operation(replica);
  }
}

// Usage
const dbService = new DatabaseService();

// Write operation
await dbService.write(db => 
  db.wedding.create({ data: { name: 'New Wedding' } })
);

// Read operation
const weddings = await dbService.read(db => 
  db.wedding.findMany({ where: { status: 'ACTIVE' } })
);
```

### Caching Strategy

```typescript
// Multi-level caching
import Redis from 'ioredis';

export class CacheService {
  private redis: Redis;
  
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD
    });
  }
  
  // Cache with TTL
  async set(key: string, value: any, ttlSeconds: number = 3600) {
    await this.redis.setex(
      key,
      ttlSeconds,
      JSON.stringify(value)
    );
  }
  
  async get<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }
  
  // Cache-aside pattern
  async getOrFetch<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttlSeconds: number = 3600
  ): Promise<T> {
    // Try cache first
    const cached = await this.get<T>(key);
    if (cached) {
      return cached;
    }
    
    // Fetch from database
    const data = await fetchFn();
    
    // Store in cache
    await this.set(key, data, ttlSeconds);
    
    return data;
  }
  
  // Invalidate cache
  async invalidate(pattern: string) {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }
}

// Usage in service
export class WeddingService {
  constructor(
    private db: PrismaClient,
    private cache: CacheService
  ) {}
  
  async getWedding(id: string) {
    return this.cache.getOrFetch(
      `wedding:${id}`,
      () => this.db.wedding.findUnique({ where: { id } }),
      3600 // Cache for 1 hour
    );
  }
  
  async updateWedding(id: string, data: any) {
    const wedding = await this.db.wedding.update({
      where: { id },
      data
    });
    
    // Invalidate cache
    await this.cache.invalidate(`wedding:${id}`);
    await this.cache.invalidate(`weddings:*`); // List caches
    
    return wedding;
  }
}
```

---

## 📊 Monitoring & Observability

### Application Monitoring

```typescript
// Prometheus metrics
import prometheus from 'prom-client';

// Create metrics
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

const httpRequestTotal = new prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const activeUsers = new prometheus.Gauge({
  name: 'active_users_total',
  help: 'Number of currently active users'
});

const databaseQueryDuration = new prometheus.Histogram({
  name: 'database_query_duration_seconds',
  help: 'Duration of database queries',
  labelNames: ['operation', 'table']
});

// Middleware to track metrics
export function metricsMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    
    httpRequestDuration.observe(
      {
        method: req.method,
        route: req.route?.path || 'unknown',
        status_code: res.statusCode
      },
      duration
    );
    
    httpRequestTotal.inc({
      method: req.method,
      route: req.route?.path || 'unknown',
      status_code: res.statusCode
    });
  });
  
  next();
}

// Expose metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(await prometheus.register.metrics());
});
```

### Error Tracking with Sentry

```typescript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  
  beforeSend(event, hint) {
    // Filter out sensitive data
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers?.authorization;
    }
    return event;
  }
});

// Error handling middleware
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log to Sentry
  Sentry.captureException(err, {
    user: {
      id: req.user?.id,
      email: req.user?.email,
      tenantId: req.tenant?.id
    },
    extra: {
      method: req.method,
      url: req.url,
      body: req.body
    }
  });
  
  // Send error response
  res.status(err.statusCode || 500).json({
    error: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}
```

---

## 💰 Cost Optimization

### Infrastructure Costs (Monthly)

**For 1,000 Active Customers:**

| Service | Tier/Config | Cost |
|---------|-------------|------|
| **Compute** |
| Web Servers (3x) | 4 vCPU, 8GB RAM | ₹15,000 |
| API Servers (3x) | 4 vCPU, 8GB RAM | ₹15,000 |
| Worker Servers (2x) | 2 vCPU, 4GB RAM | ₹8,000 |
| **Database** |
| PostgreSQL Primary | 8 vCPU, 32GB RAM, 500GB SSD | ₹25,000 |
| PostgreSQL Replica (2x) | 4 vCPU, 16GB RAM, 500GB SSD | ₹20,000 |
| Redis Cluster | 4GB RAM | ₹5,000 |
| **Storage** |
| Object Storage (2TB) | S3/R2 | ₹4,000 |
| Database Backups (500GB) | S3 | ₹2,000 |
| **CDN & Security** |
| Cloudflare Pro | DDoS + CDN | ₹2,000 |
| **Monitoring** |
| Prometheus + Grafana | Self-hosted | ₹2,000 |
| Sentry | 10k events/month | ₹8,000 |
| **External APIs** |
| Razorpay | 2% of transactions | ₹40,000 |
| SendGrid | 100k emails | ₹8,000 |
| Twilio SMS | 10k SMS | ₹10,000 |
| WhatsApp API | 5k messages | ₹5,000 |
| **AI Services** |
| Claude (Anthropic) | 1M tokens | ₹30,000 |
| OpenAI (Embeddings) | 10M tokens | ₹5,000 |
| **Total** | | **₹2,04,000** |

**Per Customer Cost**: ₹204/month  
**Revenue Per Customer**: ₹15,000/month (average)  
**Gross Margin**: 98.6%

---

## 🔧 Development Workflow

### Local Development Setup

```bash
# 1. Clone repository
git clone https://github.com/yourcompany/wedtech-saas.git
cd wedtech-saas

# 2. Install dependencies
npm install

# 3. Start PostgreSQL and Redis with Docker
docker-compose up -d postgres redis

# 4. Copy environment variables
cp .env.example .env

# 5. Run database migrations
npm run prisma:migrate

# 6. Seed development data
npm run seed

# 7. Start development server
npm run dev

# Web app: http://localhost:3000
# API: http://localhost:3001
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Run linter
        run: npm run lint
        
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker images
        run: |
          docker build -t wedtech/web:${{ github.sha }} -f docker/web.Dockerfile .
          docker build -t wedtech/api:${{ github.sha }} -f docker/api.Dockerfile .
          
      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push wedtech/web:${{ github.sha }}
          docker push wedtech/api:${{ github.sha }}
          
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/wedtech-web web=wedtech/web:${{ github.sha }}
          kubectl set image deployment/wedtech-api api=wedtech/api:${{ github.sha }}
          kubectl rollout status deployment/wedtech-web
          kubectl rollout status deployment/wedtech-api
```

---

## 🎯 Next Steps for Implementation

### Week 1: Foundation
1. ✅ Set up multi-tenant database architecture
2. ✅ Implement authentication & authorization
3. ✅ Create tenant provisioning system
4. ✅ Build basic CRUD APIs

### Week 2-4: Core Features
1. ✅ Implement Wedding Management module
2. ✅ Build Client CRM
3. ✅ Create task management
4. ✅ Develop web UI

### Week 5-6: Mobile Apps
1. ✅ Build Planner mobile app
2. ✅ Implement offline sync
3. ✅ Add push notifications
4. ✅ Test on iOS & Android

### Week 7-8: Advanced Features
1. ✅ AI integration
2. ✅ Analytics dashboard
3. ✅ Payment gateway
4. ✅ Email/SMS notifications

### Week 9-10: Testing & Polish
1. ✅ Load testing
2. ✅ Security audit
3. ✅ Performance optimization
4. ✅ Bug fixes

### Week 11-12: Launch
1. ✅ Beta testing
2. ✅ Documentation
3. ✅ Marketing materials
4. ✅ Go live!

---

## 📚 Resources & Documentation

### Technical Documentation
- Architecture diagrams (this document)
- API documentation (Swagger/OpenAPI)
- Database schema (Prisma docs)
- Deployment guides

### Development Resources
- GitHub repository
- Figma designs
- Postman collections
- Test data generators

### Team Resources
- Developer onboarding guide
- Code style guide
- Git workflow
- Review process

---

**Ready to build the technical foundation? Let's start implementing! 🚀**

What do you want to tackle first:
1. Set up multi-tenant infrastructure?
2. Build the authentication system?
3. Create database migrations?
4. Develop the mobile app structure?
