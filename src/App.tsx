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
  const [view, setView] = useState<'landing' | 'scanning' | 'app' | 'onboarding'>('landing');
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

  if (view === 'onboarding') {
    return <OnboardingFlow onComplete={() => setView('viral')} />;
  }

  if (view === 'viral') {
      return <ViralShareScreen onComplete={() => setView('app')} />;
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-gray-100 font-sans">
      <div className="w-full max-w-md h-[100dvh] relative bg-white border-x border-gray-200 shadow-2xl flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <header className="px-6 py-4 flex items-center justify-between z-20 bg-white/80 backdrop-blur-md sticky top-0">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-gradient-to-tr from-pink-500 to-violet-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30">
                <span className="font-black text-white text-lg tracking-tighter">TR</span>
             </div>
             <span className="font-bold text-xl tracking-wide text-black">TRUTH</span>
          </div>
          
          <button className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full shadow-sm">
            <span className="text-xs font-mono text-gray-400">RANK</span>
            <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-violet-600">#4,201</span>
          </button>
        </header>

        {/* MAIN SWIPE AREA */}
        <main className="flex-1 relative w-full h-full p-4 bg-gray-50">
          <AnimatePresence>
            {!lastSwipe && (
              <SwipeCard profile={DEMO_PROFILE} onSwipe={handleSwipe} />
            )}
          </AnimatePresence>
          
          {lastSwipe && (
             <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="text-center animate-pulse">
                    <Heart className="w-12 h-12 text-pink-200 fill-pink-100 mx-auto mb-2" />
                    <p className="text-pink-400 font-bold text-sm tracking-widest">FINDING MATCH...</p>
                </div>
             </div>
          )}
        </main>

        {/* BOTTOM NAV */}
        <nav className="h-20 px-8 flex items-center justify-between pb-4 z-20 bg-white border-t border-gray-100">
          <NavIcon icon={User} />
          
          <div className="flex gap-6 items-center -mt-6">
            <ActionButton icon={X} color="text-gray-400" bg="bg-white" shadow="shadow-lg shadow-gray-200" onClick={() => handleSwipe('left')} />
            <ActionButton icon={Heart} color="text-pink-500" bg="bg-white" shadow="shadow-xl shadow-pink-200" onClick={() => handleSwipe('right')} />
          </div>
          
          <NavIcon icon={Settings} />
        </nav>

        {/* MODALS */}
        <VerificationModal 
            isOpen={showVerifyModal} 
            onClose={() => setShowVerifyModal(false)} 
            onStart={() => setView('onboarding')}
        />
        
      </div>
    </div>
  )
}

// --- NEW SCREENS ---

function LandingScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-between bg-white text-black p-6 font-sans overflow-hidden relative">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-10 -right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
         <div className="absolute top-10 -left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
         <div className="absolute -bottom-32 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-6 z-10 w-full max-w-sm mx-auto">
        
        {/* LOGO */}
        <div className="w-20 h-20 bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 rounded-[1.5rem] flex items-center justify-center shadow-[0_20px_40px_rgba(236,72,153,0.3)]">
            <span className="font-black text-white text-4xl tracking-tighter">TR</span>
        </div>
        
        {/* HEADLINE */}
        <div className="text-center space-y-2 relative z-20">
          <h1 className="text-6xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-black to-gray-600">
            TRUTH
          </h1>
          <p className="text-gray-500 text-sm font-bold tracking-tight">
            Date Higher Standards.
          </p>
        </div>

        {/* FLOATING STANDARDS ANIMATION - Compact Cloud */}
        <div className="w-full h-40 relative flex items-center justify-center z-10">
             {/* Top Row - Moved down */}
             <FloatingFilter index={0} text="Income: $250k+" color="bg-green-50 text-green-700 border-green-200" rotate="-rotate-3" x={-80} y={-35} delay={0} />
             <FloatingFilter index={1} text="Looks: Verified" color="bg-pink-50 text-pink-700 border-pink-200" rotate="rotate-2" x={70} y={-45} delay={0.1} />
             
             {/* Middle - Centered */}
             <FloatingFilter index={2} text="Height: 6'2+" color="bg-blue-50 text-blue-700 border-blue-200" rotate="-rotate-1" x={0} y={0} delay={0.2} />
             
             {/* Bottom Row - Moved up */}
             <FloatingFilter index={3} text="Age: 23" color="bg-violet-50 text-violet-700 border-violet-200" rotate="rotate-6" x={90} y={35} delay={0.3} />
             <FloatingFilter index={4} text="Role: Founder" color="bg-orange-50 text-orange-700 border-orange-200" rotate="-rotate-4" x={-85} y={30} delay={0.4} />
        </div>

        {/* STATS */}
        <div className="w-full">
            <div className="bg-white/60 backdrop-blur-md rounded-xl p-5 border border-white/50 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold tracking-wider">
                    <span className="text-gray-400">MEMBERS ONLINE</span>
                    <span className="text-black flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> 14,203</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold tracking-wider">
                    <span className="text-gray-400">AVERAGE RATING</span>
                    <span className="text-pink-500">8.9 / 10</span>
                </div>
            </div>
        </div>
      </div>

      {/* CTA */}
      <div className="z-10 w-full max-w-sm flex flex-col items-center space-y-4 pb-4">
        <button 
            onClick={onEnter}
            className="w-full bg-black text-white font-black text-xl py-5 rounded-xl hover:scale-105 transition-transform active:scale-95 tracking-wide shadow-2xl shadow-gray-300 relative overflow-hidden group"
        >
            <span className="relative z-10">GET YOUR RATING</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
        
        <p className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">
            See where you rank globally
        </p>
      </div>
    </div>
  )
}

