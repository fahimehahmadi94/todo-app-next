"use client";

import { ITask } from '@/types/tasks';
import React, { FormEventHandler, useState } from 'react';
import { FiEdit } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { deleteTodo, editTodo } from '@/api';

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
    const router = useRouter();

    const handelSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
            id: task.id,
            text: taskToEdit
        });
        setOpenModalEdit(false);
        router.refresh();
    }
    const handelDeleteTask = async (id: string) => {
        await deleteTodo(id);
        setOpenModalDelete(false);
        router.refresh();
    }
    return (
        <tr key={task.id}>
            <td className='w-full'>{task.text}</td>
            <td className='flex gap-5'>
                <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className='text-blue-500' size={25} />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                    <form onSubmit={handelSubmitEditTodo}>
                        <h3 className="font-bold text-lg">Edit task</h3>
                        <div className="modal-action">
                            <input value={taskToEdit}
                                onChange={e => setTaskToEdit(e.target.value)}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full" />
                            <button type="submit" className="btn">Submit</button>
                        </div>
                    </form>
                </Modal>

                <FaRegTrashCan onClick={() => setOpenModalDelete(true)} cursor="pointer" className='text-red-500' size={25} />

                <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
                    <h3 className='text-lg'>Are You sure, you want to delete this task?</h3>
                    <div className="modal-action">
                        <button onClick={() => handelDeleteTask(task.id)} className="btn">
                            Yes
                        </button>
                    </div>
                </Modal>
            </td>
        </tr>
    );
}

export default Task;
