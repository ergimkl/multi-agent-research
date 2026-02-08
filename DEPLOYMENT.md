# 🚀 Deployment Guide - Multi-Agent Research System

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

**Why Vercel?**
- ✅ Built for Next.js
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Easy environment variables

**Steps:**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-github-repo-url
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings

3. **Add Environment Variables**
   - In Vercel dashboard → Settings → Environment Variables
   - Add:
     - `BRAVE_SEARCH_API_KEY` = your_key
     - `ANTHROPIC_API_KEY` = your_key
   - Redeploy

4. **Done!**
   - Your app is live at: `https://your-project.vercel.app`

---

### Option 2: Netlify

**Steps:**

1. **Build command:** `npm run build`
2. **Publish directory:** `.next`
3. **Add environment variables** in Netlify dashboard
4. **Deploy**

---

### Option 3: Railway

**Steps:**

1. Connect your GitHub repo
2. Railway auto-detects Next.js
3. Add environment variables
4. Deploy

---

### Option 4: Your Own Server

**Requirements:**
- Node.js 18+
- PM2 (process manager)

**Steps:**

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Start with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "multi-agent-research" -- start
   pm2 save
   pm2 startup
   ```

3. **Set up Nginx reverse proxy** (optional)
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Environment Variables Setup

### For All Platforms

Add these environment variables:

```env
BRAVE_SEARCH_API_KEY=your_brave_search_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### Where to Get API Keys

**Brave Search API**
- URL: https://brave.com/search/api/
- Free Tier: 2,000 queries/month
- Paid: $5/month for 20,000 queries

**Anthropic Claude API**
- URL: https://console.anthropic.com/
- Pay-as-you-go pricing
- ~$3 for Claude Sonnet per million tokens

---

## Pre-Deployment Checklist

- [ ] Test locally with `npm run dev`
- [ ] Verify build works with `npm run build`
- [ ] Test API keys are working
- [ ] Update README with your details
- [ ] Remove any sensitive data
- [ ] Test on mobile devices
- [ ] Check performance with Lighthouse

---

## Cost Estimation

### Free Demo (No API Keys)
- **Cost:** $0
- **Uses:** Mock data
- **Perfect for:** Portfolio showcase

### With API Keys (Production)
- **Brave Search:** ~$5/month (20k queries)
- **Claude API:** ~$10-30/month (depending on usage)
- **Total:** ~$15-35/month for production use

---

## Performance Optimization

### For Production

1. **Enable caching**
   - Cache search results
   - Cache AI responses for common queries

2. **Rate limiting**
   - Limit requests per user
   - Prevent API key abuse

3. **CDN**
   - Use Vercel's CDN
   - Or Cloudflare for custom domains

---

## Monitoring

### Vercel Analytics
- Built-in with Vercel deployment
- Free tier available

### Custom Monitoring
```bash
# Install Sentry for error tracking
npm install @sentry/nextjs
```

---

## Security Best Practices

1. **Never commit API keys**
   - Use `.env.local`
   - Add `.env*.local` to `.gitignore`

2. **Rate limiting**
   - Implement on API routes
   - Prevent abuse

3. **Input validation**
   - Sanitize user inputs
   - Prevent injection attacks

4. **HTTPS only**
   - Enforce HTTPS in production
   - All platforms support this

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### API Keys Not Working
- Check environment variables are set correctly
- Restart the server after adding keys
- Verify keys are valid on provider websites

### Slow Performance
- Enable caching
- Use production build (`npm run build`)
- Optimize images and assets

---

## Support

- **Issues:** Open an issue on GitHub
- **Questions:** Create a discussion
- **LinkedIn:** [Your LinkedIn]

---

**Pro Tip:** Deploy to Vercel first - it's the easiest and most reliable option for Next.js apps!
