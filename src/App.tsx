import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { 
  BadgeCheck, Shield, Ruler, DollarSign, Calendar, 
  X, Heart, User, Settings, ScanLine
} from 'lucide-react';

// --- TYPES ---
interface Profile {
  id: string;
  name: string;
  age: number;
  location: string;
  image: string;
  height: string;
  income: string;
  verifiedLevel: number;
}

// --- MOCK DATA ---
const DEMO_PROFILE: Profile = {
  id: '1',
  name: 'Sarah',
  age: 23,
  location: 'Brisbane, AU',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop', // High quality portrait
  height: '5\'7"',
  income: '$85k',
  verifiedLevel: 2
};

export default function App() {
  const [view, setView] = useState<'landing' | 'scanning' | 'app'>('landing');
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [lastSwipe, setLastSwipe] = useState<'left' | 'right' | null>(null);

  const handleSwipe = (dir: 'left' | 'right') => {
    setLastSwipe(dir);
    setTimeout(() => setLastSwipe(null), 800);
    if (dir === 'right') setTimeout(() => setShowVerifyModal(true), 500);
  };

  if (view === 'landing') {
    return <LandingScreen onEnter={() => setView('scanning')} />;
  }

  if (view === 'scanning') {
    return <ScanningScreen onComplete={() => setView('app')} />;
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#050505] font-sans">
      <div className="w-full max-w-md h-[100dvh] relative bg-truth-dark border-x border-white/5 shadow-2xl flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <header className="px-6 py-4 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="font-black text-black text-lg tracking-tighter">TR</span>
             </div>
             <span className="font-bold text-xl tracking-wide text-white">TRUTH</span>
          </div>
          
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
            <span className="text-xs font-mono text-gray-400">RANK</span>
            <span className="text-sm font-bold text-white">#4,201</span>
          </button>
        </header>

        {/* MAIN SWIPE AREA */}
        <main className="flex-1 relative w-full h-full p-4">
          <AnimatePresence>
            {!lastSwipe && (
              <SwipeCard profile={DEMO_PROFILE} onSwipe={handleSwipe} />
            )}
          </AnimatePresence>
          
          {lastSwipe && (
             <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="text-center animate-pulse">
                    <p className="text-gray-500 font-mono text-sm">SEARCHING FOR REALITY...</p>
                </div>
             </div>
          )}
        </main>

        {/* BOTTOM NAV */}
        <nav className="h-20 px-8 flex items-center justify-between pb-4 z-20 bg-gradient-to-t from-black via-black/90 to-transparent">
          <NavIcon icon={User} />
          
          <div className="flex gap-6 items-center">
            <ActionButton icon={X} color="text-red-500" bg="bg-red-500/10" onClick={() => handleSwipe('left')} />
            <ActionButton icon={Heart} color="text-green-500" bg="bg-green-500/10" onClick={() => handleSwipe('right')} />
          </div>
          
          <NavIcon icon={Settings} />
        </nav>

        {/* MODALS */}
        <VerificationModal isOpen={showVerifyModal} onClose={() => setShowVerifyModal(false)} />
        
      </div>
    </div>
  )
}

// --- NEW SCREENS ---

function LandingScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-between bg-black text-white p-8 font-sans">
      <div className="flex-1 flex flex-col items-center justify-center space-y-12">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(255,255,255,0.3)]">
            <span className="font-black text-black text-5xl tracking-tighter">TR</span>
        </div>
        
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
            TRUTH
          </h1>
          <p className="text-gray-400 text-lg tracking-widest uppercase font-medium">
            Verified. Exclusive. Real.
          </p>
        </div>

        <div className="w-full max-w-xs space-y-4 pt-12">
            <div className="flex items-center justify-between text-xs text-gray-500 font-medium tracking-widest border-b border-white/10 pb-3">
                <span>MEMBERS ONLINE</span>
                <span className="text-white">14,203</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 font-medium tracking-widest border-b border-white/10 pb-3">
                <span>GUEST LIST</span>
                <span className="text-yellow-500">42m WAIT</span>
            </div>
        </div>
      </div>

      <button 
        onClick={onEnter}
        className="w-full max-w-sm bg-white text-black font-bold text-lg py-5 rounded-xl hover:scale-105 transition-transform active:scale-95 tracking-wide shadow-xl shadow-white/10"
      >
        REQUEST ACCESS
      </button>
      
      <p className="mt-8 text-[10px] text-gray-600 tracking-widest uppercase">The Anti-Catfish Club • EST 2026</p>
    </div>
  )
}

function ScanningScreen({ onComplete }: { onComplete: () => void }) {
  // Auto-advance after 3 seconds
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-[100dvh] bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Soft Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
      
      <div className="relative z-10 text-center space-y-10">
        <div className="w-32 h-32 relative mx-auto">
             <div className="absolute inset-0 border border-white/10 rounded-full"></div>
             <div className="absolute inset-0 border-t border-white rounded-full animate-spin"></div>
             <Shield className="absolute inset-0 m-auto text-white w-10 h-10 animate-pulse" />
        </div>

        <div className="space-y-3">
            <h2 className="text-xl font-medium text-white tracking-widest uppercase animate-pulse">Verifying Identity</h2>
            <p className="text-gray-500 text-xs tracking-wider">PLEASE HOLD</p>
        </div>

        <div className="text-left text-xs text-gray-400 space-y-3 bg-white/5 p-8 rounded-2xl border border-white/5 w-72 mx-auto backdrop-blur-md">
            <p className="flex justify-between items-center">
                <span className="tracking-widest">BIOMETRICS</span> 
                <span className="text-white bg-white/20 px-2 py-0.5 rounded text-[10px]">VERIFIED</span>
            </p>
            <p className="flex justify-between items-center">
                <span className="tracking-widest">SOCIAL GRAPH</span> 
                <span className="text-white bg-white/20 px-2 py-0.5 rounded text-[10px]">VERIFIED</span>
            </p>
            <p className="flex justify-between items-center">
                <span className="tracking-widest">FINANCIALS</span> 
                <span className="text-gray-500 border border-white/10 px-2 py-0.5 rounded text-[10px]">PENDING</span>
            </p>
        </div>
      </div>
    </div>
  )
}

