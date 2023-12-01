import apiHandler from '@/helpers/api/apiHandler';
import { usersRepo } from '@/helpers/api/usersRepo';
import { Response, Request } from 'express';

export default apiHandler({
    post: register
});

async function register(req: Request, res: Response) {
    await usersRepo.create(req.body);
    return res.status(200).json({});
}