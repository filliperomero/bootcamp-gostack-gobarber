import app from './app';

app.listen(process.env.port || 3000, () => {
  console.log(`Server is Running on port ${process.env.port || 3000}`);
});
