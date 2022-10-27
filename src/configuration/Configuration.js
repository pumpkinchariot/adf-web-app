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
import { useState, useRef, useCallback, useEffect } from 'react';
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

    const [configTitle, setConfigTitle] = useState('');
    const [configInputDisabled, setConfigInputDisabled] = useState(true);
    const [numberOfModules, setNumberOfModules] = useState('');
    const [estimatedCosts, setEstimatedCosts] = useState('');

    const editConfigTitle = () => {
        setConfigInputDisabled(false);
    }

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

            // check if the dropped element is valid
            if (typeof nodeName === 'undefined' || !nodeName) {
                return;
            }

            if (typeof nodeType === 'undefined' || !nodeType) {
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

    const moduleList = // TODO Load list of module data from backend (List of all existing Modules)
        [{
            label: 'Sensor 1',
            inputEvents: [],
            outputEvents: ['Event 1', 'Event 2'],
            price: 20
        },
        {
            label: 'Sensor 2',
            inputEvents: [],
            outputEvents: ['Event A', 'Event B'],
            price: 12
        },
        {
            label: 'Sensor 3',
            inputEvents: [],
            outputEvents: ['Event 1', 'Event 2', 'Event 3'],
            price: 7
        },
        {
            label: 'Module 1',
            inputEvents: ['Input Event 1', 'Input Event 2', 'Input Event 3'],
            outputEvents: ['Event A', 'Event B'],
            price: 8
        },
        {
            label: 'Module 2',
            inputEvents: ['Event XYZ'],
            outputEvents: ['Event A', 'Event B'],
            price: 12
        },
        {
            label: 'Module 3',
            inputEvents: ['A', 'B', 'C'],
            outputEvents: ['Event A', 'Event B'],
            price: 12
        },
        {
            label: 'Module 4',
            inputEvents: ['Event X'],
            outputEvents: ['Event A', 'Event B'],
            price: 12
        }];


    /* Dialogs */

    const [discardConfigDialog, setDiscardConfigDialog] = useState(false);
    const [saveConfigDialog, setSaveConfigDialog] = useState(false);

    const toast = useRef(null);

    const clearEditor = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Editor cleared!', life: 3000 });
        setNodes([]);
        setEdges([]);
        setDiscardConfigDialog(false);
    }

    const saveConfig = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Configuration saved!', life: 3000 });
        // TODO save config to backend
        setSaveConfigDialog(false);
    }

    /* Effect Hooks */

    useEffect(() => {
        setNumberOfModules(nodes.length)
    }, [nodes]);

    useEffect(() => {
        const costs = nodes
            .map(node => moduleList.find(module => module.label === node.data.label))
            .filter(it => it !== undefined)
            .map(it => it.price)
            .reduce((previous, current) => previous + current, 0);
        setEstimatedCosts(costs);
    }, [nodes]);

    return (
        <div className='configuration-info-editor'>
            <Toast ref={toast} />
            <ConfirmDialog visible={discardConfigDialog} onHide={() => setDiscardConfigDialog(false)} message="Are you sure you want to proceed?"
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={() => clearEditor()} reject={() => setDiscardConfigDialog(false)} />
            <ConfirmDialog visible={saveConfigDialog} onHide={() => setSaveConfigDialog(false)} message="Save the current configuration?"
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={() => saveConfig()} reject={() => setSaveConfigDialog(false)} />
            <div className='configuration-section configuration-details-section'>
                <div className='configuration-details'>
                    <div className='configuration-title'>
                        <InputText value={configTitle} onChange={(e) => setConfigTitle(e.target.value)} disabled={configInputDisabled} className='configuration-title-input' />
                        <Button icon="pi pi-pencil" onClick={() => editConfigTitle()} className="p-button-text configuration-title-edit-button" />
                    </div>
                    <div className='configuration-infos'>
                        <div className='configuration-info-text'>
                            Number of Modules: {numberOfModules}
                        </div>
                        <div className='configuration-info-text'>
                            Estimated Cost: {estimatedCosts}$/d
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
                        </ReactFlowProvider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Configuration;