const asyncHandler = fn => (req, res, next) => 
    Promise.resolve(fn(req, res, next)).catch(next);
  
  // Usage in routes
  router.get('/', asyncHandler(async (req, res) => {
    const data = await someAsyncOperation();
    res.json(data);
  }));