function FloatingFilter({ text, color, rotate, x, y, delay = 0, index }: any) {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
                opacity: 1, 
                scale: 1,
                y: [y, y - 5, y],
            }}
            transition={{ 
                opacity: { duration: 0.5, delay: delay },
                scale: { duration: 0.5, delay: delay },
                y: { repeat: Infinity, duration: 2, ease: "easeInOut", delay: delay * 2 } // Bobbing animation
            }}
            className={`absolute ${color} border px-4 py-2 rounded-full text-xs font-bold shadow-sm backdrop-blur-md ${rotate}`}
            style={{ 
                zIndex: 10 - index,
                translateX: x,
                translateY: y
            }}
        >
            {text}
        </motion.div>
    )
}

function ScanningScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-white"></div>
      
      <div className="relative z-10 text-center space-y-10">
        <div className="w-40 h-40 relative mx-auto">
             <div className="absolute inset-0 border-4 border-pink-100 rounded-full"></div>
             <div className="absolute inset-0 border-t-4 border-pink-500 rounded-full animate-spin"></div>
             <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Shield className="text-pink-500 w-12 h-12" />
             </div>
        </div>

        <div className="space-y-2">
            <h2 className="text-2xl font-black text-black tracking-tight">VERIFYING...</h2>
            <p className="text-gray-400 text-sm font-medium">Checking Face ID & Socials</p>
        </div>

        <div className="text-left text-xs font-bold text-gray-400 space-y-3 bg-white p-8 rounded-3xl border border-gray-100 w-72 mx-auto shadow-xl shadow-gray-100">
            <p className="flex justify-between items-center">
                <span>FACE SYMMETRY</span> 
                <span className="text-pink-600 bg-pink-50 px-2 py-1 rounded-md">98% MATCH</span>
            </p>
            <p className="flex justify-between items-center">
                <span>INSTAGRAM</span> 
                <span className="text-pink-600 bg-pink-50 px-2 py-1 rounded-md">CONNECTED</span>
            </p>
            <p className="flex justify-between items-center">
                <span>REALITY SCORE</span> 
                <span className="text-gray-300 bg-gray-50 px-2 py-1 rounded-md animate-pulse">CALCULATING</span>
            </p>
        </div>
      </div>
    </div>
  )
}

