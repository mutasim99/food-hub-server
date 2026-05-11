import { Request, Response } from "express";
export declare const adminController: {
    getAdminStats: (req: Request, res: Response) => Promise<void>;
    getAllUsers: (req: Request, res: Response) => Promise<void>;
    updateUser: (req: Request, res: Response) => Promise<void>;
    createCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getAllOrders: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=admin.controller.d.ts.map