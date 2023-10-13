/**
 * Verification function borrowed from
 * https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries#typescript-example
 */
import * as crypto from "crypto";

// Load .env file
import 'dotenv/config'

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export const verifySignature = (req) => {
  const signature = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");
  let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
  let untrusted =  Buffer.from(req.headers["x-hub-signature-256"], 'ascii');
  return crypto.timingSafeEqual(trusted, untrusted);
};
