const asyncHandler = fn => (req, res, next) =>   Promise.resolve(fn(req, res, next)).catch(next);
  
  // Usage in controller:
  // getUser = asyncHandler(async (req, res) => {
  // const user = await UserService.getUser(req.params.id);
  // res.json(user);
  // });

  //module.exports = getUser;