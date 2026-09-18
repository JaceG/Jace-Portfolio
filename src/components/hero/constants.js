// Shared between the Hero's scroll controller (JS) and the home page layout
// (CSS spacer / anchor), so the pinned distances stay in sync.

/** Height of the sticky site nav the hero sits beneath, in px. */
export const NAV_HEIGHT = 64;

/** Scroll distance, in viewport heights, over which the hero fizzles out. */
export const FIZZLE_VH = 1.8;

/**
 * Scroll distance, in viewport heights, that the Me section stays pinned
 * after the hero is gone before the page scrolls on.
 */
export const HOLD_VH = 0.6;
