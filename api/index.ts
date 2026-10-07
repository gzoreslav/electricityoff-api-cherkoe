import express from "express";
import { cherkoeService } from "../src/services/cherkoe/cherkoe";

const app = express();

app.get("/api/v1", (_req, res) => res.send("CHERKOE API Status: OK"));

const sendSchedule = async (_req: express.Request, res: express.Response) => {
  try {
    res.send(await cherkoeService.getSchedule());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load schedule";
    res.status(500).send({ error: message });
  }
};

app.get("/api/v1/off", sendSchedule);
app.get("/cherkoe", sendSchedule);

app.get("/cherkoe/message", async (req, res) => {
  try {
    res.send(
      await cherkoeService.getMessage(
        req.query?.type?.toString() || "new",
        req.query.queue?.toString() || "1",
        req.query?.day?.toString() || "today"
      )
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load message";
    res.status(500).send({ error: message });
  }
});

app.listen(process.env.PORT || 3010, () => console.log("Server is ready"));

module.exports = app;
