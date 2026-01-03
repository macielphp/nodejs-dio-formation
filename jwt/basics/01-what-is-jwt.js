// ============================================
// PART 1: Examining a Real JWT
// ============================================
const exampleJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMzQ1LCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJyb2xlIjoidXNlciIsImlhdCI6MTcxNjIzOTAyMiwiZXhwIjoxNzE2MjQyNjIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
console.log("📦 Complete JWT Token:");
console.log(exampleJWT);
console.log("\n" + "=".repeat(60) + "\n");
// ============================================
// PART 2: Splitting the JWT into Parts
// ============================================
const parts = exampleJWT.split('.');
console.log("🔍 JWT has 3 parts separated by dots:\n");
console.log("Part 1 (HEADER):    ", parts[0]);
console.log("Part 2 (PAYLOAD):   ", parts[1]);
console.log("Part 3 (SIGNATURE): ", parts[2]);
console.log("\n" + "=".repeat(60) + "\n");
// ============================================
// PART 3: Understanding Base64URL Encoding
// ============================================
console.log("📚 What is Base64URL Encoding?\n");
console.log("- Base64URL is a way to encode binary data as text");
console.log("- It's NOT encryption (anyone can decode it!)");
console.log("- It makes data URL-safe (no special characters)");
console.log("- We can decode it without any secret key\n");

// ============================================
// PART 4: Decoding the HEADER
// ============================================
function base64UrlDecode(str) {
  // Replace URL-safe characters back to standard Base64
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  
  // Add padding if needed
  while (base64.length % 4) {
    base64 += '=';
  }
  
  // Decode from Base64 and parse JSON
  const jsonString = Buffer.from(base64, 'base64').toString('utf-8');
  return JSON.parse(jsonString);
}
console.log("🔓 DECODING HEADER:\n");
console.log("Encoded:", parts[0]);

const header = base64UrlDecode(parts[0]);
console.log("Decoded:", JSON.stringify(header, null, 2));
console.log("\nHeader tells us:");
console.log("  - alg (algorithm): How the signature is created");
console.log("  - typ (type): This is a JWT token");
console.log("\n" + "=".repeat(60) + "\n");
// ============================================
// PART 5: Decoding the PAYLOAD
// ============================================
console.log("🔓 DECODING PAYLOAD:\n");
console.log("Encoded:", parts[1]);

const payload = base64UrlDecode(parts[1]);
console.log("Decoded:", JSON.stringify(payload, null, 2));
console.log("\nPayload contains:");
console.log("  - userId: User's unique identifier");
console.log("  - username: User's name");
console.log("  - role: User's permission level");
console.log("  - iat (issued at): When token was created");
console.log("  - exp (expiration): When token expires");
console.log("\n⚠️  IMPORTANT: This data is NOT encrypted!");
console.log("   Anyone can decode and read this information.");
console.log("   Never put sensitive data (passwords, credit cards) in JWT!\n");
console.log("=".repeat(60) + "\n");
// ============================================
// PART 6: Understanding the SIGNATURE
// ============================================
console.log("🔐 UNDERSTANDING SIGNATURE:\n");
console.log("Encoded:", parts[2]);
console.log("\nThe signature is created by:");
console.log("  1. Taking the encoded header + '.' + encoded payload");
console.log("  2. Hashing it with a SECRET KEY using HMAC-SHA256");
console.log("  3. Encoding the result in Base64URL");
console.log("\nThe signature PROVES:");
console.log("  ✓ The token wasn't tampered with");
console.log("  ✓ It was created by someone with the secret key");
console.log("  ✗ But it does NOT hide the header or payload!\n");
console.log("=".repeat(60) + "\n");
// ============================================
// PART 7: Manual JWT Creation (Concept)
// ============================================
console.log("🛠️  HOW JWT IS CREATED (Step by Step):\n");

const myHeader = { alg: "HS256", typ: "JWT" };
const myPayload = { 
  userId: 99, 
  username: "alice",
  iat: Math.floor(Date.now() / 1000)
};

console.log("1. Create Header:", JSON.stringify(myHeader));
console.log("2. Create Payload:", JSON.stringify(myPayload));

