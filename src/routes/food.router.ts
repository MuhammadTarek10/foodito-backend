import express from "express";

const router = express.Router();

router.post("/", (req, res) => {});

router.get("/", (req, res) => {}); // * by room id
router.get("/:id", (req, res) => {}); // * by food id
router.get("user/:id", (req, res) => {}); // * by user id

router.put("/:id", (req, res) => {}); // * by food id
router.delete("/:id", (req, res) => {}); // * by food id

export default router;
