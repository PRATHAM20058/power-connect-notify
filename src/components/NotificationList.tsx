
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Clock, Users } from 'lucide-react';
import { useState } from 'react';
import StatusBadge, { Status } from './StatusBadge';

export interface NotificationInfo {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  status: Status;
  sentTo: number;
  area: string;
  priority: 'high' | 'medium' | 'low';
}

interface NotificationListProps {
  notifications: NotificationInfo[];
  onNotificationClick?: (notification: NotificationInfo) => void;
}

const NotificationList = ({ notifications, onNotificationClick }: NotificationListProps) => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  
  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="bg-danger-100 text-danger-700 text-xs font-medium px-2 py-0.5 rounded-full">High</span>;
      case 'medium':
        return <span className="bg-warning-100 text-warning-700 text-xs font-medium px-2 py-0.5 rounded-full">Medium</span>;
      case 'low':
        return <span className="bg-success-100 text-success-700 text-xs font-medium px-2 py-0.5 rounded-full">Low</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-3 w-full">
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            className={`glass-card rounded-xl overflow-hidden cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            whileHover={{ y: -2 }}
            onClick={() => toggleExpand(notification.id)}
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-full ${
                    notification.status === 'online' ? 'bg-success-50 text-success-500' :
                    notification.status === 'outage' ? 'bg-danger-50 text-danger-500' : 
                    'bg-warning-50 text-warning-500'
                  }`}>
                    <Bell size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium">{notification.title}</h3>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {new Date(notification.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={notification.status} showText={false} />
                  {getPriorityBadge(notification.priority)}
                </div>
              </div>
              
              <div className="text-sm text-gray-700">
                {expandedIds.includes(notification.id) 
                  ? notification.message 
                  : `${notification.message.substring(0, 90)}${notification.message.length > 90 ? '...' : ''}`}
              </div>
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Area:</span> {notification.area}
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Users size={12} className="mr-1" />
                  Sent to {notification.sentTo.toLocaleString()} users
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {notifications.length === 0 && (
        <motion.div
          className="glass-card rounded-xl p-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Bell size={32} className="mx-auto mb-3 text-gray-400" />
          <p className="text-gray-600">No notifications yet</p>
        </motion.div>
      )}
    </div>
  );
};

export default NotificationList;
