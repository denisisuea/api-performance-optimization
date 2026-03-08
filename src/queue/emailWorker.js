const { Worker } = require("bullmq");

const worker = new Worker(
  "emailQueue",
  async job => {
    console.log("Procesando trabajo:", job.data);

    // simulación de tarea pesada
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log("Email enviado a:", job.data.email);
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379
    }
  }
);

worker.on("completed", job => {
  console.log("Trabajo completado:", job.id);
});