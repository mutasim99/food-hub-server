import { Request, Response } from "express";
export declare const customerController: {
    createOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getMyOrder: (req: Request, res: Response) => Promise<void>;
    createReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getMealReview: (req: Request, res: Response) => Promise<void>;
    getOrderById: (req: Request, res: Response) => Promise<void>;
    cancelOrder: (req: Request, res: Response) => Promise<void>;
    createProviderProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    addToCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getCart: (req: Request, res: Response) => Promise<void>;
    removeFromCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=customer.controller.d.ts.map