import { WindowName, WindowPosition, WindowSize } from './types';

// Size presets
export type SizePreset = 'small' | 'medium' | 'large' | 'fullscreen' | 'custom';
export type PositionPreset = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'center' | 'custom';

export interface WindowConfigItem {
    size: SizePreset;
    position: PositionPreset;
    customSize?: { width: number; height: number };
    customPosition?: { x: number; y: number };
    responsive?: boolean; // If true, recalculate on window resize
}

// Centralized window configurations
export const WINDOW_CONFIGS: Record<WindowName, WindowConfigItem> = {
    about: {
        size: 'small',
        position: 'topLeft',
        customPosition: { x: 50, y: 50 },
    },
    projects: {
        size: 'medium',
        position: 'custom',
        customPosition: { x: 50, y: 350 },
    },
    resume: {
        size: 'small',
        position: 'custom',
        customPosition: { x: 150, y: 150 },
    },
    contact: {
        size: 'medium',
        position: 'topRight',
        customPosition: { x: 1300, y: 50 },
    },
    cv: {
        size: 'medium',
        position: 'custom',
        customSize: { width: 700, height: 500 },
        customPosition: { x: 500, y: 50 },
    },
    contract: {
        size: 'medium',
        position: 'custom',
        customPosition: { x: 50, y: 80 },
    },
    pdf: {
        size: 'custom',
        position: 'custom',
        customSize: { width: 600, height: 800 },
        customPosition: { x: 300, y: 120 },
    },
    lafleur: {
        size: 'large',
        position: 'bottomRight',
        customPosition: { x: 50, y: 80 },
        responsive: true,
    },
};

// Size preset values (in pixels for fixed, percentages for responsive)
const SIZE_PRESETS: Record<SizePreset, { width: number; height: number }> = {
    small: { width: 400, height: 300 },
    medium: { width: 600, height: 500 },
    large: { width: 0.8, height: 0.85 }, // 80% width, 85% height (will be calculated)
    fullscreen: { width: 0.95, height: 0.95 }, // 95% width, 95% height
    custom: { width: 0, height: 0 }, // Will use customSize
};

/**
 * Calculate window size based on preset or custom configuration
 */
export function calculateWindowSize(
    config: WindowConfigItem,
    viewportWidth: number,
    viewportHeight: number
): WindowSize {
    // Use custom size if provided
    if (config.size === 'custom' && config.customSize) {
        return config.customSize;
    }

    const preset = SIZE_PRESETS[config.size];

    // For large/fullscreen, calculate based on viewport
    if (config.size === 'large' || config.size === 'fullscreen') {
        return {
            width: Math.floor(viewportWidth * preset.width),
            height: Math.floor(viewportHeight * preset.height),
        };
    }

    // For fixed sizes
    return preset;
}

/**
 * Calculate window position based on preset or custom configuration
 */
export function calculateWindowPosition(
    config: WindowConfigItem,
    windowSize: WindowSize,
    viewportWidth: number,
    viewportHeight: number
): WindowPosition {
    // Use custom position if provided
    if (config.position === 'custom' && config.customPosition) {
        return config.customPosition;
    }

    const padding = 50;

    switch (config.position) {
        case 'topLeft':
            return { x: padding, y: padding };

        case 'topRight':
            return {
                x: viewportWidth - windowSize.width - padding,
                y: padding
            };

        case 'bottomLeft':
            return {
                x: padding,
                y: viewportHeight - windowSize.height - padding
            };

        case 'bottomRight':
            return {
                x: viewportWidth - windowSize.width - padding,
                y: viewportHeight - windowSize.height - padding
            };

        case 'center':
            return {
                x: Math.floor((viewportWidth - windowSize.width) / 2),
                y: Math.floor((viewportHeight - windowSize.height) / 2),
            };

        default:
            return { x: padding, y: padding };
    }
}

/**
 * Initialize all window sizes and positions based on configuration
 */
export function initializeWindowLayout(
    viewportWidth: number,
    viewportHeight: number
): {
    sizes: Record<WindowName, WindowSize>;
    positions: Record<WindowName, WindowPosition>;
} {
    const sizes: Partial<Record<WindowName, WindowSize>> = {};
    const positions: Partial<Record<WindowName, WindowPosition>> = {};

    (Object.keys(WINDOW_CONFIGS) as WindowName[]).forEach((windowName) => {
        const config = WINDOW_CONFIGS[windowName];
        const size = calculateWindowSize(config, viewportWidth, viewportHeight);
        const position = calculateWindowPosition(config, size, viewportWidth, viewportHeight);

        sizes[windowName] = size;
        positions[windowName] = position;
    });

    return {
        sizes: sizes as Record<WindowName, WindowSize>,
        positions: positions as Record<WindowName, WindowPosition>,
    };
}

/**
 * Get list of windows that should be responsive (recalculate on resize)
 */
export function getResponsiveWindows(): WindowName[] {
    return (Object.keys(WINDOW_CONFIGS) as WindowName[]).filter(
        (windowName) => WINDOW_CONFIGS[windowName].responsive
    );
}
