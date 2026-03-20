# CampaignHub - Architectural Decisions & Design Patterns

This document outlines the key architectural decisions, technology choices, and design patterns used in building CampaignHub, along with the reasoning behind each decision.

---

## 🏗️ Overall Architecture

### Layered Architecture Pattern

```
┌─────────────────────────────────────────┐
│      UI Layer (Components)              │
│  (Header, Sidebar, Cards, Tables)      │
├─────────────────────────────────────────┤
│    State Management Layer (Zustand)     │
│  (Global campaign state & actions)      │
├─────────────────────────────────────────┤
│    Services Layer (SDK Client)          │
│  (campaignService - API calls/mocks)    │
├─────────────────────────────────────────┤
│    Data Layer (Types & Interfaces)      │
│  (Campaign, TypeScript types)           │
└─────────────────────────────────────────┘
```

**Why This Architecture?**
- ✅ **Separation of Concerns** - Each layer has a specific responsibility
- ✅ **Testability** - Easy to test each layer independently
- ✅ **Maintainability** - Changes in one layer don't affect others
- ✅ **Scalability** - Easy to swap implementations (mock → real API)

---

## 🛠️ Technology Stack - Detailed Decisions

### 1. **React 19 + TypeScript**

**Decision**: Use React with TypeScript instead of plain JavaScript or Vue

**Rationale**:
- **Type Safety**: Catch errors at compile time, not runtime
- **Large Ecosystem**: Extensive library support and community
- **JSX Syntax**: Intuitive component-based UI development
- **Performance**: React's virtual DOM for efficient updates
- **TypeScript Benefits**:
  - Self-documenting code through types
  - Better IDE support and autocomplete
  - Prevents entire classes of bugs

**Example**:
```typescript
// Compile-time error caught
const campaign: Campaign = {
  name: "Summer Sale",
  budget: 5000,
  // ❌ Missing required fields error
};
```

---

### 2. **Zustand for State Management**

**Decision**: Use Zustand instead of Redux, Context API, or Recoil

**Comparison**:

| Feature | Zustand | Redux | Context API | Recoil |
|---------|---------|-------|-------------|--------|
| Bundle Size | ~2KB | ~40KB | Built-in | ~10KB |
| Learning Curve | Easy | Steep | Medium | Medium |
| Boilerplate | Minimal | Lots | Some | Some |
| DevTools | Yes | Excellent | No | Basic |
| Performance | Excellent | Good | Can be slow | Very good |
| **Best For** | **Small-Medium** | **Large Apps** | **Simple State** | **Complex State** |

**Why Zustand?**
- ✅ Minimal boilerplate - Store setup in < 30 lines
- ✅ Direct state mutations - No action creators needed
- ✅ Small bundle size - Better performance
- ✅ Easy to learn - Simple API
- ✅ Perfect for this project size

**Store Structure**:
```typescript
export const useCampaignStore = create<CampaignState>((set) => ({
  campaigns: [],
  loading: false,
  
  addCampaign: (campaign) => // Direct mutation
    set((state) => ({
      campaigns: [...state.campaigns, campaign],
    })),
}));

// Usage in components
const { campaigns, addCampaign } = useCampaignStore();
```

---

### 3. **Ant Design (antd) for UI Components**

**Decision**: Use Ant Design instead of Material-UI, Bootstrap, or Chakra

**Comparison**:

| Aspect | Ant Design | Material-UI | Bootstrap | Chakra |
|--------|-----------|------------|-----------|--------|
| Components | 50+ | 60+ | Limited | 30+ |
| Bundle Size | ~150KB | ~200KB | ~100KB | ~80KB |
| Enterprise Ready | ✅ Excellent | ✅ Good | ✅ Okay | ❌ Limited |
| Table Component | ✅ Excellent | Good | External | External |
| Date Picker | ✅ Excellent | Good | External | External |
| Customization | Medium | Good | Easy | Good |
| **Ideal For** | **Dashboards** | **Web Apps** | **Static** | **Apps** |

**Why Ant Design?**
- ✅ **Enterprise-grade** - Built for dashboards and admin panels
- ✅ **Rich Table component** - Perfect for campaign management
- ✅ **Built-in date picker** - For campaign date selection
- ✅ **Professional look** - Out-of-the-box polished UI
- ✅ **Great documentation** - Extensive examples

