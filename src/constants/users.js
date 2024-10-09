// Regular expression to validate email format
export const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

// Access token lifetime (15 minutes)
export const accessTokenLifetime = 1000 * 60 * 15;

// Refresh token lifetime (24 hours)
export const refreshTokenLifetime = 1000 * 60 * 60 * 24;
