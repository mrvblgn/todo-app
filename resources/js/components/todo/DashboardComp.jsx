import React, { useEffect, useState } from "react";
import { getTodosByStatus, getAllTodos, updateTodoStatus, getTodosByPriority } from "@/services/todoService";

const DashboardComp = () => {
    const [stats, setStats] = useState([]);
    const [priorityStats, setPriorityStats] = useState([]);
    const [upcomingTodos, setUpcomingTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatsAndTodos = async () => {
            try {
                const statsRes = await getTodosByStatus();
                if (statsRes.status === "success") setStats(statsRes.data);

                const priorityRes = await getTodosByPriority();
                if(priorityRes.status === "success") setPriorityStats(priorityRes.data);

                // Yaklaşan bitiş tarihli todo'lar
                const todosRes = await getAllTodos({ due_soon: true });
                if (todosRes.status === "success") setUpcomingTodos(todosRes.data);
            } catch (err) {
                setError("Failed to fetch dashboard data");
            } finally {
                setLoading(false);
            }
        };
        fetchStatsAndTodos();
    }, []);

    // Hızlı durum değiştirme
    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateTodoStatus(id, newStatus);
            setUpcomingTodos(todos =>
                todos.map(todo =>
                    todo.id === id ? { ...todo, status: newStatus } : todo
                )
            );
        } catch (err) {
            alert("Durum güncellenemedi!");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            {/* Özet istatistikler */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {stats.map(stat => (
                    <div key={stat.status} className="p-4 bg-gray-100 rounded shadow text-center">
                        <div className="text-lg font-semibold">{stat.status}</div>
                        <div className="text-2xl font-bold">{stat.count}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {priorityStats.map(stat => (
                    <div key={stat.priorities} className="p-4 bg-gray-100 rounded shadow text-center">
                        <div className="text-lg font-semibold">{stat.priorities}</div>
                        <div className="text-2xl font-bold">{stat.count}</div>
                    </div>
                ))}
            </div>

            {/* Yaklaşan bitiş tarihli todo'lar */}
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Yaklaşan Bitiş Tarihli Todo'lar</h2>
                {upcomingTodos.length === 0 ? (
                    <div>Yaklaşan todo yok.</div>
                ) : (
                    <ul className="space-y-2">
                        {upcomingTodos.map(todo => (
                            <li key={todo.id} className="p-3 bg-white rounded shadow flex justify-between items-center">
                                <div>
                                    <div className="font-medium">{todo.title}</div>
                                    <div className="text-gray-500 text-sm">Bitiş: {todo.due_date}</div>
                                </div>
                                <select
                                    value={todo.status}
                                    onChange={e => handleStatusChange(todo.id, e.target.value)}
                                    className="border rounded px-2 py-1"
                                >
                                    <option value="pending">Bekliyor</option>
                                    <option value="in_progress">Devam Ediyor</option>
                                    <option value="completed">Tamamlandı</option>
                                    <option value="cancelled">İptal Edildi</option>
                                </select>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DashboardComp;