# 🚀 Deployment Guide - Student Guide App

This guide covers deploying the Student Guide app to various platforms with PWA support.

## 📋 Pre-deployment Checklist

- [ ] All features tested locally
- [ ] PWA manifest configured
- [ ] Service worker registered
- [ ] Icons generated for all sizes
- [ ] Build process successful
- [ ] Environment variables configured
- [ ] Performance optimized

## 🌐 Deployment Options

### 1. Vercel (Recommended)

Vercel provides excellent support for React apps with automatic PWA optimization.

#### Quick Deploy

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

#### GitHub Integration

1. Push code to GitHub repository
2. Connect repository to Vercel dashboard
3. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### Custom Domain

1. Add domain in Vercel dashboard
2. Configure DNS records
3. SSL automatically provisioned

### 2. Netlify

Great for static sites with form handling and edge functions.

#### Drag & Drop Deploy

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Drag `dist` folder** to Netlify dashboard

#### Git Integration

1. Connect GitHub repository
2. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

#### Custom Headers for PWA

Create `public/_headers`:
```
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/manifest.json
  Content-Type: application/manifest+json

/sw.js
  Cache-Control: no-cache
```

### 3. GitHub Pages

Free hosting for open source projects.

#### Setup

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script** to `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Configure base URL** in `vite.config.js`:
   ```javascript
   export default defineConfig({
     base: '/student-guide-app/',
     // ... other config
   })
   ```

4. **Deploy**
   ```bash
   npm run build
   npm run deploy
   ```

### 4. Firebase Hosting

Google's hosting with excellent PWA support.

#### Setup

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login and initialize**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure `firebase.json`**:
   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ],
       "headers": [
         {
           "source": "/sw.js",
           "headers": [
             {
               "key": "Cache-Control",
               "value": "no-cache"
             }
           ]
         }
       ]
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## 🔧 Build Optimization

### Vite Configuration

Update `vite.config.js` for production:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          maps: ['leaflet', 'react-leaflet'],
          icons: ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 5173
  }
})
```

### Environment Variables

Create `.env.production`:
```
VITE_APP_NAME=Student Guide
VITE_APP_VERSION=1.0.0
VITE_API_URL=https://api.studentguide.ng
```

## 📱 PWA Deployment Considerations

### Service Worker

Ensure service worker is properly configured:

1. **Cache Strategy**: Update cache names for new versions
2. **Offline Fallback**: Test offline functionality
3. **Update Notifications**: Implement update prompts

### Manifest Validation

Use tools to validate PWA manifest:
- [PWA Builder](https://www.pwabuilder.com/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Icons Generation

Generate all required icon sizes:
```bash
# Using PWA Asset Generator
npx pwa-asset-generator logo.svg public/icons --manifest public/manifest.json
```

## 🔍 Testing Deployment

### Local Testing

1. **Build and preview**
   ```bash
   npm run build
   npm run preview
   ```

2. **Test PWA features**
   - Install prompt
   - Offline functionality
   - Service worker updates

### Production Testing

1. **Lighthouse Audit**
   - Performance: 90+
   - Accessibility: 90+
   - Best Practices: 90+
   - SEO: 90+
   - PWA: All checks passed

2. **Cross-browser Testing**
   - Chrome/Edge (Chromium)
   - Firefox
   - Safari (iOS/macOS)

3. **Device Testing**
   - Mobile phones
   - Tablets
   - Desktop

## 🚨 Troubleshooting

### Common Issues

1. **Service Worker Not Updating**
   - Clear browser cache
   - Check cache names in SW
   - Verify SW registration

2. **PWA Not Installable**
   - Validate manifest.json
   - Check HTTPS requirement
   - Verify icon sizes

3. **Build Failures**
   - Check Node.js version
   - Clear node_modules and reinstall
   - Verify all dependencies

### Performance Issues

1. **Large Bundle Size**
   - Implement code splitting
   - Lazy load components
   - Optimize images

2. **Slow Loading**
   - Enable compression
   - Use CDN
   - Optimize assets

## 📊 Monitoring

### Analytics

Add analytics to track usage:
```javascript
// Google Analytics 4
gtag('config', 'GA_MEASUREMENT_ID', {
  page_title: 'Student Guide',
  page_location: window.location.href
});
```

### Error Tracking

Implement error monitoring:
```javascript
// Sentry example
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production"
});
```

## 🔄 Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📞 Support

For deployment issues:
- Check the [troubleshooting section](#-troubleshooting)
- Create an issue on GitHub
- Contact: deploy@studentguide.ng
