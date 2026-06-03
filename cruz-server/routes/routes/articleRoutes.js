const express = require("express");
const {
  getArticles,
  getPublishedArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../../controllers/controllers/articleController");

const router = express.Router();

router.route("/").get(getArticles).post(createArticle);
router.get("/published", getPublishedArticles);
router.route("/:id").put(updateArticle).delete(deleteArticle);

module.exports = router;