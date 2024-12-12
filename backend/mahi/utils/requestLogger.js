const requestLogger = (req, res, next) => {
    const start = Date.now();
  
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`${req.method} ${req.url} [${res.statusCode}] ${duration}ms`);
      console.log('Headers:', req.headers);
      console.log('Body:', req.body);
    });
  
    next();
  };
  
  export default requestLogger;
  