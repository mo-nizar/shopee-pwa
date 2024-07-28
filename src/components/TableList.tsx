import React from 'react';

interface TableListProps {
  list: string[];
  classNames?: string;
  selected: string;
  setSelectedTab: (item: string) => void;
}

const TableList: React.FC<TableListProps> = ({ list, classNames = '', selected, setSelectedTab }) => {
  const handleTabClick = (item: string) => {
    setSelectedTab(item);
  };

  return (
    <div className={`tab-container ${classNames} flex justify-center space-x-4 bg-gray-200 py-2 rounded-xl`}>
      {list.map((item, index) => (
        <button
          key={index}
          className={`tab-item rounded-xl ${item === selected ? 'tab-item-selected text-white bg-blue-500' : ''} px-4 py-2 cursor-pointer text-gray-700 transition-colors duration-300 ease-in-out`}
          onClick={() => handleTabClick(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default TableList;
