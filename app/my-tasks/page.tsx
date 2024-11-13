"use client";
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlinePlus, AiOutlineComment, AiOutlinePaperClip } from 'react-icons/ai';
import { FaCalendarAlt, FaList, FaTh } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdMoreVert } from 'react-icons/md';

interface Task {
  taskName: string;
  priority: 'High' | 'Medium' | 'Low';
  project: string;
  assignedTo: { src: string; alt: string }[];
  comments: number;
  attachments: number;
  dueDate: string;
  status: 'In Progress' | 'Issues' | 'Review' | 'Completed' | 'Pending';
  statusFlag: 'Working' | 'Pending' | 'Backlog';
}

const tasksData: Task[] = [
  { taskName: 'Home screen iteration', priority: 'High', project: 'Peceland App Design', assignedTo: [{ src: '/images/taskimage2.png', alt: 'User 1' }, { src: '/images/taskimage1.png', alt: 'User 2' }], comments: 5, attachments: 2, dueDate: 'Today', status: 'In Progress', statusFlag: 'Working' },
  { taskName: 'Product details page', priority: 'High', project: 'Peceland App Design', assignedTo: [{ src: '/images/taskimage1.png', alt: 'User 3' }], comments: 12, attachments: 5, dueDate: 'Oct 2, 2022', status: 'Issues', statusFlag: 'Working' },
  { taskName: 'My profile page', priority: 'Medium', project: 'Peceland App Design', assignedTo: [{ src: '/images/taskimage3.png', alt: 'User 1' }, { src: '/images/taskimage1.png', alt: 'User 2' }], comments: 5, attachments: 1, dueDate: 'Oct 3 - 4, 2022', status: 'Review', statusFlag: 'Working' },
  { taskName: 'Settings page', priority: 'Low', project: 'Peceland App Design', assignedTo: [{ src: '/images/taskimage1.png', alt: 'User 6' }], comments: 1, attachments: 1, dueDate: 'Oct 1 - 4, 2022', status: 'Pending', statusFlag: 'Pending' },
  { taskName: 'Notification', priority: 'Low', project: 'Peceland App Design', assignedTo: [{ src: '/images/taskimage1.png', alt: 'User 4' }], comments: 0, attachments: 1, dueDate: 'Today', status: 'Completed', statusFlag: 'Working' },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'In Progress': return 'bg-[#cee3f7] text-[#459cec]';
    case 'Issues': return 'bg-[#ffeae9] text-[#e55d57]';
    case 'Review': return 'bg-[#fcf2e3] text-[#eaa640]';
    case 'Completed': return 'bg-[#e2f3ef] text-[#429482]';
    case 'Pending': return 'bg-[#f6f7fa] text-[#6b6e74]';
    default: return '';
  }
};

const getPriorityStyles = (priority: string) => {
  switch (priority) {
    case 'High': return 'bg-[#ffeae9] text-[#e55d57]';
    case 'Medium': return 'bg-[#fcf2e3] text-[#eaa640]';
    case 'Low': return 'bg-[#cee3f7] text-[#459cec]';
    default: return '';
  }
};

const getPriorityDotColor = (priority: string) => {
  switch (priority) {
    case 'High': return 'bg-[#e55d57]';
    case 'Medium': return 'bg-[#eaa640]';
    case 'Low': return 'bg-[#459cec]';
    default: return '';
  }
};

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  collapsed: boolean;
  onToggle: () => void;
  onAddTask: () => void;
}

