import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthProvider, useAuth, usePermissions } from '../AuthContext';

// Mock component to use the context
const TestComponent = () => {
    const { user, login, logout, updateUserRole } = useAuth();
    const { hasPermission } = usePermissions();

    return (
        <div>
            <div data-testid="user">{user ? JSON.stringify(user) : 'null'}</div>
            <div data-testid="can-view-dashboard">{hasPermission('view_host_dashboard') ? 'yes' : 'no'}</div>
            <button onClick={() => login('fake-token', { name: 'Test User', role: 'tenant', permissions: ['view_bookings'] })}>Login</button>
            <button onClick={() => logout()}>Logout</button>
            <button onClick={() => updateUserRole('host')}>Update Role</button>
        </div>
    );
};

describe('AuthContext', () => {
    // Restore fetch mock after each test
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should have a null user initially', () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );
        expect(screen.getByTestId('user')).toHaveTextContent('null');
    });

    it('should allow a user to log in', () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        act(() => {
            screen.getByText('Login').click();
        });

        expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify({ name: 'Test User', role: 'tenant', permissions: ['view_bookings'] }));
    });

    it('should allow a user to log out', () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        act(() => {
            screen.getByText('Login').click();
        });

        expect(screen.getByTestId('user')).not.toHaveTextContent('null');

        act(() => {
            screen.getByText('Logout').click();
        });

        expect(screen.getByTestId('user')).toHaveTextContent('null');
    });

    it('should update user role on successful API call', async () => {
        // Mock fetch
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ user: { name: 'Test User', role: 'host', permissions: ['view_host_dashboard'] } }),
            })
        );

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        // Login first
        act(() => {
            screen.getByText('Login').click();
        });

        // Update role
        await act(async () => {
            screen.getByText('Update Role').click();
        });

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/api/me/role', expect.any(Object));
        expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify({ name: 'Test User', role: 'host', permissions: ['view_host_dashboard'] }));
    });

    it('should check permissions correctly', () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        // Initially, no permission
        expect(screen.getByTestId('can-view-dashboard')).toHaveTextContent('no');

        // Login with a different role
        act(() => {
            screen.getByText('Login').click();
        });

        // Still no permission for dashboard
        expect(screen.getByTestId('can-view-dashboard')).toHaveTextContent('no');

        // Update role to host, which should grant permission
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ user: { name: 'Test User', role: 'host', permissions: ['view_host_dashboard'] } }),
            })
        );

        await act(async () => {
            screen.getByText('Update Role').click();
        });

        // Now should have permission
        expect(screen.getByTestId('can-view-dashboard')).toHaveTextContent('yes');
    });
});