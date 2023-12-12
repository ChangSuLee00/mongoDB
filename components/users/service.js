class Service {
  getUser = async (email) => {
    return User.findOne(email);
  };

  createUser = async ({ email, address, addressDetail }) => {
    return "hello";
  };
}

export default Service;
