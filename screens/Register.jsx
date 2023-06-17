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
import { register } from "../Redux/Action";
import mime from "mime";
import { clearErrors } from "../Redux/userSlice";
const Register = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const handleImage = () => {
    navigation.navigate("Camera", { updateProfile: false });
  };
  const registerHandler = () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("avatar", {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split("/").pop(),
    });
    dispatch(register(myForm));
  };

  useEffect(() => {
    if (route.params) {
      if (route.params.image) {
        setAvatar(route.params.image);
      }
    }

    if (error) {
      console.log(error, "errorsssss");
      alert(error);
      dispatch(clearErrors());
    }
  }, [route, alert, error, dispatch]);

  return (
    <View style={registerStyle.registerContainer}>
      <Text style={registerStyle.registerHeader}>Register</Text>
      <Avatar.Image
        size={100}
        source={{ uri: avatar ? avatar : null }}
        style={{ backgroundColor: "#900" }}
      />

      <TouchableOpacity onPress={handleImage}>
        <Text style={{ color: "#900" }}>Change Photo</Text>
      </TouchableOpacity>

      <View style={{ width: "70%" }}>
        <TextInput
          style={registerStyle.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={registerStyle.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          secureTextEntry
          style={registerStyle.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Button
        style={registerStyle.btn}
        onPress={registerHandler}
        disabled={!email || !password || !name}
      >
        <Text style={{ color: "#fff" }}>Register</Text>
      </Button>

      <View style={{ marginVertical: 20, flexDirection: "row" }}>
        <Text>Already a User?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={registerStyle.login}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const registerStyle = StyleSheet.create({
  registerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  registerHeader: {
    fontSize: 20,
    margin: 20,
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
    backgroundColor: "#900",
    padding: 5,
    width: "70%",
    borderRadius: 0,
  },
  login: {
    color: "#900",
  },
});

export default Register;
