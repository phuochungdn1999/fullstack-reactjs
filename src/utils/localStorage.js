import { v4 as uuidv4 } from "uuid";
import { TaskStatus } from "./status";
const TO_DO_LIST_KEY = "to_do_list";

export const getToDoList = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(TO_DO_LIST_KEY) || "[]");
  }
};

export const saveNewList = (title, descriptions) => {
  if (typeof window !== "undefined") {
    const existingList = JSON.parse(
      localStorage.getItem(TO_DO_LIST_KEY) || "[]"
    );
    existingList.push({
      id: uuidv4(),
      title,
      descriptions,
      status: TaskStatus.NONE,
      createdAt: new Date().getTime(),
      isDeleted: false,
    });

    window.localStorage.setItem(TO_DO_LIST_KEY, JSON.stringify(existingList));
  }
};

export const updateList = (id, title, descriptions, status) => {
  if (typeof window !== "undefined") {
    const existingList = JSON.parse(
      localStorage.getItem(TO_DO_LIST_KEY) || "[]"
    );
    let newList = [];
    if (existingList.length) {
      newList = existingList.filter((value) => value.id !== id);
    }
    console.log({ existingList, newList });
    newList.push({
      id: uuidv4(),
      title,
      descriptions,
      status,
      createdAt: new Date().getTime(),
      isDeleted: false,
    });
    console.log(newList);

    window.localStorage.setItem(TO_DO_LIST_KEY, JSON.stringify(newList));
  }
};

export const deleteList = (id) => {
  console.log(id);
  if (typeof window !== "undefined") {
    const existingList = JSON.parse(
      localStorage.getItem(TO_DO_LIST_KEY) || "[]"
    );
    let newList = [];
    if (existingList.length) {
      newList = existingList.filter((value) => value.id !== id);
    }
    console.log(newList, existingList);
    window.localStorage.setItem(TO_DO_LIST_KEY, JSON.stringify(newList));
  }
};
