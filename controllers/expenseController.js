
const db = require("../config/firebase");
const collection = db.collection("expenses");

exports.addExpense = async(req,res)=>{
  try{
    const payload = { ...req.body, userId: req.userId };
    const doc = await collection.add(payload);
    res.status(201).json({ id:doc.id });
  }catch(e){ res.status(500).json({error:e.message}); }
};

exports.getExpenses = async(req,res)=>{
  try{
    const snapshot = await collection.where("userId","==",req.userId).get();
    const data = snapshot.docs.map(d=>({id:d.id,...d.data()}));
    res.json(data);
  }catch(e){ res.status(500).json({error:e.message});}
};

exports.updateExpense = async(req,res)=>{
  try{
    const ref = collection.doc(req.params.id);
    const doc = await ref.get();
    if (!doc.exists) return res.status(404).json({ error: "Not found" });

    if (doc.data().userId !== req.userId)
      return res.status(403).json({ error: "Not allowed" });

    await ref.update(req.body);
    res.json({message:"Updated"});
  }catch(e){ res.status(500).json({error:e.message});}
};

exports.deleteExpense = async(req,res)=>{
  try{
    const ref = collection.doc(req.params.id);
    const doc = await ref.get();
    if (!doc.exists) return res.status(404).json({ error: "Not found" });

    if (doc.data().userId !== req.userId)
      return res.status(403).json({ error: "Not allowed" });

    await ref.delete();
    res.json({message:"Deleted"});
  }catch(e){ res.status(500).json({error:e.message});}
};
