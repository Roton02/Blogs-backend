import { Router } from "express";
import blogRouter from "../modules/Blog/blog.routes";


const router = Router();


const routers = [
    {
        path : '/blogs',
        router : blogRouter
    }
]



routers.forEach((route) => router.use(route.path, route.router));

export default router;