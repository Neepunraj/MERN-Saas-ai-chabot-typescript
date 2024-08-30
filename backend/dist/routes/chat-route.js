import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validator.js";
import { deletechats, generateChatCompletion, sendChatsToUser } from "../controller/chat-controller.js";
const chatRoutes = Router();
chatRoutes.post('/new', validate(chatCompletionValidator), verifyToken, generateChatCompletion);
chatRoutes.get('/all-chats', verifyToken, sendChatsToUser);
chatRoutes.delete('/delete', deletechats);
export default chatRoutes;
//# sourceMappingURL=chat-route.js.map