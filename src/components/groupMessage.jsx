import { startTransition, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

/* eslint-disable react/prop-types */
const GroupMessage = ({ isMobileSize = true, details, handleNewText, handleGroupDel, handleGroupChatDel, handleMessageDel, handleResetSelectedGroup }) => {
    const [newText, setNewText] = useState("");

    function handleSubmit(){
        handleNewText(details.id, newText);
        startTransition(() => {
            setNewText('')
        })
    }

    return (
        <div className="d-flex flex-column h-100 justify-content-between">
            <div className="d-flex gap-2 align-items-center p-2 px-md-4 py-md-3 bg-blue-header text-white">
                {isMobileSize && <img src="./back-arrow.svg" className="arrow-svg" onClick={handleResetSelectedGroup} />}
                <div className={`bg-${details.groupClr} p-2 abbreviation`}>{details.abbreviation}</div>
                <h5 className="my-0">{details.title}</h5>
                <DropdownButton
                    align="end"
                    id="dropdown-menu"
                    className="ms-auto"
                >
                    <Dropdown.Item eventKey="1" onClick={() => handleGroupChatDel(details.id)}> Delete Group Chat </Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => handleGroupDel(details.id)}> Delete Group </Dropdown.Item>
                </DropdownButton>
            </div>
            <div className="h-auto flex-fill py-2 pt-md-4 overflow-scroll hidden-scrollbar">
                {details.messages?.map(item => (
                    <div key={item.id} className="group-message position-relative">
                        <img src="./trash.svg" className="message-dot" onClick={() => handleMessageDel(details.id, item.id)} />
                        <div>{item.message}</div>
                        <div className="d-flex align-items-center justify-content-end gap-2">
                            {new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric'})}
                            <img src="./Ellipse.svg" width={'6px'} className="my-0" />
                            {new Date(item.date).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true})}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-blue-header p-2 p-md-3 position-relative">
                <textarea
                    name="newText"
                    id="newText"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault(); 
                            handleSubmit(); 
                        }
                    }}
                    className="form-control rounded"
                    placeholder="Enter your text here...."
                    rows={5}
                />

                <img 
                    src='./Arrow.svg' 
                    className={`submit-arrow ${newText === "" && 'disable-btn'}`} 
                    onClick={() => newText !== "" && handleSubmit()}
                />
            </div>
        </div>
    )
}

export default GroupMessage