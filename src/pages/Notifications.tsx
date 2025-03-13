
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, Filter, ArrowUp, ArrowDown } from 'lucide-react';
import TransitionWrapper from '../components/TransitionWrapper';
import NotificationList, { NotificationInfo } from '../components/NotificationList';

const Notifications = () => {
  // Sample data
  const [notifications, setNotifications] = useState<NotificationInfo[]>([
    {
      id: "NOTIF-9241",
      title: "Power Outage Detected",
      message: "We've detected a power outage in your area. Our team is working to restore service as quickly as possible. We apologize for the inconvenience.",
      timestamp: "2023-08-18T15:32:00",
      status: "outage",
      sentTo: 1245,
      area: "Central District",
      priority: "high"
    },
    {
      id: "NOTIF-9242",
      title: "Restoration Time Update",
      message: "We're making good progress on repairs. The estimated restoration time for power in your area is 7:30 PM today. Thank you for your patience.",
      timestamp: "2023-08-18T16:45:00",
      status: "outage",
      sentTo: 1245,
      area: "Central District",
      priority: "medium"
    },
    {
      id: "NOTIF-9243",
      title: "Scheduled Maintenance Notification",
      message: "There will be a scheduled maintenance affecting your power supply on Thursday, August 18 from 9:00 AM to 5:00 PM. We recommend preparing accordingly.",
      timestamp: "2023-08-15T10:00:00",
      status: "maintenance",
      sentTo: 897,
      area: "West Suburb",
      priority: "medium"
    },
    {
      id: "NOTIF-9244",
      title: "Power Restored",
      message: "Power has been successfully restored to your area. If you're still experiencing issues, please contact our support team. Thank you for your patience.",
      timestamp: "2023-08-18T19:15:00",
      status: "online",
      sentTo: 1245,
      area: "Central District",
      priority: "medium"
    },
    {
      id: "NOTIF-9245",
      title: "Power Outage - Equipment Failure",
      message: "A power outage has been detected in the Industrial Complex due to equipment failure. Our teams are on site working to resolve the issue.",
      timestamp: "2023-08-18T16:20:00",
      status: "outage",
      sentTo: 432,
      area: "North Zone",
      priority: "high"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"timestamp" | "priority">("timestamp");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Search and filter notifications
  const filteredNotifications = notifications
    .filter(notification => {
      const matchesSearch = 
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.area.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesFilter = 
        filterStatus === "all" || notification.status === filterStatus;
        
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "timestamp") {
        return sortOrder === "asc"
          ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      } else {
        const priorityValue = {
          high: 3,
          medium: 2,
          low: 1
        };
        
        return sortOrder === "asc"
          ? priorityValue[a.priority] - priorityValue[b.priority]
          : priorityValue[b.priority] - priorityValue[a.priority];
      }
    });

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === "asc" ? "desc" : "asc");
  };

  return (
    <TransitionWrapper>
      <div className="min-h-screen pt-20 pb-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Notifications</h1>
                <p className="text-gray-600">
                  View and manage all power outage notifications sent to consumers.
                </p>
              </div>
              
              <motion.div
                className="p-3 rounded-full bg-primary-50 text-primary-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell size={24} />
              </motion.div>
            </div>
            
            {/* Filters and Search */}
            <div className="glass-card rounded-xl p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Search size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Filter size={16} />
                    </div>
                    <select
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="outage">Outage</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="online">Resolved</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-2">
                    <select
                      className="px-4 py-2 border border-gray-200 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as "timestamp" | "priority")}
                    >
                      <option value="timestamp">Sort by Time</option>
                      <option value="priority">Sort by Priority</option>
                    </select>
                    
                    <button
                      className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                      onClick={toggleSortOrder}
                    >
                      {sortOrder === "asc" ? (
                        <ArrowUp size={16} />
                      ) : (
                        <ArrowDown size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Notification Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <motion.div
                className="glass-card rounded-xl p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-sm text-gray-600 mb-2">Total Notifications</h3>
                <p className="text-3xl font-bold">{notifications.length}</p>
              </motion.div>
              
              <motion.div
                className="glass-card rounded-xl p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h3 className="text-sm text-gray-600 mb-2">High Priority</h3>
                <p className="text-3xl font-bold">
                  {notifications.filter(n => n.priority === "high").length}
                </p>
              </motion.div>
              
              <motion.div
                className="glass-card rounded-xl p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <h3 className="text-sm text-gray-600 mb-2">Users Notified</h3>
                <p className="text-3xl font-bold">
                  {notifications.reduce((sum, n) => sum + n.sentTo, 0).toLocaleString()}
                </p>
              </motion.div>
            </div>
            
            {/* Notification List */}
            <NotificationList 
              notifications={filteredNotifications} 
              onNotificationClick={(notification) => console.log('Clicked on notification:', notification)}
            />
            
            {/* Empty State */}
            {filteredNotifications.length === 0 && (
              <motion.div
                className="glass-card rounded-xl p-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Search size={32} className="mx-auto mb-3 text-gray-400" />
                <p className="text-gray-600 mb-2">No matching notifications found</p>
                <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </TransitionWrapper>
  );
};

export default Notifications;
