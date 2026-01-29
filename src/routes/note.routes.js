import { Router } from "express";
import {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote,
} from "../controllers/note.controllers.js";
import {
    verifyJWT,
    validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { UserRolesEnum } from "../utils/constants.js";
import { validate } from "../middlewares/validator.middleware.js";
import { body } from "express-validator";

const router = Router();

router.use(verifyJWT);

const createNoteValidator = () => [
    body("content").notEmpty().withMessage("Content is required"),
];

router
    .route("/:projectId")
    .get(validateProjectPermission(), getNotes)
    .post(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        createNoteValidator(),
        validate,
        createNote,
    );

router
    .route("/:projectId/n/:noteId")
    .get(validateProjectPermission(), getNoteById)
    .put(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        createNoteValidator(),
        validate,
        updateNote,
    )
    .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteNote);

export default router;
