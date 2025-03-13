
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, BellRing, Zap } from 'lucide-react';
import TransitionWrapper from '../components/TransitionWrapper';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      title: "Real-time Outage Detection",
      description: "Instantly detect power failures through connected feeder and TC center devices.",
      icon: <Zap size={24} className="text-primary-500" />,
      delay: 0.1
    },
    {
      title: "Multi-channel Notifications",
      description: "Send SMS, email, and push notifications to affected consumers automatically.",
      icon: <BellRing size={24} className="text-primary-500" />,
      delay: 0.2
    },
    {
      title: "Restoration Time Updates",
      description: "Keep consumers informed with accurate power restoration timelines.",
      icon: <AlertTriangle size={24} className="text-primary-500" />,
      delay: 0.3
    }
  ];

  return (
    <TransitionWrapper>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-28 pb-16 md:pt-32 md:pb-24">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                  Smart Power Outage Notification System
                </h1>
              </motion.div>
              
              <motion.p
                className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Keep your consumers informed with real-time updates about power outages and restoration timelines through our intelligent notification system.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link to="/dashboard">
                  <motion.button
                    className="px-6 py-3 bg-primary text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-primary-600 transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore Dashboard
                    <ArrowRight size={18} />
                  </motion.button>
                </Link>
                <Link to="/notifications">
                  <motion.button
                    className="px-6 py-3 bg-gray-100 text-gray-900 font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Notifications
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Image Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 mx-auto">
            <motion.div
              className="max-w-5xl mx-auto p-6 glass-card rounded-2xl overflow-hidden shadow-elevation"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Real-time Power Network Monitoring</h2>
                <p className="text-lg text-gray-700 mb-8">
                  Our system maps consumers to feeders and TC centers, enabling precise outage tracking and targeted notifications.
                </p>
                <div className="aspect-video bg-white rounded-lg shadow-subtle overflow-hidden">
                  {/* Placeholder for system screenshot/visualization */}
                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                    Power Network Visualization
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Key Features</h2>
              <p className="text-lg text-gray-700">
                Our intelligent system bridges the gap between power infrastructure and consumers with powerful features.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="glass-card rounded-xl p-6 h-full"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: feature.delay }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="mb-4 p-3 bg-primary-50 w-fit rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Ready to Transform Your Outage Communication?
              </motion.h2>
              
              <motion.p
                className="text-lg md:text-xl text-primary-100 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Improve consumer satisfaction with transparent, timely, and accurate power outage notifications.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link to="/dashboard">
                  <motion.button
                    className="px-8 py-4 bg-white text-primary-700 font-medium rounded-xl inline-flex items-center gap-2 hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                    <ArrowRight size={18} />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="text-center text-gray-600 text-sm">
              <p>© 2023 PowerConnect. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </TransitionWrapper>
  );
};

export default Index;
