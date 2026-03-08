const express = require("express");
const router = express.Router();
const emailQueue = require("../queue/emailQueue");

router.get("/send-email", async (req, res) => {

  const job = await emailQueue.add("sendEmail", {
    email: "usuario@email.com"
  });

  res.json({
    message: "Trabajo agregado a la cola",
    jobId: job.id
  });

});

module.exports = router;