import React, { createContext, useState, useContext } from 'react';

const HeaderContext = createContext();

function ThemeProvider({ children }) {
    const [isReload, setiIsReload] = useState(0);

    return (
        <HeaderContext.Provider
            value={{
                isReload,
                setiIsReload,
            }}
        >
            {children}
        </HeaderContext.Provider>
    );
}

export default ThemeProvider;

export const useTheme = () => useContext(HeaderContext);
