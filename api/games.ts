import { Router, Request, Response } from 'express';
import axios, { AxiosRequestHeaders } from 'axios';

const router = Router();
const ROBLOX_GAMES_API_BASE_URL = 'https://games.roblox.com';

router.use('/*', async (req: Request, res: Response) => {
    try {
        const endpoint = req.params[0]; // Capture the full path after /games/
        const robloxResponse = await axios({
            method: req.method,
            url: `${ROBLOX_GAMES_API_BASE_URL}/${endpoint}`,
            headers: {
                ...req.headers as AxiosRequestHeaders,
                host: 'games.roblox.com', // Ensure the correct host header
            },
            data: req.body,
        });
        res.status(robloxResponse.status).json(robloxResponse.data);
    } catch (error: any) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: 'An error occurred while processing the request.' });
        }
    }
});

export default router;