**Example**:
```tsx
<Table
  columns={columns}           // Auto handles sorting, filtering
  dataSource={filteredData}
  pagination={{ pageSize: 5 }}
/>
```

---

### 4. **Recharts for Data Visualization**

**Decision**: Use Recharts instead of Chart.js, D3.js, or Victory

**Comparison**:

| Feature | Recharts | Chart.js | D3.js | Victory |
|---------|----------|----------|-------|---------|
| React Native | Yes | No | No | Yes |
| Learning Curve | Easy | Medium | Steep | Easy |
| Customization | Good | Medium | Excellent | Good |
| Bundle Size | ~80KB | ~50KB | ~250KB | ~100KB |
| **Best For** | **React Apps** | **Simple Charts** | **Custom Viz** | **Complex Charts** |

**Why Recharts?**
- ✅ **React-first** - Declarative, fits React paradigm
- ✅ **Composable** - Easy to add/remove chart elements
- ✅ **Responsive** - Works great with ResponsiveContainer
- ✅ **Minimal configuration** - Gets running in minutes
- ✅ **Good defaults** - Looks professional without tweaking

**Example**:
```tsx
<ResponsiveContainer width="100%" height={300}>
  <AreaChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <Area type="monotone" dataKey="clicks" stroke="#3b82f6" />
  </AreaChart>
</ResponsiveContainer>
```

---

### 5. **React Router for Navigation**

**Decision**: Use React Router v7 instead of Next.js or custom routing

**Rationale**:
- ✅ **Client-side routing** - No server required for navigation
- ✅ **Nested routes** - Support for layout hierarchies
- ✅ **URL-driven state** - Browser back/forward works naturally
- ✅ **Lazy loading** - Split code by route
- ✅ **Standard practice** - Industry standard for SPAs

**Routing Structure**:
```tsx
<Route element={<MainLayout />}>
  <Route path="/" element={<Navigate to="/dashboard" />} />
  <Route path="/dashboard" element={<DashboardPage />} />
  <Route path="/campaigns" element={<CampaignPage />} />
</Route>
```

---

### 6. **Tailwind CSS for Styling**

**Decision**: Use Tailwind CSS instead of CSS-in-JS or plain CSS

**Rationale**:
- ✅ **Utility-first** - Fast development without context-switching
- ✅ **Small bundle** - Only includes used styles
- ✅ **Consistent design** - Pre-defined spacing, colors, sizes
- ✅ **Responsive** - Built-in responsive modifiers
- ✅ **Works with Ant Design** - Compatible, can override styles

**Usage**:
```tsx
<div className="p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-all">
  Content here
</div>
```

---

### 7. **Vite as Build Tool**

**Decision**: Use Vite instead of Create React App or Webpack

**Comparison**:

| Feature | Vite | CRA | Webpack |
|---------|------|-----|---------|
| Dev Server Speed | 🚀 Instant | Slow | Slow |
| Build Time | Fast | Slow | Medium |
| Hot Module Reload | ⚡ Fast | Medium | Medium |
| Config | Simple | Zero | Complex |
| **Best For** | **Modern Projects** | **Beginner** | **Complex** |

**Why Vite?**
- ✅ **Lightning fast HMR** - See changes instantly
- ✅ **Native ES modules** - Modern browser features
- ✅ **Optimized builds** - Rollup-based production builds
- ✅ **Zero config needed** - Works out of the box

---

## 📊 State Management - Data Flow

### Campaign Data Flow

```
User Action (Add Campaign)
        ↓
Component (CampaignPage.tsx)
        ↓
Zustand Store (addCampaign action)
        ↓
State Updated (campaigns array)
        ↓
Components Re-render (automatic subscriptions)
        ↓
UI Updates (new campaign visible)
```

### Polling for Metrics

```
useEffect runs on mount
        ↓
setInterval every 5 seconds
        ↓
Get current campaigns from store
        ↓
Call campaignService.simulateMetricUpdate()
        ↓
Merge results with existing state
        ↓
Store updates (set state)
        ↓
Dashboard re-renders with new metrics
```

**Key Design Decision - Why Poll Every 5 Seconds?**
- ✅ **Balance** - Frequent updates (real-time feel) vs server load
- ✅ **Not too often** - Avoids excessive calculations
- ✅ **Visible changes** - User sees metrics updating
- ✅ **Sustainable** - Won't slow down the app
- ⚠️ **Alternative**: WebSockets for true real-time (future improvement)

