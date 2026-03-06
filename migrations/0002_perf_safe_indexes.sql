-- Migration: add compatibility-safe indexes for high-frequency lookups
CREATE INDEX IF NOT EXISTS idx_students_name ON students(name);
CREATE INDEX IF NOT EXISTS idx_students_class_name ON students(class_name, name);
CREATE INDEX IF NOT EXISTS idx_points_records_student_created ON points_records(student_id, created_at);
CREATE INDEX IF NOT EXISTS idx_points_records_category ON points_records(category);
