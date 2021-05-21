export function TaskHistory({ historyObj }) {
    return (
        <div className="history-object-wrapper">
            <div className="history-row">
                <strong>Changed by: </strong><span>{historyObj.changedBy}</span>
            </div>
            <div className="history-row">
                <strong>Changed property: </strong><span>{historyObj.changedProperty}</span>
            </div>
            <div className="history-row">
                <strong>Old value: </strong><span>{historyObj.oldValue}</span>
            </div>
            <div className="history-row">
                <strong>New value: </strong><span>{historyObj.newValue}</span>
            </div>            
        </div>
    )
}