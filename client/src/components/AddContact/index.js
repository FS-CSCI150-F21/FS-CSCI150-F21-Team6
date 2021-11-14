import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const AddPost = ({ contacts, addContact }) => {
  const [name, setName] = useState("");
  // const [Level, setLevel] = useState("");
  // const [Progress, setProgress] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // const checkContactLevelExists = contacts.filter((contact) =>
    //   contact.Level === Level ? contact : null
    //);
    // const checkContactProgressExists = contacts.filter((contact) =>
    //   contact.Progress === Progress ? contact : null
    //);

    if ( !name) {
      return toast.warning("Please fill in field!!");
    }
    // if (checkContactLevelExists.length > 0) {
    //   return toast.error("This Level already exists!!");
    // }
    // if (checkContactProgressExists.length > 0) {
    //   return toast.error("This Progress number already exists!!");
    // }

    const data = {
      id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
      // Level,
      name,
      // Progress,
    };

    addContact(data);
    toast.success("Player Added successfully!!");
    history.push("/");
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center text-dark py-3 display-2">Add Friend</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* <div className="form-group">
              <input
                className="form-control"
                type="Level"
                placeholder="Level"
                value={Level}
                onChange={(e) => setLevel(e.target.value)}
              />
            </div> */}
            
            {/* <div className="form-group">
              <input
                className="form-control"
                type="number"
                placeholder="Progress"
                value={Progress}
                onChange={(e) => setProgress(e.target.value)}
              />
            </div> */}
            <div className="form-group">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Add Student"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state.contactInfo,
});
const mapDispatchToProps = (dispatch) => ({
  addContact: (data) => {
    dispatch({ type: "ADD_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
