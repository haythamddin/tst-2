# Visual Enhancements & QA Plan

## Visual Polish
- [ ] **Typography**: Verify font loading and hierarchy. Ensure headings use `Source Sans Pro` and body uses `Inter`. Increase contrast for secondary text.
- [ ] **Shadows & Depth**: Update card shadows to be softer and more diffuse (e.g., `shadow-[0_8px_30px_rgb(0,0,0,0.04)]`).
- [ ] **Buttons**: Add subtle hover lift and shadow to primary "Coral" buttons.
- [ ] **Gradients**: Add a very subtle background gradient to the main app container to break the flat white/gray monotony.
- [ ] **Borders**: Ensure all cards have a subtle border (`border-slate-100`) for better definition on light backgrounds.

## Component Specifics
- [ ] **Landing Page**: Enhance the "Upload Zone" with a subtle pulse animation on hover. Make "Recent Collections" cards pop more.
- [ ] **Processing Screen**: Add a "glow" effect to the active progress bar.
- [ ] **Enrichment Screen**: Improve the "Card Flip" animation smoothness.
- [ ] **Export Screen**: Polish the ROI banner (better icon alignment, maybe a subtle pattern background).

## QA Checks
- [ ] **Responsive**: Check basic responsiveness (though desktop-first is the goal, it shouldn't break on smaller laptop screens).
- [ ] **Console Errors**: Check for any React warnings or errors.
- [ ] **Navigation**: Verify all "Back" buttons (if any) or navigation links work.