---

## 🎯 Component Architecture

### Component Hierarchy

```
App.tsx
├── BrowserRouter
└── AppRouter.tsx
    └── MainLayout.tsx
        ├── Sidebar.tsx
        │   └── Menu (Dashboard, Campaigns)
        ├── HeaderBar.tsx
        │   ├── Page Title (dynamic)
        │   └── User Dropdown
        └── Layout.Content
            ├── DashboardPage.tsx
            │   ├── StatCard (4x)
            │   ├── AreaChart
            │   ├── PieChart
            │   └── RecentCampaigns
            └── CampaignPage.tsx
                ├── Search & Filter
                ├── Table
                └── Modal (Add/Edit)
```

### Component Separation Philosophy

**Smart vs Presentational Components**

```
Smart Components (Handle Logic):
- DashboardPage
- CampaignPage
- MainLayout

Presentational Components (Just Render):
- StatCard
- HeaderBar
- Sidebar
- RecentCampaigns
```

**Benefits**:
- ✅ Logic isolated in smart components
- ✅ Easy to test presentational components
- ✅ Reusable presentational components
- ✅ Clear data flow direction (parents → children)

---

## 🔄 Key Architectural Patterns Used

### 1. **Custom Hooks Pattern**

```typescript
// useCampaignPolling.ts - Extracted polling logic
export const useCampaignPolling = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const campaigns = useCampaignStore.getState().campaigns;
      const refreshMetrics = useCampaignStore.getState().refreshMetrics;
      refreshMetrics(campaigns);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
};
```

**Why?**
- ✅ Reusable logic
- ✅ Clean component code
- ✅ Testable in isolation

---

### 2. **Adapter Pattern** (Services)

```typescript
// campaignService.ts acts as adapter
export const campaignService = {
  async simulateMetricUpdate(data: Campaign[]): Promise<Campaign[]> {
    // Can easily switch to real API later
    // const response = await fetch('/api/campaigns/update');
    // return response.json();
    
    // Currently mocked for demo
    return simulatedData;
  }
};
```

**Why?**
- ✅ **Easy API migration** - Change service, not components
- ✅ **Multiple implementations** - Mock for dev, real for prod
- ✅ **Testable** - Mock the service in tests

---

### 3. **Computed State Pattern**

```typescript
// Instead of storing computed values, calculate on render
const activeCampaigns = campaigns.filter(c => c.status === "Active").length;
const totalReach = campaigns.reduce((acc, c) => acc + (c.impressions || 0), 0);
const budgetUtilization = totalBudget > 0 
  ? ((totalSpend / totalBudget) * 100).toFixed(0) 
  : "0";
```

**Why?**
- ✅ **Single source of truth** - Data in store, calculations in component
- ✅ **Always in sync** - No stale computed values
- ✅ **Memory efficient** - Don't duplicate data
- ❌ **Trade-off**: Recalculates on every render (used `useMemo` for expensive calcs)

---

### 4. **Date-based Auto-Status Pattern**

```typescript
const getStatusFromDates = (startDate: string, endDate: string): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  if (today > end) return "Completed";
  else if (today >= start && today <= end) return "Active";
  else return "Draft";
};
```

**Benefits**:
- ✅ **No manual status setting** - Automatic based on dates
- ✅ **Prevents errors** - Can't set invalid statuses
- ✅ **Clean UX** - Status always accurate

---

## 🎯 Data Model Design

### Campaign Interface Design

```typescript
interface Campaign {
  id: string;                           // Unique identifier
  name: string;                         // Campaign name
  status: "Active" | "Draft" | "Completed";  // Type-safe status
  budget: number;                       // Initial budget
  spend: number;                        // Amount spent
  impressions: number;                  // Ad impressions
  clicks: number;                       // Click-throughs
  createdAt: string;                    // Creation timestamp
  startDate: string;                    // Campaign start
  endDate: string;                      // Campaign end
}
```

**Design Decisions**:
- ✅ **String dates (ISO format)** - Not Date objects (JSON serializable)
- ✅ **Union types for status** - TypeScript enforces valid values
- ✅ **Numeric metrics** - Easy calculations and sorting
- ✅ **Immutable structure** - No nested objects to mutate

---

## ⚡ Performance Optimizations

