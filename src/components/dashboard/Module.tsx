interface ModuleProps {
    title: string;
    description: string;
    color: string; // e.g., "bg-orange-500"
    icon: React.ReactNode;
    children: React.ReactNode;
}

export function Module({ title, description, color, icon, children }: ModuleProps) {
    return (
        <div className="mb-12 relative">
            {/* Module Header */}
            <div className={`${color} text-white p-6 rounded-t-3xl rounded-b-lg shadow-lg mb-8 relative overflow-hidden`}>
                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold font-fredoka">{title}</h2>
                        <p className="text-white/90 font-outfit">{description}</p>
                    </div>
                    <div className="text-5xl opacity-90">
                        {icon}
                    </div>
                </div>

                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full -ml-10 -mb-10 blur-xl" />
            </div>

            {/* Path Container */}
            <div className="relative px-4 pb-8">
                {children}
            </div>
        </div>
    );
}
