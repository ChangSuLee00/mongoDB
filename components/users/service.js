import User from "../../models/User.js";
import Region from "../../models/Region.js";
import createError from "http-errors";

class Service {
  async createUser({ email, country, city, district, addressDetail }) {
    if (!email || !country || !city || !district) {
      throw createError(400, "Missing required fields");
    }

    let region = await Region.findOne({ country, city, district });
    if (!region) {
      region = new Region({ country, city, district });
      await region.save();
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw createError(409, "User already exists with this email");
    }

    const newUser = new User({ email, address: region._id, addressDetail });
    await newUser.save();

    return newUser;
  }
}

export default Service;
