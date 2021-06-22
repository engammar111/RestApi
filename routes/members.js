const express = require('express');
const router = express.Router();
const Member = require('../models/member');

// Getting All
router.get('/', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});
// Getting One
router.get('/:id', getMember, (req, res) => {
  res.json(res.member);
});
// Creating
router.post('/', async (req, res) => {
  const member = new Member({
    name: req.body.name,
    subscriberToChannel: req.body.subscriberToChannel,
  });
  try {
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
});
// Updating
router.patch('/:id', getMember, async (req, res) => {
  if (req.body.name != null) {
    res.member.name = req.body.name;
  }
  if (req.body.subscriberToChannel != null) {
    res.member.subscriberToChannel = req.body.subscriberToChannel;
  }
  try {
    const updatedMember = await res.member.save();
    res.json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
});
// Deleting
router.delete('/:id', getMember, async (req, res) => {
  try {
    await res.member.remove();
    res.json({ message: 'Deleted Member' });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

async function getMember(req, res, next) {
  let member;
  try {
    member = await Member.findById(req.params.id);
    if (member == null) {
      return res.status(404).json({ message: 'cant find the desired member' });
    }
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }

  res.member = member;
  next();
}

module.exports = router;
