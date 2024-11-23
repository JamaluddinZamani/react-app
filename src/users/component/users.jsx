
import { Component , createRef} from "react";
import "../css/styleForUsers.css";
import axios from "axios";
import Louding from "./louding";
import { Link } from "react-router-dom";

class Users extends Component {
    constructor(props){
        super(props);
        this.form = createRef();
    }
    
    state = {
        users: [],
        isLouding: true,
        form: { id: null, first_name: '', last_name: '', email: '', photo: '' }
    };
    async componentDidMount() {
        this.loudUsers();
        setTimeout(() => {
            this.setState({isLouding: false});
        }, 300);
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.form.current.style.display = "none"
        
        const formData = new FormData();
        formData.append("first_name", this.state.form.first_name);
        formData.append("last_name", this.state.form.last_name);
        formData.append("email", this.state.form.email);
        
        if (typeof this.state.form.photo === "object" && this.state.form.photo instanceof File) {
            formData.append("photo", this.state.form.photo);
        } else {
            formData.append("photo", this.state.form.photo || "");
        }
        if (this.state.form.id) {
            formData.append("id", this.state.form.id);
            await axios.post("http://localhost/forReactServerSide/api/users.php?method=PUT", formData , 
                {headers:{"Content-Type": "multipart/form-data"}}
            );
        } else {
            await axios.post("http://localhost/forReactServerSide/api/users.php", formData ,
            {headers:{"Content-Type": "multipart/form-data"}}
            );
        }

        this.loudUsers();
        this.setState({ form: { id: null, first_name: '', last_name: '', email: '', photo: '' } });
    };

    handleCreate = () => {
        this.form.current.style.display = "flex";
    };

    handleUpdate = (user) => {
        this.form.current.style.display = "flex";
        this.setState({ form: user });
    };

    handleDelete = async (id) => {
        await axios.delete(`http://localhost/forReactServerSide/api/users.php?id=${id}`);
        this.loudUsers();
    };

    handlePhotoReq = (photo) => {
        return (
            <input
                name="photo"
                id="photo"
                type="file"
                required={!photo}
                onChange={(e) => this.setState({ form: { ...this.state.form, photo: e.target.files[0] } })}
            />
        );
    };

    loudUsers = async () => {
        const response = await axios.get("http://localhost/forReactServerSide/api/users.php");
        this.setState({ users: response.data });
    };

    render() {
        return (
            this.state.isLouding ? (
                <Louding />
            ) : (
                <div>
                    <div ref={this.form} className="form_container" id="form_container_id">
                        {this.state.form.photo && typeof this.state.form.photo === "string" && (
                            <img
                                src={`http://localhost/forReactServerSide/api/${this.state.form.photo}`}
                                alt="user"
                                style={{ borderRadius: "50%", width: "100px", height: "100px" }}
                            />
                        )}
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                            <input
                                name="fname"
                                type="text"
                                placeholder="First Name"
                                value={this.state.form.first_name}
                                onChange={(e) =>
                                    this.setState({ form: {...this.state.form , first_name : e.target.value} })
                                }
                                required
                            />
                            <input
                                name="lname"
                                type="text"
                                placeholder="Last Name"
                                value={this.state.form.last_name}
                                onChange={(e) =>
                                    this.setState({ form: {...this.state.form , last_name : e.target.value} })
                                }
                                required
                            />
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={this.state.form.email}
                                onChange={(e) =>
                                    this.setState({ form: {...this.state.form , email : e.target.value} })
                                }
                                required
                            />
                            <label htmlFor="photo">
                                Photo {this.handlePhotoReq(this.state.form.photo)}
                            </label>
                            <button type="submit">
                                {this.state.form.id ? "Update" : "Add"} User
                            </button>
                        </form>
                    </div>
                    <button onClick={this.handleCreate} className="create_button">
                        create
                    </button>
                    <div className="users_container">
                        {this.state.users.map((user, index) => (
                            <div className="user_container" key={user.id}>
                                <img
                                    src={`http://localhost/forReactServerSide/api/${user.photo}`}
                                    style={{ borderRadius: "50%", width: "100px", height: "100px" }}
                                    alt="user"
                                />
                                <h4>
                                    <Link to={`/users/${user.id}`} style={{textDecoration : 'none'}}>
                                        {user.first_name} {user.last_name}
                                    </Link>
                                </h4>
                                <h5>{user.email}</h5>
                                <div className="button_container">
                                    <button onClick={() => { this.handleUpdate(user) }} className="update_button">
                                        Update
                                    </button>
                                    <button onClick={() => { this.handleDelete(user.id) }} className="delete_button">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        );
    }
}


export default Users;




