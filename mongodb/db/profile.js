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
  const res = await Profile.updateOne(
    { userId: profile.userId },
    { ...profile }
  );
  return { ...profile };
};

const getProfile = async (userId) => {
  const profile = await Profile.findOne({ userId: userId });
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
