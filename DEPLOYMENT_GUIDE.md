# GitHub Pages Deployment Guide

## 🚀 Deploy Your Diwali Auction Website to GitHub Pages

Your art portfolio auction website is ready to be published online! Follow these steps to make it accessible to everyone.

## 📋 Prerequisites

- Your code is already in a GitHub repository: `art-portfolio-showca`
- You have push access to the repository
- The build completed successfully (✅ Done!)

## 🎯 Deployment Steps

### Step 1: Push Your Changes to GitHub

```bash
# Add all changes
git add .

# Commit the changes
git commit -m "🪔 Add Diwali charity auction with Google Sheets integration"

# Push to GitHub
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your GitHub repository: `https://github.com/msjammu/art-portfolio-showca`
2. Click on **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select **"GitHub Actions"**
5. The workflow will automatically trigger and deploy your site

### Step 3: Monitor Deployment

1. Go to the **"Actions"** tab in your repository
2. You should see a workflow called **"Deploy to GitHub Pages"** running
3. Wait for it to complete (usually takes 2-3 minutes)
4. Once complete, your site will be live!

## 🌐 Your Live Website URL

Once deployed, your Diwali auction will be available at:

**https://msjammu.github.io/art-portfolio-showca/**

## ✅ What's Included in Your Deployment

- **🪔 Diwali Charity Auction** - Fully functional bidding system
- **📊 Google Sheets Integration** - Automatic bid tracking
- **🎨 Art Portfolio** - Professional artist showcase
- **📱 Mobile Responsive** - Works on all devices
- **🔗 Social Links** - Instagram integration
- **💚 UTSAV USA Integration** - Charity donation tracking

## 🔧 Automatic Updates

**Your site will automatically update whenever you:**
1. Make changes to your code
2. Push to the `main` branch
3. GitHub Actions will rebuild and redeploy automatically

## 📊 Managing Your Live Auction

Once live, you can:
1. **Share the URL** with potential bidders
2. **Monitor bids** in your Google Sheet
3. **Update content** by pushing code changes
4. **Track auction progress** in real-time

## 🎆 Post-Deployment Checklist

After deployment:
- [ ] Visit your live site and test the bidding process
- [ ] Place a test bid to verify Google Sheets integration
- [ ] Check that all images and videos load properly
- [ ] Test on mobile devices
- [ ] Share the link with friends for testing

## 🆘 Troubleshooting

If something doesn't work:
1. **Check GitHub Actions** - Look for error messages in the Actions tab
2. **Verify Google Sheets** - Make sure your Google Apps Script is still working
3. **Test locally first** - Run `npm run dev` to test changes locally
4. **Check browser console** - Look for JavaScript errors

## 🎊 Your Diwali Auction is Ready!

Your professional art auction website is now ready to help raise funds for UTSAV USA while showcasing beautiful handmade art from Bothell, WA!

**Live URL:** https://msjammu.github.io/art-portfolio-showca/

Happy bidding! 🪔✨