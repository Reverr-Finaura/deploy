const client = require("twilio")(
  "AC1bf27cece467fd7bf4b71450765daf05",
  "585b53313437defb488d9aaf0aefa92a"
);

export default async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  client.messages
    .create({
      from: "+12706067949",
      to: "+91" + req.body.to,
      body: req.body.message,
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
};
