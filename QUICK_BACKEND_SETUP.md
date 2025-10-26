# 🚀 Quick Backend Deployment Guide

## Your Frontend is Live! 🎉
**Frontend URL**: https://rcb-universe18.netlify.app

Now you need to deploy the backend to make your app fully functional.

---

## Step 1: Setup MongoDB Atlas Database (5 minutes)

### 1. Create Free Database
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with Google (easiest)
3. Click **"Build a Database"** → Select **"M0 FREE"** tier
4. Choose region closest to you → Click **"Create Cluster"**

### 2. Create Database User
1. Security Quickstart will appear
2. Choose **"Username and Password"**
3. Username: `rcbadmin`
4. Password: Generate strong password (SAVE IT!)
5. Click **"Create Database User"**

### 3. Setup Network Access
1. Choose **"My Local Environment"**
2. Click **"Add My Current IP Address"**
3. Then go to **"Network Access"** tab in left menu
4. Click **"Add IP Address"** → **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Click **"Confirm"**

### 4. Get Connection String
1. Click **"Database"** in left menu
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Add database name at end: `/rcb_universe`

Example: `mongodb+srv://rcbadmin:YourPassword123@cluster0.xxxxx.mongodb.net/rcb_universe`

**SAVE THIS CONNECTION STRING!**

---

## Step 2: Deploy Backend to Render (10 minutes)

### 1. Create Render Account
1. Go to: https://render.com
2. Click **"Get Started for Free"**
3. Sign up with GitHub (easiest)

### 2. Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Click **"Build and deploy from a Git repository"**
3. Connect your GitHub account
4. Find and select your repository: `Pratikshinde99/ShadowFox_IPLTeamWebsite`
5. Click **"Connect"**

### 3. Configure Service
Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `rcb-universe-backend` |
| **Region** | Choose closest to you |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### 4. Add Environment Variables
Scroll down to **"Environment Variables"** section and add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | Your MongoDB Atlas connection string from Step 1.4 |
| `PORT` | `5000` |

Optional (for contact form):
| Key | Value |
|-----|-------|
| `EMAIL_USER` | Your Gmail address |
| `EMAIL_PASS` | Gmail App Password |

### 5. Deploy
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. You'll get a URL like: `https://rcb-universe-backend-xxxx.onrender.com`

### 6. Test Backend
Once deployed, visit: `https://your-backend-url.onrender.com/api/health`

You should see:
```json
{
  "status": "OK",
  "message": "RCB Universe API is running!",
  "timestamp": "..."
}
```

**SAVE YOUR BACKEND URL!**

---

## Step 3: Connect Frontend to Backend (2 minutes)

### Update Frontend Environment Variable
1. Go to Netlify: https://app.netlify.com
2. Open your site: **rcb-universe18**
3. Go to **"Site settings"** → **"Environment variables"**
4. Click **"Add a variable"**
5. Add:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://your-backend-url.onrender.com/api`
6. Click **"Save"**

### Trigger Redeploy
1. Go to **"Deploys"** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait 2-3 minutes for rebuild

---

## Step 4: Seed Database with Data (5 minutes)

Your backend has seed scripts to populate the database with RCB data.

### Option 1: Using Render Shell
1. Go to your Render service
2. Click the **"Shell"** tab at the top
3. Run: `node seed/runAllSeeds.js`
4. Wait for all data to be seeded

### Option 2: Run Locally
```bash
cd backend
# Make sure MONGODB_URI in .env points to MongoDB Atlas
node seed/runAllSeeds.js
```

---

## ✅ Final Checklist

- [ ] MongoDB Atlas database created
- [ ] Backend deployed to Render
- [ ] Backend health check returns OK
- [ ] Frontend environment variable updated with backend URL
- [ ] Frontend redeployed
- [ ] Database seeded with RCB data
- [ ] Test the website!

---

## 🎉 Your Live URLs

**Frontend (Live Now)**: https://rcb-universe18.netlify.app
**Backend**: https://[your-backend-url].onrender.com

---

## 📝 Important Notes

1. **Free Tier Limitations**:
   - Render free tier: Backend sleeps after 15 min of inactivity (first request takes ~30 seconds)
   - MongoDB Atlas: 512 MB storage limit
   - Netlify: 100 GB bandwidth/month

2. **Auto-Deploy**: Both services auto-deploy when you push to GitHub

3. **Custom Domain**: You can add a custom domain in Netlify settings

---

## 🐛 Troubleshooting

**Backend not connecting to database?**
- Check MongoDB connection string is correct
- Verify MongoDB Network Access allows 0.0.0.0/0
- Check Render logs for errors

**Frontend shows errors?**
- Verify REACT_APP_API_URL is set correctly in Netlify
- Check browser console for CORS errors
- Ensure backend is running

**Database is empty?**
- Run seed scripts from Render Shell
- Check Render logs for seed script output

---

## 🏏 Ee Sala Cup Namde!

Your RCB Universe is now live! Share it with fellow RCB fans! 🎉
