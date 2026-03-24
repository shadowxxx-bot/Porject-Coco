import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type UserRole = 'cofounder' | 'entrepreneur';

interface ThemeColors {
  primary: string;
  primaryHover: string;
  accent: string;
  bg: string;
  text: string;
  textSecondary: string;
  primaryRgb: string;
}

const cofounderColors: ThemeColors = {
  primary: '#E8894A',
  primaryHover: '#D67835',
  accent: '#3D2314',
  bg: '#FFF8F2',
  text: '#3D2314',
  textSecondary: '#6B5B52',
  primaryRgb: '232,137,74',
};

const entrepreneurColors: ThemeColors = {
  primary: '#3D2314',
  primaryHover: '#2A1810',
  accent: '#E8894A',
  bg: '#FFF8F2',
  text: '#3D2314',
  textSecondary: '#6B5B52',
  primaryRgb: '61,35,20',
};

interface ThemeContextType {
  role: UserRole;
  colors: ThemeColors;
  setRole: (role: UserRole) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  role: 'cofounder',
  colors: cofounderColors,
  setRole: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem('coco_user_role') as UserRole) || 'cofounder';
  });

  const setRole = (newRole: UserRole) => {
    localStorage.setItem('coco_user_role', newRole);
    setRoleState(newRole);
  };

  const colors = role === 'entrepreneur' ? entrepreneurColors : cofounderColors;

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-primary-hover', colors.primaryHover);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-primary-rgb', colors.primaryRgb);
  }, [colors]);

  return (
    <ThemeContext.Provider value={{ role, colors, setRole }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
