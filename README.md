# CampaignHub - AMGO Gaming Campaign Management Dashboard

A modern, responsive campaign management dashboard built for AMGO Gaming to help manage, monitor, and analyze marketing campaigns with real-time metrics and insights.

## 📋 Features

### Dashboard
- **Real-time Campaign Metrics**
  - Active campaigns count
  - Total reach (impressions)
  - Total clicks
  - Budget utilization percentage
  
- **Interactive Charts**
  - Area chart showing revenue trends over time (clicks, reach, budget utilization)
  - Pie chart displaying campaign status distribution
  - "No data" fallback states for better UX

- **Recent Campaigns Widget**
  - Display latest 3 campaigns
  - View all campaigns option
  - Status indicators with color coding

### Campaign Management
- **Create Campaigns**
  - Campaign name
  - Start and end dates
  - Budget allocation
  - Auto-status assignment based on date range

- **Auto-Status Calculation**
  - **Active**: When current date is between start and end date
  - **Draft**: When campaign hasn't started yet
  - **Completed**: When campaign end date has passed

- **Campaign Table**
  - View all campaigns with detailed information
  - Budget and spend tracking
  - Impressions and clicks metrics
  - Budget utilization percentage per campaign
  - Filter by campaign name
  - Filter by status (Active, Draft, Completed)
  - Edit and delete campaigns

- **Real-time Metrics Update**
  - Automatic metric updates every 5 seconds
  - Simulated metric changes for active campaigns
  - Preserved campaign data across updates

### User Interface
- **Responsive Design**
  - Mobile-friendly layout
  - Sidebar navigation
  - Collapsible menu on small screens
  - Tailwind CSS styling

- **Navigation**
  - Dashboard page
  - Campaigns page
  - Settings page
  - Dynamic header showing current page name

- **Visual Feedback**
  - Color-coded status tags
  - Hover effects
  - Loading states
  - Smooth transitions

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Routing**: React Router v7
- **UI Components**: Ant Design (antd)
- **Charts**: Recharts
- **Icons**: Lucide React, Ant Design Icons
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install required packages** (if not already installed)
   ```bash
   npm install  lucide-react zustand recharts
   ```

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
The dashboard will be available at `http://localhost:5173/`

## 📁 Project Structure

```
src/
├── components/
│   ├── HeaderBar.tsx          # Header with page title and user menu
│   ├── Sidebar.tsx            # Navigation sidebar
│   ├── StatCard.tsx           # Stats display card component
│   └── RecentCampaigns.tsx    # Recent campaigns widget
├── hooks/
│   └── useCampaignPolling.ts  # Custom hook for polling campaign metrics
├── layouts/
│   └── MainLayout.tsx         # Main layout wrapper with sidebar
├── pages/
│   ├── DashboardPage.tsx      # Dashboard with charts and stats
│   ├── CampaignPage.tsx       # Campaign management table
│   └── SettingsPage.tsx       # Settings page
├── routes/
│   └── AppRouter.tsx          # Route configuration
├── sdk-client/
│   └── services/
│       └── campaignService.ts # Mock API service
├── store/
│   └── campaignStore.ts       # Zustand state management
├── types/
│   └── campaign.ts            # Campaign interface/types
├── data/
│   └── mockAreaChartData.ts  # Mock chart data
├── App.tsx                    # Root App component
├── main.tsx                   # Entry point
└── index.css                  # Global styles
```

## 🔑 Key Components

### Campaign Interface
```typescript
interface Campaign {
  id: string;
  name: string;
  status: "Active" | "Paused" | "Completed";
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  createdAt: string;
}
```

### Campaign Store (Zustand)
- `campaigns`: Array of campaign objects
- `addCampaign()`: Add new campaign
- `updateCampaign()`: Update existing campaign
- `deleteCampaign()`: Delete campaign by ID
- `refreshMetrics()`: Update campaign metrics with polling

### Polling Hook
- Polls every 5 seconds to update metrics
- Simulates clicks and spending for active campaigns
- Merges updates with existing data to prevent loss

## 📊 Features Explained

### Auto-Status Calculation
When you create a campaign with start and end dates, the system automatically assigns a status:

```typescript
// Example:
// Today: March 5, 2026
// Start Date: March 1, 2026
// End Date: March 15, 2026
// Result: Status = "Active" ✅

// Start Date: March 10, 2026
// End Date: March 20, 2026
// Result: Status = "Draft" 📋

// Start Date: February 1, 2026
// End Date: February 28, 2026
// Result: Status = "Completed" ✅
```

### Real-time Metrics
- Dashboard automatically updates metrics every 5 seconds
- Active campaigns get simulated metric increases
- Calculations include budget utilization percentage
- No data loss during updates

## 🎨 Color Scheme

| Element | Color | Meaning |
|---------|-------|---------|
| Status Active | Green (#52c41a) | Campaign is running |
| Status Draft | Blue (#1890ff) | Campaign pending start |
| Status Completed | Red (#ff4d4f) | Campaign finished |
| Chart Area 1 | Blue (#3b82f6) | Clicks |
| Chart Area 2 | Purple (#8b5cf6) | Reach |
| Chart Area 3 | Green (#10b981) | Budget Utilization |

## 📝 Usage Guide

### Creating a Campaign
1. Navigate to the **Campaigns** page
2. Click **Add Campaign** button
3. Fill in the campaign details:
   - Campaign Name
   - Start Date
   - End Date
   - Budget
4. Click **OK** to create
5. Status will be automatically set based on current date

### Viewing Dashboard
1. Navigate to **Dashboard** from sidebar
2. View key metrics (Active Campaigns, Total Reach, etc.)
3. Check Revenue Overview chart for trends
4. Check Campaign Status pie chart
5. Review recent campaigns in the widget

### Managing Campaigns
- **Edit**: Click Edit button in campaigns table
- **Delete**: Click Delete button (confirmation required)
- **Filter**: Use search box or status filter
- **Sort**: Click column headers to sort

## 🔄 Polling & Data Management

The application uses a polling mechanism to keep metrics fresh:
- Polls every 5 seconds
- Updates only active campaigns
- Merges new metrics with existing data
- Prevents data loss on concurrent updates

## 🚀 Deployment

Deployed in Vercel: https://amgo-campaignhub.vercel.app?_vercel_share=rvTbyXb2IRA0VfoSHV3hEjJnVOekWEAk
    

## 📝 Notes

- Default campaigns table shows 5 items per page
- Sidebar collapses on screens smaller than `lg` breakpoint
- All date handling uses ISO format (YYYY-MM-DD)
- Budget utilization is calculated as (spend/budget) × 100

## 🐛 Known Issues & Future Improvements

- Mock data used for demonstrations
- Consider adding persistent storage (database)
- Add user authentication
- Implement real API integration
- Add export to CSV/PDF functionality
- Add campaign templates
- Add campaign scheduling

## 📞 Support

For issues or questions about the dashboard, please check the project structure and configuration files.

---

**Created for**: AMGO Gaming
**Version**: 1.0.0
**Last Updated**: March 2, 2026
