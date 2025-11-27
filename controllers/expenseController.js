const db = require("../config/firebase");
const collection = db.collection("expenses");

exports.addExpense = async(req,res)=>{
  try{
    const doc = await collection.add(req.body);
    res.status(201).json({id:doc.id});
  }catch(e){ res.status(500).json({error:e.message}); }
};

exports.getExpenses = async(req,res)=>{
  try{
    const snapshot = await collection.get();
    const data = snapshot.docs.map(d=>({id:d.id,...d.data()}));
    res.json(data);
  }catch(e){ res.status(500).json({error:e.message});}
};

exports.updateExpense = async(req,res)=>{
  try{
    await collection.doc(req.params.id).update(req.body);
    res.json({message:"Updated"});
  }catch(e){ res.status(500).json({error:e.message});}
};

exports.deleteExpense = async(req,res)=>{
  try{
    await collection.doc(req.params.id).delete();
    res.json({message:"Deleted"});
  }catch(e){ res.status(500).json({error:e.message});}
};
