import { Github, Twitter, Send, MessageSquare, Box, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface EditProfileProps {
  socialVisibility?: Record<string, boolean>;
  setSocialVisibility?: (val: Record<string, boolean>) => void;
  personalName?: string;
  setPersonalName?: (val: string) => void;
}

export function EditProfile({ socialVisibility = {}, setSocialVisibility, personalName = '0xA199...a1bD', setPersonalName }: EditProfileProps) {
  const [nameInput, setNameInput] = useState(personalName);
  const [isSaved, setIsSaved] = useState(false);

  const toggleVisibility = (key: string) => {
    if (setSocialVisibility) {
      setSocialVisibility({ ...socialVisibility, [key]: !socialVisibility[key] });
    }
  };

  const handleSaveName = () => {
    if (setPersonalName) {
      setPersonalName(nameInput);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const socials = [
    { id: 'twitter', name: 'X (Formerly Twitter)', icon: Twitter, connected: true },
    { id: 'discord', name: 'Discord', icon: MessageSquare, connected: true },
    { id: 'telegram', name: 'Telegram', icon: Send, connected: true },
    { id: 'github', name: 'Github', icon: Github, connected: false },
    { id: 'farcaster', name: 'Farcaster', icon: Box, connected: true },
  ];

  return (
    <div className="flex-1 overflow-y-auto scroll-smooth scrollbar-hide pb-20 pt-12">
      <div className="max-w-4xl mx-auto px-8">
        {/* Header Card */}
        <div className="bg-white dark:bg-[#101114] border border-gray-200 dark:border-white/5 rounded-2xl p-6 flex items-center justify-between mb-12 shadow-sm dark:shadow-none transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-white dark:border-[#101114] bg-gradient-to-br from-pink-500 to-orange-400 overflow-hidden relative">
              <div className="absolute inset-0 opacity-50" style={{
                backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
                backgroundSize: '10px 10px',
                backgroundPosition: '0 0, 5px 5px'
              }} />
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">{personalName}</div>
          </div>
          <button className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
            Change Photo
          </button>
        </div>

        {/* Personal Name Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Personal Name</h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="eg: Satoshi Nakamoto"
              className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
            <button
              onClick={handleSaveName}
              className="bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-900 dark:text-white font-semibold px-8 py-3 rounded-xl transition-colors min-w-[120px]"
            >
              {isSaved ? 'Saved!' : 'Save'}
            </button>
          </div>
        </div>

        {/* Addresses Sections */}
        <div className="space-y-10 mb-12">
          {/* EVM */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                EVM Addresses <span className="text-sm font-normal text-gray-500">(1 / 15)</span>
              </h2>
              <button className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
                Connect Wallet
              </button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full bg-yellow-400" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900 dark:text-white text-sm">Primary address</span>
                    <span className="text-[10px] font-medium text-gray-500 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-full">Default EVM</span>
                  </div>
                  <div className="text-sm text-gray-500">0xA199...a1bD</div>
                </div>
              </div>
              <button className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
                Edit
              </button>
            </div>
          </div>

          {/* Solana */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Solana Addresses <span className="text-sm font-normal text-gray-500">(0 / 15)</span>
              </h2>
              <button className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
                Connect Wallet
              </button>
            </div>
          </div>

          {/* Bitcoin */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Bitcoin Addresses <span className="text-sm font-normal text-gray-500">(0 / 15)</span>
              </h2>
              <button className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
                Connect Wallet
              </button>
            </div>
          </div>

          {/* Cosmos */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Cosmos Addresses <span className="text-sm font-normal text-gray-500">(0 / 15)</span>
              </h2>
              <button className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>

        {/* Social Profiles */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Social Profiles</h2>
          <div className="flex flex-col">
            {socials.map((s) => (
              <div key={s.id} className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <s.icon className="w-5 h-5 text-gray-900 dark:text-white" />
                  <span className="font-bold text-gray-900 dark:text-white">{s.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  {s.connected && (
                    <button
                      onClick={() => toggleVisibility(s.id)}
                      className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                        socialVisibility[s.id] ? 'text-green-500 hover:text-green-600' : 'text-gray-400 hover:text-gray-500'
                      }`}
                    >
                      {socialVisibility[s.id] ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      {socialVisibility[s.id] ? 'Visible' : 'Hidden'}
                    </button>
                  )}
                  <button className={`text-sm font-semibold px-4 py-2 rounded-xl transition-colors ${
                    s.connected
                      ? 'bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}>
                    {s.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
