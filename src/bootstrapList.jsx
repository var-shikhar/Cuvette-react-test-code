import { Button } from 'react-bootstrap';
import GroupList from './components/groupList';
import GroupMessage from './components/groupMessage';
import ModalWrapper from './components/modal';
import useList from './hooks/useList';

const BootstrapList = () => {
    const { selectedGroup, groupList, setSelectedGroup, colorList, modalToggle, setModalToggle, groupForm, setGroupForm, handleGroupAdd, handleGroupMessage } = useList();
    return (
        <>
            <div className='row h-100 g-0'>
                <div className='col-md-4 col-lg-3 col-12'>
                    <div className='position-relative d-flex flex-column vh-100'>
                        <h2 className='text-center p-2 p-md-4'>Pocket Notes</h2>
                        <div className='h-auto flex-fill overflow-y-scroll hidden-scrollbar'>
                            <GroupList list={groupList} selectedItem={selectedGroup} onClick={(e) => setSelectedGroup(e)} />
                        </div>
                        <img src='./plus.svg' className='group-button' onClick={() => setModalToggle(true)} />
                    </div>
                </div>
                <div className='col-md-8 col-lg-9 col-12 background h-100'>
                    {selectedGroup ? <GroupMessage details={selectedGroup} handleNewText={(id, message) => handleGroupMessage(id, message)} /> : 
                        <div className='d-flex align-items-center justify-content-between flex-column h-100 w-100 py-2 py-md-4'>
                            <img src='./00b6d4748cd536df01bd2b4fecc1d821.png' className='my-auto w-auto' />
                            <div className='d-flex gap-2 align-items-center'>
                                <img src='./lock.png' />
                                end-to-end encrypted
                            </div>
                        </div>
                    }
                </div>
            </div>
            <ModalWrapper toggle={modalToggle} setToggle={setModalToggle} title={'Create New Group'}>
                <div>
                    <div className='mb-2'>
                        <label className='form-label fw-semibold'>Group Name</label>
                        <input type='text' name='title' id={'title'} className='form-control' value={groupForm.title} onChange={(e) => setGroupForm(prev => ({...prev, title: e.target.value}))} />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label fw-semibold'>Choose Color</label>
                        <div className='d-flex gap-2'>
                            {colorList?.map(color => <div key={color.id} className={`bg-${color.colorName} form-circle`} onClick={() => setGroupForm(prev => ({...prev, color: color.colorName}))} />)}
                        </div>
                    </div>
                    {groupForm.error && <div className='text-danger'>{groupForm.error}</div>}
                    <Button type='button' onClick={handleGroupAdd} disabled={groupForm.title === '' || groupForm.color === ""} size='sm' className='ms-auto w-auto d-block bg-dark-blue'>Create Group</Button>
                </div>
            </ModalWrapper>
        </>
    )
}

export default BootstrapList