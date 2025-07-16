// src/polyfills.ts

if (typeof globalThis.crypto === 'undefined') {
  try {
    const { webcrypto } = require('node:crypto');
    Object.defineProperty(globalThis, 'crypto', {
      value: webcrypto,
      configurable: true,
      writable: false,
    });
  } catch (err) {
    console.error('❌ Failed to polyfill crypto:', err);
  }
}
