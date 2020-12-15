import React, {Component} from 'react';
import axios from 'axios';
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from 'reactstrap';
import './App.css';

class App extends Component {
  state = {
    pegawai:[],
    newPegawaiData: {
      nip: '',
      nama: '',
      pangkat: '',
      gol: '',
      unit_kerja: '',
    },
    editPegawaiData: {
      id: '',
      nip: '',
      nama: '',
      pangkat: '',
      gol: '',
      unit_kerja: '',
    },
    newPegawaiModal: false,
    editPegawaiModal: false,
  }

  componentDidMount() {
    this._refreshPegawai();
  }

  toggleNewPegawaiModal() {
    this.setState({
      newPegawaiModal : ! this.state.newPegawaiModal,
    });
    // this.state.newPegawaiModal = true;
  }

  toggleEditPegawaiModal() {
    this.setState({
      editPegawaiModal : ! this.state.editPegawaiModal,
    });
    // this.state.newPegawaiModal = true;
  }

  addPegawai() {
    axios.post('http://18.235.209.130:8080/pegawai/', this.state.newPegawaiData).then((Response)=> {
      let {pegawai} = this.state;

      pegawai.push(Response.data);
      this.setState({pegawai, newPegawaiModal: false, newPegawaiData: {
        nip: '',
        nama: '',
        pangkat: '',
        gol: '',
        unit_kerja: '',
      }});
    });
  }
  
  updatePegawai(){
    let {nip, nama, pangkat, gol, unit_kerja} = this.state.editPegawaiData;
    axios.put('http://18.235.209.130:8080/pegawai/'+ this.state.editPegawaiData.id, {
      nip, nama, pangkat, gol, unit_kerja
    }).then((Response) => {
      this._refreshPegawai();
      
      this.setState({
        editPegawaiModal: false, editPegawaiData: {
          id:'',
          nip: '',
          nama: '',
          pangkat: '',
          gol: '',
          unit_kerja: '',
        }
      })
    });
  }

  editPegawai(id, nip, nama, pangkat, gol, unit_kerja){
    this.setState({
      editPegawaiData: {id, nip, nama, pangkat, gol, unit_kerja},
      editPegawaiModal: ! this.state.editPegawaiModal,
    })
  }

  _refreshPegawai(){
    axios.get('http://18.235.209.130:8080/pegawai/').then((Response) => {
      const pegawai = Response.data;
      this.setState({ pegawai  });
    })
  }

  deletePegawai(id){
    axios.delete('http://18.235.209.130:8080/pegawai/'+id).then((Response) => {
      this._refreshPegawai();  
    })
  }

  render() {
    let pegawai = this.state.pegawai.map((karyawan) => {
      return (
        <tr key={karyawan.id}>
          <td>{karyawan.id}</td>
          <td>{karyawan.nip}</td>
          <td>{karyawan.nama}</td>
          <td>{karyawan.pangkat}</td>
          <td>{karyawan.gol}</td>
          <td>{karyawan.unit_kerja}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editPegawai.bind(this, 
                                                                        karyawan.id,
                                                                        karyawan.nip,
                                                                        karyawan.nama,
                                                                        karyawan.pangkat,
                                                                        karyawan.gol,
                                                                        karyawan.unit_kerja)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deletePegawai.bind(this, karyawan.id)}>Delete</Button>
          </td>
        </tr>
      )
    });
    return (
      <div className="App container">
        <div className="title"><h1>Data Kepegawaian</h1></div>
        

        <Button className="my-3" color="primary" onClick={this.toggleNewPegawaiModal.bind(this)}>Tambah Pegawai</Button>
        <Modal isOpen={this.state.newPegawaiModal} toggle={this.toggleNewPegawaiModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewPegawaiModal.bind(this)}>Tambah Pegawai</ModalHeader>
          <ModalBody>
            
            <FormGroup>
              <Label for="nip">Nip</Label>
              <Input type="text" id="nip" value={this.state.newPegawaiData.nip} onChange={(e) => {
                let {newPegawaiData} = this.state;
                newPegawaiData.nip = e.target.value;
                this.setState({newPegawaiData});
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="nama">Nama</Label>
              <Input type="text" id="nama" value={this.state.newPegawaiData.nama} onChange={(e) => {
                let {newPegawaiData} = this.state;
                newPegawaiData.nama = e.target.value;
                this.setState({newPegawaiData});
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="pangkat">Pangkat</Label>
              <Input type="text" id="pangkat" value={this.state.newPegawaiData.pangkat} onChange={(e) => {
                let {newPegawaiData} = this.state;
                newPegawaiData.pangkat = e.target.value;
                this.setState({newPegawaiData});
              }}/>
            </FormGroup>
            <FormGroup>
              <Label for="golongan">Golongan</Label>
              <Input type="text" id="golongan" value={this.state.newPegawaiData.gol} onChange={(e) => {
                let {newPegawaiData} = this.state;
                newPegawaiData.gol = e.target.value;
                this.setState({newPegawaiData});
              }}/>
            </FormGroup>
            <FormGroup>
              <Label for="unker">Unit Kerja</Label>
              <Input type="text" id="unker" value={this.state.newPegawaiData.unit_kerja} onChange={(e) => {
                let {newPegawaiData} = this.state;
                newPegawaiData.unit_kerja = e.target.value;
                this.setState({newPegawaiData});
              }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addPegawai.bind(this)}>Simpan Pegawai</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewPegawaiModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editPegawaiModal} toggle={this.toggleEditPegawaiModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditPegawaiModal.bind(this)}>Edit Pegawai</ModalHeader>
          <ModalBody>
            
            <FormGroup>
              <Label for="nip">Nip</Label>
              <Input type="text" id="nip" value={this.state.editPegawaiData.nip} onChange={(e) => {
                let {editPegawaiData} = this.state;
                editPegawaiData.nip = e.target.value;
                this.setState({editPegawaiData});
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="nama">Nama</Label>
              <Input type="text" id="nama" value={this.state.editPegawaiData.nama} onChange={(e) => {
                let {editPegawaiData} = this.state;
                editPegawaiData.nama = e.target.value;
                this.setState({editPegawaiData});
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="pangkat">Pangkat</Label>
              <Input type="text" id="pangkat" value={this.state.editPegawaiData.pangkat} onChange={(e) => {
                let {editPegawaiData} = this.state;
                editPegawaiData.pangkat = e.target.value;
                this.setState({editPegawaiData});
              }}/>
            </FormGroup>
            <FormGroup>
              <Label for="golongan">Golongan</Label>
              <Input type="text" id="golongan" value={this.state.editPegawaiData.gol} onChange={(e) => {
                let {editPegawaiData} = this.state;
                editPegawaiData.gol = e.target.value;
                this.setState({editPegawaiData});
              }}/>
            </FormGroup>
            <FormGroup>
              <Label for="unker">Unit Kerja</Label>
              <Input type="text" id="unker" value={this.state.editPegawaiData.unit_kerja} onChange={(e) => {
                let {editPegawaiData} = this.state;
                editPegawaiData.unit_kerja = e.target.value;
                this.setState({editPegawaiData});
              }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updatePegawai.bind(this)}>Update Pegawai</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditPegawaiModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Table>
          <thead> 
            <tr>
              <th>No</th>
              <th>Nip</th>
              <th>Nama</th>
              <th>Pangkat</th>
              <th>Golongan</th>
              <th>Unit Kerja</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {pegawai}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
