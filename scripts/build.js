#!/usr/bin/env node

/**
 * Build script for Student Guide App
 * Handles production build with optimizations
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const log = (message) => console.log(`🔧 ${message}`);
const error = (message) => console.error(`❌ ${message}`);
const success = (message) => console.log(`✅ ${message}`);

async function build() {
  try {
    log('Starting production build...');

    // Clean previous build
    log('Cleaning previous build...');
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true });
    }

    // Install dependencies
    log('Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    // Run build
    log('Building application...');
    execSync('npm run build', { stdio: 'inherit' });

    // Verify build output
    if (!fs.existsSync('dist')) {
      throw new Error('Build failed - dist directory not found');
    }

    // Check for required files
    const requiredFiles = [
      'dist/index.html',
      'dist/manifest.json',
      'dist/sw.js',
      'dist/offline.html'
    ];

    for (const file of requiredFiles) {
      if (!fs.existsSync(file)) {
        error(`Required file missing: ${file}`);
      } else {
        success(`Found: ${file}`);
      }
    }

    // Generate build info
    const buildInfo = {
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      node_version: process.version,
      build_env: 'production'
    };

    fs.writeFileSync(
      'dist/build-info.json', 
      JSON.stringify(buildInfo, null, 2)
    );

    success('Build completed successfully!');
    log(`Build info saved to dist/build-info.json`);

  } catch (err) {
    error(`Build failed: ${err.message}`);
    process.exit(1);
  }
}

build();
