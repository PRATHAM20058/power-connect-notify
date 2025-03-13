
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Bell, 
  CheckCircle, 
  Clock, 
  Loader, 
  MapPin, 
  Plus, 
  Users,
  Zap
} from 'lucide-react';
import TransitionWrapper from '../components/TransitionWrapper';
import OutageCard, { OutageInfo } from '../components/OutageCard';
import FeederMap from '../components/FeederMap';
import StatusBadge from '../components/StatusBadge';
import { toast } from '@/components/ui/use-toast';

const Dashboard = () => {
  // Sample data - in a real app, this would come from an API
  const [outages, setOutages] = useState<OutageInfo[]>([
    {
      id: "OUT-7823",
      area: "Central District",
      feeder: "Main-F12",
      tcCenter: "TC-308",
      affectedUsers: 1245,
      status: "outage",
      startTime: "2023-08-18T15:30:00",
      location: "Downtown Area"
    },
    {
      id: "OUT-7824",
      area: "North Zone",
      feeder: "Industrial-F3",
      tcCenter: "TC-112",
      affectedUsers: 432,
      status: "outage",
      startTime: "2023-08-18T16:15:00",
      estimatedResolution: "2023-08-18T19:30:00",
      location: "Industrial Complex",
      reason: "Equipment failure due to overload"
    },
    {
      id: "OUT-7825",
      area: "West Suburb",
      feeder: "Residential-F7",
      tcCenter: "TC-205",
      affectedUsers: 897,
      status: "maintenance",
      startTime: "2023-08-18T09:00:00",
      estimatedResolution: "2023-08-18T17:00:00",
      location: "Suburban Residential Area",
      reason: "Scheduled maintenance"
    },
    {
      id: "OUT-7826",
      area: "South Region",
      feeder: "Commercial-F5",
      tcCenter: "TC-412",
      affectedUsers: 350,
      status: "online",
      startTime: "2023-08-18T12:45:00",
      location: "Shopping District"
    },
  ]);

  const [selectedOutage, setSelectedOutage] = useState<OutageInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Total counts
  const totalAffected = outages.reduce((sum, outage) => 
    outage.status !== 'online' ? sum + outage.affectedUsers : sum, 0);
  
  const outageCount = outages.filter(o => o.status === 'outage').length;
  const maintenanceCount = outages.filter(o => o.status === 'maintenance').length;
  const onlineCount = outages.filter(o => o.status === 'online').length;

  const handleOutageAction = (action: string, outage: OutageInfo) => {
    if (action === 'updateTime') {
      // This would typically open a modal to input the time
      // For demo purposes, we'll just update with a fixed time
      setIsLoading(true);
      
      setTimeout(() => {
        const updatedOutages = outages.map(o => 
          o.id === outage.id 
            ? {
                ...o,
                estimatedResolution: new Date(
                  Date.now() + 3 * 60 * 60 * 1000
                ).toISOString(),
              }
            : o
        );
        
        setOutages(updatedOutages);
        setIsLoading(false);
        
        toast({
          title: "Restoration time updated",
          description: `Estimated restoration time updated for ${outage.area}`,
        });
      }, 1000);
    }
    
    if (action === 'sendNotification') {
      setIsLoading(true);
      
      setTimeout(() => {
        setIsLoading(false);
        
        toast({
          title: "Notifications sent",
          description: `${outage.affectedUsers} users have been notified about the status`,
        });
      }, 1500);
    }
  };

  return (
    <TransitionWrapper>
      <div className="min-h-screen pt-20 pb-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Power Outage Dashboard</h1>
              <p className="text-gray-600">
                Monitor and manage power outages, feeders, and customer notifications.
              </p>
            </div>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <motion.div 
                className="glass-card rounded-xl p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-gray-600 text-sm">Affected Users</h3>
                  <div className="p-2 rounded-full bg-primary-50 text-primary-500">
                    <Users size={16} />
                  </div>
                </div>
                <p className="text-3xl font-bold">{totalAffected.toLocaleString()}</p>
              </motion.div>
              
              <motion.div 
                className="glass-card rounded-xl p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-gray-600 text-sm">Active Outages</h3>
                  <div className="p-2 rounded-full bg-danger-50 text-danger-500">
                    <Zap size={16} />
                  </div>
                </div>
                <p className="text-3xl font-bold">{outageCount}</p>
              </motion.div>
              
              <motion.div 
                className="glass-card rounded-xl p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-gray-600 text-sm">Scheduled Maintenance</h3>
                  <div className="p-2 rounded-full bg-warning-50 text-warning-500">
                    <Clock size={16} />
                  </div>
                </div>
                <p className="text-3xl font-bold">{maintenanceCount}</p>
              </motion.div>
              
              <motion.div 
                className="glass-card rounded-xl p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-gray-600 text-sm">Online Feeders</h3>
                  <div className="p-2 rounded-full bg-success-50 text-success-500">
                    <CheckCircle size={16} />
                  </div>
                </div>
                <p className="text-3xl font-bold">{onlineCount}</p>
              </motion.div>
            </div>
            
            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Outage List */}
              <div className="lg:col-span-1 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Power Outages</h2>
                  
                  <motion.button
                    className="p-2 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus size={18} />
                  </motion.button>
                </div>
                
                <div className="space-y-4 overflow-y-auto max-h-[65vh] pr-2">
                  {outages.map((outage) => (
                    <OutageCard 
                      key={outage.id} 
                      outage={outage} 
                      onAction={handleOutageAction}
                    />
                  ))}
                  
                  {outages.length === 0 && (
                    <div className="glass-card rounded-xl p-8 text-center">
                      <AlertTriangle size={32} className="mx-auto mb-3 text-gray-400" />
                      <p className="text-gray-600">No outages reported</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Right Column - Map and Stats */}
              <div className="lg:col-span-2 space-y-8">
                {/* Feeder Map */}
                <FeederMap 
                  outages={outages} 
                  activeFeederId={selectedOutage?.id}
                  onFeederClick={(outage) => setSelectedOutage(outage)}
                />
                
                {/* Additional Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div 
                    className="glass-card rounded-xl p-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <h3 className="font-semibold mb-3">Outage Status</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <StatusBadge status="outage" className="justify-center mb-2" />
                        <p className="text-2xl font-bold">{outageCount}</p>
                        <p className="text-sm text-gray-600">Current Outages</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <StatusBadge status="maintenance" className="justify-center mb-2" />
                        <p className="text-2xl font-bold">{maintenanceCount}</p>
                        <p className="text-sm text-gray-600">Maintenance</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="glass-card rounded-xl p-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <h3 className="font-semibold mb-3">Notifications</h3>
                    <div className="flex items-center justify-between px-4 py-3 bg-primary-50 rounded-lg mb-2">
                      <div className="flex items-center">
                        <Bell size={18} className="text-primary-600 mr-2" />
                        <span>Total Notifications</span>
                      </div>
                      <span className="text-lg font-semibold">{outages.length * 2}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-gray-50 rounded-lg text-center">
                        <p className="font-medium">{outages.length}</p>
                        <p className="text-gray-600">Outage Alerts</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded-lg text-center">
                        <p className="font-medium">{outages.length}</p>
                        <p className="text-gray-600">Restoration Updates</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-elevation flex flex-col items-center animate-slide-up">
              <Loader className="text-primary h-8 w-8 animate-spin mb-3" />
              <p className="text-gray-700 font-medium">Processing...</p>
            </div>
          </div>
        )}
      </div>
    </TransitionWrapper>
  );
};

export default Dashboard;
