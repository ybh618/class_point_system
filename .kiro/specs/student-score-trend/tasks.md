# Implementation Plan

- [ ] 1. Set up testing infrastructure
  - [ ] 1.1 Install testing dependencies (vitest, fast-check)
    - Add vitest and fast-check to devDependencies
    - Create vitest.config.ts configuration file
    - Create `tests/` directory structure
    - _Requirements: Testing Strategy in Design_

- [ ] 2. Create trend data calculation module
  - [ ] 2.1 Create `src/lib/trend_queries.ts` with interfaces and helper functions
    - Define `TrendDataPoint`, `DailyPointsRow`, `DailyPointsSummary` interfaces
    - Implement `calculateQuartiles(values: number[])` function for Q1, median, Q3 calculation
    - Implement `calculateCumulativePoints(records: DailyPointsRow[], studentId: number)` function
    - _Requirements: 2.2, 4.4_
  - [ ]* 2.2 Write property test for quartile calculation
    - **Property 3: Quartile Ordering Invariant**
    - **Validates: Requirements 4.4**
  - [ ]* 2.3 Write property test for cumulative points calculation
    - **Property 1: Cumulative Points Calculation Correctness**
    - **Validates: Requirements 2.2**

- [ ] 3. Implement trend data query functions
  - [ ] 3.1 Add `fetchClassDailyPoints()` function to query daily points for all students in a class
    - Query points_records grouped by date and student_id
    - Support optional date range filtering
    - _Requirements: 3.2, 6.2_
  - [ ] 3.2 Add `calculateTrendData()` function to compute full trend statistics
    - Calculate cumulative points for target student
    - Calculate class average, Q1, median, Q3 for each date
    - Return array of TrendDataPoint objects
    - _Requirements: 2.2, 3.2, 4.4_
  - [ ]* 3.3 Write property test for class average calculation
    - **Property 2: Class Average Calculation Correctness**
    - **Validates: Requirements 3.2**
  - [ ]* 3.4 Write property test for date range filtering
    - **Property 4: Date Range Filter Correctness**
    - **Validates: Requirements 6.2**

- [ ] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Create student trend route handler
  - [ ] 5.1 Add `GET /rankings/:studentId/trend` route in `src/routes/rankings.ts`
    - Parse studentId from URL params
    - Parse optional start_date and end_date query params
    - Fetch student data using existing `fetchStudentsWithStats()`
    - Return 404 if student not found
    - _Requirements: 1.1, 1.2_
  - [ ] 5.2 Integrate trend data calculation into route handler
    - Call `fetchClassDailyPoints()` with student's class_name
    - Call `calculateTrendData()` to get trend statistics
    - Pass data to template context
    - _Requirements: 2.2, 3.2, 4.4, 6.2_

- [ ] 6. Create student trend page template
  - [ ] 6.1 Create `templates/student_trend.html` template
    - Extend base.html layout
    - Add breadcrumb navigation (Rankings > Student Name)
    - Display student basic info card (name, student_id, class_name)
    - Add date range filter form
    - _Requirements: 1.2, 1.3, 6.1_
  - [ ] 6.2 Add Chart.js line chart to template
    - Include Chart.js CDN script
    - Create canvas element for chart
    - Configure chart with 5 datasets (personal, average, Q1, median, Q3)
    - Use distinct colors and dashed lines for quartiles
    - Add legend and tooltip configuration
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  - [ ] 6.3 Handle empty state when no records exist
    - Display message "暂无积分记录" when trendData is empty
    - Hide chart container in empty state
    - _Requirements: 2.3_

- [ ] 7. Update rankings page with clickable student names
  - [ ] 7.1 Modify `templates/rankings.html` to add links on student names
    - Wrap student name in anchor tag linking to `/rankings/{student.id}/trend`
    - Apply hover styling to indicate clickability
    - _Requirements: 1.1_

- [ ] 8. Regenerate templates and verify integration
  - [ ] 8.1 Run `node scripts/generate_templates.cjs` to update generated templates
    - Ensure new template is included in `src/templates.generated.ts`
    - _Requirements: 1.1, 1.2_
  - [ ]* 8.2 Write property test for student information completeness
    - **Property 5: Student Information Completeness**
    - **Validates: Requirements 1.2**

- [ ] 9. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