// --- SUB COMPONENTS ---

function NavIcon({ icon: Icon }: { icon: any }) {
    return (
        <button className="p-3 text-gray-500 hover:text-white transition-colors">
            <Icon className="w-6 h-6" />
        </button>
    )
}

function ActionButton({ icon: Icon, color, bg, onClick }: any) {
    return (
        <button 
            onClick={onClick}
            className={`w-14 h-14 rounded-full ${bg} border border-white/5 flex items-center justify-center transition-transform active:scale-95 shadow-lg shadow-black/50`}
        >
            <Icon className={`w-7 h-7 ${color}`} fill="currentColor" fillOpacity={0.2} />
        </button>
    )
}

function SwipeCard({ profile, onSwipe }: { profile: Profile, onSwipe: (d: 'left'|'right') => void }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  // Color feedback on swipe
  const border = useTransform(x, [-200, 0, 200], ["rgba(239, 68, 68, 0.5)", "rgba(255,255,255,0.1)", "rgba(16, 185, 129, 0.5)"]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) onSwipe('right');
    else if (info.offset.x < -100) onSwipe('left');
  };

  return (
    <motion.div 
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-0 cursor-grab active:cursor-grabbing z-10 p-2 pb-6"
    >
      <motion.div 
        style={{ borderColor: border }}
        className="w-full h-full rounded-[2.5rem] overflow-hidden relative border border-white/10 shadow-2xl bg-[#0A0A0A]"
      >
        {/* Verification Shield */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
           <div className="bg-black/60 backdrop-blur-md border border-truth-green/30 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
              <Shield className="w-3 h-3 text-truth-green fill-truth-green" />
              <span className="text-[10px] font-bold text-truth-green tracking-wider font-mono">VERIFIED LVL 2</span>
           </div>
        </div>

        {/* Image */}
        <img src={profile.image} className="w-full h-full object-cover pointer-events-none select-none" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Profile Details */}
        <div className="absolute bottom-0 w-full p-6 pb-8 pointer-events-none">
          <h2 className="text-4xl font-black tracking-tight mb-1 flex items-center gap-2 text-white drop-shadow-xl">
            {profile.name}, {profile.age} 
            <BadgeCheck className="w-7 h-7 text-blue-500 fill-blue-500/20" />
          </h2>
          <p className="text-sm text-gray-300 font-medium mb-6 flex items-center gap-1 opacity-80">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            Active Now • {profile.location}
          </p>

          {/* THE TRUTH MATRIX */}
          <div className="grid grid-cols-3 gap-2">
            <StatCard icon={Ruler} label="Height" value={profile.height} color="text-blue-400" />
            <StatCard icon={DollarSign} label="Income" value={profile.income} color="text-yellow-400" />
            <StatCard icon={Calendar} label="Last Verified" value="2h ago" color="text-gray-400" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 text-center shadow-lg">
      <Icon className={`w-4 h-4 mx-auto mb-1.5 ${color}`} />
      <div className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-0.5">{label}</div>
      <div className="text-sm font-bold text-white font-mono">{value}</div>
    </div>
  );
}

function VerificationModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-8 text-center relative overflow-hidden shadow-2xl">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
            <X className="w-6 h-6" />
        </button>

        {/* Scanning Line Animation */}
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_20px_#3B82F6] animate-scan opacity-50"></div>
        
        <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <div className="absolute inset-0 border-2 border-blue-500 rounded-full animate-ping opacity-20"></div>
          <ScanLine className="w-10 h-10 text-blue-500" />
        </div>
        
        <h3 className="text-2xl font-black text-white mb-2 tracking-tight">VERIFY TO MATCH</h3>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          Sarah is a <span className="text-white font-bold">Tier 1 Verified</span> user. 
          To message her, you must verify your identity.
        </p>

        <div className="space-y-3 text-left text-xs font-mono text-gray-500 mb-8 bg-black/50 p-4 rounded-xl border border-white/5">
          <div className="flex items-center gap-3">
            <span className="text-green-500">✓</span> <span>Biometric Mesh:</span> <span className="text-white ml-auto">MATCH</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-500">✓</span> <span>Liveness Check:</span> <span className="text-white ml-auto">PASSED</span>
          </div>
          <div className="flex items-center gap-3 animate-pulse">
             <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
             <span>Analyzing Social Graph...</span>
          </div>
        </div>

        <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform">
            START VERIFICATION
        </button>
        <p className="mt-4 text-[10px] text-gray-600 uppercase tracking-widest">Takes 30 seconds</p>
      </div>
    </div>
  );
}