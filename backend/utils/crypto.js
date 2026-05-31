const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const secretKey = crypto
  .createHash("sha256")
  .update("your-secret-key")
  .digest("hex")
  .substring(0, 32);
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted,
  };
};

const decrypt = (encryptedData, ivHex) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(ivHex, "hex"),
  );
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

module.exports = {
  encrypt,
  decrypt,
};
