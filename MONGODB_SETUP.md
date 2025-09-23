# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Recommended)

MongoDB Atlas is a cloud-hosted MongoDB service that's free to use for development.

### Steps to set up MongoDB Atlas:

1. **Create a MongoDB Atlas Account**
   - Go to [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account

2. **Create a New Cluster**
   - Click "Build a Database"
   - Choose the FREE tier (M0)
   - Select a cloud provider and region
   - Click "Create Cluster"

3. **Set up Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a username and password
   - Set privileges to "Read and write to any database"
   - Click "Add User"

4. **Set up Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Choose "Allow access from anywhere" (0.0.0.0/0) for development
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Clusters" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `mini-crm`)

6. **Update Environment Variables**
   ```bash
   # In backend/.env file
   MONGODB_URI=mongodb+srv://Admin:Admin@123@first.uvgrpmg.mongodb.net/mini-crm?retryWrites=true&w=majority
   ```

## Option 2: Local MongoDB

If you prefer to run MongoDB locally:

1. **Install MongoDB**
   - macOS: `brew install mongodb-community`
   - Windows: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Linux: Follow [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB Service**
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Or start manually
   mongod --config /usr/local/etc/mongod.conf
   ```

3. **Update Environment Variables**
   ```bash
   # In backend/.env file
   MONGODB_URI=mongodb://localhost:27017/mini-crm
   ```

## Testing the Connection

Once you've set up MongoDB, test the connection by starting the backend server:

```bash
cd backend
npm run dev
```

You should see:
```
MongoDB Connected: <your-cluster-url>
Server running in development mode on port 5001
```

If you see any connection errors, double-check your connection string and network access settings.
