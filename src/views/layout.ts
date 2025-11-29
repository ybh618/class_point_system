import { html } from 'hono/html'
import type { FlashState } from '../lib/types'

export type LayoutOptions = {
  title?: string
  active?: string
  flash?: FlashState
  body: string
}

const navItems = [
  { href: '/', key: 'home', label: '首页', icon: 'bi-house-fill' },
  { href: '/students', key: 'students', label: '学生管理', icon: 'bi-people-fill' },
  { href: '/groups', key: 'groups', label: '小组管理', icon: 'bi-collection-fill' },
  { href: '/points/add', key: 'add_points', label: '录入积分', icon: 'bi-plus-circle-fill' },
  { href: '/points', key: 'points', label: '积分记录', icon: 'bi-list-ul' },
  { href: '/rankings', key: 'rankings', label: '排名统计', icon: 'bi-trophy-fill' },
  { href: '/categories', key: 'categories', label: '类别管理', icon: 'bi-tags-fill' }
]

export function renderLayout({ title = '班级积分管理系统', active, flash, body }: LayoutOptions) {
  return html`<!DOCTYPE html>
  <html lang="zh-CN">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css" />
      <style>
        .navbar-brand { font-weight: bold; }
        .card { box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .stats-card { transition: transform 0.2s; }
        .stats-card:hover { transform: translateY(-5px); }
        .points-positive { color: #198754; font-weight: bold; }
        .points-negative { color: #dc3545; font-weight: bold; }
        .footer { background-color: #f8f9fa; padding: 20px 0; margin-top: 50px; }
      </style>
    </head>
    <body>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
          <a class="navbar-brand" href="/">
            <i class="bi bi-trophy-fill"></i> 班级积分管理系统
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
              ${navItems
                .map((item) => {
                  const activeCls = item.key === active ? 'active' : ''
                  return `<li class="nav-item"><a class="nav-link ${activeCls}" href="${item.href}"><i class="bi ${item.icon}"></i> ${item.label}</a></li>`
                })
                .join('')}
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/export?format=excel">
                  <i class="bi bi-download"></i> 导出数据
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main class="container mt-4">
        ${flash?.message
          ? `<div class="alert alert-${flash.status === 'error' ? 'danger' : 'success'} alert-dismissible fade show" role="alert">
              ${flash.message}
              <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>`
          : ''}
        ${body}
      </main>
      <footer class="footer">
        <div class="container text-center">
          <p class="text-muted mb-0">&copy; 2024 班级积分管理系统 - Cloudflare 版本</p>
        </div>
      </footer>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    </body>
  </html>`
}