### 1. **Code Splitting with Lazy Routes**

```typescript
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const CampaignPage = lazy(() => import("../pages/CampaignPages"));

<Suspense fallback={<div>Loading...</div>}>
  <Routes>
    <Route path="/dashboard" element={<DashboardPage />} />
  </Routes>
</Suspense>
```

**Impact**: Each page loaded only when needed → smaller initial bundle

---

### 2. **useMemo for Expensive Calculations**

```typescript
const areaChartData = useMemo(() => {
  // expensive data transformation
  return transformedData;
}, [campaigns]); // Only recompute if campaigns change
```

**Impact**: Avoid unnecessary chart data recalculations

---

### 3. **Data Merging in Polling**

```typescript
set((state) => {
  const updatedMap = new Map(updated.map(c => [c.id, c]));
  return {
    campaigns: state.campaigns.map(c => updatedMap.get(c.id) || c)
  };
});
```

**Impact**: Prevents losing newly added campaigns during polling

---

## 🔐 Scalability Thoughts

### Current Phase (MVP)
- ✅ Client-side state management (Zustand)
- ✅ Mock data (no backend needed)
- ✅ Single-page application

### Next Phase (Growth)
```
Add Backend:
- REST API endpoints (/api/campaigns)
- Database (PostgreSQL/MongoDB)
- Authentication & Authorization
- Real polling/WebSockets

Add Features:
- User authentication
- Multi-user collaboration
- Advanced analytics
- Campaign templates
- Scheduled campaigns
- A/B testing
```

### Architecture Ready For?
- ✅ Backend integration (service layer abstraction)
- ✅ Real API data (replace mock service)
- ✅ Authentication (add auth guard to routes)
- ✅ Multiple instances (Zustand works client-side)
- ⚠️ Real-time (needs WebSocket upgrade)

---

## 🚀 Trade-offs & Decisions

| Decision | Benefit | Trade-off |
|----------|---------|-----------|
| **Zustand** | Minimal boilerplate | Less suitable for very large apps |
| **Ant Design** | Rich components | Larger bundle size (~150KB) |
| **Date strings** | JSON friendly | Need parsing for calculations |
| **Polling (5s)** | Simple implementation | Not true real-time |
| **Client-side state** | No backend needed | Won't work offline |
| **Mock service** | Quick development | Need API integration later |

---

## 📋 Alternative Approaches Considered

### 1. Redux Instead of Zustand
```
❌ Rejected because:
- Too much boilerplate for this project size
- Overkill (DevTools not needed yet)
- Slower learning curve for team
```

### 2. Next.js Instead of React + Vite
```
❌ Rejected because:
- This is client-only dashboard
- Backend not needed for MVP
- Vite gives better dev experience
- Server-side rendering not required
```

### 3. CSS-in-JS Instead of Tailwind
```
❌ Rejected because:
- Tailwind faster for utility-based styling
- No runtime overhead
- Better TypeScript support
- Consistent design system
```

---

## 🔧 Future Architecture Improvements

### Short Term
1. **Error Boundaries** - Catch React component errors
2. **Error Handling** - Try-catch blocks in async operations
3. **Loading States** - Show spinners during data fetch
4. **Input Validation** - Validate campaign form inputs

### Medium Term
1. **Backend API** - Replace mock service with real endpoints
2. **Authentication** - Add user login/logout
3. **Caching** - Implement React Query for data management
4. **WebSockets** - Real-time metric updates

### Long Term
1. **Offline Support** - Service workers
2. **PWA** - Install as app
3. **Analytics** - Track usage patterns
4. **Internationalization** - Multi-language support

---

## ✅ Architectural Principles Followed

1. **DRY (Don't Repeat Yourself)** - Reusable components and hooks
2. **SOLID Principles** - Single responsibility per component
3. **Composition Over Inheritance** - React components composable
4. **Separation of Concerns** - UI, logic, and data separated
5. **Progressive Enhancement** - Works without advanced features

---

## 📚 References & Resources

- **Zustand**: https://github.com/pmndrs/zustand
- **Ant Design**: https://ant.design/
- **Recharts**: https://recharts.org/
- **React Router**: https://reactrouter.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **Vite**: https://vitejs.dev/

---

**Document Version**: 1.0  
**Last Updated**: March 2, 2026  
**Project**: CampaignHub - AMGO Gaming