function OnboardingFlow({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', age: '', ig: '', photo: null });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onComplete();
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-white p-6 font-sans">
      <div className="w-full max-w-sm space-y-8">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
            {[0,1,2,3].map(i => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-pink-500' : 'bg-gray-100'}`} />
            ))}
        </div>

        {step === 0 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-10">
                <h2 className="text-3xl font-black tracking-tight">First things first.</h2>
                <div className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:border-pink-500 outline-none font-bold text-lg"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                    <input 
                        type="number" 
                        placeholder="Age" 
                        className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:border-pink-500 outline-none font-bold text-lg"
                        value={formData.age}
                        onChange={e => setFormData({...formData, age: e.target.value})}
                    />
                </div>
                <button onClick={handleNext} className="w-full bg-black text-white font-bold py-4 rounded-xl shadow-xl shadow-gray-200">
                    CONTINUE
                </button>
            </div>
        )}

        {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-10">
                <h2 className="text-3xl font-black tracking-tight">Connect Socials.</h2>
                <p className="text-gray-500 text-sm">We use your Instagram to verify your photos against reality.</p>
                <div className="space-y-4">
                    <div className="relative">
                        <span className="absolute left-4 top-4 text-gray-400 font-bold">@</span>
                        <input 
                            type="text" 
                            placeholder="Instagram Handle" 
                            className="w-full p-4 pl-10 bg-gray-50 rounded-xl border border-gray-100 focus:border-pink-500 outline-none font-bold text-lg"
                            value={formData.ig}
                            onChange={e => setFormData({...formData, ig: e.target.value})}
                        />
                    </div>
                </div>
                <button onClick={handleNext} className="w-full bg-black text-white font-bold py-4 rounded-xl shadow-xl shadow-gray-200">
                    VERIFY HANDLE
                </button>
            </div>
        )}

        {step === 2 && (
             <div className="space-y-6 animate-in fade-in slide-in-from-right-10">
                <h2 className="text-3xl font-black tracking-tight">Proof of Life.</h2>
                <p className="text-gray-500 text-sm">Upload a raw selfie. No filters. Our AI detects edits instantly.</p>
                
                <div className="w-full aspect-square bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-pink-300 transition-colors">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <ScanLine className="w-8 h-8 text-gray-400" />
                    </div>
                    <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Tap to Upload</span>
                </div>

                <button onClick={handleNext} className="w-full bg-black text-white font-bold py-4 rounded-xl shadow-xl shadow-gray-200">
                    ANALYZE PHOTO
                </button>
            </div>
        )}

        {step === 3 && (
             <div className="text-center space-y-8 animate-in fade-in zoom-in duration-300">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <BadgeCheck className="w-12 h-12 text-green-600" />
                </div>
                
                <div className="space-y-2">
                    <h2 className="text-3xl font-black tracking-tight">Application Received.</h2>
                    <p className="text-gray-500 text-sm">You have been added to the Guest List.</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-2">
                    <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">YOUR POSITION</p>
                    <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-violet-600">#42,901</p>
                    <p className="text-xs text-gray-400">ETA: 4 WEEKS</p>
                </div>

                <button onClick={onComplete} className="w-full bg-white border-2 border-gray-100 text-black font-bold py-4 rounded-xl hover:bg-gray-50">
                    RETURN TO BROWSER
                </button>
            </div>
        )}
      </div>
    </div>
  )
}

// --- VIRAL SHARE SCREEN ---

