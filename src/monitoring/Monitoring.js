import React from 'react';
import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

import "./Monitoring.css";

const Monitoring = (props) => {

    const [value, setValue] = useState('');
    const [runningConfigurationTableData] = useState([
        { name: "Config A", moduleCount: "4", costs: "12.58$" }
    ]);
    const [products, setProducts] = useState([]);

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

    const columns = [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'category', header: 'Category' },
        { field: 'quantity', header: 'Quantity' }
    ];

    // useEffect(() => {
    //     productService = new ProductService();
    //     productService.getProductsSmall().then(data => setProducts(data));
    // }, [])

    const dynamicColumns = columns.map((col, i) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });

    return (
        <div className='monitoring-row'>
            <div className='running-config-preview-matrix'>
                <div className='running-config-preview'>
                    <div className='monitoring-section monitoring-running-config'>
                        <div className='monitoring-section-title'>
                            Running Config
                        </div>
                        <DataTable value={runningConfigurationTableData} footer={runningConfigurationFooter} responsiveLayout="scroll" size="small" style={{ padding: "15px" }}>
                            <Column field="name" header="Name"></Column>
                            <Column field="moduleCount" header="Module Count"></Column>
                            <Column field="costs" header="Costs"></Column>
                            <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={runningConfigurationTemplate} />
                        </DataTable>
                    </div>
                    <div className='monitoring-section monitoring-config-preview'>
                        {/* TODO Config Preview */}
                    </div>
                </div>
                <div className='monitoring-section'>
                    <div className='monitoring-section-title matrix-section'>
                        Data Matrix
                    </div>
                    {/* <DataTable value={products}>
                        {dynamicColumns}
                    </DataTable> */}
                </div>
            </div>
            <div className='monitoring-section'>
                <div className='monitoring-section-title'>
                    Console
                </div>
                <InputTextarea value={value} onChange={(e) => setValue(e.target.value)} rows={10} cols={30} disabled />
            </div>
        </div>
    );
};

export default Monitoring;