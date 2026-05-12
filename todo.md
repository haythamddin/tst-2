# Refinement Plan (Auto-Advancing Flow)

## Design System Updates
- [ ] **Global**: Ensure all primary CTAs and progress bars use Coral `#E85D4C`
- [ ] **Global**: Implement smooth fade-out/fade-in + slide-up transitions between screens

## Screen-Specific Updates

### 1. Landing Page (`/`)
- [ ] Update value prop text
- [ ] Add "Watch Sample Demo" button (Coral, play icon)
- [ ] Update "Process Documents" button to Coral
- [ ] Ensure both buttons trigger the same flow

### 2. Processing Screen (`/processing`)
- [ ] Add confidence percentages to extraction stream
- [ ] Color code icons and percentages (Green >85%, Amber 70-84%, Grey <70%)
- [ ] Make progress bars Coral and thicker (6px)
- [ ] Implement auto-advance after 5 seconds

### 3. NEW Success Modal (Intermediate Screen)
- [ ] Create new component/route for Extraction Success
- [ ] Implement modal overlay with stats
- [ ] Auto-advance after 3 seconds to Visual Intelligence

### 4. Visual Intelligence Screen (`/visual-intelligence`)
- [ ] Rewrite attention banner with specific error (Elastane vs Polyester)
- [ ] Add confidence scores to the left panel (Extracted Data)
- [ ] Update "Continue to Review" button to Coral

### 5. Validation Screen (`/validation`)
- [ ] Replace text input with Dropdown for "Fabric Composition"
- [ ] Show confidence scores for each suggestion
- [ ] Make bulk apply checkbox prominent
- [ ] Update "Approve & Continue" button to Coral

### 6. Enrichment Screen (`/enrichment`)
- [ ] Add processing progress bar at top (Amber bg, Coral bar)
- [ ] Enhance compliance section with detailed results
- [ ] Implement auto-advance after 4 seconds to Export

### 7. Export Screen (`/export`)
- [ ] Add celebration banner at top with ROI metrics
- [ ] Make "Push to Akeneo Now" button Coral and large
- [ ] Update "View Analytics Dashboard" button to Coral

### 8. NEW Export Success Screen (Intermediate Screen)
- [ ] Create new component/route for Export Success
- [ ] Show "50 products synced" message with Green checkmark
- [ ] Auto-advance after 2 seconds to Analytics

### 9. Analytics Screen (`/analytics`)
- [ ] Ensure consistent styling (Coral accents)

## Testing
- [ ] Verify full auto-advancing flow timings (2-3 mins total)
- [ ] Check all transitions
- [ ] Verify mock data consistency
