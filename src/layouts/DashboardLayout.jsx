import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
    Flame,
    Truck,
    Wrench,
    ShieldUser,
    Package,
    ShoppingCart,
    Users,
    FileText,
    BarChart3,
    Menu,
    X,
    Bell,
    Search,
    UserCircle
} from 'lucide-react';
import './DashboardLayout.css';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', path: '/', icon: BarChart3 },
        { name: 'Viaturas', path: '/viaturas', icon: Truck },
        { name: 'Manutenção', path: '/manutencao', icon: Wrench },
        { name: 'EPI', path: '/epi', icon: ShieldUser },
        { name: 'Almoxarifado', path: '/almoxarifado', icon: Package },
        { name: 'Compras', path: '/compras', icon: ShoppingCart },
        { name: 'Fornecedores', path: '/fornecedores', icon: Users },
        { name: 'Documentos', path: '/documentos', icon: FileText },
    ];

    return (
        <div className="dashboard-container">
            {/* Mobile Sidebar Overlay */}
            <div
                className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Sidebar */}
            <aside className={`sidebar glass-panel ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="logo-container">
                        <div className="logo-image">
                            <img src="/src/assets/logo-bombeiros.png" alt="Logo CBMMT" style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
                        </div>
                        <div className="logo-text">
                            <h2>SIGSSM</h2>
                            <span className="unit-name">13ªCIBM - João Alfaro Duarte</span>
                            <span className="section-name">Seção de Suprimento e Manutenção</span>
                        </div>
                    </div>
                    <button className="mobile-close" onClick={() => setSidebarOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <ul>
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <Icon size={20} className="nav-icon" />
                                        <span>{item.name}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile">
                        <UserCircle size={36} className="text-muted" />
                        <div className="user-info">
                            <p className="user-name">Sgt. Padrão</p>
                            <p className="user-role">Chefe Suprimento</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                {/* Header */}
                <header className="top-header glass-panel">
                    <div className="header-left">
                        <button className="menu-toggle" onClick={() => setSidebarOpen(true)}>
                            <Menu size={24} />
                        </button>
                        <div className="search-bar">
                            <Search size={18} className="search-icon" />
                            <input type="text" placeholder="Buscar no sistema..." />
                        </div>
                    </div>

                    <div className="header-right">
                        <button className="header-btn notification-btn">
                            <Bell size={20} />
                            <span className="badge">3</span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="page-content animate-fade-in">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
