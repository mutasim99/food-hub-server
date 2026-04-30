import { Request, Response } from "express";
export declare const providerController: {
    getMyMeals: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    addMeal: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    UpdateMeal: (req: Request, res: Response) => Promise<void>;
    deleteMeal: (req: Request, res: Response) => Promise<void>;
    getProviderOrders: (req: Request, res: Response) => Promise<void>;
    updateOrderStatus: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=providers.controller.d.ts.map