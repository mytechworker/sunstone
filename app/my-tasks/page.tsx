"use client";
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlinePlus, AiOutlineComment, AiOutlinePaperClip } from 'react-icons/ai';
import { FaCalendarAlt, FaList, FaTh } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdMoreVert } from 'react-icons/md';

// Sample data with statusFlag to differentiate task types
const tasksData = [
  { taskName: 'Home screen iteration', priority: 'High', project: 'Peceland App Design', assignedTo: [{ src: 'https://via.placeholder.com/24x24', alt: 'User 1' }, { src: 'https://via.placeholder.com/25x25', alt: 'User 2' }], comments: 5, attachments: 2, dueDate: 'Today', status: 'In Progress', statusFlag: 'Working' },
  { taskName: 'Product details page', priority: 'High', project: 'Peceland App Design', assignedTo: [{ src: 'https://via.placeholder.com/25x25', alt: 'User 3' }], comments: 12, attachments: 5, dueDate: 'Oct 2, 2022', status: 'Issues', statusFlag: 'Working' },
  { taskName: 'My profile page', priority: 'Medium', project: 'Peceland App Design', assignedTo: [{ src: 'https://via.placeholder.com/24x24', alt: 'User 1' }, { src: 'https://via.placeholder.com/25x25', alt: 'User 2' }], comments: 5, attachments: 1, dueDate: 'Oct 3 - 4, 2022', status: 'Review', statusFlag: 'Working' },
  { taskName: 'Settings page', priority: 'Low', project: 'Peceland App Design', assignedTo: [{ src: 'https://via.placeholder.com/25x25', alt: 'User 6' }], comments: 1, attachments: 1, dueDate: 'Oct 1 - 4, 2022', status: 'Pending', statusFlag: 'Pending' },
  { taskName: 'Notification', priority: 'Low', project: 'Peceland App Design', assignedTo: [{ src: 'https://via.placeholder.com/25x25', alt: 'User 4' }], comments: 0, attachments: 1, dueDate: 'Today', status: 'Completed', statusFlag: 'Working' },
];

const getStatusStyles = (status) => {
  switch (status) {
    case 'In Progress': return 'bg-[#cee3f7] text-[#459cec]';
    case 'Issues': return 'bg-[#ffeae9] text-[#e55d57]';
    case 'Review': return 'bg-[#fcf2e3] text-[#eaa640]';
    case 'Completed': return 'bg-[#e2f3ef] text-[#429482]';
    case 'Pending': return 'bg-[#f6f7fa] text-[#6b6e74]';
    default: return '';
  }
};

const getPriorityStyles = (priority) => {
  switch (priority) {
    case 'High': return 'bg-[#ffeae9] text-[#e55d57]';
    case 'Medium': return 'bg-[#fcf2e3] text-[#eaa640]';
    case 'Low': return 'bg-[#cee3f7] text-[#459cec]';
    default: return '';
  }
};

const getPriorityDotColor = (priority) => {
  switch (priority) {
    case 'High': return 'bg-[#e55d57]';
    case 'Medium': return 'bg-[#eaa640]';
    case 'Low': return 'bg-[#459cec]';
    default: return '';
  }
};

