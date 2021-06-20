const { Profile } = require("../models");

const createProfile = async (profile) => {
  const newProfile = new Profile({ ...profile });
  const { id } = await newProfile.save();

  return {
    id,
    ...profile,
  };
};

const updateProfile = async (profile) => {
  const res = await Profile.updateOne({ _id: profile.id }, { ...profile });
  return { ...profile };
};

const getProfile = async (id) => {
  const profile = await Profile.findById(id);
  if (profile) {
    return profile;
  } else {
    return "getProfile: Profile not found";
  }
};

module.exports = {
  createProfile,
  updateProfile,
  getProfile,
};
