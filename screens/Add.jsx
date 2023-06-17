import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Task from "../components/Task";
import Icon from "react-native-vector-icons/Entypo";
import { Dialog, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, clearMessage } from "../Redux/messageSlice";
import Loader from "../components/Loader";
import { addTask, loadUser } from "../Redux/Action";

const Add = () => {
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector((state) => state.task);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bloodType, setbloodType] = useState("");
  const [hospitalName, sethospitalName] = useState("");
  console.log("my isAuthenticated is", isAuthenticated);
  const openDialogHandler = () => {
    setOpenDialog(!openDialog);
  };
  const addTaskHandler = async () => {
    dispatch(addTask(title, description, hospitalName, bloodType));
    dispatch(loadUser());
  };
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert(message);
      dispatch(clearMessage());
      setDescription("");
      setTitle("");
    }
  }, [error, message, alert, dispatch]);

  return (
    <>
      <View style={homeContainerStyle.homeContainer}>
        <ScrollView>
          <SafeAreaView>
            {isAuthenticated !== undefined && isAuthenticated !== false ? (
              user.tasks &&
              user.tasks.map((item, index) => (
                <Task
                  key={index}
                  title={item.title}
                  description={item.description}
                  blood_type={item.bloodType}
                  case={item.requestCase}
                  hospital_name={item.hospitalName}
                  status={item.completed}
                  taskId={item._id}
                />
              ))
            ) : (
              <Loader />
            )}

            <TouchableOpacity
              onPress={openDialogHandler}
              style={homeContainerStyle.addToListContainer}
            >
              <Icon size={20} color={"#900"} name="add-to-list" />
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
      </View>
      <Dialog visible={openDialog} onDismiss={openDialogHandler}>
        <Dialog.Title>Add a task</Dialog.Title>
        <Dialog.Content>
          <TextInput
            style={homeContainerStyle.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={homeContainerStyle.input}
            placeholder="Case for Blood"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={homeContainerStyle.input}
            placeholder="Hospital Name"
            value={hospitalName}
            onChangeText={sethospitalName}
          />
          <TextInput
            style={homeContainerStyle.input}
            placeholder="Blood Type"
            value={bloodType}
            onChangeText={setbloodType}
          />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={openDialogHandler}>
              <Text>Cancel</Text>
            </TouchableOpacity>

            <Button
              disabled={!title || !description}
              onPress={addTaskHandler}
              textColor="#900"
            >
              Add
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </>
  );
};

const homeContainerStyle = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#ffff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  textViewHeading: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 25,
    marginBottom: 20,
    color: "#fff",
    backgroundColor: "#474747",
  },
  addToListContainer: {
    backgroundColor: "#fff",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: 20,
    elevation: 5,
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
});

export default Add;
