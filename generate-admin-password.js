const bcrypt = require("bcryptjs");

async function generatePassword() {
  const password = "admin123";
  const saltRounds = 12;

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log("Password:", password);
    console.log("Hash:", hash);

    // Test the hash
    const isValid = await bcrypt.compare(password, hash);
    console.log("Hash validation:", isValid);
  } catch (error) {
    console.error("Error:", error);
  }
}

generatePassword();
