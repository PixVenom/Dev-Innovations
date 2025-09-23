# Database Schema Diagram

## Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│      Users      │       │    Customers    │       │      Leads      │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ _id (ObjectId)  │       │ _id (ObjectId)  │       │ _id (ObjectId)  │
│ name (String)   │       │ name (String)   │       │ title (String)  │
│ email (String)  │◄──────┤ email (String)  │◄──────┤ description     │
│ password (Hash) │       │ phone (String)  │       │ status (Enum)   │
│ role (Enum)     │       │ company (String)│       │ value (Number)  │
│ createdAt       │       │ owner (ObjectId)│       │ customer (Ref)  │
│ updatedAt       │       │ createdAt       │       │ owner (ObjectId)│
└─────────────────┘       │ updatedAt       │       │ createdAt       │
                          └─────────────────┘       │ updatedAt       │
                                   │                └─────────────────┘
                                   │                         │
                                   └─────────────────────────┘
```

## Relationships

1. **Users → Customers** (One-to-Many)
   - One user can have many customers
   - Customer.owner references User._id

2. **Customers → Leads** (One-to-Many)
   - One customer can have many leads
   - Lead.customer references Customer._id

3. **Users → Leads** (One-to-Many)
   - One user can have many leads
   - Lead.owner references User._id

## Field Details

### Users Collection
- **name**: Customer's full name (required, max 50 chars)
- **email**: Unique email address (required, validated)
- **password**: Hashed password (required, min 6 chars)
- **role**: User role - 'user' or 'admin' (default: 'user')

### Customers Collection
- **name**: Customer's full name (required, max 100 chars)
- **email**: Customer's email (required, validated)
- **phone**: Phone number (required, 10-15 chars)
- **company**: Company name (required, max 100 chars)
- **owner**: Reference to User who created this customer

### Leads Collection
- **title**: Lead title (required, max 100 chars)
- **description**: Lead description (required, max 500 chars)
- **status**: Lead status - 'New', 'Contacted', 'Converted', 'Lost' (default: 'New')
- **value**: Lead monetary value (required, min 0)
- **customer**: Reference to Customer this lead belongs to
- **owner**: Reference to User who created this lead

## Indexes

### Performance Optimizations
- **Users**: email (unique index)
- **Customers**: name, email, company (text index for search)
- **Leads**: customer + status (compound index), owner (single index)

## Data Flow

1. User registers/logs in → JWT token generated
2. User creates customers → Customer linked to user via owner field
3. User creates leads for customers → Lead linked to both customer and user
4. All operations respect ownership (users can only access their own data)
