// src/app/app.ts
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum Role {\n  CUSTOMER\n  PROVIDER\n  ADMIN\n}\n\nenum OrderStatus {\n  PLACED\n  PREPARING\n  READY\n  DELIVERED\n  CANCELLED\n}\n\nmodel ProviderProfile {\n  id       String  @id @default(uuid())\n  userId   String  @unique\n  shopName String\n  address  String\n  phone    String\n  image    String\n  user     User    @relation(fields: [userId], references: [id])\n  Meal     Meal[]\n  Order    Order[]\n}\n\nmodel Category {\n  id    String @id @default(uuid())\n  name  String @unique\n  image String\n  Meal  Meal[]\n}\n\nmodel Meal {\n  id          String          @id @default(uuid())\n  name        String          @unique\n  description String\n  price       Float\n  image       String?\n  providerId  String\n  provider    ProviderProfile @relation(fields: [providerId], references: [id])\n  categoryId  String\n  category    Category        @relation(fields: [categoryId], references: [id])\n  createdAt   DateTime        @default(now())\n  OrderItem   OrderItem[]\n  review      Review[]\n}\n\nmodel Order {\n  id         String          @id @default(uuid())\n  customerId String\n  providerId String\n  status     OrderStatus     @default(PLACED)\n  address    String\n  total      Float\n  customer   User            @relation(fields: [customerId], references: [id])\n  createdAt  DateTime        @default(now())\n  items      OrderItem[]\n  provider   ProviderProfile @relation(fields: [providerId], references: [id])\n}\n\nmodel OrderItem {\n  id      String @id @default(uuid())\n  orderId String\n  mealId  String\n  qty     Int\n  price   Float\n  order   Order  @relation(fields: [orderId], references: [id])\n  meal    Meal   @relation(fields: [mealId], references: [id])\n}\n\nmodel Review {\n  id        String   @id @default(uuid())\n  rating    Int\n  comment   String\n  userId    String\n  mealId    String\n  meal      Meal     @relation(fields: [mealId], references: [id])\n  user      User     @relation(fields: [userId], references: [id])\n  createdAt DateTime @default(now())\n}\n\nmodel User {\n  id              String           @id\n  name            String\n  email           String\n  emailVerified   Boolean          @default(false)\n  image           String?\n  createdAt       DateTime         @default(now())\n  updatedAt       DateTime         @updatedAt\n  sessions        Session[]\n  accounts        Account[]\n  ProviderProfile ProviderProfile?\n  Order           Order[]\n  Review          Review[]\n\n  role   String? @default("CUSTOMER")\n  phone  Int?\n  status String? @default("ACTIVE")\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"shopName","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ProviderProfileToUser"},{"name":"Meal","kind":"object","type":"Meal","relationName":"MealToProviderProfile"},{"name":"Order","kind":"object","type":"Order","relationName":"OrderToProviderProfile"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"Meal","kind":"object","type":"Meal","relationName":"CategoryToMeal"}],"dbName":null},"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"image","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"MealToProviderProfile"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMeal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"OrderItem","kind":"object","type":"OrderItem","relationName":"MealToOrderItem"},{"name":"review","kind":"object","type":"Review","relationName":"MealToReview"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"address","kind":"scalar","type":"String"},{"name":"total","kind":"scalar","type":"Float"},{"name":"customer","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"OrderToProviderProfile"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"qty","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrderItem"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReview"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"ProviderProfile","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileToUser"},{"name":"Order","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"Review","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"role","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"Int"},{"name":"status","kind":"scalar","type":"String"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: [process.env.APP_URL],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
    }
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false
    },
    disableCSRFCheck: true
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false
      },
      phone: {
        type: "number",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  }
});

// src/modules/providers/providers.routes.ts
import { Router } from "express";

