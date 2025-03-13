
import { motion } from 'framer-motion';

export type Status = 'online' | 'outage' | 'maintenance' | 'warning';

interface StatusBadgeProps {
  status: Status;
  pulse?: boolean;
  showText?: boolean;
  className?: string;
}

const StatusBadge = ({ 
  status, 
  pulse = true, 
  showText = true,
  className = "" 
}: StatusBadgeProps) => {
  
  const getStatusConfig = (status: Status) => {
    switch (status) {
      case 'online':
        return {
          color: 'bg-success-500',
          text: 'Online',
          textColor: 'text-success-800'
        };
      case 'outage':
        return {
          color: 'bg-danger-500',
          text: 'Outage',
          textColor: 'text-danger-800'
        };
      case 'maintenance':
        return {
          color: 'bg-warning-500',
          text: 'Maintenance',
          textColor: 'text-warning-800'
        };
      case 'warning':
        return {
          color: 'bg-warning-400',
          text: 'Warning',
          textColor: 'text-warning-800'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center">
        <motion.div 
          className={`h-3 w-3 rounded-full ${config.color}`}
          animate={pulse ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {pulse && status !== 'online' && (
          <motion.div
            className={`absolute inset-0 rounded-full ${config.color} opacity-30`}
            animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
      {showText && (
        <span className={`text-xs font-medium ${config.textColor}`}>
          {config.text}
        </span>
      )}
    </div>
  );
};

export default StatusBadge;
