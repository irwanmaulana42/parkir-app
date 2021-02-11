import React, { Component, useState, useEffect } from 'react'
import Modal from 'react-modal';
import { withAlert } from 'react-alert'

import './style.css';

import NavBar from './../../component/NavBar';
import UserService from './../../services/userService';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.onChangePlatNomor = this.onChangePlatNomor.bind(this);
    this.onChangeMerk = this.onChangeMerk.bind(this);
    this.onChangeJenisKendaraan = this.onChangeJenisKendaraan.bind(this);
    this.onChangeKode = this.onChangeKode.bind(this);

    this.state = {
      failed: false,
      message: "",
      plat_nomor: "",
      merk: "",
      kode: "",
      jenis_kendaraan: "",
      type: "error",
      status: true,
      title: "Hey! this is an error.",
    };
  }

  onChangePlatNomor = (e) => {
    this.setState({
      plat_nomor: e.target.value
    });
  }

  onChangeMerk = (e) => {
    this.setState({
      merk: e.target.value
    });
  }

  onChangeJenisKendaraan = (e) => {
    this.setState({
      jenis_kendaraan: e.target.value
    });
  }

  onChangeKode = (e) => {
    this.setState({
      kode: e.target.value
    });
  }

  handleSubmitAdd = async () => {
    const { plat_nomor, merk, jenis_kendaraan } = this.state;
    if (plat_nomor === '' || merk === '' || jenis_kendaraan === '') {
      this.props.alert.show("Harap isi kolom");
      return;
    }

    const data = await UserService.kendaraanMasuk(plat_nomor, jenis_kendaraan, merk);
    if (data.code === 200) {
      this.props.alert.show(data.message);
      this.setState({
        plat_nomor: "",
        merk: ""
      });
    }else{
      this.props.alert.show(data.message);
    }
  }

  handleGo = async() => {
    const { kode } = this.state;
    if(kode === ''){
      this.props.alert.show("Harap isi kolom");
      return;
    }

    const data = await UserService.kendaraanKeluar(kode);
    if(data.code === 200){
      this.setState({
        kode: ""
      });
      this.props.alert.show(data.message);
    }else{
      this.props.alert.show(data.message);
    }
    console.log(data);
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="uk-container uk-container-xlarge uk-margin-top">
          <div className="uk-margin uk-card uk-card-default uk-card-body">
            <h3>E - Parkir</h3>
      
            <div className="uk-flex">
              <div className="uk-card uk-card-default uk-card-body uk-width-1-2@m">
                <h3 className="uk-card-title">Kendaraan Masuk</h3>
                <div className="uk-form-stacked">
                  <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="form-stacked-text">Plat Nomor</label>
                    <div className="uk-form-controls">
                      <input
                        className="uk-input"
                        id="form-stacked-text"
                        type="text"
                        placeholder="Plat Nomor"
                        value={this.state.plat_nomor}
                        onChange={this.onChangePlatNomor}
                      />
                    </div>
                  </div>
                  <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="form-stacked-text">Merk</label>
                    <div className="uk-form-controls">
                      <input
                        className="uk-input"
                        id="form-stacked-text"
                        type="text"
                        placeholder="Merk"
                        value={this.state.merk}
                        onChange={this.onChangeMerk}
                      />
                    </div>
                  </div>
                  <div className="uk-margin">
                    <div className="uk-form-label">Jenis Kendaraan</div>
                    <div className="uk-form-controls">
                      <label><input className="uk-radio" type="radio" name="kendaraan" value="motor" onChange={this.onChangeJenisKendaraan} /> Motor</label><br />
                      <label><input className="uk-radio" type="radio" name="kendaraan" value="mobil" onChange={this.onChangeJenisKendaraan} /> Mobil</label><br />
                      <label><input className="uk-radio" type="radio" name="kendaraan" value="truk/other" onChange={this.onChangeJenisKendaraan} /> Truk/ Other</label>
                    </div>
                  </div>
                  <button className="uk-button uk-button-danger" onClick={this.handleSubmitAdd}>Add</button>
                </div>
              </div>
              <div className="uk-card uk-card-default uk-card-body uk-width-1-2@m">
                <h3 className="uk-card-title">Kendaraan Keluar</h3>
                <div className="uk-form-stacked">
                  <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="form-stacked-text">Kode</label>
                    <div className="uk-form-controls">
                      <input
                        className="uk-input"
                        id="form-stacked-text"
                        type="text"
                        placeholder="Kode"
                        value={this.state.kode}
                        onChange={this.onChangeKode}
                      />
                    </div>
                  </div>
                  <button className="uk-button uk-button-danger" onClick={this.handleGo}>Go</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default withAlert()(Dashboard);
