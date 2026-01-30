# Final Deployment Steps

I have already initialized the Git repositories and committed your code locally with the latest changes.

## 1. Push Backend to GitHub
1. Create a new public repository on GitHub named **money-manager-backend**.
2. Run these commands in your terminal:
   ```powershell
   cd backend
   git remote add origin https://github.com/YOUR_USERNAME/money-manager-backend.git
   git push -u origin main
   ```

## 2. Push Frontend to GitHub
1. Create a new public repository on GitHub named **money-manager-frontend**.
2. Run these commands:
   ```powershell
   cd frontend
   git remote add origin https://github.com/YOUR_USERNAME/money-manager-frontend.git
   git push -u origin main
   ```

## 3. Deploy Backend (Render.com)
1. Go to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** -> **Web Service**.
3. Connect your `money-manager-backend` repo.
4. Add **Environment Variable**: 
   - Key: `MONGO_URI`
   - Value: `mongodb+srv://indrakumarm2005_db_user:Indrakumar2005@moneymanager.6qf9cc6.mongodb.net/MoneyManager?retryWrites=true&w=majority`
5. Click **Deploy**. Copy the URL (e.g., `https://money-manager-api.onrender.com`).

## 4. Deploy Frontend (Vercel)
1. Go to [Vercel Dashboard](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Import `money-manager-frontend`.
4. **IMPORTANT**: In "Environment Variables", add:
   - Key: `VITE_API_URL`
   - Value: `https://money-manager-api.onrender.com/api/v1` (The URL you got from Render step 3)
   *(Note: You might need to quickly update `src/context/GlobalContext.jsx` to use `import.meta.env.VITE_API_URL` if you haven't yet, or just hardcode the render URL before pushing).*
5. Click **Deploy**.

## 5. Submit
Open `SUBMISSION.txt`, fill in your final URLs, and submit!
