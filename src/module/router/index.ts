import { Router } from "express";
import blogRouter from "../Blog/blog.routes";


const router = Router();


const routers = [
    {
        path : '/api/blogs',
        router : blogRouter
    }
]



routers.forEach((route) => router.use(route.path, route.router));

export default router;