import Service from "./service.js";

class Controller {
  constructor() {
    this.service = new Service();
  }

  getUser = async (req, res, next) => {
    try {
      const email = req.params.email;
      const user = await this.service.getUser(email);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req, res, next) => {
    try {
      const { email, address, addressDetail } = req.body;
      const user = await this.service.createUser({
        email,
        address,
        addressDetail,
      });

      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  };
}

export default Controller;
