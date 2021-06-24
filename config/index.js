const dev = process.env.NODE_ENV !== 'production';
export const server = dev ? 'http://localhost:3000' : 'https://peaceful-journey-07606.herokuapp.com';
