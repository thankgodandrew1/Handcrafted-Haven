import { usersRepo } from '@/helpers/api/usersRepo';
import apiHandler from '@/helpers/api/apiHandler';
import { Response, Request } from 'express';

export default apiHandler({
    post: authenticate
});

async function authenticate(req: Request, res: Response) {
    const user = await usersRepo.authenticate(req.body);
    return res.status(200).json(user);
}