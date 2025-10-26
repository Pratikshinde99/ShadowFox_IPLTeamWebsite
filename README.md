# 🏏 RCB Universe - Fan Hub

<div align="center">
  
![RCB Universe](https://img.shields.io/badge/RCB-Universe-DA1212?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

**Ee Sala Cup Namde! 🏆**

</div>

## 📋 Project Overview

RCB Universe is a comprehensive fan hub for Royal Challengers Bengaluru supporters, providing real-time updates, player statistics, match schedules, and interactive features. This platform celebrates RCB's journey in IPL 2025 with a modern, responsive interface and rich content for the ultimate fan experience.

## ✨ Features

- **🏆 RCB 2025 Team & Match Schedule**
  - Complete squad information with detailed player profiles
  - Real-time match updates and schedules
  - Live scoreboards and match statistics

- **👨‍💼 Player Profiles & Performance Stats**
  - Comprehensive player statistics and performance metrics
  - Career highlights and achievements
  - Form analysis and comparison tools

- **🎬 Iconic Moments Gallery**
  - Collection of RCB's most memorable moments
  - High-quality images and video integration
  - Historical achievements and milestones

- **📱 Social Media Integration**
  - Official RCB social media feeds
  - Fan engagement opportunities
  - Latest news and updates

- **🎨 Responsive Design**
  - Modern UI/UX with Tailwind CSS
  - Mobile-first approach
  - Smooth animations with Framer Motion

## ⚙️ Tech Stack

### Frontend
- **React** (v18.2.0) - UI library
- **TailwindCSS** (v3.3.6) - Styling framework
- **React Router** (v6.20.1) - Navigation
- **Framer Motion** (v10.16.16) - Animations
- **Recharts** (v2.10.3) - Data visualization
- **Axios** (v1.6.2) - API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express** (v4.18.2) - Web framework
- **MongoDB** (v8.0.3) - Database
- **Mongoose** - ODM for MongoDB
- **Nodemailer** - Email functionality
- **Node-Cache** - Caching solution

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Quick Start
```bash
# Clone the repository
git clone https://github.com/yourusername/RCB_Universe.git
cd RCB_Universe

# Run the setup script (Windows)
START.bat

# For manual setup:
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Start both servers
# Terminal 1 (Backend)
cd backend
npm run dev

# Terminal 2 (Frontend)
cd frontend
npm start
```

### Environment Variables

#### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rcb_universe
NODE_ENV=development
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_password
```

#### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📁 Project Structure

```
RCB_Universe/
│
├── backend/
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── seed/             # Database seeding scripts
│   └── server.js         # Express server
│
├── frontend/
│   ├── public/           # Static assets
│   │   └── images/       # Image resources
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Page components
│       └── services/     # API integration
│
└── START.bat             # Quick launcher script
```

## 📸 Screenshots

<div align="center">
  <p><i>Add your application screenshots here</i></p>
</div>

## 🌐 Deployment

### 🚀 Complete Render Deployment (Recommended)

**Deploy both Backend & Frontend on Render for FREE!**

📖 **[Full Deployment Guide →](./RENDER_DEPLOYMENT_GUIDE.md)**

Quick overview:
1. **MongoDB Atlas** - Setup free database
2. **Backend on Render** - Deploy Node.js API
3. **Frontend on Render** - Deploy React static site
4. **Environment Variables** - Configure all settings

The comprehensive guide includes:
- Step-by-step instructions with screenshots
- Environment variable setup
- CORS configuration
- Troubleshooting tips
- Free tier optimizations

### Alternative: Manual Deployment

<details>
<summary>Click to expand manual deployment options</summary>

#### Vercel (Frontend Only)
1. Create account at [vercel.com](https://vercel.com)
2. Connect GitHub repository
3. Set `REACT_APP_API_URL` environment variable
4. Deploy

#### Railway/Heroku (Backend)
1. Create account and new project
2. Connect repository
3. Set environment variables
4. Deploy
</details>

## 🧪 Testing

```bash
# Test backend health
curl http://localhost:5000/api/health

# Expected response:
# {"status":"OK","message":"RCB Universe API is running!"}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Credits

Developed with ❤️ by Pratik Shinde

---

<div align="center">

**Made with passion for RCB fans by RCB fans**

🏏 **Ee Sala Cup Namde!** 🏏

</div>
