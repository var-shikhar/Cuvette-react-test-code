import { startTransition, useEffect, useState } from 'react';

const colorList = [
    {
        id: '1',
        colorName: 'purple',
    },
    {
        id: '2',
        colorName: 'pink',
    },
    {
        id: '3',
        colorName: 'sky-blue',
    },
    {
        id: '4',
        colorName: 'orange',
    },
    {
        id: '5',
        colorName: 'blue',
    },
    {
        id: '6',
        colorName: 'light-blue',
    },
];

const useList = () => {
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [modalToggle, setModalToggle] = useState(false);
    const [isMobileSize, setISMobileSize] = useState(false);

    const [groupList, setGroupList] = useState(() => {
        const tempList = JSON.parse(localStorage.getItem('group-list'));
        return tempList ?? []
    });
    const [groupForm, setGroupForm] = useState({
        title: '',
        color: '',
        error: '',
    });

    useEffect(() => {
        const checkMobileSize = () => setISMobileSize(window.innerWidth <= 768 ? true : false);
    
        checkMobileSize();
        window.addEventListener('resize', checkMobileSize);

        return () => {
          window.removeEventListener('resize', checkMobileSize);
        };
    }, []);


    // Funtion For Creating Group Naming Abbreviation
    function createAbbreviation(title) {
        const words = title.split(' ');
        if (words.length >= 2) {
          return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
        } else {
          return words[0].slice(0, 1).toUpperCase();
        }
    }

    // Funtion For Adding a New Group
    function handleGroupAdd(){
        const foundName = groupList?.find(item => item.title.toString().toLowerCase() === groupForm.title.toLowerCase());
        if(foundName){
            setGroupForm(prev => ({...prev, error: 'Group Name already exist! Try different name'}));
            return;
        }

        const newGroup = {
            id: crypto.randomUUID(),
            title: groupForm.title,
            abbreviation: createAbbreviation(groupForm.title),
            groupClr: groupForm.color,
            messages: [],
        }

        startTransition(() => {
            setGroupList((prev) => {
              const updatedList = [...prev, newGroup];
              handleLocalStorageUpdate(updatedList);
              return updatedList;
            });
            setModalToggle(false);
            setGroupForm({
              color: '',
              error: '',
              title: '',
            });
        });
        alert('Group has added successfully!');
    }

    // Funtion For Adding a New Message to a Group
    function handleGroupMessage(id, message) {
        const foundGroup = groupList?.find((item) => item.id.toString().toLowerCase() === id.toLowerCase());
        if (foundGroup) {
            const newMessage = {
                id: crypto.randomUUID(),
                message: message,
                date: new Date(),
            };
        
            startTransition(() => {
                setGroupList((prev) => {
                    const updatedList = prev.map((group) =>
                        group.id === foundGroup.id
                        ? { ...group, messages: [...group.messages, newMessage] }
                        : group
                    );
                    handleLocalStorageUpdate(updatedList);
                    return updatedList;
                });
            });
            alert('Message has added successfully!');
        }
    }

    // Funtion For Updating the Data in LocalStorage
    function handleLocalStorageUpdate(updatedList) {
        localStorage.setItem('group-list', JSON.stringify(updatedList));
    }

    // Function for Deleting Group
    function handleGroupDeletion(grpID){
        const foundGroup = groupList?.find((item) => item.id.toString().toLowerCase() === grpID.toLowerCase());
        if (foundGroup) {
            startTransition(() => {
                setGroupList((prev) => {
                    const updatedList = prev.filter((group) => group.id !== foundGroup.id);
                    handleLocalStorageUpdate(updatedList);
                    return updatedList;
                });
            });
            alert('Group has deleted successfully!');
        }
    }

    // Function for Deleting Message
    function handleMessageDeletion(grpID, messageID){
        const foundGroup = groupList?.find((item) => item.id.toString().toLowerCase() === grpID.toLowerCase());
        if (foundGroup) {
            startTransition(() => {
                setGroupList((prev) => {
                    const updatedList = prev.map((group) => {
                        if(group.id === foundGroup.id){
                            return {...group, messages: group.messages?.filter(msg => msg.id.toString().toLowerCase() !== messageID.toString().toLowerCase())} 
                        }
                        return group
                    });
                    handleLocalStorageUpdate(updatedList);
                    return updatedList;
                });
            });
            alert('Message has deleted successfully!');
        }
    }

    // Function for Deletion Group Chat
    function handleDeleteGroupChat(grpID){
        const foundGroup = groupList?.find((item) => item.id.toString().toLowerCase() === grpID.toLowerCase());
        if (foundGroup) {
            startTransition(() => {
                setGroupList((prev) => {
                    const updatedList = prev.map((group) => {
                        if(group.id === foundGroup.id){
                            return {...group, messages: []} 
                        }
                        return group
                    });
                    handleLocalStorageUpdate(updatedList);
                    return updatedList;
                });
            });
            alert('Group Chat has deleted successfully!');
        }
    }

    // Handle Back/Reset Selected Group
    function handleResetSelectedGroup(){
        startTransition(() => {
            setSelectedGroup(null);
        })
    }
  
    return {
        selectedGroup,
        colorList,
        groupList,
        modalToggle,
        groupForm,
        isMobileSize, 
        setGroupForm, 
        setModalToggle,
        setSelectedGroup,
        handleGroupAdd,
        handleGroupMessage,
        handleGroupDeletion,
        handleMessageDeletion,
        handleDeleteGroupChat,
        handleResetSelectedGroup
    }
}

export default useList