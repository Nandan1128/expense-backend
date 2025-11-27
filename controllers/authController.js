const db = require("../config/firebase");
const users = db.collection("users");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    await users.add(req.body);
    res.json({ message: "User registered" });
  } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.login = async (req, res) => {
  try {
    const snapshot = await users.where("email","==",req.body.email).get();
    if (snapshot.empty) return res.status(401).json({ error:"Invalid email" });
    let user;
    snapshot.forEach(doc=> user={id:doc.id,...doc.data()});
    if (user.password !== req.body.password)
       return res.status(401).json({ error:"Invalid password"});
    const token = jwt.sign({id:user.id},"secret123");
    res.json({ token });
  } catch (e) { res.status(500).json({ error:e.message }); }
};
