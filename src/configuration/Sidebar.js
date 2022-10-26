import React from 'react';
import "./Sidebar.css";

export default () => {
    const onDragStart = (event, name, nodeCategory) => {
        console.log(name);
        event.dataTransfer.setData('nodeName', name);
        event.dataTransfer.setData('nodeCategory', nodeCategory);
        event.dataTransfer.effectAllowed = 'move';
    };

    const sourceList = ['Sensor 1', 'Sensor 2', 'Sensor 3']; //TODO get list of all existing starting points from backend
    const moduleList = ['Module 1', 'Module 2', 'Module 3', 'Module 4']; //TODO get list of all modules from backend

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