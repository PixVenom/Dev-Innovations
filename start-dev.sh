#!/bin/bash

# Mini CRM Development Startup Script
echo "🚀 Starting Mini CRM Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is running (optional - can use MongoDB Atlas)
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB not found locally. Make sure to use MongoDB Atlas or install MongoDB locally."
fi

echo "📦 Installing backend dependencies..."
cd backend
npm install

echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo "✅ Dependencies installed successfully!"
echo ""
echo "🔧 To start the development servers:"
echo "1. Start MongoDB (if using local MongoDB):"
echo "   mongod"
echo ""
echo "2. Start the backend server:"
echo "   cd backend && npm run dev"
echo ""
echo "3. Start the frontend server (in a new terminal):"
echo "   cd frontend && npm start"
echo ""
echo "🌐 The application will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5001"
echo ""
echo "📚 For more information, check the README.md file"
