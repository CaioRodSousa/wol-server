const express = require('express');
const wol = require('wake_on_lan');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/wake', (req, res) => {
  const mac = req.query.mac;
  const ip = req.query.ip || null;
  const port = req.query.port || 9;

  if (!mac) return res.status(400).send('MAC address is required');

  wol.wake(mac, { address: ip, port: port }, function(error) {
    if (error) {
      console.error(error);
      return res.status(500).send('Falha ao enviar pacote WOL');
    }
    res.send(`Pacote WOL enviado para ${mac}`);
  });
});

app.listen(PORT, () => console.log(`Servidor online na porta ${PORT}`));
