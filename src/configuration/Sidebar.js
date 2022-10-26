import React from 'react';
import "./Sidebar.css";

export default () => {
    const onDragStart = (event, name, nodeCategory) => {
        console.log(name);
        event.dataTransfer.setData('nodeName', name);
        event.dataTransfer.setData('nodeCategory', nodeCategory);
        event.dataTransfer.effectAllowed = 'move';
    };

    // const [list, setList] = useState([]);
    const sourceList = ['Sensor 1', 'Sensor 2', 'Sensor 3'];
    // const sourceList = 
    // [{
    //     label: 'Sensor 1',
    //     inputEvents: [],
    //     outputEvents: ['Event 1', 'Event 2', 'Event 3'],
    //     price: '20$/d'
    // },
    // {
    //     label: 'Sensor 2',
    //     inputEvents: [],
    //     outputEvents: ['Event A', 'Event B'],
    //     price: '12$/d'
    // },
    // {
    //     label: 'Sensor 3',
    //     inputEvents: [],
    //     outputEvents: ['Event 1', 'Event 2', 'Event 3', 'Event 4', 'Event 5'],
    //     price: '7$/h'
    // }];

    const moduleList = ['Module 1', 'Module 2', 'Module 3', 'Module 4'];

    // const moduleList = 
    // [{
    //     label: 'Sensor 1',
    //     inputEvents: ['Event 1'],
    //     outputEvents: ['Event 1', 'Event 2', 'Event 3'],
    //     price: '20$/d'
    // },
    // {
    //     label: 'Sensor 2',
    //     inputEvents: ['Event C'],
    //     outputEvents: ['Event A', 'Event B'],
    //     price: '12$/d'
    // },
    // {
    //     label: 'Sensor 3',
    //     inputEvents: ['Event 1'],
    //     outputEvents: ['Event 1', 'Event 2', 'Event 3', 'Event 4', 'Event 5'],
    //     price: '7$/h'
    // }];

    return (
        <aside>
            {/* <div className="description">You can drag these nodes to the pane on the right.</div> */}
            <ul className='list-container'>
                <div className='list-group'>
                    Starting Points
                </div>
                {sourceList.length > 0 &&
                    sourceList.map((startingPointItem, i) => <li onDragStart={(event) => onDragStart(event, startingPointItem, 'startingPointNode')} draggable className="list-item starting-point-list-item" key={startingPointItem}>{startingPointItem}</li>)}
                <br></br>
                <div className='list-group'>
                    Modules
                </div>
                {moduleList.length > 0 &&
                    moduleList.map((moduleItem, i) => <li onDragStart={(event) => onDragStart(event, moduleItem, 'moduleNode')} draggable className="list-item module-list-item" key={moduleItem}>{moduleItem} </li>)}
            </ul>
        </aside>
    );
};