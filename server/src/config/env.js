const dotenv = require("dotenv");
const path = require("path");
const zod = require("zod");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envSchema = zod.object({
  PORT: zod.string().default("3000"),
  NODE_ENV: zod.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: zod.string(),
  JWT_SECRET: zod.string(),
  JWT_EXPIRES_IN: zod.string().default("7d"),
  CLIENT_URL: zod.string(),
  UPLOAD_DRIVER: zod.enum(["local", "cloudinary"]).default("local"),
  UPLOAD_DIR: zod.string().default("uploads"),
  LOCAL_FILE_BASE_URL: zod.string().default("http://localhost:3000/uploads"),
  CLOUDINARY_CLOUD_NAME: zod.string().optional(),
  CLOUDINARY_API_KEY: zod.string().optional(),
  CLOUDINARY_API_SECRET: zod.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.format());
  process.exit(1);
}

const env = parsed.data;

if (env.NODE_ENV === "production" && env.UPLOAD_DRIVER === "cloudinary") {
  if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
    console.error(" Missing Cloudinary credentials in production!");
    process.exit(1);
  }
}

module.exports = env;
