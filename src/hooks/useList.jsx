import { startTransition, useState } from 'react';

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
    const [modalToggle, setModalToggle] = useState(false)

    const [groupList, setGroupList] = useState(() => {
        const tempList = JSON.parse(localStorage.getItem('group-list'));
        return tempList ?? []
    });
    const [groupForm, setGroupForm] = useState({
        title: '',
        color: '',
        error: '',
    });


    function createAbbreviation(title) {
        const words = title.split(' ');
        if (words.length >= 2) {
          return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
        } else {
          return words[0].slice(0, 1).toUpperCase();
        }
      }


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
    }

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
        }
    }

    function handleLocalStorageUpdate(updatedList) {
        localStorage.setItem('group-list', JSON.stringify(updatedList));
    }

    return {
        selectedGroup,
        colorList,
        groupList,
        modalToggle,
        groupForm, 
        setGroupForm, 
        setModalToggle,
        setSelectedGroup,
        handleGroupAdd,
        handleGroupMessage
    }
}

export default useList