# 1. Use the official Microsoft Playwright image (Includes Node.js and Browsers)
FROM mcr.microsoft.com/playwright:v1.59.1-jammy

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files first (helps with faster builds/caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Ensure all Linux browser dependencies are present
RUN npx playwright install-deps

# 6. Copy all your project files (tests, pages, config)
COPY . .

# 7. Command to run the tests
CMD ["npx", "playwright", "test"]