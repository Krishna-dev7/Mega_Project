# Mega_Project

### Clothes related ecommerce websites using mern stack technology.


## ECOMMERCE SCHEMA
<br>

### 👤User Schema
```javaScript
const UserSchema = {
  _id: ObjectId,
  username: String,
  email: String,
  password: String, // Hashed
  firstName: String,
  lastName: String,
  profilePicture: String,
  address: [{
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  }],
  role: {
    type: String,
    enum: ['customer', 'admin', 'seller'],
    default: 'customer'
  },
  preferences: {
    sizeFit: String,
    stylePreferences: [String],
    notificationSettings: {
      email: Boolean,
      sms: Boolean
    }
  },
  createdAt: Date,
  lastLogin: Date
}
```
### 🎁Product Schema
```javaScript
const ProductSchema = {
  _id: ObjectId,
  name: String,
  description: String,
  category: {
    type: String,
    enum: ['Men', 'Women', 'Kids', 'Accessories']
  },
  subcategory: String,
  brand: String,
  price: Number,
  discountedPrice: Number,
  stock: [{
    size: String,
    color: String,
    quantity: Number
  }],
  images: [String],
  tags: [String],
  materials: [String],
  sustainabilityScore: Number,
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  weightInGrams: Number,
  virtualTryOnEnabled: Boolean
}
```
### 🌟Review Schema
```javaScript
const ReviewSchema = {
  _id: ObjectId,
  productId: ObjectId,
  userId: ObjectId,
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: String,
  imageProof: [String],
  verifiedPurchase: Boolean,
  helpfulCount: Number,
  createdAt: Date
}
```
### 📦Order Schema
```javaScript
const OrderSchema = {
  _id: ObjectId,
  userId: ObjectId,
  products: [{
    productId: ObjectId,
    quantity: Number,
    size: String,
    color: String,
    price: Number
  }],
  totalAmount: Number,
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  status: {
    type: String,
    enum: [
      'Pending', 
      'Processing', 
      'Shipped', 
      'Delivered', 
      'Cancelled', 
      'Returned'
    ],
    default: 'Pending'
  },
  paymentMethod: String,
  trackingNumber: String,
  estimatedDelivery: Date,
  realTimeLocationTracking: {
    latitude: Number,
    longitude: Number,
    lastUpdated: Date
  }
}
```
### 🤖AI Recommendation Schema
```javaScript
const AIRecommendationSchema = {
  userId: ObjectId,
  recommendedProducts: [{
    productId: ObjectId,
    matchScore: Number,
    reasonForRecommendation: String
  }],
  lastUpdated: Date,
  recommendationType: {
    type: String,
    enum: ['style', 'size', 'previous_purchases', 'trending']
  }
}
```
### 💻Analytics Schema
```javaScript
const AnalyticsSchema = {
  date: Date,
  totalSales: Number,
  topSellingProducts: [{
    productId: ObjectId,
    quantitySold: Number
  }],
  revenueByCategory: [{
    category: String,
    revenue: Number
  }],
  customerInsights: {
    averageOrderValue: Number,
    repeatCustomerRate: Number,
    mostActiveHours: [Number]
  }
}
```

<hr>

### ✨ Key Features
<hr>
Features is given below:


1. 🌐 Dynamic Products from Shopify Storefront API
2. 💸 Checkout and Payments
3. 🌞 Automatic Light/Dark Mode
4. 🚀 Fetching and Caching Paradigms
5. 🔐 User Authentication
6. 🧩 Similar Products Suggestions
7. 🔍 Search, Sort, Different Views Functionality
8. 🏷️ Tags & Categories & Vendors & Price Range & Product Variants Functionality
9. 🖼️ Single Product Image Zoom, Hover Effect, Slider
10. 🛒 Cart & Easy editing options for cart items
11. 📝 Product Description on Multiple Tabs
12. 📞 Support Contact Form
13. 📱 Fully Responsive
14. 🔄 Dynamic Home Banner Slider
15. 📦Add to Cart
16. 🌠Wishlist
17. 🚲Order Tracking Update(delivery,out for delivery,packing)
18. 💵Payment Gateway
