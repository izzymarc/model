#!/bin/bash
# Deployment script for Mirabel Udeagha Portfolio

# Display colored output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting deployment process for Mirabel Udeagha Portfolio...${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js and try again.${NC}"
    exit 1
fi

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install || { echo -e "${RED}Failed to install dependencies.${NC}"; exit 1; }

# Run tests if they exist
if grep -q "\"test\":" package.json; then
    echo -e "${YELLOW}Running tests...${NC}"
    npm test || { echo -e "${RED}Tests failed. Aborting deployment.${NC}"; exit 1; }
fi

# Build the application
echo -e "${YELLOW}Building the application...${NC}"
npm run build || { echo -e "${RED}Build failed. Aborting deployment.${NC}"; exit 1; }

# Optimize images
echo -e "${YELLOW}Optimizing images...${NC}"
if command -v npx &> /dev/null; then
    npx imagemin-cli "public/*.{jpg,png,svg}" --out-dir="dist/public"
else
    echo -e "${YELLOW}Imagemin not available, skipping image optimization.${NC}"
fi

# Generate sitemap
echo -e "${YELLOW}Generating sitemap...${NC}"
cat > dist/public/sitemap.xml << EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mirabeludeagha.com/</loc>
    <lastmod>$(date +%Y-%m-%d)</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://mirabeludeagha.com/portfolio</loc>
    <lastmod>$(date +%Y-%m-%d)</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mirabeludeagha.com/about</loc>
    <lastmod>$(date +%Y-%m-%d)</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mirabeludeagha.com/contact</loc>
    <lastmod>$(date +%Y-%m-%d)</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
EOF

# Generate robots.txt
echo -e "${YELLOW}Generating robots.txt...${NC}"
cat > dist/public/robots.txt << EOF
User-agent: *
Allow: /
Sitemap: https://mirabeludeagha.com/sitemap.xml
EOF

# Create .htaccess for Apache servers
echo -e "${YELLOW}Creating .htaccess file...${NC}"
cat > dist/public/.htaccess << EOF
# Enable rewriting
RewriteEngine On

# Redirect to HTTPS
RewriteCond %{HTTPS} off
RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

# Remove trailing slashes
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)/$ /\$1 [L,R=301]

# Handle SPA routing
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Set security headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json application/xml
</IfModule>

# Set caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType text/html "access plus 1 day"
</IfModule>
EOF

echo -e "${GREEN}Deployment package prepared successfully!${NC}"
echo -e "${YELLOW}The compiled application is now available in the 'dist' directory.${NC}"
echo -e "${YELLOW}To deploy to your hosting provider, upload the contents of the 'dist' directory.${NC}"

# For more custom deployment options (uncomment as needed)
# echo -e "${YELLOW}Deploying to server...${NC}"
# rsync -avz --delete dist/ user@yourserver.com:/path/to/deploy/

echo -e "${GREEN}Deployment process completed!${NC}" 