# Mini CRM Application - MERN Stack

A full-stack Customer Relationship Management (CRM) application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This application allows users to manage customers and their associated leads with a modern, responsive interface.

## 🚀 Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Role-based access control (User/Admin)

### Customer Management
- Create, read, update, and delete customers
- Search customers by name, email, or company
- Pagination for large datasets
- Customer detail view with associated leads

### Lead Management
- Create and manage leads for each customer
- Lead status tracking (New, Contacted, Converted, Lost)
- Lead value tracking
- Filter leads by status
- Lead statistics and analytics

### Dashboard & Analytics
- Overview of key metrics
- Interactive charts showing lead distribution
- Lead value analysis by status
- Quick access to main features

### Additional Features
- Responsive design for desktop and mobile
- Form validation with error handling
- Real-time data updates
- Clean and modern UI with Material-UI
- State management with Redux Toolkit

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Joi** - Request validation
- **Jest** - Testing framework
- **Supertest** - HTTP testing

### Frontend
- **React.js** - Frontend framework
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Material-UI** - UI component library
- **Recharts** - Chart library
- **React Hook Form** - Form handling
- **Yup** - Form validation
- **Axios** - HTTP client

## 📁 Project Structure

```
mini-crm/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── customerController.js
│   │   │   └── leadController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── validation.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Customer.js
│   │   │   └── Lead.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── customers.js
│   │   │   └── leads.js
│   │   ├── tests/
│   │   │   ├── auth.test.js
│   │   │   └── setup.js
│   │   ├── utils/
│   │   │   └── jwt.js
│   │   └── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── customers/
│   │   │   ├── leads/
│   │   │   ├── dashboard/
│   │   │   └── common/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   └── index.js
│   │   └── App.js
│   ├── package.json
│   └── .env
└── README.md
```

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['user', 'admin']),
  createdAt: Date,
  updatedAt: Date
}
```

### Customers Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  company: String,
  owner: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Leads Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  status: String (enum: ['New', 'Contacted', 'Converted', 'Lost']),
  value: Number,
  customer: ObjectId (ref: Customer),
  owner: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mini-crm
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy the environment file
   cp .env.example .env
   
   # Edit .env with your configuration
   MONGODB_URI=mongodb://localhost:27017/mini-crm
   # For MongoDB Atlas, use: mongodb+srv://username:password@cluster.mongodb.net/mini-crm
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   PORT=5001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Environment Configuration**
   ```bash
   # Edit .env with your backend URL
   REACT_APP_API_URL=http://localhost:5001/api
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5001`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   The frontend will run on `http://localhost:3000`

3. **Access the Application**
   Open your browser and navigate to `http://localhost:3000`

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Customers
- `GET /api/customers` - Get all customers (protected)
- `GET /api/customers/:id` - Get single customer (protected)
- `POST /api/customers` - Create new customer (protected)
- `PUT /api/customers/:id` - Update customer (protected)
- `DELETE /api/customers/:id` - Delete customer (protected)

### Leads
- `GET /api/leads/customers/:customerId/leads` - Get leads for customer (protected)
- `GET /api/leads/:id` - Get single lead (protected)
- `POST /api/leads/customers/:customerId/leads` - Create new lead (protected)
- `PUT /api/leads/:id` - Update lead (protected)
- `DELETE /api/leads/:id` - Delete lead (protected)
- `GET /api/leads/stats` - Get lead statistics (protected)

## 🎨 UI Components

### Authentication
- Login form with validation
- Registration form with password confirmation
- Protected route wrapper

### Customer Management
- Customer list with search and pagination
- Customer form for create/edit operations
- Customer detail view with associated leads

### Lead Management
- Lead list with status filtering
- Lead form for create/edit operations
- Lead status tracking

### Dashboard
- Summary cards with key metrics
- Interactive charts (Pie chart for lead status, Bar chart for lead values)
- Quick navigation to main features

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Request validation with Joi
- Rate limiting
- CORS configuration
- Helmet for security headers
- Input sanitization

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Deployment

### Backend Deployment (Heroku/Render/DigitalOcean)
1. Set up environment variables in your hosting platform
2. Connect your MongoDB Atlas database
3. Deploy the backend code

### Frontend Deployment (Netlify/Vercel)
1. Build the frontend: `npm run build`
2. Deploy the build folder to your hosting platform
3. Set environment variables for API URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Dev Innovations Labs**
- Full Stack Developer Assignment

## 🎯 Future Enhancements

- Email notifications
- File upload for customer documents
- Advanced reporting and analytics
- Customer communication history
- Task management
- Mobile app (React Native)
- Real-time notifications
- Data export functionality

## 📞 Support

For support or questions, please contact the development team.

---

**Note**: This is a demonstration project for the Dev Innovations Labs Full Stack Developer position. It showcases modern web development practices and full-stack integration capabilities.