function base64UrlEncode(obj) {
  const jsonString = JSON.stringify(obj);
  const base64 = Buffer.from(jsonString).toString('base64');
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

const encodedHeader = base64UrlEncode(myHeader);
const encodedPayload = base64UrlEncode(myPayload);

console.log("\n3. Encode Header:  ", encodedHeader);
console.log("4. Encode Payload: ", encodedPayload);
console.log("\n5. Create signature by hashing:");
console.log("   HMAC-SHA256(");
console.log("     '" + encodedHeader + "." + encodedPayload + "',");
console.log("     'YOUR_SECRET_KEY'");
console.log("   )");
console.log("\n6. Combine all three parts with dots:");
console.log("   header.payload.signature");
console.log("\n" + "=".repeat(60) + "\n");
// ============================================
// PART 7: Manual JWT Creation (Concept)
// ============================================
console.log("🛠️  HOW JWT IS CREATED (Step by Step):\n");

const myHeader1 = { alg: "HS256", typ: "JWT" };
const myPayload1 = { 
  userId: 99, 
  username: "alice",
  iat: Math.floor(Date.now() / 1000)
};

console.log("1. Create Header:", JSON.stringify(myHeader1));
console.log("2. Create Payload:", JSON.stringify(myPayload1));

function base64UrlEncode(obj) {
  const jsonString = JSON.stringify(obj);
  const base64 = Buffer.from(jsonString).toString('base64');
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

const encodedHeader1 = base64UrlEncode(myHeader1);
const encodedPayload1 = base64UrlEncode(myPayload1);

console.log("\n3. Encode Header:  ", encodedHeader1);
console.log("4. Encode Payload: ", encodedPayload1);
console.log("\n5. Create signature by hashing:");
console.log("   HMAC-SHA256(");
console.log("     '" + encodedHeader1 + "." + encodedPayload1 + "',");
console.log("     'YOUR_SECRET_KEY'");
console.log("   )");
console.log("\n6. Combine all three parts with dots:");
console.log("   header.payload.signature");
console.log("\n" + "=".repeat(60) + "\n");
// ============================================
// PART 8: Key Takeaways
// ============================================
console.log("🎯 KEY TAKEAWAYS:\n");
console.log("✓ JWT = Header + Payload + Signature");
console.log("✓ Header & Payload are Base64URL encoded (readable by anyone!)");
console.log("✓ Signature proves authenticity using a secret key");
console.log("✓ JWT is for VERIFICATION, not ENCRYPTION");
console.log("✓ Never put passwords or sensitive data in JWT");
console.log("✓ Anyone can decode and read JWT contents");
console.log("✓ Only someone with the secret key can CREATE valid JWTs");
console.log("\n" + "=".repeat(60) + "\n");
// ============================================
// EXERCISES FOR YOU
// ============================================
console.log("📝 EXERCISES:\n");
console.log("1. Try decoding this JWT and see what's inside:");
console.log("   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxpY2UiLCJhZ2UiOjMwfQ.xyz");
console.log("\n2. What happens if you change one character in the payload?");
console.log("   Hint: The signature won't match anymore!");
console.log("\n3. Go to https://jwt.io and paste a JWT to decode it visually");
console.log("\n4. Create your own header and payload objects and encode them");
console.log("\n" + "=".repeat(60) + "\n");


// ============================================
// BONUS: Try It Yourself
// ============================================
console.log("🚀 TRY IT YOURSELF:\n");
const yourJWT = "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.owv7q9nVbW5tqUezF_G2nHTra-ANW3HqW9epyVwh08Y-Z-FKsnG8eBIpC4GTfTVU";

try {
  const yourParts = yourJWT.split('.');
  const yourHeader = base64UrlDecode(yourParts[0]);
  const yourPayload = base64UrlDecode(yourParts[1]);
  
  console.log("Your decoded Header:", yourHeader);
  console.log("Your decoded Payload:", yourPayload);
} catch (error) {
  console.log("Decode the exercise JWT above!");
}

console.log("\n✨ Next: Task 2 - Creating and signing your own JWT!");
console.log("=".repeat(60));

