import { usersRepo } from '@/helpers/api/usersRepo';
import apiHandler from '@/helpers/api/apiHandler';
import { Response, Request } from 'express';

interface UserRequest {
    // Define the properties expected in the request body for the register endpoint
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    // Add other properties as needed
  }

export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

async function getById(req: Request, res: Response) {
    const userId = req.query.id as string; // Assert that req.query.id is a string
    const user = await usersRepo.getById(userId);

    if (!user) throw 'User Not Found';

    return res.status(200).json(user);
}

async function update(req: Request, res: Response) {
    const userId = req.query.id as string; // Assert that req.query.id is a string
    await usersRepo.update(userId, req.body);
    return res.status(200).json({});
}

async function _delete(req: Request, res: Response) {
    const userId = req.query.id as string; // Assert that req.query.id is a string
    await usersRepo.delete(userId);
    return res.status(200).json({});
}