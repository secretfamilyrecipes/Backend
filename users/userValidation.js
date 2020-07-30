module.exports = {
    isValid,
  };
  
  function isValid(user) {
    return Boolean(user.username && user.email && user.password && typeof user.password === "string");
  }  