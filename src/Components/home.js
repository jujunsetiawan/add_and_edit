import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import {
    ActivityIndicator,
    Image,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
    Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            token: '',
            todos: [],
            loading: true,
            photo: '',
            task: '',
            desc: '',
            modal: false,
            modalEdit: false,
            addLoading: false,

            editId: null,
            editTask: '',
            editDesc: '',
            editIsDone: false,
            editPhoto: '',
        };
    }

    addTodo() {
        const { task, desc, photo, token } = this.state;
        this.setAddLoading(true);
        if (task !== '' && desc !== '' && photo !== '') {
            const todo = {
                task: task,
                desc: desc,
                is_done: 0,
            };
            fetch('http://restful-api-laravel-7.herokuapp.com/api/todo', {
                method: 'POST',
                body: this.createFormData(photo, todo),
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response) console.log('upload succes', response);
                    alert('Data ditambahkan!');
                    this.getTodos();
                    this.showModal(false);
                    this.setAddLoading(false);
                })
                .catch((error) => {
                    console.log('upload error', error);
                    alert('Gagal ditambahkan');
                    this.setAddLoading(false);
                });
        } else {
            alert('Isi dengan benar');
        }
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.uri) {
                this.setState({ photo: response });
            }
        });
    };

    handleEditPhoto = () => {
        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.uri) {
                this.setState({ editPhoto: response });
                console.log(JSON.stringify(response) + 'tes image');
            }
        });
    };

    setLoading(loading) {
        this.setState({ loading: loading });
    }

    createFormData = (photo, body) => {
        const data = new FormData();

        data.append('image', {
            name: photo.fileName,
            type: photo.type,
            uri:
                Platform.OS === 'android'
                    ? photo.uri
                    : photo.uri.replace('file://', ''),
        });

        Object.keys(body).forEach((key) => {
            data.append(key, body[key]);
        });

        return data;
    };

    getToken() {
        AsyncStorage.getItem('token')
            .then((token) => {
                if (token !== null) {
                    this.setState({ token: token });
                } else {
                    this.logOut();
                }
            })
            .then(() => this.getTodos());
        //setelah token muncul maka ambil data todo
    }

    getTodos() {
        this.setLoading(true);
        console.log(this.state.token);
        fetch('http://restful-api-laravel-7.herokuapp.com/api/todo/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.state.token}`,
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                const { status } = responseJson;
                if (status) {
                    alert(status);
                    this.logOut();
                } else {
                    this.setState({ todos: responseJson });
                    console.log(responseJson);
                    this.setLoading(false);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    deleteTodo(id) {
        this.setLoading(true);
        fetch(`http://restful-api-laravel-7.herokuapp.com/api/todo/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.state.token}`,
            },
        })
            .then((response) => response.json())
            .then((json) => {
                const { status } = json;
                if (status == 'success') {
                    this.getTodos();
                } else {
                    alert('Gagal menghapus');
                }
            });
    }

    editTodo() {
        const { editTask, editDesc, editPhoto, editId, editIsDone } = this.state;
        if (editPhoto.name === undefined) {
            this.setAddLoading(true);
            if (editTask !== '' && editDesc !== '' && editPhoto !== '') {
                const todo = {
                    _method: 'PUT',
                    task: editTask,
                    desc: editDesc,
                    is_done: editIsDone ? 1 : 0,
                };
                fetch(`http://restful-api-laravel-7.herokuapp.com/api/todo/${editId}`, {
                    method: 'POST',
                    body: this.createFormData(editPhoto, todo),
                    headers: {
                        Authorization: `Bearer ${this.state.token}`,
                    },
                })
                    .then((response) => response.json())
                    .then((response) => {
                        console.log(response);
                        if (response.status == 'success') {
                            console.log('upload succes', response);
                            alert('Data dirubah!');
                            this.getTodos();
                            this.showModalEdit(false);
                            this.setAddLoading(false);
                        } else {
                            alert('Error');
                        }
                    })
                    .catch((error) => {
                        console.log('upload error', error);
                        alert('Gagal ditambahkan');
                        this.setAddLoading(false);
                    });
            } else {
                alert('Isi dengan benar');
                this.setAddLoading(false);
            }
        } else {
            alert('Gambar harus dirubah :)');
        }
    }

    componentDidMount() {
        this.getToken();
    }

    logOut() {
        AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }

    showModal(visible) {
        this.setState({ modal: visible });
    }

    setAddLoading(loading) {
        this.setState({ addLoading: loading });
    }

    showModalEdit(visible, data = null) {
        this.setState({ modalEdit: visible });
        if (data !== null) {
            this.setState({
                editId: data.id,
                editTask: data.task,
                editDesc: data.desc,
                editPhoto: {
                    name: data.image,
                    uri: 'http://restful-api-laravel-7.herokuapp.com/img/' + data.image,
                },
                editIsDone: data.is_done,
            });
        }
    }
    render() {
        return (
            <View>
                <Modal visible={this.state.modal} transparent={true} style={{ flex: 1 }}>
                    <View style={{
                        width: 350,
                        padding: 16,
                        alignSelf: 'center',
                        marginTop: 32,
                        backgroundColor: '#77acd1',
                        borderRadius: 20,
                        borderWidth: 3,
                        borderColor: 'white',
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: 'red',
                            height: 24,
                            width: 24,
                            borderRadius: 12,
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                        }}>
                            <Text
                                style={{
                                    color: '#f0f1f2',
                                    fontWeight: '600',
                                }}
                                onPress={() => this.showModal(false)}>
                                x
              </Text>
                        </TouchableOpacity>
                        <Text style={{
                            color: '#f0f1f2',
                            fontSize: 24,
                            fontWeight: 'bold',
                            marginVertical: 16,
                        }}> Add Todo Here </Text>
                        <TouchableOpacity
                            style={{ justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => this.handleChoosePhoto()}>
                            {this.state.photo !== '' ? (
                                <Image
                                    source={{ uri: this.state.photo.uri }}
                                    style={{ width: 100, height: 100 }}
                                />
                            ) : (
                                    <View style={{
                                        width: 100,
                                        height: 100,
                                        backgroundColor: 'gray',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                    }}>
                                        <Text>Upload Image</Text>
                                    </View>
                                )}
                        </TouchableOpacity>

                        <TextInput
                            style={{
                                backgroundColor: '#232c51',
                                color: '#f0f1f2',
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: '#2b95c3',
                                padding: 8,
                                marginVertical: 4
                            }}
                            placeholderTextColor="#aaaaaa"
                            placeholder="Task todo"
                            onChangeText={(task) => this.setState({ task: task })}
                        />
                        <TextInput
                            style={{
                                backgroundColor: '#232c51',
                                color: '#f0f1f2',
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: '#2b95c3',
                                padding: 8,
                                marginVertical: 4
                            }}
                            placeholderTextColor="#aaaaaa"
                            placeholder="Description here"
                            onChangeText={(desc) => this.setState({ desc: desc })}
                        />
                        <TouchableOpacity
                            style={{
                                borderRadius: 10,
                                height: 48,
                                backgroundColor: 'red',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginVertical: 4
                            }}
                            onPress={() => this.addTodo()}>
                            {this.state.addLoading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                    <Text style={{
                                        color: '#f0f1f2',
                                        fontWeight: '600',
                                    }}>Add Todo</Text>
                                )}
                        </TouchableOpacity>
                    </View>
                </Modal>

                <Modal
                    visible={this.state.modalEdit}
                    transparent={true}
                    style={{ flex: 1 }}>
                    <View style={{
                        width: 350,
                        padding: 16,
                        alignSelf: 'center',
                        marginTop: 32,
                        backgroundColor: '#77acd1',
                        borderRadius: 20,
                        borderWidth: 3,
                        borderColor: 'white',
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: 'red',
                            height: 24,
                            width: 24,
                            borderRadius: 12,
                            alignItems: 'center',
                            alignSelf: 'flex-end',
                        }}>
                            <Text
                                style={{
                                    color: '#f0f1f2',
                                    fontWeight: '600',
                                }}
                                onPress={() => this.showModalEdit(false)}>
                                x
              </Text>
                        </TouchableOpacity>
                        <Text style={{
                            color: '#f0f1f2',
                            fontSize: 24,
                            fontWeight: 'bold',
                            marginVertical: 16,
                        }}> Edit Todo </Text>
                        <TouchableOpacity
                            style={{ justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => this.handleEditPhoto()}>
                            <Image
                                source={{
                                    uri: this.state.editPhoto.uri,
                                }}
                                style={{ width: 100, height: 100 }}
                            />
                        </TouchableOpacity>

                        <TextInput
                            style={{
                                backgroundColor: '#232c51',
                                color: '#f0f1f2',
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: '#2b95c3',
                                padding: 8,
                                marginVertical: 4
                            }}
                            placeholderTextColor="#aaaaaa"
                            placeholder="Task todo"
                            value={this.state.editTask}
                            onChangeText={(task) => this.setState({ editTask: task })}
                        />
                        <TextInput
                            style={{
                                backgroundColor: '#232c51',
                                color: '#f0f1f2',
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: '#2b95c3',
                                padding: 8,
                                marginVertical: 4
                            }}
                            placeholderTextColor="#aaaaaa"
                            placeholder="Description here"
                            value={this.state.editDesc}
                            onChangeText={(desc) => this.setState({ editDesc: desc })}
                        />
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() =>
                                this.setState({ editIsDone: !this.state.editIsDone })
                            }>
                            <Image
                                source={
                                    this.state.editIsDone
                                        ? require('../assets/checklist.png')
                                        : require('../assets/kotak.png')
                                }
                                style={{
                                    width: 20,
                                    height: 20,
                                    margin: 4,
                                    tintColor: '#aaa',
                                }}
                            />
                            <Text style={{ color: "#f0f1f2" }}>
                                {this.state.editIsDone ? 'Selesai' : 'Belum selesai'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                borderRadius: 10,
                                height: 48,
                                backgroundColor: 'red',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginVertical: 4
                            }}
                            onPress={() => this.editTodo()}>
                            {this.state.addLoading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                    <Text style={{
                                        color: '#f0f1f2',
                                        fontWeight: '600',
                                    }}>Edit Todo</Text>
                                )}
                        </TouchableOpacity>
                    </View>
                </Modal>

                <ScrollView>
                    <Text>Welcome, Jujun </Text>
                    <View>
                        <View>
                            <Text>TODAY TASKS</Text>
                            <View>
                                {this.state.loading ? (
                                    <ActivityIndicator color="red" />
                                ) : this.state.todos.length === 0 ? (
                                    <Text>Kosong</Text>
                                ) : (
                                            this.state.todos.map((todo, index) => (
                                                <TouchableOpacity
                                                    onPress={() => this.showModalEdit(true, todo)}
                                                    key={todo.id}
                                                    style={{ alignItems: 'flex-start' }}>
                                                    <Image
                                                        source={{
                                                            uri: `http://restful-api-laravel-7.herokuapp.com/img/${todo.image}`,
                                                        }}
                                                        style={{ width: 64, height: 64, borderRadius: 10 }}
                                                    />
                                                    <View style={{ marginHorizontal: 8, flex: 1 }}>
                                                        <Text>{todo.task}</Text>
                                                        <Text>{todo.desc}</Text>
                                                        <View
                                                            style={{ flexDirection: 'row', alignItems: 'center' }}
                                                            onPress={() =>
                                                                this.setState({ editIsDone: !this.state.editIsDone })
                                                            }>
                                                            <Image
                                                                source={
                                                                    todo.is_done
                                                                        ? require('../assets/checklist.png')
                                                                        : require('../assets/kotak.png')
                                                                }
                                                                style={{
                                                                    width: 20,
                                                                    height: 20,
                                                                    margin: 4,
                                                                    tintColor: '#aaa',
                                                                }}
                                                            />
                                                            <Text style={{ color: "#f0f1f2" }}>
                                                                {todo.is_done ? 'Selesai' : 'Belum selesai'}
                                                            </Text>
                                                        </View>
                                                    </View>

                                                    <TouchableOpacity
                                                        onPress={() => this.deleteTodo(todo.id)}>
                                                        <Image
                                                            source={require('../assets/trash.png')}
                                                            style={{height:20,width:20}}
                                                        />
                                                    </TouchableOpacity>
                                                </TouchableOpacity>
                                            ))
                                        )}
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View>
                    <Text  style={{position: "absolute", fontSize:50, fontWeight: "bold",bottom: 20, right:20, textAlign: "center" }} onPress={() => this.showModal(true)}>+</Text>
                </View>
            </View>
        );
    }
}
export default Home;