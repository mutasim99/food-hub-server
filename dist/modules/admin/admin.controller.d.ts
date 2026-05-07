import { Request, Response } from "express";
export declare const adminController: {
    getAllUsers: (req: Request, res: Response) => Promise<void>;
    updateUser: (req: Request, res: Response) => Promise<void>;
    createCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getAllOrders: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=admin.controller.d.ts.map