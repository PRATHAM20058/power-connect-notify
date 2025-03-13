
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, MapPin, Users } from 'lucide-react';
import StatusBadge, { Status } from './StatusBadge';

export interface OutageInfo {
  id: string;
  area: string;
  feeder: string;
  tcCenter: string;
  affectedUsers: number;
  status: Status;
  startTime: string;
  estimatedResolution?: string;
  location: string;
  reason?: string;
}

interface OutageCardProps {
  outage: OutageInfo;
  onAction?: (action: string, outage: OutageInfo) => void;
}

const OutageCard = ({ outage, onAction }: OutageCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAction = (action: string) => {
    if (onAction) {
      onAction(action, outage);
    }
  };

  return (
    <motion.div 
      className="glass-card rounded-xl overflow-hidden w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <StatusBadge status={outage.status} />
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {outage.id}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-1">{outage.area}</h3>
            <div className="flex items-center text-gray-600 text-sm mb-3">
              <MapPin size={14} className="mr-1" />
              <span>{outage.location}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <Users size={14} className="mr-1" />
              <span>{outage.affectedUsers.toLocaleString()} affected</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock size={14} className="mr-1" />
              <span>
                {new Date(outage.startTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        </div>
        
        <div 
          className={`grid grid-rows-${isExpanded ? '1' : '0'} transition-all duration-300 ${
            isExpanded ? 'mt-4 max-h-96' : 'max-h-0 overflow-hidden'
          }`}
        >
          <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 mb-3">
            <div className="mb-2">
              <span className="font-medium">Feeder:</span> {outage.feeder}
            </div>
            <div className="mb-2">
              <span className="font-medium">TC Center:</span> {outage.tcCenter}
            </div>
            {outage.reason && (
              <div className="mb-2 flex items-start">
                <AlertTriangle size={16} className="text-warning-500 mr-1 mt-0.5" />
                <span className="font-medium">Reason:</span> {outage.reason}
              </div>
            )}
            {outage.estimatedResolution && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <span className="font-medium">Estimated Resolution:</span>{' '}
                {new Date(outage.estimatedResolution).toLocaleString()}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <motion.button
            className="text-gray-500 text-sm font-medium"
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </motion.button>
          
          <div className="flex items-center gap-2">
            {outage.status === 'outage' && !outage.estimatedResolution && (
              <motion.button
                className="text-sm px-3 py-1.5 bg-primary-50 text-primary-700 rounded-md font-medium hover:bg-primary-100 transition-colors"
                onClick={() => handleAction('updateTime')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Update Time
              </motion.button>
            )}
            
            <motion.button
              className="text-sm px-3 py-1.5 bg-primary text-white rounded-md font-medium hover:bg-primary-600 transition-colors"
              onClick={() => handleAction('sendNotification')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Notify Users
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OutageCard;
