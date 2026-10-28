* {
  box-sizing: border-box;
}

:root {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color: #1d1d2b;
  background: #f6f3f8;
  --bg: #f4f0f7;
  --panel: #fff;
  --panel-soft: #f9f2fb;
  --magenta: #b7217a;
  --magenta-dark: #8c1965;
  --magenta-soft: #f3d9ec;
  --text: #1b1b26;
  --muted: #625e72;
  --line: #e8dcea;
  --success: #0c7a5b;
  --warning: #9a6d12;
  --warning-bg: #fff4d9;
  --alert: #a33042;
  --shadow: 0 18px 40px rgba(103, 55, 89, 0.08);
}

body {
  margin: 0;
  min-height: 100vh;
  background: radial-gradient(circle at top left, rgba(183, 33, 122, 0.08), transparent 30%), var(--bg);
}

button,
input,
select,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

.page-shell {
  max-width: 1500px;
  margin: 0 auto;
  padding: 24px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(178, 105, 146, 0.18);
  border-radius: 18px;
  box-shadow: var(--shadow);
}

.topbar h1 {
  margin: 0;
  font-size: clamp(1.8rem, 2vw, 2.4rem);
}

.eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--magenta);
  font-weight: 700;
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

select,
input,
textarea {
  width: 100%;
  border: 1px solid var(--line);
  background: white;
  border-radius: 10px;
  padding: 10px 12px;
  color: var(--text);
}

textarea {
  resize: vertical;
}

button.primary,
button.secondary,
button.tab,
.status-badge,
.status-large {
  border-radius: 999px;
  border: none;
  transition: all 0.2s ease;
}

button.primary {
  background: linear-gradient(135deg, var(--magenta), var(--magenta-dark));
  color: white;
  padding: 10px 16px;
  font-weight: 700;
}

button.primary:hover {
  filter: brightness(1.06);
}

button.secondary {
  background: #f3eaf5;
  color: var(--magenta-dark);
  padding: 9px 16px;
  font-weight: 600;
}

.board-layout {
  display: grid;
  grid-template-columns: 390px minmax(0, 1fr);
  gap: 20px;
}

.board-panel,
.detail-panel {
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(178, 105, 146, 0.14);
  border-radius: 22px;
  box-shadow: var(--shadow);
}

.left-panel {
  padding: 18px;
}

.panel-header,
.detail-header,
.panel-header-inline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.left-panel h2,
.detail-header h2,
.tab-panel h3,
.summary-box h3 {
  margin: 0;
}

.filters {
  display: grid;
  gap: 12px;
  margin: 16px 0;
}

.demand-list {
  display: grid;
  gap: 12px;
  margin-top: 18px;
}

.demand-card {
  text-align: left;
  width: 100%;
  padding: 16px;
  border: 1px solid var(--line);
  background: white;
  border-radius: 18px;
  box-shadow: 0 6px 22px rgba(91, 59, 77, 0.04);
}

.demand-card.selected {
  border-color: var(--magenta);
  background: var(--panel-soft);
}

.demand-card h3 {
  margin: 10px 0 8px;
  font-size: 1.05rem;
}

.demand-card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.5;
  min-height: 44px;
}

.card-topline {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}

.demo-id {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--magenta-dark);
  font-weight: 700;
}

.status-badge,
.status-large {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 12px;
  font-size: 0.72rem;
  font-weight: 700;
  background: var(--magenta-soft);
  color: var(--magenta-dark);
}

.status-large {
  padding: 10px 18px;
  font-size: 0.8rem;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  color: var(--muted);
  font-size: 0.76rem;
}

.detail-panel {
  padding: 20px;
}

.detail-header {
  margin-bottom: 22px;
}

.detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(280px, 0.75fr);
  gap: 20px;
}

.summary-box {
  background: var(--panel-soft);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px;
}

.meta-grid,
.mini-grid,
.metric-grid {
  display: grid;
  gap: 14px;
}

.meta-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 12px;
}

.meta-grid label,
.metric-card label,
.mini-grid label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
}