function ViralShareScreen({ onComplete }: { onComplete: () => void }) {
    const handleShare = async () => {
        // In a real app, this would generate an image blob.
        // For now, we simulate the "Share" intent.
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Truth Rank',
                    text: 'I just joined TRUTH. My rank is #42,901. Get verified: https://truthdating.netlify.app',
                    url: 'https://truthdating.netlify.app'
                });
            } catch (err) {
                console.log('Share failed', err);
            }
        } else {
            alert("Screenshot this card to share on Instagram!");
        }
        // After sharing, let them in
        setTimeout(onComplete, 1000);
    };

    return (
        <div className="min-h-[100dvh] flex flex-col items-center justify-between bg-white p-6 font-sans">
            <div className="flex-1 w-full flex flex-col items-center justify-center space-y-8">
                
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black text-black tracking-tight">One last step.</h2>
                    <p className="text-gray-500 font-medium">Skip the 4-week waitlist.</p>
                </div>

                {/* THE SOCIAL ASSET (Preview) */}
                <div className="w-full max-w-xs aspect-[4/5] bg-black rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-gray-300">
                    {/* Background Noise/Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
                    <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 flex justify-between items-start">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <span className="font-black text-black text-xl">TR</span>
                        </div>
                        <span className="text-white/50 font-mono text-xs tracking-widest border border-white/20 px-2 py-1 rounded">PENDING</span>
                    </div>

                    <div className="relative z-10 space-y-2">
                        <p className="text-gray-400 text-xs font-bold tracking-widest uppercase">GLOBAL RANK</p>
                        <p className="text-5xl font-black text-white tracking-tighter">#42,901</p>
                    </div>

                    <div className="relative z-10 pt-8 border-t border-white/10">
                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase">MEMBER</p>
                                <p className="text-white font-bold">@TOM.REDD</p>
                            </div>
                            <ScanLine className="w-8 h-8 text-pink-500" />
                        </div>
                    </div>
                </div>

                <p className="text-xs text-center text-gray-400 max-w-xs">
                    Post this to your Story and tag <span className="text-black font-bold">@truth_app</span> to get instant Priority Verification.
                </p>
            </div>

            <div className="w-full max-w-sm space-y-3">
                <button 
                    onClick={handleShare}
                    className="w-full bg-gradient-to-r from-pink-600 to-violet-600 text-white font-black text-lg py-5 rounded-xl hover:scale-105 transition-transform active:scale-95 tracking-wide shadow-xl shadow-pink-200"
                >
                    SHARE TO STORY
                </button>
                <button 
                    onClick={onComplete}
                    className="w-full text-gray-400 font-bold text-xs py-4 hover:text-gray-600"
                >
                    NO THANKS, I'LL WAIT
                </button>
            </div>
        </div>
    );
}

// --- SUB COMPONENTS ---

function NavIcon({ icon: Icon }: { icon: any }) {
    return (
        <button className="p-3 text-gray-300 hover:text-pink-500 transition-colors">
            <Icon className="w-7 h-7" />
        </button>
    )
}

function ActionButton({ icon: Icon, color, bg, shadow, onClick }: any) {
    return (
        <button 
            onClick={onClick}
            className={`w-16 h-16 rounded-full ${bg} ${shadow} flex items-center justify-center transition-transform active:scale-95 border border-gray-50`}
        >
            <Icon className={`w-8 h-8 ${color}`} fill="currentColor" fillOpacity={0.1} />
        </button>
    )
}

function SwipeCard({ profile, onSwipe }: { profile: Profile, onSwipe: (d: 'left'|'right') => void }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  // Color feedback on swipe
  const border = useTransform(x, [-200, 0, 200], ["rgba(239, 68, 68, 0.5)", "rgba(0,0,0,0)", "rgba(236, 72, 153, 0.5)"]);

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
        className="w-full h-full rounded-[2.5rem] overflow-hidden relative border border-gray-100 shadow-2xl bg-white"
      >
        {/* Verification Shield */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
           <div className="bg-white/80 backdrop-blur-md border border-pink-200 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
              <Shield className="w-3 h-3 text-pink-500 fill-pink-500" />
              <span className="text-[10px] font-bold text-pink-600 tracking-wider font-mono">VERIFIED LVL 2</span>
           </div>
        </div>

        {/* Image */}
        <img src={profile.image} className="w-full h-full object-cover pointer-events-none select-none" />
        
        {/* Gradient Overlay - Lighter for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        {/* Profile Details */}
        <div className="absolute bottom-0 w-full p-6 pb-8 pointer-events-none">
          <h2 className="text-4xl font-black tracking-tight mb-1 flex items-center gap-2 text-white drop-shadow-xl">
            {profile.name}, {profile.age} 
            <BadgeCheck className="w-7 h-7 text-blue-400 fill-blue-400/20" />
          </h2>
          <p className="text-sm text-gray-200 font-medium mb-6 flex items-center gap-1 opacity-90">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block shadow-[0_0_10px_#4ade80]"></span>
            Active Now • {profile.location}
          </p>

          {/* THE TRUTH MATRIX - Light/Glassmorphism */}
          <div className="grid grid-cols-3 gap-2">
            <StatCard icon={Ruler} label="Height" value={profile.height} color="text-blue-300" />
            <StatCard icon={DollarSign} label="Income" value={profile.income} color="text-yellow-300" />
            <StatCard icon={Calendar} label="Last Verified" value="2h ago" color="text-pink-300" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 text-center shadow-lg">
      <Icon className={`w-4 h-4 mx-auto mb-1.5 ${color}`} />
      <div className="text-[9px] text-gray-300 uppercase tracking-widest font-bold mb-0.5 opacity-80">{label}</div>
      <div className="text-sm font-bold text-white font-mono">{value}</div>
    </div>
  );
}

function VerificationModal({ isOpen, onClose, onStart }: { isOpen: boolean, onClose: () => void, onStart: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white border border-gray-100 rounded-[2.5rem] p-8 text-center relative overflow-hidden shadow-2xl">
        
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors z-20">
            <X className="w-6 h-6" />
        </button>

        {/* Glow Effect */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-pink-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-violet-100 rounded-full blur-3xl opacity-50"></div>

        <div className="w-20 h-20 bg-gradient-to-tr from-pink-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-lg shadow-pink-200">
          <div className="absolute inset-0 border-2 border-pink-200 rounded-full animate-ping opacity-20"></div>
          <ScanLine className="w-10 h-10 text-white" />
        </div>
        
        <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight relative z-10">VERIFY TO MATCH</h3>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed relative z-10">
          Sarah is a <span className="text-pink-600 font-bold bg-pink-50 px-1 rounded">Tier 1 Verified</span> user. 
          To message her, you must verify your identity.
        </p>

        <div className="space-y-3 text-left text-xs font-bold text-gray-500 mb-8 bg-gray-50 p-5 rounded-2xl border border-gray-100 relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-green-500 bg-green-100 rounded-full p-0.5"><BadgeCheck className="w-3 h-3" /></span> <span>Biometric Mesh:</span> <span className="text-black ml-auto">MATCH</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-500 bg-green-100 rounded-full p-0.5"><BadgeCheck className="w-3 h-3" /></span> <span>Liveness Check:</span> <span className="text-black ml-auto">PASSED</span>
          </div>
          <div className="flex items-center gap-3 animate-pulse">
             <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
             <span className="text-pink-600">Analyzing Social Graph...</span>
          </div>
        </div>

        <button 
            onClick={onStart}
            className="w-full bg-black text-white font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform relative z-10 shadow-xl shadow-gray-200"
        >
            START VERIFICATION
        </button>
        <p className="mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest relative z-10">Takes 30 seconds</p>
      </div>
    </div>
  );
}