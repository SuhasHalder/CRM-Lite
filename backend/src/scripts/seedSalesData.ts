import mongoose from "mongoose";
import { connectDB } from "../config/db";
import { Lead } from "../models/lead.model";
import { User } from "../models/user.model";

type SeedUser = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

type SeedLead = {
  title: string;
  company: string;
  contactEmail: string;
  value: number;
  status: string;
  stage: string;
  ownerEmail: string;
};

const users: SeedUser[] = [
  {
    name: "Sales Admin",
    email: "admin@salescrm.com",
    password: "Admin@123",
    role: "admin",
  },
  {
    name: "Aarav Singh",
    email: "aarav@salescrm.com",
    password: "User@123",
    role: "user",
  },
  {
    name: "Maya Patel",
    email: "maya@salescrm.com",
    password: "User@123",
    role: "user",
  },
  {
    name: "Rohan Mehta",
    email: "rohan@salescrm.com",
    password: "User@123",
    role: "user",
  },
];

const leads: SeedLead[] = [
  {
    title: "CRM Automation Setup",
    company: "Acme Corp",
    contactEmail: "ops@acmecorp.com",
    value: 18000,
    status: "active",
    stage: "qualified",
    ownerEmail: "aarav@salescrm.com",
  },
  {
    title: "Sales Dashboard Integration",
    company: "Nova Retail",
    contactEmail: "tech@novaretail.com",
    value: 24000,
    status: "active",
    stage: "proposal",
    ownerEmail: "aarav@salescrm.com",
  },
  {
    title: "Lead Tracking Migration",
    company: "Zenith Labs",
    contactEmail: "info@zenithlabs.com",
    value: 15000,
    status: "new",
    stage: "contacted",
    ownerEmail: "maya@salescrm.com",
  },
  {
    title: "Pipeline Optimization Plan",
    company: "Urban Homes",
    contactEmail: "sales@urbanhomes.com",
    value: 22000,
    status: "active",
    stage: "proposal",
    ownerEmail: "maya@salescrm.com",
  },
  {
    title: "Follow-up Workflow Revamp",
    company: "Orbit Tech",
    contactEmail: "hello@orbittech.com",
    value: 13000,
    status: "new",
    stage: "qualified",
    ownerEmail: "rohan@salescrm.com",
  },
  {
    title: "Territory Sales Rollout",
    company: "BluePeak Stores",
    contactEmail: "contact@bluepeakstores.com",
    value: 27000,
    status: "active",
    stage: "won",
    ownerEmail: "rohan@salescrm.com",
  },
];

async function seedSalesData() {
  await connectDB();

  for (const user of users) {
    const existing = await User.findOne({ email: user.email });
    if (!existing) {
      await User.create(user);
    }
  }

  const usersByEmail = new Map<string, string>();
  const allUsers = await User.find({ email: { $in: users.map((u) => u.email) } });
  allUsers.forEach((user) => usersByEmail.set(user.email, String(user._id)));

  for (const lead of leads) {
    const ownerId = usersByEmail.get(lead.ownerEmail);
    if (!ownerId) continue;

    await Lead.updateOne(
      { company: lead.company, owner: ownerId },
      {
        $set: {
          title: lead.title,
          contactEmail: lead.contactEmail,
          value: lead.value,
          status: lead.status,
          stage: lead.stage,
          owner: ownerId,
        },
      },
      { upsert: true },
    );
  }

  // eslint-disable-next-line no-console
  console.log("Seed complete: sales users and leads added/updated.");
  await mongoose.disconnect();
}

seedSalesData().catch(async (err) => {
  // eslint-disable-next-line no-console
  console.error("Seed failed:", err);
  await mongoose.disconnect();
  process.exit(1);
});
