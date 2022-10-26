import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import "./NodeTypes.css";
import "./ModuleNode.css";

const handleStyle = { top: 30 };

function ModuleNode({ data }) {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
        // console.log(data);
    }, []);

    const numberOfEvents = (eventList) => {
        if (eventList !== undefined) {
            return eventList.length;
        }
        return 0;
    }

    return (
        <div className="module-node">
            {/* <Handle type="target" position={Position.Left} /> */}
            {numberOfEvents(data['inputEvents']) > 0 &&
                data['inputEvents'].map((item, i) =>
                    <Handle type="target" position={Position.Left} id={String(i)} style={{ top: i * 20 + 20 }} >
                        <div className='input-label'>
                            {item}
                        </div>
                    </Handle>
                )}
            <div>
                <div className='node-label'>
                    {data['label']}
                </div>
                <div className='node-content'>
                    <span className='node-info'>
                        {data['price']}
                    </span>
                    <Button icon="pi pi-trash" className="p-button-text node-button" onClick={() => console.log(data['label'])} />
                </div>
            </div>

            {numberOfEvents(data['outputEvents']) > 0 &&
                data['outputEvents'].map((item, i) =>
                    <Handle type="source" position={Position.Right} id={String(i)} style={{ top: i * 20 + 20 }} >
                        <div className='output-label'>
                            {item}
                        </div>
                    </Handle>
                )}
        </div>
    );
}

export default ModuleNode;