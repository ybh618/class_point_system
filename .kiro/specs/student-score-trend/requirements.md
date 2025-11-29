# Requirements Document

## Introduction

本功能为班级积分管理系统的排名统计页面添加个人分数趋势子页面。用户在排名页面点击学生姓名后，将跳转到该学生的分数趋势详情页面，页面中展示一个折线图，包含个人分数累计趋势、班级平均分变化、班级上四分位数、下四分位数和中位数变化曲线，帮助用户直观了解学生在班级中的相对表现。

## Glossary

- **Student Score Trend Page (学生分数趋势页面)**: 展示单个学生分数变化趋势的子页面
- **Cumulative Points (累计积分)**: 学生从开始到某一时间点的积分总和
- **Class Average (班级平均分)**: 班级所有学生在某一时间点的累计积分平均值
- **Upper Quartile (上四分位数/Q3)**: 班级积分分布中75%位置的值
- **Lower Quartile (下四分位数/Q1)**: 班级积分分布中25%位置的值
- **Median (中位数/Q2)**: 班级积分分布中50%位置的值
- **Trend Chart (趋势图)**: 展示分数随时间变化的折线图
- **Rankings Page (排名页面)**: 现有的积分排名统计页面

## Requirements

### Requirement 1

**User Story:** As a teacher, I want to click on a student's name in the rankings page to view their score trend, so that I can understand the student's performance over time.

#### Acceptance Criteria

1. WHEN a user clicks on a student's name in the rankings page, THE Student Score Trend Page SHALL navigate to the student's trend detail page with the student's ID in the URL
2. WHEN the Student Score Trend Page loads, THE system SHALL display the student's basic information including name, student ID, and class name
3. WHEN the Student Score Trend Page loads, THE system SHALL display a breadcrumb navigation allowing users to return to the rankings page

### Requirement 2

**User Story:** As a teacher, I want to see a line chart showing the student's cumulative score trend, so that I can visualize how their points have changed over time.

#### Acceptance Criteria

1. WHEN the trend chart renders, THE system SHALL display the student's cumulative points as a line on the chart with date on the X-axis and points on the Y-axis
2. WHEN the student has points records, THE system SHALL calculate cumulative points by summing all points from the earliest record date to each subsequent date
3. WHEN the student has no points records, THE system SHALL display an empty state message indicating no data is available

### Requirement 3

**User Story:** As a teacher, I want to see the class average score trend on the same chart, so that I can compare the student's performance against the class average.

#### Acceptance Criteria

1. WHEN the trend chart renders, THE system SHALL display the class average cumulative points as a separate line on the chart
2. WHEN calculating class average, THE system SHALL compute the mean of all students' cumulative points in the same class for each date
3. WHEN the class has only one student, THE system SHALL display the class average line identical to the student's personal trend line

### Requirement 4

**User Story:** As a teacher, I want to see quartile statistics (Q1, median, Q3) on the chart, so that I can understand the student's relative position within the class distribution.

#### Acceptance Criteria

1. WHEN the trend chart renders, THE system SHALL display the upper quartile (Q3) as a line on the chart
2. WHEN the trend chart renders, THE system SHALL display the median (Q2) as a line on the chart
3. WHEN the trend chart renders, THE system SHALL display the lower quartile (Q1) as a line on the chart
4. WHEN calculating quartiles, THE system SHALL use the cumulative points of all students in the same class at each date point
5. WHEN the class has fewer than 4 students, THE system SHALL still calculate and display quartile values using linear interpolation

### Requirement 5

**User Story:** As a teacher, I want the chart to be visually clear and distinguishable, so that I can easily identify different trend lines.

#### Acceptance Criteria

1. WHEN the trend chart renders, THE system SHALL use distinct colors for each line: personal trend, class average, Q1, median, and Q3
2. WHEN the trend chart renders, THE system SHALL display a legend identifying each line
3. WHEN a user hovers over a data point, THE system SHALL display a tooltip showing the date and exact values for all lines at that point
4. WHEN the chart renders, THE system SHALL use a responsive design that adapts to different screen sizes

### Requirement 6

**User Story:** As a teacher, I want to filter the trend data by date range, so that I can focus on specific time periods.

#### Acceptance Criteria

1. WHEN the page loads, THE system SHALL display date range filter inputs for start date and end date
2. WHEN a user submits a date range filter, THE system SHALL update the chart to show only data within the specified range
3. WHEN a user clears the date filter, THE system SHALL display the full historical trend data
