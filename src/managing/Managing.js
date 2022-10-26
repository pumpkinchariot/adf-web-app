import React from 'react';
import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import "./Managing.css";

const Managing = (props) => {

    const [value3, setValue3] = useState('');
    const [configurationListTableData] = useState([
        { name: "Config A", moduleCount: "4", costs: "12.58$", status: "RUNNING" },
        { name: "Config B", moduleCount: "2", costs: "1.5$", status: "VALID" },
        { name: "Config C", moduleCount: "7", costs: "125.41$", status: "VALID" },
        { name: "Config D", moduleCount: "1", costs: "23.12$", status: "INVALID" },
        { name: "Config E", moduleCount: "2", costs: "9.63$", status: "VALID" }
    ]);


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

    const configurationListTemplate = () => {
        return (
            <div className='running-config-table-button-group'>
                <div><Button type="button" icon="pi pi-play" className='running-config-table-button'></Button></div>
                <div><Button type="button" icon="pi pi-chart-bar" className='running-config-table-button'></Button></div>
            </div>
        );
    }

    const createConfig = () => {
        // TODO
    }

    const deleteConfig = () => {
        // TODO
    }

    return (
        <div className='managing-toolbar-configuration-list'>
            <div className='managing-section'>
                <div className='managing-section-title'>
                    Toolbar
                </div>
                <div className='managing-toolbar'>
                    <Button type="button" label="Create" icon="pi pi-plus" className='create-button' onClick={createConfig} />
                    <Button type="button" label="Delete" icon="pi pi-trash" className='delete-button' onClick={deleteConfig} />
                </div>
            </div>

            <div className='managing-section'>
                <div className='managing-section-title'>
                    Configuration List
                </div>
                <DataTable value={configurationListTableData} header={configurationListHeader} responsiveLayout="scroll" size="small" style={{ padding: "15px" }}>
                    <Column selectionMode="multiple" selectionAriaLabel="name" headerStyle={{ width: '3em' }}></Column>
                    <Column field="name" header="Name" sortable></Column>
                    <Column field="moduleCount" header="Module Count" sortable></Column>
                    <Column field="costs" header="Costs" sortable></Column>
                    <Column field="status" header="Status" sortable></Column>
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={configurationListTemplate} />
                </DataTable>
            </div>
        </div>
    );
};

export default Managing;