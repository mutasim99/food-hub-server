import app from "../app/app";
import { prisma } from "../lib/prisma";

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await prisma.$connect();
    console.log("prisma connected successfully");
    app.listen(PORT, () => {
      console.log(`your app is running on port:${PORT}`);
    });
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main()
