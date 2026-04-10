import React, { useState, useMemo } from 'react';
import { X, Calendar, User, Building2, Clock, AlertCircle } from 'lucide-react';

// Mock data for financial close tasks in January 2026
const mockTasks = [
  {
    id: 1,
    taskName: 'Bank Reconciliation',
    assignedTo: 'Sarah Johnson',
    dueDate: '2026-01-05T17:00:00',
    company: 'USMF',
    status: 'Completed'
  },
  {
    id: 2,
    taskName: 'AP Aging Review',
    assignedTo: 'Michael Chen',
    dueDate: '2026-01-08T15:00:00',
    company: 'DEMO',
    status: 'Completed'
  },
  {
    id: 3,
    taskName: 'Revenue Recognition',
    assignedTo: 'Sarah Johnson',
    dueDate: '2026-01-10T18:00:00',
    company: 'USMF',
    status: 'In Progress'
  },
  {
    id: 4,
    taskName: 'Fixed Assets Depreciation',
    assignedTo: 'David Martinez',
    dueDate: '2026-01-12T16:00:00',
    company: 'USMF',
    status: 'Pending'
  },
  {
    id: 5,
    taskName: 'Inventory Count Verification',
    assignedTo: 'Emily Roberts',
    dueDate: '2026-01-15T17:00:00',
    company: 'DEMO',
    status: 'In Progress'
  },
  {
    id: 6,
    taskName: 'Payroll Accruals',
    assignedTo: 'Michael Chen',
    dueDate: '2026-01-18T14:00:00',
    company: 'USMF',
    status: 'Completed'
  },
  {
    id: 7,
    taskName: 'Intercompany Reconciliation',
    assignedTo: 'Sarah Johnson',
    dueDate: '2026-01-20T16:00:00',
    company: 'DEMO',
    status: 'In Progress'
  },
  {
    id: 8,
    taskName: 'Tax Provisions',
    assignedTo: 'David Martinez',
    dueDate: '2026-01-22T17:00:00',
    company: 'USMF',
    status: 'Pending'
  },
  {
    id: 9,
    taskName: 'Financial Statement Review',
    assignedTo: 'Emily Roberts',
    dueDate: '2026-01-25T18:00:00',
    company: 'DEMO',
    status: 'Pending'
  },
  {
    id: 10,
    taskName: 'Month-End Journal Entries',
    assignedTo: 'Michael Chen',
    dueDate: '2026-01-28T16:00:00',
    company: 'USMF',
    status: 'In Progress'
  },
  {
    id: 11,
    taskName: 'Expense Report Processing',
    assignedTo: 'Sarah Johnson',
    dueDate: '2026-01-14T15:00:00',
    company: 'DEMO',
    status: 'Completed'
  },
  {
    id: 12,
    taskName: 'Cash Flow Analysis',
    assignedTo: 'David Martinez',
    dueDate: '2026-01-30T17:00:00',
    company: 'USMF',
    status: 'Pending'
  }
];

