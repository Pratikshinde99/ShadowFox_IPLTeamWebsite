# 🚀 RCB Universe - Complete Deployment Guide

## Quick Overview
This guide will help you deploy both frontend and backend of RCB Universe to get a public URL.

---

## 📋 Prerequisites
- GitHub account
- Render account (free) - https://render.com
- MongoDB Atlas account (free) - https://www.mongodb.com/cloud/atlas
- Netlify account (free) - https://www.netlify.com

---

## Step 1: Set Up MongoDB Atlas (Database) ☁️

### 1.1 Create Database
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up/Login to MongoDB Atlas
3. Click **"Build a Database"**
4. Select **"M0 FREE"** tier
5. Choose your preferred region (closest to your users)
6. Click **"Create Cluster"**

### 1.2 Configure Database Access
1. Go to **"Database Access"** in left menu
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set username: `rcbadmin`
5. Generate a strong password (save it!)
6. Add user role: **"Read and write to any database"**
7. Click **"Add User"**

### 1.3 Configure Network Access
1. Go to **"Network Access"** in left menu
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### 1.4 Get Connection String
1. Go to **"Database"** in left menu
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like: `mongodb+srv://rcbadmin:<password>@cluster0.xxxxx.mongodb.net/`)
5. Replace `<password>` with your database user password
6. Add database name at the end: `mongodb+srv://rcbadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/rcb_universe`
7. **SAVE THIS CONNECTION STRING** - you'll need it for Render!

---

## Step 2: Deploy Backend to Render 🖥️

### 2.1 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub (recommended)

### 2.2 Deploy Backend
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `Pratikshinde99/ShadowFox_IPLTeamWebsite`
3. Configure the service:
   - **Name**: `rcb-universe-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### 2.3 Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"** and add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | Your MongoDB Atlas connection string from Step 1.4 |
| `PORT` | `5000` |
| `EMAIL_USER` | (Optional) Your Gmail for contact form |
| `EMAIL_PASS` | (Optional) Your Gmail App Password |
| `CRICKET_API_KEY` | (Optional) Your Cricket API key |

### 2.4 Deploy
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Once deployed, you'll get a URL like: `https://rcb-universe-backend.onrender.com`
4. **SAVE THIS URL** - you'll need it for the frontend!
5. Test it by visiting: `https://your-backend-url.onrender.com/api/health`

---

## Step 3: Deploy Frontend to Netlify 🌐

### 3.1 Update Frontend Environment Variable
Before deploying, you need to update the frontend to point to your backend.

Create/Update `frontend/.env.production`:
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

Replace `your-backend-url.onrender.com` with your actual Render backend URL from Step 2.4.

### 3.2 Deploy to Netlify
**Option A: Using Netlify UI**
1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to GitHub
4. Select your repository
5. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
6. Add environment variable:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://your-backend-url.onrender.com/api`
7. Click **"Deploy site"**

**Option B: Using Netlify CLI** (if you prefer)
```bash
cd frontend
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### 3.3 Get Your Public URL
1. After deployment completes (2-3 minutes)
2. Netlify will provide a URL like: `https://rcb-universe-xxxxx.netlify.app`
3. You can customize this in **Site settings** → **Change site name**

---

## Step 4: Initialize Database with Sample Data 📊

### 4.1 Seed the Database
Since your backend has seed scripts, you need to run them:

**Option 1: Run locally and push to cloud**
```bash
cd backend
node seed/runAllSeeds.js
```

**Option 2: Add seed endpoint (recommended)**
Create a one-time seed endpoint or use Render's Shell to run the seed script:
1. Go to your Render service
2. Click **"Shell"** tab
3. Run: `node seed/runAllSeeds.js`

---

## Step 5: Update Backend CORS Settings 🔒

Make sure your backend allows requests from your Netlify frontend:

Edit `backend/server.js` and update CORS configuration:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-netlify-url.netlify.app'
  ],
  credentials: true
}));
```

Redeploy the backend after this change.

---

## ✅ Final Checklist

- [ ] MongoDB Atlas cluster created and connection string saved
- [ ] Backend deployed to Render with all environment variables
- [ ] Backend health check returns OK: `https://your-backend.onrender.com/api/health`
- [ ] Frontend environment variable updated with backend URL
- [ ] Frontend deployed to Netlify
- [ ] Frontend can access backend API
- [ ] Database seeded with initial data
- [ ] CORS configured correctly

---

## 🎉 Your Deployed URLs

- **Frontend**: `https://your-site-name.netlify.app`
- **Backend API**: `https://rcb-universe-backend.onrender.com`
- **Backend Health**: `https://rcb-universe-backend.onrender.com/api/health`

---

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Check REACT_APP_API_URL in Netlify environment variables
- Verify backend CORS settings include your Netlify URL
- Check browser console for error messages

### Backend deployment fails
- Verify all environment variables are set correctly
- Check Render logs for error messages
- Ensure MongoDB connection string is correct

### Database connection error
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check username and password in connection string
- Ensure database user has correct permissions

### Free tier limitations
- Render free tier: Service sleeps after 15 min of inactivity (first request will be slow)
- MongoDB Atlas: 512 MB storage limit
- Netlify: 100 GB bandwidth/month

---

## 🔄 Updating Your Deployment

**To update frontend:**
1. Push changes to GitHub
2. Netlify will auto-deploy from main branch

**To update backend:**
1. Push changes to GitHub
2. Render will auto-deploy from main branch

---

## 📞 Support

If you encounter issues:
1. Check Render logs for backend issues
2. Check Netlify deploy logs for frontend issues
3. Test API endpoints directly in browser/Postman
4. Verify environment variables are set correctly

---

**Made with ❤️ for RCB Fans**
🏏 **Ee Sala Cup Namde!** 🏏
