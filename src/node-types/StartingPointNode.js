import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import "./NodeTypes.css";
import "./StartingPointNode.css";

const handleStyle = { top: 20 };

function StartingPointNode({ data }) {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    const numberOfoutputEvents = () => {
        if (data['outputEvents'] !== undefined) {
            return data['outputEvents'].length;
        }
        return 0;
    }

    return (
        <div className="starting-point-node">
            {/* <Handle type="target" position={Position.Left} /> */}
            <div>
                <div className='node-label'>
                    {data['label']}
                </div>
                <div className='node-content'>
                    <span className='node-info'>
                        50$/d
                    </span>
                    <Button icon="pi pi-trash" className="p-button-text node-button" />
                </div>
            </div>
            {/* <Handle type="source" position={Position.Right} id="a" style={{ top: 10 }} />
            <Handle type="source" position={Position.Right} id="b" style={handleStyle} />
            <Handle type="source" position={Position.Right} id="c" style={{ top: 30 }} /> */}

            {numberOfoutputEvents() > 0 &&
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

export default StartingPointNode;