const FinancialCloseDashboard = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' or 'me'
  const [currentUser] = useState('Sarah Johnson'); // Simulated current user

  // Company color mapping
  const companyColors = {
    USMF: 'bg-blue-500',
    DEMO: 'bg-purple-500'
  };

  // Status color mapping
  const statusColors = {
    'Completed': 'bg-green-50 border-green-300 text-green-700',
    'In Progress': 'bg-yellow-50 border-yellow-300 text-yellow-700',
    'Pending': 'bg-gray-50 border-gray-300 text-gray-700'
  };

  // Filter tasks based on selection
  const filteredTasks = useMemo(() => {
    if (filter === 'me') {
      return mockTasks.filter(task => task.assignedTo === currentUser);
    }
    return mockTasks;
  }, [filter, currentUser]);

  // Generate calendar days for January 2026
  const generateCalendarDays = () => {
    const year = 2026;
    const month = 0; // January (0-indexed)
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay(); // 0 = Sunday

    const days = [];
    
    // Add empty cells for days before the month starts
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push({ date: null, tasks: [] });
    }

    // Add actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const tasksForDay = filteredTasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate.getDate() === day &&
               taskDate.getMonth() === month &&
               taskDate.getFullYear() === year;
      });
      days.push({ date: day, tasks: tasksForDay });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Check if task is overdue
  const isOverdue = (dueDate, status) => {
    if (status === 'Completed') return false;
    return new Date(dueDate) < new Date();
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-semibold text-gray-900">
                Financial Period Close Dashboard
              </h1>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-700">
              January 2026
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                All Companies
              </button>
              <button
                onClick={() => setFilter('me')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                  filter === 'me'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <User className="w-4 h-4" />
                Assigned to Me
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Week Day Headers */}
          <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
            {weekDays.map((day) => (
              <div
                key={day}
                className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-r border-gray-200 last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`min-h-32 border-r border-b border-gray-200 p-2 ${
                  !day.date ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
                } ${index % 7 === 6 ? 'border-r-0' : ''}`}
              >
                {day.date && (
                  <>
                    <div className="text-right mb-2">
                      <span className={`inline-flex items-center justify-center w-7 h-7 text-sm font-medium rounded-full ${
                        day.date === new Date().getDate() && 
                        new Date().getMonth() === 0 && 
                        new Date().getFullYear() === 2026
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700'
                      }`}>
                        {day.date}
                      </span>
                    </div>
                    
                    {/* Task Ribbons */}
                    <div className="space-y-1">
                      {day.tasks.map((task) => {
                        const overdue = isOverdue(task.dueDate, task.status);
                        return (
                          <button
                            key={task.id}
                            onClick={() => setSelectedTask(task)}
                            className={`w-full text-left px-2 py-1 rounded text-xs font-medium border transition-all hover:shadow-md hover:scale-105 ${
                              statusColors[task.status]
                            } ${overdue ? 'border-l-4 border-l-red-500' : ''}`}
                          >
                            <div className="flex items-center gap-1">
                              <div
                                className={`w-2 h-2 rounded-full ${companyColors[task.company]}`}
                              />
                              <span className="truncate">{task.taskName}</span>
                              {overdue && (
                                <AlertCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6">
              <span className="text-sm font-semibold text-gray-700">Companies:</span>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-600">USMF</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm text-gray-600">DEMO</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm font-semibold text-gray-700">Status:</span>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <span className="text-sm text-gray-600">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                <span className="text-sm text-gray-600">In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                <span className="text-sm text-gray-600">Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-3 h-3 text-red-500" />
                <span className="text-sm text-gray-600">Overdue</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Task Details
              </h3>
              <button
                onClick={() => setSelectedTask(null)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Task Name */}
              <div>
                <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                  {selectedTask.taskName}
                </h4>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                    statusColors[selectedTask.status]
                  }`}>
                    {selectedTask.status}
                  </span>
                  {isOverdue(selectedTask.dueDate, selectedTask.status) && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 border border-red-300 text-red-700">
                      <AlertCircle className="w-3 h-3" />
                      Overdue
                    </span>
                  )}
                </div>
              </div>

              {/* Task Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Building2 className="w-4 h-4" />
                    <span className="font-medium">Company</span>
                  </div>
                  <div className="flex items-center gap-2 pl-6">
                    <div className={`w-3 h-3 rounded-full ${companyColors[selectedTask.company]}`}></div>
                    <span className="text-base font-semibold text-gray-900">
                      {selectedTask.company}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    <span className="font-medium">Assigned To</span>
                  </div>
                  <p className="text-base font-semibold text-gray-900 pl-6">
                    {selectedTask.assignedTo}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Due Date</span>
                  </div>
                  <p className="text-base font-semibold text-gray-900 pl-6">
                    {formatDate(selectedTask.dueDate)}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">Task ID</span>
                  </div>
                  <p className="text-base font-semibold text-gray-900 pl-6">
                    #{selectedTask.id}
                  </p>
                </div>
              </div>

              {/* Additional Info Section */}
              <div className="pt-4 border-t border-gray-200">
                <h5 className="text-sm font-semibold text-gray-700 mb-3">
                  Additional Information
                </h5>
                <p className="text-sm text-gray-600 leading-relaxed">
                  This task is part of the monthly financial close process for {selectedTask.company}. 
                  Please ensure all documentation is completed and submitted before the due date.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
              >
                Edit Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialCloseDashboard;
