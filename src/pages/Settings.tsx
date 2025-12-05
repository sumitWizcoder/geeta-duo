import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';
import { Button } from '../components/ui/Button';
import { ConfirmationModal } from '../components/ui/ConfirmationModal';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';

export function Settings() {
    const navigate = useNavigate();
    const { profile, settings, setProfile, setSettings, resetProgress } = useGameStore();

    const [name, setName] = useState(profile.name);
    const [username, setUsername] = useState(profile.username || '');
    const [showResetModal, setShowResetModal] = useState(false);

    const handleSave = () => {
        setProfile({ name, username });
        navigate('/dashboard');
    };

    const handleResetProfile = () => {
        resetProgress();
        setShowResetModal(false);
        navigate('/'); // Go back to welcome screen
    };

    return (
        <div className="min-h-screen bg-[#FFFDF5] p-4 md:p-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="p-2 rounded-full hover:bg-stone-100 transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6 text-stone-600" />
                    </button>
                    <h1 className="text-3xl font-bold text-stone-800 font-fredoka">Settings</h1>
                </div>

                <div className="space-y-8">
                    {/* Profile Section */}
                    <section className="bg-white p-6 rounded-3xl shadow-sm border-2 border-stone-100">
                        <h2 className="text-xl font-bold text-stone-700 mb-6 font-fredoka">Profile</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-stone-500 mb-2 font-outfit">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-4 rounded-xl border-2 border-stone-200 focus:border-orange-400 focus:outline-none font-bold text-stone-700 bg-stone-50"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-stone-500 mb-2 font-outfit">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-4 rounded-xl border-2 border-stone-200 focus:border-orange-400 focus:outline-none font-bold text-stone-700 bg-stone-50"
                                    placeholder="@username"
                                    disabled
                                />
                            </div>

                            <Button onClick={handleSave} className="w-full mt-4">
                                <Save className="w-5 h-5 mr-2" />
                                Save Changes
                            </Button>
                        </div>
                    </section>

                    {/* Game Settings */}
                    <section className="bg-white p-6 rounded-3xl shadow-sm border-2 border-stone-100">
                        <h2 className="text-xl font-bold text-stone-700 mb-6 font-fredoka">Preferences</h2>

                        <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl">
                            <span className="font-bold text-stone-600">Sound Effects</span>
                            <button
                                onClick={() => setSettings({ soundEnabled: !settings.soundEnabled })}
                                className={`w-14 h-8 rounded-full transition-colors relative ${settings.soundEnabled ? 'bg-green-500' : 'bg-stone-300'
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform shadow-sm ${settings.soundEnabled ? 'left-7' : 'left-1'
                                        }`}
                                />
                            </button>
                        </div>
                    </section>

                    {/* Danger Zone */}
                    <section className="bg-red-50 p-6 rounded-3xl border-2 border-red-100">
                        <h2 className="text-xl font-bold text-red-700 mb-2 font-fredoka">Danger Zone</h2>
                        <p className="text-red-600/80 mb-6 text-sm">
                            Resetting your profile will wipe all progress, XP, and badges. This action cannot be undone.
                        </p>

                        <Button
                            variant="primary"
                            onClick={() => setShowResetModal(true)}
                            className="w-full !bg-red-500 !border-red-600 hover:!bg-red-600"
                        >
                            <Trash2 className="w-5 h-5 mr-2" />
                            Reset All Progress
                        </Button>
                    </section>
                </div>
            </div>

            <ConfirmationModal
                isOpen={showResetModal}
                title="Reset Profile?"
                message="Are you sure you want to reset your entire profile? You will lose all XP, badges, and progress. This cannot be undone."
                confirmLabel="Yes, Reset Everything"
                onConfirm={handleResetProfile}
                onCancel={() => setShowResetModal(false)}
                isDanger={true}
            />
        </div>
    );
}
