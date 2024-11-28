import app from './app'

const port = 3333

app.listen(port, () => {
  console.log(`CTRL + Clique em http://localhost:${port}`);
})