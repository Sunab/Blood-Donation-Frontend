import { View, Text } from "react-native";
import React from "react";

const UpdateProfile = () => {
  const handleImage = () => {
    navigation.navigate("Camera", {
      updateProfile: true,
    });
  };

  const submitHandler = async () => {
    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("avatar", {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split("/").pop(),
    });
    dispatch(updateProfile(myForm));
    dispatch(loadUser());
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Update Profile</Text>
    </View>
  );
};

export default UpdateProfile;
