import React, { useState } from "react";

const statusOptions = [
    { value: "", label: "Tümü" },
    { value: "pending", label: "Bekliyor" },
    { value: "in_progress", label: "Devam Ediyor" },
    { value: "completed", label: "Tamamlandı" },
];

const sortOptions = [
    { value: "created_at", label: "Oluşturulma Tarihi" },
    { value: "due_date", label: "Bitiş Tarihi" },
    { value: "priority", label: "Öncelik" },
];

const TodoFilter = ({ onFilter }) => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("created_at");
    const [order, setOrder] = useState("asc");

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({ search, status, sort, order });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end mb-6">
            <div>
                <label className="block text-sm font-medium mb-1">Ara</label>
                <input
                    type="text"
                    className="input"
                    placeholder="Başlık veya açıklama..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Durum</label>
                <select
                    className="input"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                >
                    {statusOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Sırala</label>
                <select
                    className="input"
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                >
                    {sortOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Yön</label>
                <select
                    className="input"
                    value={order}
                    onChange={e => setOrder(e.target.value)}
                >
                    <option value="asc">Artan</option>
                    <option value="desc">Azalan</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary h-10">Filtrele</button>
        </form>
    );
};

export default TodoFilter;
