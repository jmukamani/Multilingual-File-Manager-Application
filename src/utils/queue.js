const Queue = require('bull');

// Connect to Redis using environment variable
const fileUploadQueue = new Queue('file upload', process.env.REDIS_URL);

// Define a processor for the queue
fileUploadQueue.process(async (job) => {
  console.log(`Processing job with ID: ${job.id}`);
  // Simulate file processing (e.g., compression, conversion)
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(`Job completed: ${job.id}`);
});

// Error handling
fileUploadQueue.on('failed', (job, err) => {
  console.error(`Job failed: ${job.id}`, err.message);
});

// Event listener for successful completion
fileUploadQueue.on('completed', (job) => {
  console.log(`Job completed successfully: ${job.id}`);
});

module.exports = fileUploadQueue;
