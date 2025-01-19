/* eslint-disable react/prop-types */
const GroupList = ({ list, selectedItem, onClick }) => {
    return (
        <>
            {list?.map(item => (
                <div 
                    key={item.id} 
                    className={`group-item ${selectedItem === item.id && 'bg-selected'}`}
                    onClick={() => onClick(item)}
                >
                    <div className={`bg-${item.groupClr} p-2 abbreviation`}>{item.abbreviation}</div>
                    <h5 className="my-0">{item.title}</h5>
                </div>
            ))}            
        </>
    )
}

export default GroupList