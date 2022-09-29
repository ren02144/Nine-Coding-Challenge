import express from "express";
export const app = express();

app.use(
  express.json({
    verify: (req, res, buf, encoding) => {
      try {
        JSON.parse(buf);
      } catch (e) {
        res.status(400).json({
          error: "Could not decode request: JSON parsing failed",
        });
        throw Error("invalid JSON");
      }
    },
  })
);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});

const validateResponse = (item) => {
  return item.drm && item.episodeCount;
};

app.post("/test", async (req, res) => {
  try {
    const content = req.body;

    if (!content) {
      throw new Error();
    }

    let result = [];
    const { payload } = content;

    payload.forEach((item) => {
      if (validateResponse(item)) {
        result.push({
          image: item.image.showImage,
          slug: item.slug,
          title: item.title,
        });
      }
    });

    res.status(200).json({
      response: result,
    });
  } catch (e) {
    res.status(400).json({
      error: e,
    });
  }
});
