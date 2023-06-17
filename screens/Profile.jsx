import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout, updateProfile } from "../Redux/Action";
import mime from "mime";
import Loader from "../components/Loader";
const Profile = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
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
  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (route.params) {
      if (route.params.image) {
        setAvatar(route.params.image);
      }
    }
  }, [route]);

  return loading ? (
    <Loader />
  ) : (
    <View style={profileStyle.profileContainer}>
      <Avatar.Image
        style={profileStyle.avatarStyle}
        size={100}
        source={{ uri: user ? user?.user.avatar.url : null }}
      />

      <TouchableOpacity onPress={handleImage}>
        <Text style={profileStyle.changeProfilePic}>Change Photo</Text>
      </TouchableOpacity>

      <View>
        {/* <TextInput
          style={profileStyle.input}
          // placeholder="Name"

          onChangeText={setName}
        /> */}
        <Text
          style={{
            fontSize: 20,
            alignSelf: "center",
          }}
        >
          {user?.user.name}
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontSize: 20,
            alignSelf: "center",
          }}
        >
          {user?.user.email}
        </Text>

        <Button onPress={() => navigation.navigate(updateProfile)}>
          <Text style={profileStyle.btnTxt}>Update Profile</Text>
        </Button>
      </View>
      {user.verified ? null : (
        <Button
          style={profileStyle.btnVerify}
          onPress={() => navigation.navigate("Verify")}
        >
          <Text style={profileStyle.btnTxt}>Verify Profile</Text>
        </Button>
      )}
      <Button
        style={profileStyle.btn2}
        onPress={() => navigation.navigate("ChangePassword")}
      >
        <Text style={profileStyle.btnTxt}>Change Password</Text>
      </Button>

      <TouchableOpacity style={{ marginTop: 100 }} onPress={logoutHandler}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const profileStyle = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },

  avatarStyle: {
    marginTop: 50,
    backgroundColor: "#900",
  },

  changeProfilePic: {
    color: "#900",
    margin: 20,
  },

  profileInput: {
    width: "70%",
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
  },
  btn: {
    backgroundColor: "#f0ad4e",
    padding: 5,
    width: "70%",
    borderRadius: 0,
  },
  btn1: {
    backgroundColor: "#900",
    padding: 5,
    marginTop: 15,
    width: "70%",
    borderRadius: 0,
  },
  btn2: {
    backgroundColor: "#0275d8",
    padding: 5,
    marginTop: 15,
    width: "70%",
    borderRadius: 0,
  },
  btnVerify: {
    backgroundColor: "#5cb85c",
    padding: 5,
    marginTop: 5,
    width: "70%",
    borderRadius: 0,
  },

  btnTxt: {
    color: "#fff",
  },
});

export default Profile;
