# Vercel Environment Variables Setup for TinaCMS

## You Need to Add These to Vercel Dashboard

Go to: https://vercel.com/ameer5070aa-progs-projects/i-t-portfolio/settings/environment-variables

Add these 3 environment variables:

### 1. NEXT_PUBLIC_TINA_CLIENT_ID
**Value:** `d09c9da7-7a30-401b-a916-19cf41496921`
**Environment:** Production, Preview, Development (check all 3)

### 2. NEXT_PUBLIC_TINA_BRANCH
**Value:** `main`
**Environment:** Production, Preview, Development (check all 3)

### 3. TINA_TOKEN
**Value:** Leave empty for now (or get from TinaCMS dashboard if needed)
**Environment:** Production, Preview, Development (check all 3)

## Steps:

1. Go to Vercel dashboard: https://vercel.com/
2. Select your project: "I.T_Portfolio"
3. Go to Settings → Environment Variables
4. Click "Add New"
5. Add each variable one by one
6. Click "Save"
7. After adding all 3, go to Deployments tab
8. Click "Redeploy" on the latest deployment

## After Redeployment:

Visit: https://ameeromer-portfolio.vercel.app/admin

You should now see the TinaCMS admin panel working with your collections (Hero Section, About Section, Projects, Contact Info).
