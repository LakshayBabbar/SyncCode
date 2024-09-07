import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    return res.status(200).json({ message: "Hello World" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
