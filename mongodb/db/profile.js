const { Profile } = require("../models");

createProfile = async (profile) => {
  const newProfile = new Profile({ ...profile });
  const { id } = await newProfile.save();

  return {
    id,
    ...profile,
  };
};

updateProfile = async (profile) => {
  const res = await Profile.updateOne({ _id: profile.id }, { ...profile });
  return { ...profile };
};

getProfile = async (id) => {
  const profile = await Profile.findById(id);
  if (profile) {
    return profile;
  } else {
    return "getProfile: Profile not found";
  }
};
