const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { Customer, validateCustomer } = require('../models/customer')

// GET /api/customers
// Retrieves JSON list of customers
router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

// GET /api/customer/:id
// Retrieves a customer
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send('Could not locate a customer with that ID');
  res.send(customer);
});

// POST /api/customers
// Create new customer
router.post('/', auth, async (req, res) => {
  const { error } = validateCustomer(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone
  });

  await customer.save();
  res.send(customer);
});

// PUT /api/customer/:id
// Update customer
router.put('/:id', auth, async (req, res) => {

  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    isGold: req.params.isGold,
    name: req.params.name,
    phone: req.params.phone
  }, { new: true });

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

// DELETE /api/customer/:id
// Delete customer
router.delete('/:id', auth, async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send('The customer with the given ID was not found.')

  res.send(customer);
});

module.exports = router;