const TaskSection = ({ title, tasks, collapsed, onToggle, onAddTask }) => (
  <div className="w-full mx-auto mt-8 bg-[#F6F7FA] rounded-xl p-8">
    <div className="flex items-center space-x-2 cursor-pointer" onClick={onToggle}>
      <div>{collapsed ? <MdKeyboardArrowDown className="w-6 h-6 text-gray-600" /> : <MdKeyboardArrowUp className="w-6 h-6 text-gray-600" />}</div>
      <h2 className="text-[#1c1f24] text-xl font-medium">{title}</h2>
      <div className="bg-[#7662e9] text-white rounded-xl w-8 h-8 flex items-center justify-center">{tasks.length}</div>
      <div className="bg-[#ece8ff] text-[#7662e9] rounded-xl w-8 h-8 flex items-center justify-center" onClick={(e) => { e.stopPropagation(); onAddTask(); }}>
        <AiOutlinePlus className="w-4 h-4" />
      </div>
    </div>
    {!collapsed && (
      tasks.length > 0 ? (
        <table className="w-full mt-4 bg-white rounded-xl overflow-hidden">
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className={`text-md ${task.status === 'Completed' ? 'text-[#D3D5DA]' : 'text-[#1c1f24]'}`}>
                <td className="px-4 py-3 w-1/4">
                  <div className="flex flex-col">
                    <span className="font-medium">{task.taskName}</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 w-fit rounded-full text-xs mt-1 ${getPriorityStyles(task.priority)}`}>
                      <span className={`w-2 h-2 rounded-full ${getPriorityDotColor(task.priority)}`}></span>{task.priority}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 w-1/4">
                  <div className="flex items-center gap-2">
                    <span>{task.project}</span>
                    <div className="flex items-center">
                      {task.assignedTo.map((user, idx) => (
                        <Image key={idx} alt={user.alt} width={24} height={24} className={`w-6 h-6 rounded-full border-2 border-white ${idx > 0 ? '-ml-2' : ''}`} src={user.src} />
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 w-1/12">
                  <div className="flex items-center gap-1">
                    <AiOutlineComment className="  h-5 w-5" />
                    <span>{task.comments}</span>
                  </div>
                </td>
                <td className="px-4 py-3 w-1/12">
                  <div className="flex items-center gap-1">
                    <AiOutlinePaperClip className=" h-5 w-5" />
                    <span>{task.attachments}</span>
                  </div>
                </td>
                <td className="px-4 py-3 w-1/6">{task.dueDate}</td>
                <td className="px-4 py-3 w-1/6">
                  <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs ${getStatusStyles(task.status)}`}>{task.status}</span>
                </td>
                <td className="px-4 py-3 w-1/12"><MdMoreVert className="w-5 h-5 " /></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="mt-4 text-[#6b6e74] text-md">No Data Available</div>
      )
    )}
  </div>
);

const MyTasks = () => {
  const [isWorkingCollapsed, setIsWorkingCollapsed] = useState(false);
  const [isPendingCollapsed, setIsPendingCollapsed] = useState(false);
  const [isBacklogCollapsed, setIsBacklogCollapsed] = useState(false);

  const handleToggle = (setCollapsed) => setCollapsed((prev) => !prev);

  const workingTasks = tasksData.filter((task) => task.statusFlag === 'Working');
  const pendingTasks = tasksData.filter((task) => task.statusFlag === 'Pending');
  const backlogTasks = tasksData.filter((task) => task.statusFlag === 'Backlog');

  return (
    <div className="w-full min-h-screen py-20">
      <div className="w-full mx-auto p-6 flex items-center justify-between">
        <h1 className="text-[#1c1f24] text-2xl font-semibold">My Tasks</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white rounded-lg p-1">
            <button className="w-8 h-8 flex items-center justify-center bg-[#7662e9] text-white rounded-lg"><FaList /></button>
            <button className="w-8 h-8 flex items-center justify-center text-[#1c1f24] rounded-lg"><FaTh /></button>
            <button className="w-8 h-8 flex items-center justify-center text-[#1c1f24] rounded-lg"><FaCalendarAlt /></button>
          </div>
          <button className="h-10 px-4 bg-white text-[#1c1f24] text-md font-medium rounded-xl flex items-center">All Tasks<MdKeyboardArrowDown className="w-4 h-4 ml-2" /></button>
          <button className="h-10 px-4 bg-[#7662e9] text-white text-md font-medium rounded-xl flex items-center"><AiOutlinePlus className="w-4 h-4 mr-2" />Create new task</button>
        </div>
      </div>
      <TaskSection title="Working Tasks" tasks={workingTasks} collapsed={isWorkingCollapsed} onToggle={() => handleToggle(setIsWorkingCollapsed)} onAddTask={() => { /* Add task logic */ }} />
      <TaskSection title="Pending Tasks" tasks={pendingTasks} collapsed={isPendingCollapsed} onToggle={() => handleToggle(setIsPendingCollapsed)} onAddTask={() => { /* Add task logic */ }} />
      <TaskSection title="Backlog" tasks={backlogTasks} collapsed={isBacklogCollapsed} onToggle={() => handleToggle(setIsBacklogCollapsed)} onAddTask={() => { /* Add task logic */ }} />
    </div>
  );
};

export default MyTasks;
