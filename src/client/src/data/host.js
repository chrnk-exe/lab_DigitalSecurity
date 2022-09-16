let host = 'localhost:5000';
if (process.env.NODE_ENV === 'production') {
    host = '62.84.113.204';
}

export default host;
