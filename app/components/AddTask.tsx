"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newTaskValue, steNewTaskValue] = useState<string>('')

    const handelSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await addTodo({
            id: uuidv4(),
            text: newTaskValue
        })
        steNewTaskValue('');
        setModalOpen(false);
        router.refresh();
    }

    return (
        <div>
            <button onClick={() => setModalOpen(true)} className="btn btn-primary w-full">
                Add new task <AiOutlinePlus className="ml-2" size={18} />
            </button>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handelSubmitNewTodo}>
                    <h3 className="font-bold text-lg">Add new task</h3>
                    <div className="modal-action">
                        <input value={newTaskValue}
                            onChange={e => steNewTaskValue(e.target.value)}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full" />
                        <button type="submit" className="btn">Submit</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default AddTask;
