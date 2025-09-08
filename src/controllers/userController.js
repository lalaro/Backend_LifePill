let users = [];

const getUsers = (req, res) => {
    res.json(users);
};

const getUsersById = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.json(user);
};

const createUser = (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
}

const updateUser = (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });
  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
};

const deleteUser = (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });
  const deleted = users.splice(index, 1);
  res.json(deleted[0]);
};

module.exports = { getUsers, getUsersById, createUser, updateUser, deleteUser };
