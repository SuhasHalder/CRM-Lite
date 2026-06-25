import dns from "node:dns";
import mongoose from "mongoose";
import { env } from "./env";

const applyCustomDnsIfConfigured = () => {
  if (!env.DNS_SERVERS) return;
  const servers = env.DNS_SERVERS.split(",").map((s) => s.trim()).filter(Boolean);
  if (servers.length === 0) return;
  dns.setServers(servers);
};

export const connectDB = async () => {
  try {
    applyCustomDnsIfConfigured();
    await mongoose.connect(env.MONGODB_URI);
    // eslint-disable-next-line no-console
    console.log("MongoDB connected");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(
      "MongoDB connection failed. Local: start MongoDB. Atlas: allow your IP in Network Access, use %40 for @ in passwords, and if you see querySrv ECONNREFUSED set DNS_SERVERS=8.8.8.8,1.1.1.1 in .env or fix Windows DNS / VPN."
    );
    throw err;
  }
};