// src/middleware/auth.middleware.ts
import { fromNodeHeaders } from "better-auth/node";
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "you are not authorized!"
        });
      }
      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "please verify your email"
        });
      }
      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
        emailVerified: session.user.emailVerified
      };
      if (roles.length && !roles.includes(session.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden!, you can not access this"
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
var auth_middleware_default = auth2;

// src/modules/providers/providers.service.ts
var getProviderByUserId = async (userId) => {
  return prisma.providerProfile.findUnique({
    where: {
      userId
    }
  });
};
var getMyMeals = async (userId) => {
  const provider = await getProviderByUserId(userId);
  if (!provider) {
    throw new Error("You are not authorized");
  }
  const meals = await prisma.meal.findMany({
    where: {
      providerId: provider.id
    },
    include: {
      category: true
    }
  });
  return meals || [];
};
var addMeal = async (data, userId) => {
  const provider = await getProviderByUserId(userId);
  if (!provider) {
    throw new Error("Provider profile not found");
  }
  return prisma.meal.create({
    data: { ...data, providerId: provider.id }
  });
};
var updateMeal = async (mealId, userId, data) => {
  const provider = await getProviderByUserId(userId);
  if (!provider) {
    throw new Error("Provider profile not found");
  }
  const meal = await prisma.meal.findUnique({
    where: {
      id: mealId
    }
  });
  if (!meal) {
    throw new Error("Meal not found");
  }
  if (meal.providerId !== provider.id) {
    throw new Error("You are not able to update this meal");
  }
  return await prisma.meal.update({
    where: {
      id: mealId
    },
    data
  });
};
var deleteMeal = async (mealId, userId) => {
  const provider = await getProviderByUserId(userId);
  if (!provider) {
    throw new Error("Provider not found");
  }
  const meal = await prisma.meal.findUnique({
    where: {
      id: mealId
    }
  });
  if (!meal) {
    throw new Error("Meal not found");
  }
  if (meal.providerId !== provider.id) {
    throw new Error("You are not able to delete this meal");
  }
  return await prisma.meal.delete({
    where: {
      id: mealId
    }
  });
};
var getProviderOrders = async (userId) => {
  const provider = await getProviderByUserId(userId);
  if (!provider) {
    throw new Error("Provider profile is not found");
  }
  return await prisma.order.findMany({
    where: {
      providerId: provider.id
    },
    include: {
      customer: {
        select: {
          name: true,
          email: true
        }
      },
      items: {
        include: {
          meal: {
            select: {
              name: true,
              image: true
            }
          }
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var updateOrderStatus = async (orderId, userId, status) => {
  const provider = await getProviderByUserId(userId);
  if (!provider) {
    throw new Error("Provider profile is not found");
  }
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      items: {
        some: {
          meal: {
            providerId: provider.id
          }
        }
      }
    }
  });
  if (!order) {
    throw new Error("Order not found or not authorized");
  }
  const allowed = {
    PLACED: ["PLACED"],
    PREPARING: ["PREPARING"],
    READY: ["READY"],
    DELIVERED: ["DELIVERED"],
    CANCELLED: ["CANCELLED"]
  };
  if (!allowed[order.status]?.includes(status)) {
    throw new Error("Invalid order status transition");
  }
  return prisma.order.update({
    where: {
      id: orderId
    },
    data: { status }
  });
};
var providerServices = {
  getMyMeals,
  addMeal,
  updateMeal,
  deleteMeal,
  getProviderOrders,
  updateOrderStatus
};

// src/modules/providers/providers.controller.ts
var getMyMeals2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const result = await providerServices.getMyMeals(userId);
    res.status(201).json({
      success: true,
      message: "Meal retrieved successfully",
      data: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};
var addMeal2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const data = req.body;
    const result = await providerServices.addMeal(data, userId);
    res.status(201).json({
      success: true,
      message: "Meal added successfully",
      data: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};
var UpdateMeal = async (req, res) => {
  try {
    const mealId = req.params.id;
    const userId = req.user?.id;
    const data = req.body;
    const result = await providerServices.updateMeal(mealId, userId, data);
    res.status(201).json({
      success: true,
      message: "Meal updated successfully",
      data: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
    res.status(403).json({
      success: false,
      error: errorMessage
    });
  }
};
var deleteMeal2 = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user?.id;
    const result = await providerServices.deleteMeal(id, userId);
    res.status(200).json({
      success: true,
      message: "Meal deleted successfully",
      data: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};
var getProviderOrders2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const result = await providerServices.getProviderOrders(userId);
    res.status(200).json({
      success: true,
      message: "Successfully retrieved all orders",
      data: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
    res.status(400).json({
      success: false,
      error: errorMessage
    });
  }
};
var updateOrderStatus2 = async (req, res) => {
  try {
    const status = req.body;
    const orderId = req.params.id;
    const userId = req.user?.id;
    const result = await providerServices.updateOrderStatus(
      orderId,
      userId,
      status
    );
    res.json(200).json({
      success: true,
      message: "Order Status updated successfully",
      data: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
    res.status(400).json({
      success: false,
      error: errorMessage
    });
  }
};
var providerController = {
  getMyMeals: getMyMeals2,
  addMeal: addMeal2,
  UpdateMeal,
  deleteMeal: deleteMeal2,
  getProviderOrders: getProviderOrders2,
  updateOrderStatus: updateOrderStatus2
};

// src/modules/providers/providers.routes.ts
var router = Router();
router.get(
  "/provider-meal",
  auth_middleware_default("PROVIDER" /* PROVIDER */),
  providerController.getMyMeals
);
router.get(
  "/provider-orders",
  auth_middleware_default("PROVIDER" /* PROVIDER */),
  providerController.getProviderOrders
);
router.post("/api/add-meals", auth_middleware_default("PROVIDER" /* PROVIDER */), providerController.addMeal);
router.put(
  "/api/meals/:id",
  auth_middleware_default("PROVIDER" /* PROVIDER */),
  providerController.UpdateMeal
);
router.patch(
  "/orders/:id/status",
  auth_middleware_default("PROVIDER" /* PROVIDER */),
  providerController.updateOrderStatus
);
router.delete(
  "/provider-meal/:id",
  auth_middleware_default("PROVIDER" /* PROVIDER */),
  providerController.deleteMeal
);
var providerRouter = router;

// src/modules/customers/customer.routes.ts
import { Router as Router2 } from "express";

// src/modules/customers/customer.service.ts
var getMeals = async () => {
  return await prisma.meal.findMany({
    include: {
      provider: true
    }
  });
};
var getPopularMeals = async () => {
  return prisma.meal.findMany({
    include: {
      provider: {
        select: {
          shopName: true
        }
      }
    },
    take: 8
  });
};
var getMealById = async (mealId) => {
  return await prisma.meal.findUnique({
    where: {
      id: mealId
    },
    include: {
      provider: true,
      review: true
    }
  });
};
var createOrder = async (userId, address, items) => {
  if (!userId) {
    throw new Error("User not authenticated");
  }
  if (!address) {
    throw new Error("Delivery address is required");
  }
  if (items.length === 0) {
    throw new Error("No items provided");
  }
  for (const item of items) {
    if (item.qty <= 0) {
      throw new Error("Quantity must be at least 1");
    }
  }
  const mealIds = items.map((i) => i.mealId);
  const meals = await prisma.meal.findMany({
    where: {
      id: { in: mealIds }
    },
    select: {
      id: true,
      price: true,
      providerId: true,
      name: true
    }
  });
  if (meals.length !== items.length) {
    throw new Error("Some meals are not found");
  }
  if (meals.length === 0) {
    throw new Error("No meals found");
  }
  const providerId = meals[0]?.providerId;
  const multipleProvider = meals.some((m) => m.providerId !== providerId);
  if (multipleProvider) {
    throw new Error("You can only order from One restaurant at a time");
  }
  let total = 0;
  const orderItems = items.map((item) => {
    const meal = meals.find((m) => m.id === item.mealId);
    const price = meal.price * item.qty;
    total += price;
    return {
      mealId: meal.id,
      qty: item.qty,
      price: meal.price
    };
  });
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        customerId: userId,
        providerId,
        address,
        total
      }
    });
    await tx.orderItem.createMany({
      data: orderItems.map((i) => ({
        ...i,
        orderId: order.id
      }))
    });
    return tx.order.findUnique({
      where: {
        id: order.id
      },
      include: {
        items: {
          include: {
            meal: {
              select: {
                name: true,
                image: true
              }
            }
          }
        }
      }
    });
  });
};
var getMyOrder = async (userId) => {
  return prisma.order.findMany({
    where: {
      customerId: userId
    },
    include: {
      items: {
        include: {
          meal: {
            select: {
              id: true,
              name: true,
              image: true,
              price: true
            }
          }
        }
      }
    }
  });
};
var createReview = async (userId, mealId, rating, comment) => {
  const hasOrder = await prisma.order.findFirst({
    where: {
      customerId: userId,
      items: {
        some: {
          mealId
        }
      }
    }
  });
  if (!hasOrder) {
    throw new Error("You must order the meal before reviewing");
  }
  return prisma.review.create({
    data: {
      userId,
      mealId,
      rating,
      comment
    }
  });
};
var getOrderById = async (orderId, userId) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      customerId: userId
    },
    include: {
      items: {
        include: {
          meal: true
        }
      }
    }
  });
  if (!order || order.customerId !== userId) {
    throw new Error("Order not found");
  }
  return order;
};
var cancelOrder = async (orderId, userId) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId
    }
  });
  if (!order) {
    throw new Error("Order not found");
  }
  if (order.customerId !== userId) {
    throw new Error("Unauthorized");
  }
  if (order.status === "CANCELLED" || order.status === "DELIVERED") {
    throw new Error("Order can not be cancelled now!!");
  }
  return prisma.order.update({
    where: {
      id: orderId
    },
    data: {
      status: "CANCELLED"
    }
  });
};
var createProfile = async (userId, data) => {
  const existingProfile = await prisma.providerProfile.findUnique({
    where: {
      userId
    }
  });
  if (existingProfile) {
    throw new Error("Provider Profile i already exists");
  }
  const providerProfile = await prisma.providerProfile.create({
    data: {
      ...data,
      userId
    }
  });
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      role: "PROVIDER"
    }
  });
  return providerProfile;
};
var getAllCategories = async () => {
  return await prisma.category.findMany();
};
var getFeaturedProviders = async () => {
  return await prisma.providerProfile.findMany({
    include: {
      user: {
        select: {
          name: true
        }
      },
      Meal: {
        select: {
          name: true
        }
      }
    },
    take: 6
  });
};
var customerServices = {
  getMeals,
  getPopularMeals,
  getMealById,
  createOrder,
  getMyOrder,
  createReview,
  cancelOrder,
  getOrderById,
  createProfile,
  getAllCategories,
  getFeaturedProviders
};

