import { test, expect } from '@playwright/test';

test.describe('Platzi Fake Store API Tests', () => {

  test('Full Product Lifecycle: Create, Verify, and Delete', async ({ request }) => {
    // 1. CREATE
    const createResponse = await request.post('https://api.escuelajs.co/api/v1/products/', {
      data: {
        title: "Automation Mastery Book",
        price: 99,
        description: "A comprehensive guide to QA",
        categoryId: 1, // Ensure this ID exists
        images: ["https://placehold.co/600x400"] // Use a more stable placeholder
      }
    });

    // Check if creation worked
    if (createResponse.status() !== 201) {
        console.log(await createResponse.json()); // This will tell us WHY it failed
    }
    expect(createResponse.status()).toBe(201);
    
    const newProduct = await createResponse.json();
    const productId = newProduct.id;

    // 2. VERIFY (GET)
    const getResponse = await request.get(`https://api.escuelajs.co/api/v1/products/${productId}`);
    expect(getResponse.status()).toBe(200);
    const fetched = await getResponse.json();
    expect(fetched.title).toBe("Automation Mastery Book");

    // 3. DELETE
    const deleteResponse = await request.delete(`https://api.escuelajs.co/api/v1/products/${productId}`);
    expect(deleteResponse.status()).toBe(200);
    
    console.log(`Successfully tested lifecycle for Product ID: ${productId}`);
  });

  test('GET /products - Schema and Data Type Validation', async ({ request }) => {
  const response = await request.get('https://api.escuelajs.co/api/v1/products');
  const products = await response.json();
  const firstItem = products[0];

  // 1. Check basic structure
  expect(typeof firstItem.id).toBe('number');
  expect(typeof firstItem.title).toBe('string');
  expect(typeof firstItem.price).toBe('number');
  
  // 2. Check if images is an array (Common in E-commerce)
  expect(Array.isArray(firstItem.images)).toBe(true);
  
  // 3. Check specific business rules
  expect(firstItem.price).toBeGreaterThan(0);
});

test('Authentication: Get Access Token and Profile', async ({ request }) => {
  // 1. LOGIN to get the token
  const loginResponse = await request.post('https://api.escuelajs.co/api/v1/auth/login', {
    data: {
      email: "john@mail.com",
      password: "changeme"
    }
  });

  expect(loginResponse.status()).toBe(201);
  const authData = await loginResponse.json();
  const token = authData.access_token; // This is your 'Golden Key'

  // 2. USE THE TOKEN to get private profile data
  const profileResponse = await request.get('https://api.escuelajs.co/api/v1/auth/profile', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  expect(profileResponse.status()).toBe(200);
  const profile = await profileResponse.json();
  console.log('Logged in as:', profile.name);
  expect(profile.email).toBe("john@mail.com");
});

test('Negative Scenario: Access Profile with Invalid Token', async ({ request }) => {
  // 1. We send a request with a completely fake token
  const response = await request.get('https://api.escuelajs.co/api/v1/auth/profile', {
    headers: {
      'Authorization': 'Bearer ThisIsAFakeToken12345'
    }
  });

  // 2. EXPECTATION: The server should reject us with 401
  expect(response.status()).toBe(401);
  
  // 3. Optional: Check the error message
  const body = await response.json();
  console.log('Server rejected us with message:', body.message);
});



test('GET /products - Filter by Price Range', async ({ request }) => {
  // Testing if the API correctly filters items between $10 and $50
  const response = await request.get('https://api.escuelajs.co/api/v1/products/', {
    params: {
      price_min: 10,
      price_max: 50
    }
  });

  expect(response.ok()).toBeTruthy();
  const products = await response.json();
  
  // Verify every single item in the list fits our price rule
  for (const product of products) {
    expect(product.price).toBeGreaterThanOrEqual(10);
    expect(product.price).toBeLessThanOrEqual(50);
  }
});

test.describe('Platzi Fake Store API Tests', () => {

  test('Full Product Lifecycle: Create, Verify, and Delete', async ({ request }) => {
    // 1. CREATE
    const createResponse = await request.post('https://api.escuelajs.co/api/v1/products/', {
      data: {
        title: "Automation Mastery Book",
        price: 99,
        description: "A comprehensive guide to QA",
        categoryId: 1, // Ensure this ID exists
        images: ["https://placehold.co/600x400"] // Use a more stable placeholder
      }
    });

    // Check if creation worked
    if (createResponse.status() !== 201) {
        console.log(await createResponse.json()); // This will tell us WHY it failed
    }
    expect(createResponse.status()).toBe(201);
    
    const newProduct = await createResponse.json();
    const productId = newProduct.id;

    // 2. VERIFY (GET)
    const getResponse = await request.get(`https://api.escuelajs.co/api/v1/products/${productId}`);
    expect(getResponse.status()).toBe(200);
    const fetched = await getResponse.json();
    expect(fetched.title).toBe("Automation Mastery Book");

    // 3. DELETE
    const deleteResponse = await request.delete(`https://api.escuelajs.co/api/v1/products/${productId}`);
    expect(deleteResponse.status()).toBe(200);
    
    console.log(`Successfully tested lifecycle for Product ID: ${productId}`);
  });

  test('GET /products - Schema and Data Type Validation', async ({ request }) => {
  const response = await request.get('https://api.escuelajs.co/api/v1/products');
  const products = await response.json();
  const firstItem = products[0];

  // 1. Check basic structure
  expect(typeof firstItem.id).toBe('number');
  expect(typeof firstItem.title).toBe('string');
  expect(typeof firstItem.price).toBe('number');
  
  // 2. Check if images is an array (Common in E-commerce)
  expect(Array.isArray(firstItem.images)).toBe(true);
  
  // 3. Check specific business rules
  expect(firstItem.price).toBeGreaterThan(0);
});

test('Authentication: Get Access Token and Profile', async ({ request }) => {
  // 1. LOGIN to get the token
  const loginResponse = await request.post('https://api.escuelajs.co/api/v1/auth/login', {
    data: {
      email: "john@mail.com",
      password: "changeme"
    }
  });

  expect(loginResponse.status()).toBe(201);
  const authData = await loginResponse.json();
  const token = authData.access_token; // This is your 'Golden Key'

  // 2. USE THE TOKEN to get private profile data
  const profileResponse = await request.get('https://api.escuelajs.co/api/v1/auth/profile', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  expect(profileResponse.status()).toBe(200);
  const profile = await profileResponse.json();
  console.log('Logged in as:', profile.name);
  expect(profile.email).toBe("john@mail.com");
});

test('Negative Scenario: Access Profile with Invalid Token', async ({ request }) => {
  // 1. We send a request with a completely fake token
  const response = await request.get('https://api.escuelajs.co/api/v1/auth/profile', {
    headers: {
      'Authorization': 'Bearer ThisIsAFakeToken12345'
    }
  });

  // 2. EXPECTATION: The server should reject us with 401
  expect(response.status()).toBe(401);
  
  // 3. Optional: Check the error message
  const body = await response.json();
  console.log('Server rejected us with message:', body.message);
});



test('GET /products - Filter by Price Range', async ({ request }) => {
  // Testing if the API correctly filters items between $10 and $50
  const response = await request.get('https://api.escuelajs.co/api/v1/products/', {
    params: {
      price_min: 10,
      price_max: 50
    }
  });

  expect(response.ok()).toBeTruthy();
  const products = await response.json();
  
  // Verify every single item in the list fits our price rule
  for (const product of products) {
    expect(product.price).toBeGreaterThanOrEqual(10);
    expect(product.price).toBeLessThanOrEqual(50);
  }
});

  
});  
});