.meta-grid p,
.metric-card strong,
.mini-grid strong {
  margin: 0;
  line-height: 1.5;
  color: var(--text);
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

button.tab {
  background: #f3eaf5;
  color: var(--magenta-dark);
  padding: 10px 16px;
  font-weight: 700;
}

button.tab.active {
  background: var(--magenta);
  color: white;
}

.tab-panel {
  margin-top: 16px;
}

.panel-header-inline {
  margin-bottom: 12px;
}

.assessment-card {
  background: linear-gradient(135deg, rgba(183, 33, 122, 0.08), rgba(183, 33, 122, 0.02));
  border: 1px solid rgba(183, 33, 122, 0.2);
  border-radius: 16px;
  padding: 16px;
}

.assessment-label {
  margin: 0 0 10px;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--magenta-dark);
  font-weight: 700;
}

.metric-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 16px;
}

.metric-card {
  padding: 14px;
  border-radius: 14px;
  background: white;
  border: 1px solid var(--line);
}

.info-list {
  margin-top: 18px;
}

.info-list h4 {
  margin-bottom: 8px;
}

.info-list ul,
.timeline {
  margin: 0;
  padding-left: 18px;
  color: var(--text);
}

.note-box {
  margin-top: 16px;
  padding: 14px 16px;
  background: #f7f4f9;
  border: 1px solid rgba(183, 33, 122, 0.12);
  border-radius: 12px;
}

.alert-box {
  background: var(--warning-bg);
  border-color: rgba(154, 109, 18, 0.3);
}

.scope-panel,
.expert-form {
  display: grid;
  gap: 16px;
}

.scope-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 12px;
}

.scope-grid label {
  display: grid;
  gap: 6px;
  font-weight: 600;
  color: var(--text);
}

.status-summary {
  background: #faf5ff;
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 14px 16px;
  display: grid;
  gap: 12px;
}

.ok {
  color: var(--success);
  font-weight: 700;
}

.warning {
  color: var(--warning);
  font-weight: 700;
}

.action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.wiki-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
  margin-top: 16px;
}

.wiki-card {
  background: white;
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 14px;
}

.wiki-card.relevant {
  border-color: rgba(183, 33, 122, 0.42);
  box-shadow: 0 12px 24px rgba(183, 33, 122, 0.08);
}

.wiki-card h4 {
  margin: 10px 0 8px;
}

.wiki-card p {
  color: var(--muted);
  margin: 0;
}

.doc-meta {
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
  color: var(--muted);
  font-size: 0.8rem;
  display: grid;
  gap: 6px;
}

.source-quote {
  margin-top: 10px;
  padding: 10px 12px;
  background: #f8ecf7;
  border-radius: 10px;
  color: var(--text);
}

.timeline {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 12px;
}

.timeline li {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
}

.timeline-date {
  color: var(--muted);
  font-weight: 600;
}

.side-panel {
  display: grid;
  gap: 16px;
}

.side-box {
  display: grid;
  gap: 12px;
}

.mini-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.inline-fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.jira-box {
  border: 1px dashed rgba(183, 33, 122, 0.4);
  background: white;
  border-radius: 12px;
  padding: 12px;
}

.new-demand-form {
  display: grid;
  gap: 14px;
  background: var(--panel-soft);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 16px;
  margin-top: 16px;
}

.new-demand-form label,
.expert-form label {
  display: grid;
  gap: 6px;
  font-weight: 600;
}

.form-actions {
  display: flex;
  gap: 10px;
}

@media (max-width: 1100px) {
  .board-layout,
  .detail-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 680px) {
  .page-shell {
    padding: 16px;
  }

  .topbar,
  .toolbar-actions,
  .panel-header,
  .detail-header,
  .panel-header-inline,
  .action-row {
    flex-direction: column;
    align-items: stretch;
  }

  .scope-grid,
  .meta-grid,
  .metric-grid,
  .mini-grid,
  .inline-fields {
    grid-template-columns: 1fr;
  }
}
