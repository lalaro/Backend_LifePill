let userprofile = [];

const getUserProfiles = (req, res) => {
    res.json(userprofile);
} 
 
const getUserProfileById = (req, res) => {
    const profile = userprofile.find(p => p.id === parseInt(req.params.id));
    if (!profile) return res.status(404).send('Profile not found');
    res.json(profile);
} 
 
const createUserProfile = (req, res) => {
    const newProfile = req.body;
    userprofile.push(newProfile);
    res.status(201).json(newProfile);
}

const updateUserProfile = (req, res) => {
    const index = userprofile.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Profile not found' });
    userprofile[index] = { ...userprofile[index], ...req.body };
    res.json(userprofile[index]);
}

const deleteUserProfile = (req, res) => {
    const index = userprofile.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Profile not found' });
    const deleted = userprofile.splice(index, 1);
    res.json(deleted[0]);
}
module.exports = { getUserProfiles, getUserProfileById, createUserProfile, updateUserProfile, deleteUserProfile };