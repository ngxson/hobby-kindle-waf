/**
 * This module provides Kindle-specific functions
 */

export const screenWidth = window.screen.width;
export const screenHeight = window.screen.height;
export const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
export const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);