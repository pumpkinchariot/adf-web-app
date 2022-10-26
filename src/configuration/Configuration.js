import React from 'react';
// import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
// import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
// import { Flow } from '../editor/Flow.js';
// import ReactFlow, { MiniMap, Controls } from 'react-flow-renderer';
import { useState, useRef, useCallback } from 'react';
import { ListBox } from 'primereact/listbox';
import ReactFlow, {
    ReactFlowProvider,
    // MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './Sidebar';
import StartingPointNode from '../node-types/StartingPointNode';
import ModuleNode from '../node-types/ModuleNode';

import "./Configuration.css";

let id = 0;
const getId = () => `dndnode_${id++}`;


const nodeTypes = {
    startingPointNode: StartingPointNode,
    moduleNode: ModuleNode
};

const Configuration = () => {

    /* Configuration Info Toolbar */

    const [value, setValue] = useState('');

    /* Module Editor */

    const edgeOptions = {
        animated: true,
        style: {
            stroke: 'grey',
        },
    };

    const nodeList = [
        // { id: '1', type: 'startingPointNode', position: { x: 0, y: 0 }, data: { label: 'Battery Level Sensor' } },
        // { id: '2', type: 'moduleNode', position: { x: 300, y: 100 }, data: { label: 'Charging Station Price' } },
        // { id: '3', type: 'moduleNode', position: { x: 500, y: 200 }, data: { label: 'Weather Service' } },
        // { id: '4', type: 'moduleNode', position: { x: 700, y: 100 }, data: { label: 'UTC Time Service' } },
    ];

    const edgeList = [
        // {
        //     id: 'e1-2',
        //     source: '1',
        //     target: '2'
        // },
        // {
        //     id: 'e2a-3',
        //     source: '2',
        //     target: '3',
        //     sourceHandle: 'a',
        // },
        // {
        //     id: 'e2b-4',
        //     source: '2',
        //     target: '4',
        //     sourceHandle: 'b',
        // },
    ];

    const moduleList = // TODO Load list of module data from backend
        [{
            label: 'Sensor 1',
            inputEvents: [],
            outputEvents: ['Event 1', 'Event 2'],
            price: '20$/d'
        },
        {
            label: 'Sensor 2',
            inputEvents: [],
            outputEvents: ['Event A', 'Event B'],
            price: '12$/d'
        },
        {
            label: 'Sensor 3',
            inputEvents: [],
            outputEvents: ['Event 1', 'Event 2', 'Event 3'],
            price: '7$/h'
        },
        {
            label: 'Module 1',
            inputEvents: ['Input Event 1', 'Input Event 2', 'Input Event 3'],
            outputEvents: ['Event A', 'Event B'],
            price: '12$/d'
        },
        {
            label: 'Module 2',
            inputEvents: ['Event XYZ'],
            outputEvents: ['Event A', 'Event B'],
            price: '12$/d'
        },
        {
            label: 'Module 3',
            inputEvents: ['A', 'B', 'C'],
            outputEvents: ['Event A', 'Event B'],
            price: '12$/d'
        },
        {
            label: 'Module 4',
            inputEvents: ['Event X'],
            outputEvents: ['Event A', 'Event B'],
            price: '12$/d'
        }
        ];

    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(nodeList);
    const [edges, setEdges, onEdgesChange] = useEdgesState(edgeList);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const nodeName = event.dataTransfer.getData('nodeName');
            const nodeType = event.dataTransfer.getData('nodeCategory');
            // console.log("ondrop: " + nodeData['label']);

            // check if the dropped element is valid
            if (typeof nodeName === 'undefined' || !nodeName) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });

            const moduleData = moduleList.find(obj => {
                return obj.label === nodeName;
            });

            console.log(moduleData.outputEvents)

            const newNode = {
                id: getId(),
                type: nodeType,
                position,
                data: moduleData,
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    /* Module List */

    const groupedNodes = [
        {
            label: 'Start Nodes', code: 'SN',
            items: [
                { label: 'Battery Level', value: 'Berlin' },
                { label: 'Position', value: 'Frankfurt' },
            ]
        },
        {
            label: 'Modules', code: 'M',
            items: [
                { label: 'Weather', value: 'Chicago' },
                { label: 'Sub', value: 'Los Angeles' },
                { label: 'Add', value: 'New York' },
                { label: 'Mult', value: 'San Francisco' },
                { label: 'Div', value: 'San Francisco' },
                { label: 'Charging Station Price', value: 'San Francisco' },
                { label: 'Charging Station Position', value: 'San Francisco' },
                { label: 'Union', value: 'San Francisco' },
                { label: 'Intersect', value: 'San Francisco' },
                { label: 'Mapping', value: 'San Francisco' },
            ]
        }
    ];

    const [selectedGroupedNode, setSelectedGroupedNode] = useState(null);

    const groupedItemTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                {/* <img alt={option.name} src="images/flag/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} /> */}
                <div>{option.label}</div>
            </div>
        );
    }

    /* Dialogs */

    const [discardConfigDialog, setDiscardConfigDialog] = useState(false);
    const [saveConfigDialog, setSaveConfigDialog] = useState(false);

    const toast = useRef(null);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const dialogFuncMap = {
        'discardConfigDialog': setDiscardConfigDialog,
        'saveConfigDialog': setSaveConfigDialog
    }

    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    // const renderFooter = (name) => {
    //     return (
    //         <div>
    //             <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
    //             <Button label="Yes" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
    //         </div>
    //     );
    // }


    return (
        <div className='configuration-info-editor'>
            <ConfirmDialog visible={discardConfigDialog} onHide={() => setDiscardConfigDialog(false)} message="Are you sure you want to proceed?"
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={() => setDiscardConfigDialog(false)} />

            <ConfirmDialog visible={saveConfigDialog} onHide={() => setSaveConfigDialog(false)} message="Save the current configuration?"
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={() => setDiscardConfigDialog(false)} />
            <div className='configuration-section configuration-details-section'>
                <div className='configuration-details'>
                    <div className='configuration-title'>
                        <InputText value={value} onChange={(e) => setValue(e.target.value)} disabled className='configuration-title-input' />
                        <Button icon="pi pi-pencil" className="p-button-text configuration-title-edit-button" />
                    </div>
                    <div className='configuration-infos'>
                        <div className='configuration-info-text'>
                            Number of Modules: {nodeList.length}
                        </div>
                        <div className='configuration-info-text'>
                            Estimated Cost: 50$
                        </div>
                    </div>
                </div>
            </div>

            <div className='configuration-section editor-section'>
                <div className='configuration-section-title'>
                    Editor
                </div>

                <div className='editor-tools'>
                    <Button icon="pi pi-wrench" label='Auto Complete' className="p-button-text editor-tool-button auto-complete-button" />
                    <div className='save-discard-buttons'>
                        <Button icon="pi pi-times" label='Discard' onClick={() => setDiscardConfigDialog(true)} className="p-button-text editor-tool-button discard-config-button" />
                        <Button icon="pi pi-check" label='Save' onClick={() => setSaveConfigDialog(true)} className="p-button-text editor-tool-button save-config-button" />
                    </div>
                </div>

                <div className='configuration-editor'>
                    <div className='module-list'>
                        <Sidebar />
                    </div>
                    <div className='flow-provider-container'>
                        <ReactFlowProvider>
                            {/* Todo CSS */}
                            <div className="reactflow-wrapper flow-container" ref={reactFlowWrapper}>
                                <ReactFlow
                                    onInit={setReactFlowInstance}
                                    defaultEdgeOptions={edgeOptions}
                                    nodeTypes={nodeTypes}

                                    nodes={nodes}
                                    edges={edges}
                                    onNodesChange={onNodesChange}
                                    onEdgesChange={onEdgesChange}
                                    onConnect={onConnect}

                                    onDrop={onDrop}
                                    onDragOver={onDragOver}
                                >
                                    <Controls />
                                    <Background color="#aaa" gap={16} />
                                </ReactFlow>
                            </div>
                            {/* <Sidebar /> */}
                        </ReactFlowProvider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Configuration;