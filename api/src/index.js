import app from './config/express';

if (!module.parent) {
  // listen on port config.port
  app.listen(process.env.PORT, () => {
    console.log(`server started on ${process.env.PORT} PORT (${process.env.NODE_ENV})`);
  });
}

export default app;
