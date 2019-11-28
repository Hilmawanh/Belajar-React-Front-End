import React, { Component } from "react";
import { Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

class Home extends Component {
  state = {
    data: [],
    isopen: false
  };

  componentDidMount() {
    this.setState({
      data: [
        { kegiatan: "Lari", status: true, tanggal: "2019-11-27" },
        { kegiatan: "Sarapan", status: false, tanggal: "2019-11-28" }
      ]
    });
  }

  renderTodo = () => {
    return this.state.data.map((val, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{val.kegiatan}</td>
          <td>{val.status ? "Sudah" : "Belum"}</td>
          <td>{val.tanggal}</td>
          <td>
            <button className="btn btn-primary mr-4">Edit</button>
            <button
              onClick={() => this.onDeletedataClick(index)}
              className="btn btn-danger mr-4"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  onAdddataClick = () => {
    var kegiatan = this.refs.kegiatan.value;
    console.log(kegiatan);
    var tanggal = this.refs.tanggal.value;
    console.log(tanggal);
    var obj = {
      kegiatan,
      status: false,
      tanggal
    };
    if (kegiatan === "" || tanggal === "") {
      MySwal.fire("Cancelled", "Tolong masukan data anda :)", "error");
    } else {
      var newdata = [...this.state.data, obj];
      this.setState({ data: newdata, isopen: false });
    }
  };

  onDeletedataClick = index => {
    MySwal.fire({
      title:
        "Kamu yakin ingin mengahpus data  " +
        this.state.data[index].kegiatan +
        "?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        var data = this.state.data;
        data.splice(index, 1);
        this.setState({ data: data });
        MySwal.fire("Deleted!", "Your file has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire("Cancelled", "Your data is safe :)", "error");
      }
    });
  };

  render() {
    // Modal add data started //
    return (
      <div>
        <Modal
          isOpen={this.state.isopen}
          toggle={() => this.setState({ isopen: false })}
        >
          <ModalHeader>Add Data</ModalHeader>
          <ModalBody>
            <input
              className="form-control"
              placeholder="kegiatan"
              type="text"
              ref="kegiatan"
            />
            <input
              className="form-control"
              placeholder="tanggal"
              type="date"
              ref="tanggal"
            />
          </ModalBody>
          <ModalFooter>
            <button onClick={this.onAdddataClick} className="btn btn-primary">
              ADD
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.setState({ isopen: false })}
            >
              CANCEL
            </button>
          </ModalFooter>
        </Modal>
        <div className="px-5 mx-5 my-5">
          <Table>
            <thead style={{ backgroundColor: "#fff4e4" }}>
              <tr>
                <th>No.</th>
                <th>Kegiatan</th>
                <th>Status</th>
                <th>Tanggal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "#bae8e8" }}>
              {this.renderTodo()}
            </tbody>
          </Table>
          <div>
            <button
              onClick={() => this.setState({ isopen: true })}
              className="btn btn-success rounded-pill"
            >
              add data
            </button>
          </div>
        </div>
      </div>
    );
  }
  //Modal data ended //
}

export default Home;
