# 🚀 Ready-to-Deploy Backend Configuration

Everything is prepared! Just follow these simple steps:

---

## Your MongoDB is Ready ✅
**Connection String**: `mongodb+srv://Pratik:Pratik9890@cluster0.ezqyayl.mongodb.net/rcb_universe`

---

## Deploy to Render (5 Simple Steps - 10 minutes)

### Step 1: Go to Render
Open this link: **https://dashboard.render.com/register**

Click **"Sign up with GitHub"** (fastest method)

---

### Step 2: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Click **"Build and deploy from a Git repository"** → **Next**
3. If asked, authorize GitHub access
4. Find your repo: **Pratikshinde99/ShadowFox_IPLTeamWebsite**
5. Click **"Connect"**

---

### Step 3: Fill in Configuration

**Copy these settings EXACTLY:**

```
Name: rcb-universe-backend
Region: Oregon (or closest to you)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

---

### Step 4: Add Environment Variables

Scroll to **"Environment Variables"** and click **"Add Environment Variable"**

**COPY AND PASTE THESE (one by one):**

```
Key: NODE_ENV
Value: production
```

```
Key: MONGODB_URI
Value: mongodb+srv://Pratik:Pratik9890@cluster0.ezqyayl.mongodb.net/rcb_universe?retryWrites=true&w=majority&appName=Cluster0
```

```
Key: PORT
Value: 5000
```

---

### Step 5: Deploy!
1. Click **"Create Web Service"**
2. Wait 5-10 minutes (watch the logs)
3. Your backend will be at: `https://rcb-universe-backend-xxxx.onrender.com`

---

## ✅ How to Verify It's Working

Visit: `https://your-backend-url.onrender.com/api/health`

You should see:
```json
{
  "status": "OK",
  "message": "RCB Universe API is running!"
}
```

---

## 📋 After Deployment

**COPY YOUR BACKEND URL** and come back!

I will:
1. Update your frontend to connect to it
2. Seed your database with RCB data
3. Make everything work together!

---

**This takes 10 minutes. Let's get your backend live!** 🚀
