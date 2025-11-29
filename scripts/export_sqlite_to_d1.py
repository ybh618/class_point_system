#!/usr/bin/env python3
"""Export existing SQLite data into INSERT statements for D1."""
import argparse
import pathlib
import sqlite3

TABLES = [
    'points_categories',
    'groups',
    'students',
    'points_records'
]


def quote(value):
    if value is None:
        return 'NULL'
    if isinstance(value, (int, float)):
        return str(value)
    escaped = str(value).replace("'", "''")
    return f"'{escaped}'"


def export_table(cursor, table):
    rows = cursor.execute(f'SELECT * FROM {table}')
    column_names = [description[0] for description in rows.description]
    statements = []
    for row in rows:
        values = ', '.join(quote(value) for value in row)
        columns = ', '.join(column_names)
        statements.append(f"INSERT INTO {table} ({columns}) VALUES ({values});")
    return statements


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('database', type=pathlib.Path, help='Path to existing SQLite database')
    parser.add_argument('-o', '--output', type=pathlib.Path, default=pathlib.Path('d1_seed.sql'))
    args = parser.parse_args()

    conn = sqlite3.connect(args.database)
    with conn:
        cursor = conn.cursor()
        statements = []
        for table in TABLES:
            statements.extend(export_table(cursor, table))

    args.output.write_text('\n'.join(statements), encoding='utf-8')
    print(f'Wrote {len(statements)} statements to {args.output}')


if __name__ == '__main__':
    main()
