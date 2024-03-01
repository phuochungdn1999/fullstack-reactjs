import { Pencil, CheckCircle, Trash, Pending } from "../icon";
import { useEffect } from "react";
import { useState } from "react";
import {
  deleteList,
  getToDoList,
  saveNewList,
  updateList,
} from "../utils/localStorage";
import Edit from "./Edit";
import AddToDo from "./Add";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TaskStatus } from "../utils/status";
import Select from 'react-select'


const List = () => {
  const [toDoList, setToDoList] = useState([]);
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [deleteAction, setDeleteAction] = useState(false);
  const [updateAction, setUpdateAction] = useState(false);
  const [updateIndex, setUpdateIndex] = useState();
  const [statusFilter, setStatusFilter] = useState(TaskStatus.ALL);

  const options = [
    { value: TaskStatus.ALL, label: TaskStatus.ALL },
    { value: TaskStatus.DONE, label: TaskStatus.DONE },
    { value: TaskStatus.PENDING, label: TaskStatus.PENDING },
  ]

  useEffect(() => {
    console.log({statusFilter})
    let list = getToDoList();
    list.sort((a, b) => parseInt(b.createdAt) - parseInt(a.createdAt));
    if(statusFilter !== TaskStatus.ALL) {
      console.log('runnn')
      list = list.filter((item) => item.status === statusFilter);
    }
    setToDoList(list);
  }, [modalUpdateOpen, modalAddOpen, deleteAction, updateAction, statusFilter]);

  const updateToDoList = (id, title, descriptions, status) => {
    updateList(id, title, descriptions, status);
    toast.success("Update success");
  };

  const handleModalClose = () => {
    setModalUpdateOpen(false);
    setModalAddOpen(false);
  };

  const deleteItem = (index) => {
    deleteList(toDoList[index].id);
    setDeleteAction(!deleteAction);
  };

  const handleUpdate = (index) => {
    setUpdateIndex(index);
    setModalUpdateOpen(true);
  };

  const updateStatus = (index, status) => {
    updateList(
      toDoList[index].id,
      toDoList[index].title,
      toDoList[index].descriptions,
      status
    );
    setUpdateAction(!updateAction);
  };

  return (
    <div className="flex flex-col justify-center mx-auto w-full max-w-screen-lg">
      <div className="flex flex-col px-1.5 py-3 w-full bg-slate-400 rounded-lg">
        <div className="flex gap-5 justify-between pr-3.5 mt-3.5 text-2xl font-semibold text-white">
          <div className="flex-auto my-auto">TODO APP</div>
        </div>
      </div>
      <div className="flex flex-col">

      <button
        className={
          "my-5 place-self-center rounded-lg bg-[#dde042] py-[14px] w-[50%] text-white font-bold"
        }
        onClick={() => setModalAddOpen(true)}
      >
        <span className={"flex-1"}>Add</span>
      </button>
      <Select options={options} onChange={(e)=> setStatusFilter(e.value)}/>

      </div>

      {modalUpdateOpen && (
        <Edit
          isOpen={modalUpdateOpen}
          handleClose={handleModalClose}
          title={toDoList[updateIndex].title}
          descriptions={toDoList[updateIndex].descriptions}
          updateToDoList={updateToDoList}
          id={toDoList[updateIndex].id}
          status={toDoList[updateIndex].status}
        />
      )}
      {modalAddOpen && (
        <AddToDo isOpen={modalAddOpen} handleClose={handleModalClose} />
      )}

      <div className="flex flex-col items-start min-h-screen">
        {toDoList && toDoList.length !== 0 ? (
          toDoList.map((value, index) => (
            <div
              className={`flex gap-5 rounded-lg justify-between px-6 py-7 mt-6 w-full rounded-2x ${
                value.status === TaskStatus.DONE
                  ? "bg-blue-200"
                  : value.status === TaskStatus.PENDING
                  ? "bg-yellow-200"
                  : "bg-gray-200"
              }`}
              key={index}
            >
              <div className="flex flex-col">
                <div className="text-sm font-semibold whitespace-nowrap">
                  {value?.title}
                </div>
                <div className="mt-3.5 text-xs text-black truncate max-w-[400px]">
                  {value?.descriptions}
                </div>
              </div>
              <div className="flex gap-5 my-auto">
                <div className="group">
                  <img
                    loading="lazy"
                    src={Pencil}
                    onClick={() => handleUpdate(index)}
                    className="aspect-square w-[25px]"
                    alt="icon"
                  />
                  <span class="group-hover:opacity-100 transition-opacity bg-gray-800 text-sm text-gray-100 rounded-sm absolute translate-y-full opacity-0 m-4 mx-auto">
                    Edit
                  </span>
                </div>
                <div className="group">
                  <img
                    loading="lazy"
                    src={Trash}
                    className="aspect-square w-[25px]"
                    alt="icon"
                    onClick={() => deleteItem(index)}
                  /><span class="group-hover:opacity-100 transition-opacity bg-gray-800 text-sm text-gray-100 rounded-sm absolute translate-y-full opacity-0 m-4 mx-auto">
                    Delete
                  </span>
                </div>
                <div className="group">
                  <img
                    loading="lazy"
                    src={CheckCircle}
                    className="aspect-square w-[25px]"
                    alt="icon"
                    onClick={() => updateStatus(index, TaskStatus.DONE)}
                  />
                  <span class="group-hover:opacity-100 transition-opacity bg-gray-800 text-sm text-gray-100 rounded-sm absolute translate-y-full opacity-0 m-4 mx-auto">
                    Complete
                  </span>
                </div>
                <div className="group">
                  <img
                    loading="lazy"
                    src={Pending}
                    className="aspect-square w-[25px]"
                    alt="icon"
                    onClick={() => updateStatus(index, TaskStatus.PENDING)}
                  />
                  <span class="group-hover:opacity-100 transition-opacity bg-gray-800 text-sm text-gray-100 rounded-sm absolute translate-y-full opacity-0 m-4 mx-auto">
                    Pending
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div class="flex place-self-center">
            <p className="font-semibold text-md">Empty list</p>
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default List;
