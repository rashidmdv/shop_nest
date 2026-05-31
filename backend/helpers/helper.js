const Product = require("../models/Product");

const generateRandomOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateRandomCode = (length = 10, code_type = 1) => {
  let code = "";
  if (code_type == 1) {
    const value = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * value.length);
      code += value.charAt(randomIndex);
    }
  } else if (code_type == 2) {
    let value = "ABCDEFGHJKMNPQRSTUVWXYZ0123456789";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * value.length);
      code += value.charAt(randomIndex);
    }
  }
  return code;
};

const generateProductCode = async () => {
  let productCode;
  let exists = true;

  while (exists) {
    const randomCode = generateRandomCode(8, 1);
    productCode = `PP${randomCode}`;
    exists = await Product.findOne({ productCode });
  }
  return productCode;
};

module.exports = {
  generateProductCode,
  generateRandomOtp,
};
