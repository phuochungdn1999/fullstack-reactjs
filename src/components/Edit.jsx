import { Pencil, Close } from "../icon";
import { useEffect } from "react";
import { useState } from "react";
import { getToDoList, saveNewList } from "../utils/localStorage";
import SimpleModal from "./SimpleModal";
import { toast } from "react-toastify";

const Edit = (props) => {
  const {
    isOpen,
    handleClose,
    title,
    id,
    descriptions,
    updateToDoList,
    status,
  } = props;
  const [values, setValues] = useState({
    title,
    descriptions,
  });
  console.log(title, id, descriptions);

  const onSubmit = () => {
    if(!values.title.length || !values.descriptions.length){
      toast.error('Missing value')
    }else {
      updateToDoList(id, values.title, values.descriptions, status);
      handleClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    isOpen && (
      <SimpleModal>
        <div className="w-full overflow-auto max-w-[556px] max-h-[80vh] pb-14 flex flex-col gap-2.5 rounded-lg border border-neutral-03 bg-white">
          <div className="py-6 px-4 justify-between flex flex-row border-b border-neutral-03">
            <div className="w-6 h-6"></div>

            <p className="text-sm font-semibold leading-5 text-center text-black">
              Edit
            </p>

            <img src={Close} alt="close" onClick={handleClose} />
          </div>
          <div className="px-14 pt-6 pb-10 flex-center flex-col gap-2.5">
            <div className="flex flex-col gap-4 p-6 pb-10">
              <div className="flex flex-col">
                <div className="flex flex-col mb-5">
                  <div className="relative">
                    <input
                      required
                      type="text"
                      name="title"
                      value={values?.title}
                      id={`floating_filled_title`}
                      className={`block border border-neutral-06 h-16 rounded-tl-[4px] rounded-tr-[4px] px-3 rounded-[4px] pb-2.5 pt-5 w-full text-[16px] text-shade-02 bg-gray-50 appearance-none focus:outline-none focus:border-2 focus:ring-secondary-01 focus:border-secondary-01 peer `}
                      placeholder={""}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor={`floating_filled_title`}
                      className="absolute text-[16px] text-neutral-07 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] left-3 peer-focus:text-neutral-07 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Title
                    </label>
                  </div>
                </div>

                <div className="flex flex-col mb-5">
                  <div className="relative">
                    <input
                      required
                      type="text"
                      name="descriptions"
                      value={values?.descriptions}
                      id={`floating_filled_description`}
                      className={`block border border-neutral-06 h-16 rounded-tl-[4px] rounded-tr-[4px] px-3 rounded-[4px] pb-2.5 pt-5 w-full text-[16px] text-shade-02 bg-gray-50 appearance-none focus:outline-none focus:border-2 focus:ring-secondary-01 focus:border-secondary-01 peer `}
                      placeholder={""}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor={`floating_filled_description`}
                      className="absolute text-[16px] text-neutral-07 duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] left-3 peer-focus:text-neutral-07 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Description
                    </label>
                  </div>
                </div>
              </div>

              <button
                className={
                  "rounded-full bg-green-200 py-[14px] w-full text-white font-bold"
                }
                onClick={onSubmit}
              >
                <span className={"flex-1"}>Update</span>
              </button>

              <button
                className={
                  "rounded-full bg-[#ff2929] py-[14px] w-full text-white font-bold"
                }
                onClick={handleClose}
              >
                <span className={"flex-1"}>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </SimpleModal>
    )
  );
};

export default Edit;
