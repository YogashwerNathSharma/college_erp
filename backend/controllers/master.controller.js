const Master = require("../models/master");


exports.getAll = async (req, res) => {
  const data = await Master.find({ masterType: req.params.type });
  res.json(data);
};

exports.create = async (req, res) => {
  const item = new Master(req.body);
  await item.save();
  res.json(item);
};

exports.update = async (req, res) => {
  const updated = await Master.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

exports.deactivate = async (req, res) => {
  await Master.findByIdAndUpdate(req.params.id, { isActive: false });
  res.json({ success: true });
};

exports.getOne = async (req, res) => {
  const item = await Master.findById(req.params.id);
  res.json(item);
};
