import React, { Component, useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';

import { withAlert } from 'react-alert'

import './style.css';

import NavBar from './../../component/NavBar';
import UserService from './../../services/userService';


const columns = [
  {
    name: 'Plat Nomor',
    selector: 'plat_nomor',
  },
  {
    name: 'Merk',
    selector: 'merk',
  },
  {
    name: 'Jenis Kendaraan',
    selector: 'jenis_kendaraan',
  },
  {
    name: 'Kode',
    selector: 'kode',
  },
  {
    name: 'Jam Masuk',
    selector: 'jam_masuk',
  },
  {
    name: 'Jam Keluar',
    selector: 'jam_keluar',
  }
];

class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      limit: 10,
      allData: {},
      vehicle: {},
    };
  }

  getDataHistory = async (page, limit) => {
    const data = await UserService.getHistoryTransaction(page, limit);
    console.log(data);
    if (data.code === 200) {
      this.setState({
        allData: data.message
      });
    } else {
      this.props.alert.show(data.message);
    }
  }

  getDataReportCountKendaraan = async (page, limit) => {
    const data = await UserService.getReportCOuntKendaraan();
    if (data.code === 200) {
      console.log('data', data);
      this.setState({
        vehicle: data.message
      });
    } else {
      this.props.alert.show(data.message);
    }
  }

  componentDidMount() {
    this.getDataHistory(this.state.page, this.state.limit);
    this.getDataReportCountKendaraan();
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="uk-container uk-container-xlarge uk-margin-top">
          <div className="uk-flex uk-flex-center">
            <div className="uk-card uk-card-default uk-card-body">
              Motor
              <p style={{
                textAlign: 'center'
              }}>{this.state.vehicle.motor}</p>
              </div>
            <div className="uk-card uk-card-default uk-card-body uk-margin-left">
              Mobil
              <p style={{
                textAlign: 'center'
              }}>{this.state.vehicle.mobil}</p>
              </div>
            <div className="uk-card uk-card-default uk-card-body uk-margin-left">
              Truk/Other
              <p style={{
                textAlign: 'center'
              }}>{this.state.vehicle.truk}</p>
              </div>
          </div>
          <div className="uk-margin uk-card uk-card-default uk-card-body">
            <DataTable
              title="Report"
              columns={columns}
              data={this.state.allData.data}
              highlightOnHover
              pagination
              paginationServer
              paginationTotalRows={this.state.allData.total}
              paginationPerPage={this.state.allData.per_page}
              paginationComponentOptions={{
                noRowsPerPage: true
              }}
              onChangePage={page => {
                this.getDataHistory(page, this.state.limit);
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default withAlert()(History);
