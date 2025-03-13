
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { OutageInfo } from './OutageCard';

interface FeederMapProps {
  outages: OutageInfo[];
  activeFeederId?: string;
  onFeederClick?: (feeder: OutageInfo) => void;
}

const FeederMap = ({ outages, activeFeederId, onFeederClick }: FeederMapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // This is a simplified visualization - a real implementation would use proper mapping libraries
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions matching its display size
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Draw horizontal grid lines
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Draw vertical grid lines
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Draw a central power station
    ctx.fillStyle = '#60a5fa';
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw feeders radiating out from center
    outages.forEach((outage, index) => {
      const angle = (index / outages.length) * Math.PI * 2;
      const length = Math.min(width, height) * 0.4;
      const endX = width / 2 + Math.cos(angle) * length;
      const endY = height / 2 + Math.sin(angle) * length;
      
      // Determine color based on status
      let color;
      switch (outage.status) {
        case 'online':
          color = '#22c55e';
          break;
        case 'outage':
          color = '#ef4444';
          break;
        case 'maintenance':
        case 'warning':
          color = '#f59e0b';
          break;
        default:
          color = '#9ca3af';
      }
      
      // Draw line from center to feeder
      ctx.strokeStyle = color;
      ctx.lineWidth = outage.id === activeFeederId ? 3 : 2;
      ctx.beginPath();
      ctx.moveTo(width / 2, height / 2);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      
      // Draw feeder node
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(endX, endY, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Add label
      ctx.fillStyle = '#374151';
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const labelOffset = 20;
      const labelX = width / 2 + Math.cos(angle) * (length + labelOffset);
      const labelY = height / 2 + Math.sin(angle) * (length + labelOffset);
      
      ctx.fillText(outage.feeder, labelX, labelY);
    });
    
  }, [outages, activeFeederId]);
  
  return (
    <motion.div 
      className="glass-card rounded-xl p-5 w-full h-[400px] overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold">Feeder Status Map</h3>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-success-500 rounded-full mr-2"></div>
            <span>Online</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-danger-500 rounded-full mr-2"></div>
            <span>Outage</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-warning-500 rounded-full mr-2"></div>
            <span>Maintenance</span>
          </div>
        </div>
      </div>
      
      <div className="relative w-full h-[calc(100%-36px)]">
        <canvas 
          ref={canvasRef}
          className="w-full h-full" 
          onClick={(e) => {
            if (!canvasRef.current || !onFeederClick) return;
            
            const rect = canvasRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Find if a feeder node was clicked
            // This is simplified - real implementation would use proper hit detection
            outages.forEach((outage, index) => {
              const { width, height } = canvasRef.current!.getBoundingClientRect();
              const angle = (index / outages.length) * Math.PI * 2;
              const length = Math.min(width, height) * 0.4;
              const feederX = width / 2 + Math.cos(angle) * length;
              const feederY = height / 2 + Math.sin(angle) * length;
              
              const distance = Math.sqrt(Math.pow(x - feederX, 2) + Math.pow(y - feederY, 2));
              if (distance < 10) {
                onFeederClick(outage);
              }
            });
          }}
        />
      </div>
    </motion.div>
  );
};

export default FeederMap;
