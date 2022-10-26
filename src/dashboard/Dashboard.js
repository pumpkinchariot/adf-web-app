import React from 'react';
import "./Dashboard.css";
import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';

const Dashboard = (props) => {

    const [products, setProducts] = useState([]);
    const [value3, setValue3] = useState('');

    const [runningConfigurationTableData] = useState([
        { name: "Config A", moduleCount: "4", costs: "12.58$" }
    ]);

    const [configurationListTableData] = useState([
        { name: "Config A", moduleCount: "4", costs: "12.58$", status: "RUNNING" },
        { name: "Config B", moduleCount: "2", costs: "1.5$", status: "VALID" },
        { name: "Config C", moduleCount: "7", costs: "125.41$", status: "VALID" },
        { name: "Config D", moduleCount: "1", costs: "23.12$", status: "INVALID" },
        { name: "Config E", moduleCount: "2", costs: "9.63$", status: "VALID" }
    ]);

    const [basicData] = useState({
        labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        datasets: [
            {
                label: 'dataset a',
                backgroundColor: '#a8d1e9',
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'dataset b',
                backgroundColor: '#b0d9c1',
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    });

    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        return { basicOptions }
    }

    const { basicOptions } = getLightTheme();


    const configurationListHeader = (
        <div className="config-list-table-header table-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={value3} onChange={(e) => setValue3(e.target.value)} placeholder="Search" />
            </span>

            <div>
                <Button label="Global Search" className='global-search-button' />
            </div>

        </div>
    );

    const runningConfigurationFooter = (
        <div className="running-config-footer">
            <div>
                Start Time:
                <span style={{ color: "lightblue" }}> 4:05 PM - 08/22/2022</span>
            </div>

            <div>
                Running Time:
                <span style={{ color: "lightblue" }}> 1d 1m 12m</span>
            </div>
        </div>
    );

    const runningConfigurationTemplate = () => {
        return (
            <div className='running-config-table-button-group'>
                <div><Button type="button" icon="pi pi-play" className='running-config-table-button'></Button></div>
                <div><Button type="button" icon="pi pi-pause" className='running-config-table-button'></Button></div>
                <div><Button type="button" icon="pi pi-chart-bar" className='running-config-table-button'></Button></div>
            </div>
        );
    }

    const configurationListTemplate = () => {
        return (
            <div className='running-config-table-button-group'>
                <div><Button type="button" icon="pi pi-play" className='running-config-table-button'></Button></div>
                <div><Button type="button" icon="pi pi-chart-bar" className='running-config-table-button'></Button></div>
            </div>
        );
    }

    return (
        <div className="dashboard-row-spacer">

            <div className='dashboard-column-spacer' style={{ width: "65%" }}>
                <div className='dashboard-section dashboard-running-configuration'>
                    <div className='dashboard-section-title'>
                        Running Configuration
                    </div>

                    <DataTable value={runningConfigurationTableData} footer={runningConfigurationFooter} responsiveLayout="scroll" size="small" style={{ padding: "15px" }}>
                        <Column field="name" header="Name"></Column>
                        <Column field="moduleCount" header="Module Count"></Column>
                        <Column field="costs" header="Costs"></Column>
                        <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={runningConfigurationTemplate} />
                    </DataTable>

                </div>
                <div className='dashboard-section dashboard-configuration-list'>
                    <div className='dashboard-section-title'>
                        Configuration List
                    </div>
                    <DataTable value={configurationListTableData} header={configurationListHeader} responsiveLayout="scroll" size="small" style={{ padding: "15px" }}>
                        <Column field="name" header="Name" sortable></Column>
                        <Column field="moduleCount" header="Module Count" sortable></Column>
                        <Column field="costs" header="Costs" sortable></Column>
                        <Column field="status" header="Status" sortable></Column>
                        <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={configurationListTemplate} />
                    </DataTable>
                </div>
            </div>

            <div className='dashboard-column-spacer' style={{ width: "35%" }}>
                <div className='dashboard-section configuration-overview'>
                    <div className='dashboard-section-title'>
                        Configuration Overview

                        <Chart type="bar" data={basicData} options={basicOptions} />

                    </div>
                </div>
                <div className='dashboard-section configuration-detail'>
                    <div className='dashboard-section-title'>
                        Configuration Detail
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;