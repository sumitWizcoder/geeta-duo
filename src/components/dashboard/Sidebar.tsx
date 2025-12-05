import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Trophy, Store, User, MoreHorizontal, Shield } from 'lucide-react';


export function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { icon: Home, label: 'Learn', path: '/dashboard', color: 'text-blue-500' },
        { icon: Trophy, label: 'Leaderboards', path: '/leaderboard', color: 'text-yellow-500' },
        { icon: Shield, label: 'Quests', path: '/quests', color: 'text-orange-500' },
        { icon: Store, label: 'Shop', path: '/shop', color: 'text-purple-500' },
        { icon: User, label: 'Profile', path: '/settings', color: 'text-pink-500' },
        { icon: MoreHorizontal, label: 'More', path: '/more', color: 'text-stone-500' },
    ];

    return (
        <div className="hidden md:flex flex-col w-[256px] h-screen border-r-2 border-stone-200 bg-white fixed left-0 top-0 p-4 z-50">
            {/* Logo */}
            <div className="mb-8 px-4">
                <h1 className="text-3xl font-bold text-orange-500 font-fredoka tracking-wide">
                    Gita<span className="text-stone-700">Quest</span>
                </h1>
            </div>

            {/* Menu */}
            <nav className="space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group
                                ${isActive
                                    ? 'bg-blue-50 border-2 border-blue-200 text-blue-500'
                                    : 'hover:bg-stone-100 text-stone-500'
                                }`}
                        >
                            <item.icon
                                className={`w-7 h-7 ${isActive ? item.color : 'text-stone-400 group-hover:text-stone-600'}`}
                                strokeWidth={2.5}
                            />
                            <span className={`font-bold text-sm uppercase tracking-wider ${isActive ? item.color : ''}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}