const TaskSection: React.FC<TaskSectionProps> = ({ title, tasks, collapsed, onToggle, onAddTask }) => (
  <div className="w-full mx-auto mt-8 bg-[#F6F7FA] rounded-xl p-8">
    <div className='flex justify-between'>
      <div className="flex items-center space-x-2 cursor-pointer" onClick={onToggle}>
        <div>{collapsed ? <MdKeyboardArrowDown className="w-6 h-6 text-gray-600" /> : <MdKeyboardArrowUp className="w-6 h-6 text-gray-600" />}</div>
        <h2 className="text-[#1c1f24] text-xl font-medium">{title}</h2>
        <div className="bg-[#7662e9] text-white rounded-xl w-8 h-8 flex items-center justify-center">{tasks.length}</div>
        <div className="bg-[#ece8ff] text-[#7662e9] rounded-xl w-8 h-8 flex items-center justify-center" onClick={(e) => { e.stopPropagation(); onAddTask(); }}>
          <AiOutlinePlus className="w-4 h-4" />
        </div>
      </div>
      <div>
        <button className="w-5 h-5 flex items-center justify-center text-2xl">
          ...
        </button>
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
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_2076_3454)">
                        <path d="M5.44219 14.1961L3.17109 16.0945C3.08914 16.1623 2.98965 16.2055 2.88415 16.2191C2.77864 16.2326 2.67146 16.216 2.57504 16.1711C2.47861 16.1262 2.39689 16.0549 2.33936 15.9654C2.28183 15.8759 2.25084 15.772 2.25 15.6656V4.5C2.25 4.35082 2.30926 4.20774 2.41475 4.10225C2.52024 3.99676 2.66332 3.9375 2.8125 3.9375H15.1875C15.3367 3.9375 15.4798 3.99676 15.5852 4.10225C15.6907 4.20774 15.75 4.35082 15.75 4.5V13.5C15.75 13.6492 15.6907 13.7923 15.5852 13.8977C15.4798 14.0032 15.3367 14.0625 15.1875 14.0625H5.80078C5.66909 14.0625 5.5418 14.11 5.44219 14.1961V14.1961Z" stroke="#A3A5AB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M7.03125 10.125C7.65257 10.125 8.15625 9.62132 8.15625 9C8.15625 8.37868 7.65257 7.875 7.03125 7.875C6.40993 7.875 5.90625 8.37868 5.90625 9C5.90625 9.62132 6.40993 10.125 7.03125 10.125Z" fill="#A3A5AB" />
                        <path d="M10.9688 10.125C11.5901 10.125 12.0938 9.62132 12.0938 9C12.0938 8.37868 11.5901 7.875 10.9688 7.875C10.3474 7.875 9.84375 8.37868 9.84375 9C9.84375 9.62132 10.3474 10.125 10.9688 10.125Z" fill="#A3A5AB" />
                      </g>
                      <defs>
                        <clipPath id="clip0_2076_3454">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span>{task.comments}</span>
                  </div>
                </td>
                <td className="px-4 py-3 w-1/12">
                  <div className="flex items-center gap-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_2076_1094)">
                        <path d="M7.50034 13.7501L14.9847 6.54699C15.395 6.13673 15.6255 5.5803 15.6255 5.00011C15.6255 4.41992 15.395 3.86349 14.9847 3.45324C14.5745 3.04298 14.018 2.8125 13.4378 2.8125C12.8576 2.8125 12.3012 3.04298 11.891 3.45324L4.2269 11.1017C3.52449 11.8041 3.12988 12.7568 3.12988 13.7501C3.12988 14.7435 3.52449 15.6961 4.2269 16.3985C4.92931 17.101 5.88198 17.4956 6.87534 17.4956C7.8687 17.4956 8.82137 17.101 9.52378 16.3985L15.9378 10.0001" stroke="#6B6E75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_2076_1094">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span>{task.attachments}</span>
                  </div>
                </td>
                <td className="px-4 py-3 w-1/6">
                  <div className='flex gap-1 items-center'>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_2076_3564)">
                        <path d="M14.625 2.8125H3.375C3.06434 2.8125 2.8125 3.06434 2.8125 3.375V14.625C2.8125 14.9357 3.06434 15.1875 3.375 15.1875H14.625C14.9357 15.1875 15.1875 14.9357 15.1875 14.625V3.375C15.1875 3.06434 14.9357 2.8125 14.625 2.8125Z" stroke="#A3A5AB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.375 1.40625V2.8125" stroke="#A3A5AB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5.625 1.40625V2.8125" stroke="#A3A5AB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M2.8125 6.1875H15.1875" stroke="#A3A5AB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_2076_3564">
                          <rect width="18" height="18" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    {task.dueDate}
                  </div>
                </td>
                <td className="px-4 py-3 w-1/6">
                  <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs ${getStatusStyles(task.status)}`}>{task.status}</span>
                </td>
                <td className="pr-10 py-3 w-1/12">
                  <button className="w-5 h-5 flex items-center justify-center text-2xl">
                    ...
                  </button>
                </td>

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

const MyTasks: React.FC = () => {
  const [isWorkingCollapsed, setIsWorkingCollapsed] = useState(false);
  const [isPendingCollapsed, setIsPendingCollapsed] = useState(false);
  const [isBacklogCollapsed, setIsBacklogCollapsed] = useState(false);

  const handleToggle = (setCollapsed: React.Dispatch<React.SetStateAction<boolean>>) => {
    setCollapsed((prev) => !prev);
  };

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
