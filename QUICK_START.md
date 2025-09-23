# Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas - see MONGODB_SETUP.md)

### 1. Install Dependencies
```bash
# Install all dependencies
npm run install-all
```

### 2. Set up MongoDB
Choose one option:

**Option A: MongoDB Atlas (Recommended)**
- Follow the guide in `MONGODB_SETUP.md`
- Update `backend/.env` with your Atlas connection string

**Option B: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service
- Update `backend/.env` with local connection string

### 3. Start the Application

**Method 1: Using the root package.json (Recommended)**
```bash
# Start both backend and frontend
npm run dev
```

**Method 2: Manual start**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **Health Check**: http://localhost:5001/api/health

## 🔧 Recent Fixes Applied

1. **Fixed Express.js Route Issue**
   - Removed problematic wildcard route `*` that was causing path-to-regexp errors
   - Reordered lead routes to prevent conflicts

2. **Port Configuration**
   - Changed default port from 5000 to 5001 (port 5000 was occupied by system process)
   - Updated all configuration files accordingly

3. **Route Ordering**
   - Fixed lead routes to prevent parameter conflicts
   - Customer-specific routes now come before generic ID routes

## 🧪 Testing the Setup

1. **Test Backend Health**
   ```bash
   curl http://localhost:5001/api/health
   ```
   Should return: `{"success":true,"message":"Server is running",...}`

2. **Test User Registration**
   ```bash
   curl -X POST http://localhost:5001/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
   ```

3. **Access Frontend**
   - Open http://localhost:3000
   - Register a new account
   - Start using the CRM!

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB is running and accessible
- Verify the MONGODB_URI in `backend/.env`
- Check if port 5001 is available

### Frontend can't connect to backend
- Verify REACT_APP_API_URL in `frontend/.env` points to http://localhost:5001/api
- Check if backend is running on port 5001

### Database connection issues
- For MongoDB Atlas: Check network access settings
- For local MongoDB: Ensure MongoDB service is running
- Verify connection string format

## 📚 Next Steps

1. Register your first user account
2. Create some customers
3. Add leads to customers
4. Explore the dashboard analytics
5. Test the responsive design on mobile

## 🎯 Features to Try

- **Customer Management**: Create, edit, delete customers
- **Lead Tracking**: Add leads with different statuses
- **Search & Filter**: Use search and status filters
- **Analytics**: View charts and statistics on the dashboard
- **Responsive Design**: Test on different screen sizes

Happy coding! 🚀