// src/modules/customers/customer.controller.ts
var getMeals2 = async (req, res) => {
  try {
    const result = await customerServices.getMeals();
    res.status(200).json({
      success: true,
      message: "Successfully retrieved all meals",
      data: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};
var getPopularMeals2 = async (req, res) => {
  try {
    const result = await customerServices.getPopularMeals();
    res.status(200).json({
      success: true,
      message: "Successfully retrieved popular meals",
      data: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};
var getMealById2 = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await customerServices.getMealById(id);
    res.status(200).json({
      success: true,
      message: "Successfully retrieved",
      data: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};
var createOrder2 = async (req, res) => {
  try {
    const { address, items } = req.body;
    if (!address || !items?.length) {
      return res.status(400).json({
        success: false,
        message: "Address and items are required"
      });
    }
    const userId = req.user?.id;
    const result = await customerServices.createOrder(userId, address, items);
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Order failed";
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: errorMessage
    });
  }
};
var getMyOrder2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const result = await customerServices.getMyOrder(userId);
    res.status(200).json({
      success: true,
      message: "Successfully retrieved",
      data: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};
var createReview2 = async (req, res) => {
  try {
    const { mealId, rating, comment } = req.body;
    const userId = req.user?.id;
    const result = customerServices.createReview(
      userId,
      mealId,
      rating,
      comment
    );
    res.status(200).json({
      success: true,
      message: "Successfully retrieved",
      data: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};
var cancelOrder2 = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user?.id;
    const result = await customerServices.cancelOrder(orderId, userId);
    res.status(200).json({
      success: true,
      message: "Successfully Updated",
      data: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};
var getOrderById2 = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user?.id;
    const result = await customerServices.getOrderById(orderId, userId);
    res.status(200).json({
      success: true,
      message: "Successfully retrieved",
      data: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};
var createProfile2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const data = req.body;
    const result = await customerServices.createProfile(userId, data);
    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
    return res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};
var getAllCategories2 = async (req, res) => {
  try {
    const result = await customerServices.getAllCategories();
    res.status(200).json({
      success: true,
      message: "Successfully retrieved all categories",
      data: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};
var getFeaturedProviders2 = async (req, res) => {
  try {
    const providers = await customerServices.getFeaturedProviders();
    res.status(200).json({
      success: true,
      message: "Successfully retrieved featured restaurant",
      data: providers.map((P) => ({
        id: P.id,
        name: P.shopName,
        image: P.image,
        owner: P.user.name,
        address: P.address,
        totalMeal: P.Meal.length
      }))
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};
var customerController = {
  getMeals: getMeals2,
  getPopularMeals: getPopularMeals2,
  getMealById: getMealById2,
  createOrder: createOrder2,
  getMyOrder: getMyOrder2,
  createReview: createReview2,
  getOrderById: getOrderById2,
  cancelOrder: cancelOrder2,
  createProfile: createProfile2,
  getAllCategories: getAllCategories2,
  getFeaturedProviders: getFeaturedProviders2
};

// src/modules/customers/customer.routes.ts
var router2 = Router2();
router2.get("/meals", customerController.getMeals);
router2.get("/api/meals/popular", customerController.getPopularMeals);
router2.get("/api/featured/providers", customerController.getFeaturedProviders);
router2.post(
  "/create-order",
  auth_middleware_default("CUSTOMER" /* CUSTOMER */),
  customerController.createOrder
);
router2.get(
  "/my-orders",
  auth_middleware_default("CUSTOMER" /* CUSTOMER */),
  customerController.getMyOrder
);
router2.post(
  "/reviews",
  auth_middleware_default("CUSTOMER" /* CUSTOMER */),
  customerController.createReview
);
router2.get("/categories", customerController.getAllCategories);
router2.post(
  "/create-profile",
  auth_middleware_default("CUSTOMER" /* CUSTOMER */),
  customerController.createProfile
);
router2.get(
  "/my-orders/:id",
  auth_middleware_default("CUSTOMER" /* CUSTOMER */),
  customerController.getOrderById
);
router2.get("/meals/:id", customerController.getMealById);
router2.patch(
  "/my-orders/:id/cancel",
  auth_middleware_default("CUSTOMER" /* CUSTOMER */),
  customerController.cancelOrder
);
var customerRouter = router2;

// src/modules/admin/admin.routes.ts
import { Router as Router3 } from "express";

// src/modules/admin/admin.service.ts
var getAllUsers = async ({
  search,
  page,
  limit,
  sortBy,
  sortOrder,
  skip
}) => {
  const andCondition = [];
  if (search) {
    andCondition.push({
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          email: {
            contains: search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  return prisma.user.findMany({
    take: limit,
    skip,
    where: {
      AND: andCondition
    },
    include: {
      ProviderProfile: true
    },
    orderBy: sortBy && sortOrder ? {
      [sortBy]: sortOrder
    } : { createdAt: "desc" }
  });
};
var updateUser = async (userId, data) => {
  if (!data.role && !data.status) {
    throw new Error("Nothing to update");
  }
  return prisma.user.update({
    where: {
      id: userId
    },
    data
  });
};
var createCategory = async (name, image) => {
  const isExists = await prisma.category.findUnique({
    where: { name }
  });
  if (isExists) {
    throw new Error("Category already exists");
  }
  return await prisma.category.create({
    data: {
      name,
      image
    }
  });
};
var getAllOrders = async () => {
  return prisma.order.findMany({
    include: {
      customer: true,
      items: {
        include: {
          meal: true
        }
      }
    }
  });
};
var adminServices = {
  getAllUsers,
  updateUser,
  createCategory,
  getAllOrders
};

// src/helpers/paginationAndSortingHelper.ts
var paginationAndSortingHelper = (options) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 15;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";
  const skip = (page - 1) * limit;
  return {
    page,
    limit,
    sortBy,
    sortOrder,
    skip
  };
};
var paginationAndSortingHelper_default = paginationAndSortingHelper;

// src/modules/admin/admin.controller.ts
var getAllUsers2 = async (req, res) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : void 0;
    const { page, limit, sortBy, sortOrder, skip } = paginationAndSortingHelper_default(
      req.query
    );
    const users = await adminServices.getAllUsers({
      search: searchString,
      page,
      limit,
      sortBy,
      sortOrder,
      skip
    });
    res.status(200).json({
      success: true,
      message: "Successfully retrieved all users",
      data: users
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};
var updateUser2 = async (req, res) => {
  try {
    const userId = req.params.id;
    const payload = req.body;
    const result = await adminServices.updateUser(userId, payload);
    res.status(200).json({
      success: true,
      message: "Successfully retrieved all users",
      data: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};
var createCategory2 = async (req, res) => {
  try {
    const { name, image } = req.body;
    const result = await adminServices.createCategory(name, image);
    res.status(201).json({
      success: true,
      message: "Category added successfully",
      data: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};
var getAllOrders2 = async (req, res) => {
  try {
    const result = await adminServices.getAllOrders();
    res.status(200).json({
      success: true,
      message: "Successfully retrieved all Orders",
      data: result
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
};
var adminController = {
  getAllUsers: getAllUsers2,
  updateUser: updateUser2,
  createCategory: createCategory2,
  getAllOrders: getAllOrders2
};

// src/modules/admin/admin.routes.ts
var router3 = Router3();
router3.get("/users-admin", auth_middleware_default("ADMIN" /* ADMIN */), adminController.getAllUsers);
router3.post(
  "/categories",
  auth_middleware_default("ADMIN" /* ADMIN */),
  adminController.createCategory
);
router3.get("/admin-order", auth_middleware_default("ADMIN" /* ADMIN */), adminController.getAllOrders);
router3.patch("/users-admin/:id", auth_middleware_default("ADMIN" /* ADMIN */), adminController.updateUser);
var adminRouter = router3;

// src/app/app.ts
var app = express();
var allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL
  // Production frontend URL
].filter(Boolean);
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.includes(origin) || /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/", providerRouter);
app.use("/", customerRouter);
app.use("/", adminRouter);
app.get("/", async (req, res) => {
  res.send("this is assignment4");
});
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
