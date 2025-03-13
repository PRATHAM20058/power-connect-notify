
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  ToggleLeft, 
  ToggleRight, 
  User, 
  Users, 
  Zap 
} from 'lucide-react';
import TransitionWrapper from '../components/TransitionWrapper';
import { toast } from '@/components/ui/use-toast';

const Settings = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    smsEnabled: true,
    emailEnabled: true,
    pushEnabled: false,
    outageAlerts: true,
    maintenanceAlerts: true,
    restorationUpdates: true
  });
  
  const [userSettings, setUserSettings] = useState({
    autoMapConsumers: true,
    sendTestNotifications: false,
    storeHistorical: true,
    detailedReporting: true
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleToggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleToggleUserSetting = (key: keyof typeof userSettings) => {
    setUserSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simulate saving settings
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Settings saved",
        description: "Your notification preferences have been updated."
      });
    }, 1000);
  };
  
  return (
    <TransitionWrapper>
      <div className="min-h-screen pt-20 pb-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Settings</h1>
              <p className="text-gray-600">
                Configure notification preferences and system settings
              </p>
            </div>
            
            {/* Settings Sections */}
            <div className="space-y-8">
              {/* Notification Channels */}
              <motion.div
                className="glass-card rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Bell className="mr-2 h-5 w-5 text-primary-500" />
                    Notification Channels
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Configure which channels to use for sending notifications to consumers
                  </p>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary-50 text-primary-600">
                        <MessageSquare size={18} />
                      </div>
                      <div>
                        <h3 className="font-medium">SMS Notifications</h3>
                        <p className="text-sm text-gray-600">
                          Send text messages for power outage alerts
                        </p>
                      </div>
                    </div>
                    
                    <button 
                      className="relative"
                      onClick={() => handleToggleNotification('smsEnabled')}
                    >
                      {notificationSettings.smsEnabled ? (
                        <ToggleRight className="h-7 w-12 text-primary-500" />
                      ) : (
                        <ToggleLeft className="h-7 w-12 text-gray-400" />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary-50 text-primary-600">
                        <Mail size={18} />
                      </div>
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-600">
                          Send email alerts for outages and updates
                        </p>
                      </div>
                    </div>
                    
                    <button 
                      className="relative"
                      onClick={() => handleToggleNotification('emailEnabled')}
                    >
                      {notificationSettings.emailEnabled ? (
                        <ToggleRight className="h-7 w-12 text-primary-500" />
                      ) : (
                        <ToggleLeft className="h-7 w-12 text-gray-400" />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary-50 text-primary-600">
                        <Bell size={18} />
                      </div>
                      <div>
                        <h3 className="font-medium">Push Notifications</h3>
                        <p className="text-sm text-gray-600">
                          Send mobile app push notifications 
                        </p>
                      </div>
                    </div>
                    
                    <button 
                      className="relative"
                      onClick={() => handleToggleNotification('pushEnabled')}
                    >
                      {notificationSettings.pushEnabled ? (
                        <ToggleRight className="h-7 w-12 text-primary-500" />
                      ) : (
                        <ToggleLeft className="h-7 w-12 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
              
              {/* Alert Types */}
              <motion.div
                className="glass-card rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-primary-500" />
                    Alert Types
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Configure which types of events trigger notifications
                  </p>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Power Outage Alerts</h3>
                      <p className="text-sm text-gray-600">
                        Immediate notification when power outage is detected
                      </p>
                    </div>
                    
                    <button 
                      className="relative"
                      onClick={() => handleToggleNotification('outageAlerts')}
                    >
                      {notificationSettings.outageAlerts ? (
                        <ToggleRight className="h-7 w-12 text-primary-500" />
                      ) : (
                        <ToggleLeft className="h-7 w-12 text-gray-400" />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Maintenance Notifications</h3>
                      <p className="text-sm text-gray-600">
                        Advance notice for scheduled maintenance
                      </p>
                    </div>
                    
                    <button 
                      className="relative"
                      onClick={() => handleToggleNotification('maintenanceAlerts')}
                    >
                      {notificationSettings.maintenanceAlerts ? (
                        <ToggleRight className="h-7 w-12 text-primary-500" />
                      ) : (
                        <ToggleLeft className="h-7 w-12 text-gray-400" />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Restoration Updates</h3>
                      <p className="text-sm text-gray-600">
                        Updates on estimated restoration times and completion
                      </p>
                    </div>
                    
                    <button 
                      className="relative"
                      onClick={() => handleToggleNotification('restorationUpdates')}
                    >
                      {notificationSettings.restorationUpdates ? (
                        <ToggleRight className="h-7 w-12 text-primary-500" />
                      ) : (
                        <ToggleLeft className="h-7 w-12 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
              
              {/* System Settings */}
              <motion.div
                className="glass-card rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold flex items-center">
                    <User className="mr-2 h-5 w-5 text-primary-500" />
                    System Settings
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Configure consumer mapping and system behavior
                  </p>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Auto-map Consumers</h3>
                      <p className="text-sm text-gray-600">
                        Automatically map consumers to feeders and TC centers
                      </p>
                    </div>
                    
                    <button 
                      className="relative"
                      onClick={() => handleToggleUserSetting('autoMapConsumers')}
                    >
                      {userSettings.autoMapConsumers ? (
                        <ToggleRight className="h-7 w-12 text-primary-500" />
                      ) : (
                        <ToggleLeft className="h-7 w-12 text-gray-400" />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Send Test Notifications</h3>
                      <p className="text-sm text-gray-600">
                        Allow sending test notifications to verify system
                      </p>
                    </div>
                    
                    <button 
                      className="relative"
                      onClick={() => handleToggleUserSetting('sendTestNotifications')}
                    >
                      {userSettings.sendTestNotifications ? (
                        <ToggleRight className="h-7 w-12 text-primary-500" />
                      ) : (
                        <ToggleLeft className="h-7 w-12 text-gray-400" />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Store Historical Data</h3>
                      <p className="text-sm text-gray-600">
                        Keep historical outage and notification data
                      </p>
                    </div>
                    
                    <button 
                      className="relative"
                      onClick={() => handleToggleUserSetting('storeHistorical')}
                    >
                      {userSettings.storeHistorical ? (
                        <ToggleRight className="h-7 w-12 text-primary-500" />
                      ) : (
                        <ToggleLeft className="h-7 w-12 text-gray-400" />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">Detailed Reporting</h3>
                      <p className="text-sm text-gray-600">
                        Enable detailed analytics and reporting
                      </p>
                    </div>
                    
                    <button 
                      className="relative"
                      onClick={() => handleToggleUserSetting('detailedReporting')}
                    >
                      {userSettings.detailedReporting ? (
                        <ToggleRight className="h-7 w-12 text-primary-500" />
                      ) : (
                        <ToggleLeft className="h-7 w-12 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <motion.button
                className="px-6 py-3 bg-primary text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-primary-600 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSaveSettings}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Settings'}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </TransitionWrapper>
  );
};

export default Settings;
