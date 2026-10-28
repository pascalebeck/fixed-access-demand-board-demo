import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'fixed-access-demand-board-demo-v1';
const STATUS_SEQUENCE = [
  'Entwurf',
  'Vorprüfung offen',
  'Rückfragen offen',
  'Bereit zur Expertenprüfung',
  'Expertenprüfung',
  'Bewertet',
];

const EMPTY_SCOPE = {
  category: '',
  systemsCount: '',
  accessType: '',
  interfaceType: '',
  durationWeeks: '',
  impactedData: '',
  userGroups: '',
  accessRights: '',
  acceptanceCriteria: '',
};

const DEMO_DOCS = [
  {
    id: 'DOC-101',
    title: 'Zugriffs- und Freigabestandard',
    content:
      'Schreibzugriffe auf Stammdaten erfordern eine freigegebene Rollenprüfung und einen separaten Änderungsnachweis. Die Umsetzung muss die Fachverantwortlichen und die IT-Sicherheitsrolle maßgeblich berücksichtigen.',
    changedAt: '2024-01-11',
    ownerRole: 'IT-Sicherheitsbeauftragter',
    version: 'v3.2',
    category: 'Übersicht/Reporting',
  },
  {
    id: 'DOC-102',
    title: 'Systemlandschaft und Schnittstellenüberblick',
    content:
      'Bei Mehrfachsystemen steigt der Aufwand mit jeder neuen Datenverbindung. Neue Schnittstellen müssen fachlich bewertet und technisch mit einem Integrationsplan begleitet werden.',
    changedAt: '2022-08-04',
    ownerRole: 'Enterprise Architect',
    version: 'v2.6',
    category: 'Prozessautomatisierung',
  },
  {
    id: 'DOC-103',
    title: 'Assistenz- und Priorisierungsprinzipien',
    content:
      'Assistenzfunktionen müssen klare Zielgruppen, Bedienpfade und Abnahmekriterien definieren. Die Priorisierung basiert auf Mehrwert, Nutzergruppen und Zugriffsebene.',
    changedAt: '2024-06-18',
    ownerRole: 'Produktmanagement',
    version: 'v4.1',
    category: 'Assistenz/Priorisierung',
  },
  {
    id: 'DOC-104',
    title: 'Daten- und Abnahme-Checkliste',
    content:
      'Fachlich relevante Daten, Nutzergruppen und Zugriffsrechte müssen vor Freigabe für die Expertenprüfung dokumentiert sein. Abnahmekriterien bilden die Grundlage für die Betriebsfreigabe.',
    changedAt: '2023-11-28',
    ownerRole: 'Business Analyst',
    version: 'v1.9',
    category: 'Übersicht/Reporting',
  },
  {
    id: 'DOC-105',
    title: 'Automatisierungs- und Ablaufstandard',
    content:
      'Prozessautomatisierungen benötigen klare Zuständigkeiten, eine dokumentierte Ausnahmebehandlung und ein fachliches Freigabeprotokoll. Einfache Reportings sind nicht mit der gleichen Komplexität zu bewerten.',
    changedAt: '2024-04-15',
    ownerRole: 'Prozessarchitekt',
    version: 'v5.0',
    category: 'Prozessautomatisierung',
  },
  {
    id: 'DOC-106',
    title: 'Legacy-Entscheidungslogik',
    content:
      'Historische Richtlinien zeigen die Ausgangsbasis für Erstbewertungen; fachliche Aktualität muss vor der finalen Verwendungsentscheidung geprüft werden. Eine veraltete Dokumentation ist kein alleiniger Gegenbeweis.',
    changedAt: '2021-08-10',
    ownerRole: 'Governance-Lead',
    version: 'v0.8',
    category: 'Assistenz/Priorisierung',
  },
];

const DEMO_INITIAL_DEMANDS = [
  {
    id: 'DEMO-001',
    title: 'Zugriffsübersicht für Managementreports',
    description: 'Das Management benötigt eine schnelle Übersicht über Freigaben, Ausnahmen und Status ohne mehrere Excel-Dateien zu öffnen.',
    desiredState: 'Eine zentrale, filterbare Übersicht mit einheitlicher Berechtigungslogik, die in 2 Schritten aktuell nachvollziehbar ist.',
    targetDate: '2026-11-15',
    status: 'Rückfragen offen',
    createdAt: '2026-10-10T09:15:00.000Z',
    demoId: 'DEMO-REQ-101',
    scope: {
      category: 'Übersicht/Reporting',
      systemsCount: '2',
      accessType: 'Lesender Zugriff',
      interfaceType: 'Bestehende Schnittstellen',
      durationWeeks: '6',
      impactedData: 'Management- und Auditdaten',
      userGroups: 'Management, Controlling, Audit',
      accessRights: 'Nur lesender Zugriff mit Report-Berechtigung',
      acceptanceCriteria: 'Berichte sind monatlich aktualisierbar, filterbar und nachvollziehbar dokumentiert.',
    },
    assessment: {
      valid: true,
      hidden: false,
      result: {
        label: 'Übersicht/Reporting',
        rationale: 'Einzelne Fachsicht mit begrenzter Systemzahl und Leserecht; Aufwand liegt im unteren bis mittleren Bereich.',
        effortRange: { min: 12, max: 18 },
        durationWeeks: 6,
        fte: { min: 0.4, max: 0.6 },
        assumptions: ['Nur lesender Zugriff', 'Bestehende Schnittstellen', 'Zwei betroffene Systeme'],
        uncertainties: ['Unklare Ausnahmen bei Audit- und Freigabefällen'],
        openQuestions: ['Definition der Ausnahmeregeln'],
        sources: ['DOC-101', 'DOC-104'],
      },
    },
    expertDecision: {
      valid: false,
      decision: '',
      rationale: '',
      conditions: '',
      effortRange: { min: 12, max: 18 },
      savedAt: '',
    },
    auditLog: [
      {
        id: 'AUD-1',
        createdAt: '2026-10-10T10:00:00.000Z',
        title: 'Aktualitätsprüfung angefragt',
        details: 'Keine externen Verbindungen. Lokale Prüfung des Wissensstandes gestartet.',
      },
    ],
    history: [
      {
        id: 'H-1',
        createdAt: '2026-10-10T09:18:00.000Z',
        status: 'Entwurf',
        note: 'Anforderung erfasst. Pflichtangaben vorhanden.',
      },
      {
        id: 'H-2',
        createdAt: '2026-10-10T09:42:00.000Z',
        status: 'Vorprüfung offen',
        note: 'Vorprüfung angelegt. Fachliche Rückfrage zu Ausnahmeregeln offen.',
      },
      {
        id: 'H-3',
        createdAt: '2026-10-10T10:05:00.000Z',
        status: 'Rückfragen offen',
        note: 'Zur Abnahme und Zugriffslogik noch fachliche Antworten erforderlich.',
      },
    ],
  },
  {
    id: 'DEMO-002',
    title: 'Automatisierung der Freigabeprüfungen',
    description: 'Freigabeprüfungen werden aktuell per Hand mit der Excel-Liste abgeglichen und verzögern Prozesse.',
    desiredState: 'Ein automatisierter Ablauf mit klaren Zuständigkeiten, Ablaufüberwachung und dokumentierten Ausnahmen soll die Schleife verkürzen.',
    targetDate: '2026-12-02',
    status: 'Expertenprüfung',
    createdAt: '2026-09-25T08:00:00.000Z',
    demoId: 'DEMO-REQ-102',
    scope: {
      category: 'Prozessautomatisierung',
      systemsCount: '4',
      accessType: 'Schreibender Zugriff',
      interfaceType: 'Neue Schnittstellen',
      durationWeeks: '8',
      impactedData: 'Berechtigungen, Freigabestatus, Ausnahmefälle',
      userGroups: 'Prozessverantwortliche, IT, Sicherheitsbeauftragte',
      accessRights: 'Schreibrechte für Statuswechsel und Ausnahmebehandlung',
      acceptanceCriteria: 'Automatisierte Freigabeprüfungen mit nachvollziehbaren Ausnahmen und Audit-Log.',
    },
    assessment: {
      valid: true,
      hidden: false,
      result: {
        label: 'Prozessautomatisierung',
        rationale: 'Mehrfachsysteme, Schreibzugriff und neue Schnittstellen erhöhen das Risiko und den Umfang deutlich.',
        effortRange: { min: 25, max: 36 },
        durationWeeks: 8,
        fte: { min: 0.6, max: 0.9 },
        assumptions: ['4 betroffene Systeme', 'Schreibende Statusänderungen', 'Neue Schnittstellen erforderlich'],
        uncertainties: ['Abnahme- und Freigabeprozess noch offen'],
        openQuestions: ['Welche Ausnahmen sind automatisierbar?'],
        sources: ['DOC-102', 'DOC-105'],
      },
    },
    expertDecision: {
      valid: true,
      decision: 'Bedingt machbar',
      rationale: 'Die Automatisierung ist fachlich sinnvoll, aber mit hoher Sicherheits- und Integrationskomplexität zu begleiten.',
      conditions: 'Vor Umsetzung muss ein detaillierter Integrationsplan mit Rollenmodell und Ausnahmepfaden vorliegen.',
      effortRange: { min: 24, max: 34 },
      savedAt: '2026-10-12T14:15:00.000Z',
    },
    auditLog: [],
    history: [
      {
        id: 'H-4',
        createdAt: '2026-09-25T08:15:00.000Z',
        status: 'Entwurf',
        note: 'Anforderung angelegt.',
      },
      {
        id: 'H-5',
        createdAt: '2026-09-26T16:00:00.000Z',
        status: 'Vorprüfung offen',
        note: 'Vorbewertung angelegt.',
      },
      {
        id: 'H-6',
        createdAt: '2026-10-12T14:15:00.000Z',
        status: 'Expertenprüfung',
        note: 'Fachliche Expertenprüfung übernommen. Bedingte Machbarkeit bestätigt.',
      },
    ],
  },
  {
    id: 'DEMO-003',
    title: 'Assistenzfunktion zur Priorisierung von Änderungsanträgen',
    description: 'Mitarbeitende benötigen eine unterstützende Priorisierung, damit sie Anfragen nach Aufwand, Dringlichkeit und Fachrelevanz besser einordnen.',
    desiredState: 'Eine benutzerfreundliche Assistenz zeigt Eingaben, Prioritätsgründe und Freigabehinweise in einer verständlichen Reihenfolge an.',
    targetDate: '2026-11-20',
    status: 'Bewertet',
    createdAt: '2026-08-18T11:40:00.000Z',
    demoId: 'DEMO-REQ-103',
    scope: {
      category: 'Assistenz/Priorisierung',
      systemsCount: '3',
      accessType: 'Lesender Zugriff',
      interfaceType: 'Bestehende Schnittstellen',
      durationWeeks: '7',
      impactedData: 'Antragsdaten, Priorisierungslogik, Nutzerbewertungen',
      userGroups: 'Sachbearbeitende, Teamleiter, Fachbereich',
      accessRights: 'Lesender Zugriff auf Antragsdaten und Bewertungslogik',
      acceptanceCriteria: 'Priorisierung ist nachvollziehbar, verständlich und Übergaben können nachvollziehbar bewertet werden.',
    },
    assessment: {
      valid: true,
      hidden: false,
      result: {
        label: 'Assistenz/Priorisierung',
        rationale: 'Assistenzfunktion mit vorhandenen Daten und Leserecht ist sinnvoll, jedoch mit mehreren Nutzergruppen und Bewertungslogik.',
        effortRange: { min: 24, max: 32 },
        durationWeeks: 7,
        fte: { min: 0.7, max: 1.0 },
        assumptions: ['3 betroffene Systeme', 'Lesender Zugriff', 'Bestehende Schnittstellen'],
        uncertainties: ['Priorisierungslogik noch nicht vollständig fachlich abgestimmt'],
        openQuestions: ['Welche Gewichtung soll Priorisierung bekommen?'],
        sources: ['DOC-103', 'DOC-106'],
      },
    },
    expertDecision: {
      valid: true,
      decision: 'Machbar',
      rationale: 'Die Priorisierung ist mit klaren Kriterien und fachlicher Governance umsetzbar und trägt zur besseren Antragsbewertung bei.',
      conditions: 'Die fachlichen Bewertungsparameter und Eskalationsregeln müssen im Rollout dokumentiert werden.',
      effortRange: { min: 24, max: 30 },
      savedAt: '2026-09-27T13:09:00.000Z',
    },
    auditLog: [
      {
        id: 'AUD-2',
        createdAt: '2026-09-27T13:35:00.000Z',
        title: 'Dokumentierte Expertenentscheidung',
        details: 'Fachliche Entscheidung dokumentiert und als Grundlage für zukünftige Priorisierungen gelagert.',
      },
    ],
    history: [
      {
        id: 'H-7',
        createdAt: '2026-08-18T11:45:00.000Z',
        status: 'Entwurf',
        note: 'Anforderung aufgenommen und als Assistenz-/Priorisierungsfälle dokumentiert.',
      },
      {
        id: 'H-8',
        createdAt: '2026-08-19T09:05:00.000Z',
        status: 'Vorprüfung offen',
        note: 'Vorbewertung erstellt.',
      },
      {
        id: 'H-9',
        createdAt: '2026-08-22T12:25:00.000Z',
        status: 'Bereit zur Expertenprüfung',
        note: 'Umfang und fachliche Rückfragen vollständig beantwortet.',
      },
      {
        id: 'H-10',
        createdAt: '2026-09-27T13:09:00.000Z',
        status: 'Bewertet',
        note: 'Expertenentscheidung „Machbar“ gespeichert.',
      },
    ],
  },
];

function formatDate(dateString) {
  if (!dateString) return '—';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

function toFteLabel(min, max) {
  if (typeof min !== 'number' || typeof max !== 'number') {
    return 'Noch nicht schätzbar';
  }
  return `${min.toFixed(2)}–${max.toFixed(2)} FTE`;
}

function getDemoId() {
  return `DEMO-REQ-${String(Math.floor(Math.random() * 900) + 100)}`;
}

function getSeedDemands() {
  return structuredClone(DEMO_INITIAL_DEMANDS);
}

function getScopeCompleteness(scope) {
  const requiredFields = [
    scope.category,
    scope.systemsCount,
    scope.accessType,
    scope.interfaceType,
    scope.durationWeeks,
    scope.impactedData,
    scope.userGroups,
    scope.accessRights,
    scope.acceptanceCriteria,
  ];
  return requiredFields.every((value) => String(value).trim().length > 0);
}

function matchWikiDocs(demand) {
  const scope = demand.scope || EMPTY_SCOPE;
  const allDocs = DEMO_DOCS.filter((doc) => {
    const category = scope.category || '';
    const byCategory = !category || doc.category === category;
    const hasSystems = Number(scope.systemsCount) > 1 ? /System|Schnitt|Autom|Zugriff/i.test(doc.content) : true;
    const byAccess =
      !scope.accessType ||
      (scope.accessType === 'Schreibender Zugriff' && /Schreib|Freigab|Zugriff/i.test(doc.content)) ||
      (scope.accessType === 'Lesender Zugriff' && /Lesen|Zugriff|Report/i.test(doc.content));
    const byInterface =
      !scope.interfaceType ||
      (scope.interfaceType === 'Neue Schnittstellen' && /Schnittstelle|Integrations|Verbindung/i.test(doc.content)) ||
      (scope.interfaceType === 'Bestehende Schnittstellen' && /Schnittstelle|Verbindung|System/i.test(doc.content));
    return byCategory && hasSystems && byAccess && byInterface;
  });
  const ordered = [...allDocs].sort((left, right) => new Date(right.changedAt) - new Date(left.changedAt));
  return ordered.slice(0, 4);
}

function buildAssessmentResult(demand) {
  const scope = demand.scope || EMPTY_SCOPE;
  const category = scope.category;
  const systemsCount = Number(scope.systemsCount) || 0;
  const accessType = scope.accessType;
  const interfaceType = scope.interfaceType;
  const durationWeeks = Number(scope.durationWeeks) || 0;

  const hasRequiredScope = getScopeCompleteness(scope);

  if (!hasRequiredScope || !category || !durationWeeks) {
    return {
      valid: false,
      hidden: false,
      label: 'Noch nicht schätzbar',
      rationale: 'Fehlende grundlegende Umfangsangaben verhindern die Vorbewertung.',
      effortRange: { min: 0, max: 0 },
      durationWeeks: Number(scope.durationWeeks) || 0,
      fte: { min: 0, max: 0 },
      assumptions: ['Fehlende Umfangsangaben'],
      uncertainties: ['Es fehlen fachliche und technische Eckdaten für die Einschätzung.'],
      openQuestions: ['Bitte Fachkategorie, betroffene Systeme, Zugriff, Schnittstellen und Dauer ergänzen.'],
      sources: matchWikiDocs(demand).map((doc) => doc.id),
    };
  }

  const baseMap = {
    'Übersicht/Reporting': { min: 10, max: 16 },
    'Prozessautomatisierung': { min: 16, max: 24 },
    'Assistenz/Priorisierung': { min: 24, max: 36 },
  };

  const base = baseMap[category] || { min: 8, max: 12 };
  let effortMin = base.min;
  let effortMax = base.max;

  if (systemsCount > 1) {
    effortMin += (systemsCount - 1) * 3;
    effortMax += (systemsCount - 1) * 5;
  }

  if (accessType === 'Schreibender Zugriff') {
    effortMin += 5;
    effortMax += 9;
  }

  if (interfaceType === 'Neue Schnittstellen') {
    effortMin += 4;
    effortMax += 8;
  }

  const incompleteAnswers = [
    !scope.impactedData,
    !scope.userGroups,
    !scope.accessRights,
    !scope.acceptanceCriteria,
  ].filter(Boolean).length;

  if (incompleteAnswers > 0) {
    effortMin += 2;
    effortMax += 4;
  }

  const fteMin = effortMin / (durationWeeks * 5);
  const fteMax = effortMax / (durationWeeks * 5);

  const sources = matchWikiDocs(demand).map((doc) => doc.id);
  return {
    valid: true,
    hidden: false,
    label: category,
    rationale: `${category} setzt aufgrund der gewählten Umfangsparameter eine mittlere bis deutliche fachliche und technische Komplexität voraus. Die Schätzung ist ein nicht fachlich kalibriertes Demo-Rechenmodell.`,
    effortRange: { min: effortMin, max: effortMax },
    durationWeeks,
    fte: { min: fteMin, max: fteMax },
    assumptions: [
      `${systemsCount} betroffene Systeme`,
      `${accessType} aktiv`,
      `${interfaceType} aktiv`,
      `Umsetzungsdauer: ${durationWeeks} Arbeitswochen`,
    ],
    uncertainties: [
      'Das Modell berücksichtigt keine vertraglichen oder organisatorischen Ressourcen.',
      'Die fachliche Einordnung muss durch Experten geprüft werden.',
    ],
    openQuestions: [
      'Welche Ausnahmen oder Sonderfälle müssen noch berücksichtigt werden?',
      'Wer übernimmt Änderungsfreigaben und die operative Pflege?',
    ],
    sources,
  };
}

function evaluateDemand(demand) {
  const assessment = demand.assessment || { valid: false, hidden: false };
  const computed = buildAssessmentResult(demand);

  if (!assessment.valid || assessment.hidden) {
    return {
      ...computed,
      valid: computed.valid,
      hidden: true,
    };
  }

  return {
    ...assessment.result,
    valid: assessment.valid,
    hidden: assessment.hidden,
  };
}

function getStatusIndex(status) {
  return STATUS_SEQUENCE.indexOf(status);
}

function isScopeChanged(prevDemand, nextDemand) {
  return JSON.stringify(prevDemand.scope) !== JSON.stringify(nextDemand.scope);
}

function canAdvanceToExpertReview(demand) {
  if (!demand || !demand.title || !demand.description || !demand.desiredState) return false;
  const fullScope = getScopeCompleteness(demand.scope || EMPTY_SCOPE);
  const assessment = evaluateDemand(demand);
  return fullScope && assessment.valid && !assessment.hidden && demand.status === 'Bereit zur Expertenprüfung';
}

function getRequiredDocuments(demand) {
  return matchWikiDocs(demand);
}

export default function App() {
  const [demands, setDemands] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      } catch (error) {
        console.warn('Stored demo data could not be parsed.', error);
      }
    }
    return getSeedDemands();
  });
  const [selectedId, setSelectedId] = useState(DEMO_INITIAL_DEMANDS[0].id);
  const [activeTab, setActiveTab] = useState('vorbewertung');
  const [activeRole, setActiveRole] = useState('Anforderer');
  const [boardSearch, setBoardSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('alle');
  const [showForm, setShowForm] = useState(false);
  const [wikiSearch, setWikiSearch] = useState('');

  const selectedDemand = useMemo(
    () => demands.find((demand) => demand.id === selectedId) || demands[0],
    [demands, selectedId]
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demands));
  }, [demands]);

  useEffect(() => {
    if (!selectedDemand && demands.length) {
      setSelectedId(demands[0].id);
    }
  }, [demands, selectedDemand]);

  const visibleDemands = useMemo(() => {
    return demands.filter((demand) => {
      const matchesSearch =
        !boardSearch ||
        demand.title.toLowerCase().includes(boardSearch.toLowerCase()) ||
        demand.description.toLowerCase().includes(boardSearch.toLowerCase());
      const matchesStatus = statusFilter === 'alle' || demand.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [boardSearch, demands, statusFilter]);

  const handleDraftSave = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = (form.get('title') || '').toString().trim();
    const pain = (form.get('pain') || '').toString().trim();
    const desired = (form.get('desiredState') || '').toString().trim();
    const targetDate = (form.get('targetDate') || '').toString().trim();

    if (!title || !pain || !desired) {
      window.alert('Titel, Pain Points und gewünschter Zustand sind Pflichtfelder.');
      return;
    }

    const newDemand = {
      id: `DEMO-${String(demands.length + 1).padStart(3, '0')}`,
      title,
      description: pain,
      desiredState: desired,
      targetDate,
      status: 'Entwurf',
      createdAt: new Date().toISOString(),
      demoId: getDemoId(),
      scope: { ...EMPTY_SCOPE },
      assessment: { valid: false, hidden: false, result: null },
      expertDecision: { valid: false, decision: '', rationale: '', conditions: '', effortRange: { min: 0, max: 0 }, savedAt: '' },
      auditLog: [],
      history: [
        {
          id: `H-${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: 'Entwurf',
          note: 'Neue Anforderung angelegt und für die fachliche Klärung vorbereitet.',
        },
      ],
    };

    setDemands((current) => [newDemand, ...current]);
    setSelectedId(newDemand.id);
    setShowForm(false);
    setActiveTab('rueckfragen');
    event.currentTarget.reset();
  };

  const updateDemand = (updaterFn) => {
    setDemands((current) =>
      current.map((demand) => {
        if (demand.id !== selectedId) return demand;
        return updaterFn(demand);
      })
    );
  };

  const invalidateEvaluationIfScopeChanged = (nextDemand) => {
    const previousVersion = demands.find((item) => item.id === nextDemand.id);
    if (!previousVersion) return nextDemand;
    const changed = JSON.stringify(previousVersion.scope) !== JSON.stringify(nextDemand.scope);
    if (!changed) return nextDemand;

    const resetAssessment = {
      valid: false,
      hidden: true,
      result: null,
    };

    const resetExpert = {
      valid: false,
      decision: '',
      rationale: '',
      conditions: '',
      effortRange: { min: 0, max: 0 },
      savedAt: '',
    };

    const updated = {
      ...nextDemand,
      assessment: resetAssessment,
      expertDecision: resetExpert,
      status: nextDemand.status === 'Bewertet' || nextDemand.status === 'Expertenprüfung' ? 'Vorprüfung offen' : nextDemand.status,
      history: [
        ...(nextDemand.history || []),
        {
          id: `H-${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: nextDemand.status,
          note: 'Umfang geändert – bisherige Vorbewertung und Expertenentscheidung wurden wegen neuer fachlicher Information zurückgesetzt.',
        },
      ],
    };

    return updated;
  };

  const saveScopeField = (field, value) => {
    updateDemand((currentDemand) => {
      const nextDemand = {
        ...currentDemand,
        scope: {
          ...currentDemand.scope,
          [field]: value,
        },
      };

      return invalidateEvaluationIfScopeChanged(currentDemand, nextDemand);
    });
  };

  const updateRoleQuestion = (field, value) => {
    updateDemand((currentDemand) => ({
      ...currentDemand,
      scope: {
        ...currentDemand.scope,
        [field]: value,
      },
    }));
  };

  const updateStatus = (nextStatus) => {
    updateDemand((currentDemand) => ({
      ...currentDemand,
      status: nextStatus,
      history: [
        ...(currentDemand.history || []),
        {
          id: `H-${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: nextStatus,
          note: `Status manuell auf „${nextStatus}“ gesetzt.`,
        },
      ],
    }));
  };

  const requestActualityReview = () => {
    updateDemand((currentDemand) => ({
      ...currentDemand,
      auditLog: [
        ...(currentDemand.auditLog || []),
        {
          id: `AUD-${Date.now()}`,
          createdAt: new Date().toISOString(),
          title: 'Aktualitätsprüfung angefragt',
          details: 'Lokale Prüfvermerke erstellt. Es wurden keine externen Quellen oder Nachrichten ausgelöst.',
        },
      ],
      history: [
        ...(currentDemand.history || []),
        {
          id: `H-${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: currentDemand.status,
          note: 'Aktualitätsprüfung anfragen ausgelöst. Lokaler Prüfvermerk angelegt.',
        },
      ],
    }));
  };

  const recalculateAssessment = () => {
    updateDemand((currentDemand) => {
      const computed = buildAssessmentResult(currentDemand);
      return {
        ...currentDemand,
        assessment: {
          valid: computed.valid,
          hidden: false,
          result: computed,
        },
        status: getStatusIndex(currentDemand.status) < 2 ? 'Vorprüfung offen' : currentDemand.status,
        history: [
          ...(currentDemand.history || []),
          {
            id: `H-${Date.now()}`,
            createdAt: new Date().toISOString(),
            status: currentDemand.status,
            note: 'Vorbewertung neu berechnet. Deterministisches Demo-Rechenmodell angewendet.',
          },
        ],
      };
    });
  };

  const saveExpertDecision = () => {
    const decision = document.getElementById('expertDecision')?.value || '';
    const rationale = document.getElementById('expertReason')?.value || '';
    const conditions = document.getElementById('expertConditions')?.value || '';
    const effortMin = Number(document.getElementById('expertMinPt')?.value || 0);
    const effortMax = Number(document.getElementById('expertMaxPt')?.value || 0);

    if (!decision || !rationale || !conditions) {
      window.alert('Entscheidung, Begründung und Bedingungen sind Pflichtfelder.');
      return;
    }

    if (!selectedDemand?.assessment?.valid) {
      window.alert('Die Entscheidung ist blockiert, weil der Umfang nachträglich geändert wurde und die Vorbewertung noch ungültig ist.');
      return;
    }

    updateDemand((currentDemand) => ({
      ...currentDemand,
      expertDecision: {
        valid: true,
        decision,
        rationale,
        conditions,
        effortRange: { min: effortMin, max: effortMax },
        savedAt: new Date().toISOString(),
      },
      status: 'Bewertet',
      history: [
        ...(currentDemand.history || []),
        {
          id: `H-${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: 'Bewertet',
          note: `Expertenentscheidung „${decision}“ gespeichert.`,
        },
      ],
    }));
  };

  const resetDemoState = () => {
    const seed = getSeedDemands();
    setDemands(seed);
    setSelectedId(seed[0].id);
    setActiveTab('vorbewertung');
    setStatusFilter('alle');
    setBoardSearch('');
    setWikiSearch('');
  };

  const copySummary = async () => {
    const summary = `Demo-Akte: ${selectedDemand.title}\nStatus: ${selectedDemand.status}\nDemo-ID: ${selectedDemand.demoId}\nFachkategorie: ${selectedDemand.scope.category || '—'}\nBewertung: ${selectedDemand.expertDecision?.decision || 'Noch offen'}\nZusammenfassung: ${selectedDemand.description}`;
    try {
      await navigator.clipboard.writeText(summary);
      window.alert('Zusammenfassung in die Zwischenablage kopiert.');
    } catch (error) {
      console.error('Clipboard not available.', error);
      window.alert('Zwischenablage nicht verfügbar. Bitte Inhalte manuell kopieren.');
    }
  };

  const assessment = selectedDemand ? evaluateDemand(selectedDemand) : { valid: false, hidden: true };
  const documents = useMemo(() => {
    const docs = DEMO_DOCS.filter((doc) =>
      !wikiSearch || `${doc.title} ${doc.content}`.toLowerCase().includes(wikiSearch.toLowerCase())
    );
    return docs;
  }, [wikiSearch]);

  const matchedDocs = selectedDemand ? matchWikiDocs(selectedDemand) : [];

  const renderNextWorkflowAction = () => {
    switch (selectedDemand.status) {
      case 'Entwurf':
        return (
          <button className="primary" onClick={() => updateStatus('Vorprüfung offen')}>
            In Vorprüfung überführen
          </button>
        );
      case 'Vorprüfung offen':
        return (
          <button className="primary" onClick={() => updateStatus('Rückfragen offen')}>
            Rückfragen eröffnen
          </button>
        );
      case 'Rückfragen offen':
        return (
          <button
            className="primary"
            onClick={() => {
              if (!selectedDemand.scope || !getScopeCompleteness(selectedDemand.scope)) {
                window.alert('Für den Übergang müssen die fachlichen Rückfragen und Umfangsangaben vollständig beantwortet sein.');
                return;
              }
              updateStatus('Bereit zur Expertenprüfung');
            }}
          >
            Für Expertenprüfung freigeben
          </button>
        );
      case 'Bereit zur Expertenprüfung':
        return (
          <button className="primary" onClick={() => updateStatus('Expertenprüfung')}>
            In Expertenprüfung übertragen
          </button>
        );
      case 'Expertenprüfung':
        return (
          <button className="primary" onClick={() => updateStatus('Bewertet')}>
            Bewertung abschließen
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <div>
          <div className="eyebrow">Demo · Simulierte Wiki-, AI- und Jira-Integrationen</div>
          <h1>Fixed Access Demand Board</h1>
        </div>
        <div className="toolbar-actions">
          <select value={activeRole} onChange={(event) => setActiveRole(event.target.value)}>
            <option value="Anforderer">Anforderer</option>
            <option value="Expertin">Expertin</option>
            <option value="Projektleitung">Projektleitung</option>
          </select>
          <button className="secondary" onClick={resetDemoState}>Originalzustand wiederherstellen</button>
        </div>
      </header>

      <main className="board-layout">
        <aside className="board-panel left-panel">
          <div className="panel-header">
            <h2>Demand Board</h2>
            <button className="primary" onClick={() => setShowForm((state) => !state)}>Neue Anforderung</button>
          </div>

          <div className="filters">
            <input
              type="search"
              value={boardSearch}
              onChange={(event) => setBoardSearch(event.target.value)}
              placeholder="Nach Titel oder Beschreibung suchen"
            />
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="alle">Alle Status</option>
              {STATUS_SEQUENCE.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {showForm && (
            <form className="new-demand-form" onSubmit={handleDraftSave}>
              <h3>Anforderung erfassen</h3>
              <label>
                Titel der Anforderung
                <input name="title" type="text" placeholder="z. B. Zugriffsübersicht..." required />
              </label>
              <label>
                Beschreibung der Pain Points
                <textarea name="pain" rows="3" required />
              </label>
              <label>
                Beschreibung des gewünschten Zustands
                <textarea name="desiredState" rows="3" required />
              </label>
              <label>
                Gewünschter Zieltermin (optional)
                <input name="targetDate" type="date" />
              </label>
              <div className="form-actions">
                <button type="submit" className="primary">Speichern</button>
                <button type="button" className="secondary" onClick={() => setShowForm(false)}>
                  Abbrechen
                </button>
              </div>
            </form>
          )}

          <div className="demand-list">
            {visibleDemands.map((demand) => (
              <button
                key={demand.id}
                className={`demand-card ${selectedId === demand.id ? 'selected' : ''}`}
                onClick={() => setSelectedId(demand.id)}
              >
                <div className="card-topline">
                  <span className="demo-id">{demand.demoId}</span>
                  <span className="status-badge">{demand.status}</span>
                </div>
                <h3>{demand.title}</h3>
                <p>{demand.description}</p>
                <div className="card-meta">
                  <span>{demand.scope.category || 'Fachkategorie offen'}</span>
                  <span>{formatDate(demand.targetDate)}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="detail-panel">
          {selectedDemand ? (
            <>
              <div className="detail-header">
                <div>
                  <div className="eyebrow">{selectedDemand.demoId}</div>
                  <h2>{selectedDemand.title}</h2>
                </div>
                <span className="status-large">{selectedDemand.status}</span>
              </div>

              <div className="detail-grid">
                <div className="detail-main">
                  <div className="summary-box">
                    <h3>Initiale Anforderung</h3>
                    <div className="meta-grid">
                      <div>
                        <label>Pain Points</label>
                        <p>{selectedDemand.description}</p>
                      </div>
                      <div>
                        <label>Gewünschter Zustand</label>
                        <p>{selectedDemand.desiredState}</p>
                      </div>
                      <div>
                        <label>Zieltermin</label>
                        <p>{formatDate(selectedDemand.targetDate)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="tabs">
                    {[
                      ['vorbewertung', 'Vorbewertung'],
                      ['rueckfragen', 'Rückfragen'],
                      ['quellen', 'Quellen'],
                      ['verlauf', 'Verlauf'],
                    ].map(([id, label]) => (
                      <button
                        key={id}
                        className={activeTab === id ? 'tab active' : 'tab'}
                        onClick={() => setActiveTab(id)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {activeTab === 'vorbewertung' && (
                    <div className="tab-panel">
                      <div className="panel-header-inline">
                        <h3>Vorbewertung</h3>
                        <button className="secondary" onClick={recalculateAssessment}>Vorbewertung neu berechnen</button>
                      </div>

                      {assessment.valid && !assessment.hidden ? (
                        <>
                          <div className="assessment-card">
                            <p className="assessment-label">Vorläufige Einordnung</p>
                            <h4>{assessment.label}</h4>
                            <p>{assessment.rationale}</p>
                          </div>

                          <div className="metric-grid">
                            <div className="metric-card">
                              <label>Entwicklungsaufwand</label>
                              <strong>
                                {assessment.effortRange.min}–{assessment.effortRange.max} Personentage
                              </strong>
                            </div>
                            <div className="metric-card">
                              <label>Angenommene Umsetzungsdauer</label>
                              <strong>{assessment.durationWeeks} Arbeitswochen</strong>
                            </div>
                            <div className="metric-card">
                              <label>Kapazitätsbedarf</label>
                              <strong>
                                {toFteLabel(assessment.fte.min, assessment.fte.max)}
                              </strong>
                            </div>
                          </div>

                          <div className="info-list">
                            <h4>Annahmen, Unsicherheiten und offene Fragen</h4>
                            <ul>
                              {assessment.assumptions.map((item) => <li key={item}>{item}</li>)}
                              {assessment.uncertainties.map((item) => <li key={item}>{item}</li>)}
                              {assessment.openQuestions.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                          </div>

                          <div className="info-list">
                            <h4>Zugeordnete Demoquellen</h4>
                            <ul>
                              {assessment.sources.map((sourceId) => {
                                const doc = DEMO_DOCS.find((item) => item.id === sourceId);
                                return <li key={sourceId}>{doc ? `${doc.id} – ${doc.title}` : sourceId}</li>;
                              })}
                            </ul>
                          </div>

                          <div className="note-box">
                            Hinweise: Die Vorbewertung ist ein lokales Demo-Rechenmodell und nicht fachlich kalibriert. Expertenprüfung ist zwingend erforderlich.
                          </div>
                        </>
                      ) : (
                        <div className="note-box alert-box">
                          <strong>Vorbewertung noch nicht gültig.</strong>
                          <p>Fehlende oder geänderte Umfangsangaben machen die bisherige Schätzung ungültig. Neue Berechnung erforderlich.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'rueckfragen' && (
                    <div className="tab-panel scope-panel">
                      <h3>Umfang und Rückfragen klären</h3>
                      <div className="scope-grid">
                        <label>
                          Fachliche Kategorie
                          <select value={selectedDemand.scope.category || ''} onChange={(event) => saveScopeField('category', event.target.value)}>
                            <option value="">Bitte wählen</option>
                            <option value="Übersicht/Reporting">Übersicht/Reporting</option>
                            <option value="Prozessautomatisierung">Prozessautomatisierung</option>
                            <option value="Assistenz/Priorisierung">Assistenz/Priorisierung</option>
                          </select>
                        </label>
                        <label>
                          Anzahl betroffener Systeme
                          <input
                            type="number"
                            min="1"
                            value={selectedDemand.scope.systemsCount || ''}
                            onChange={(event) => saveScopeField('systemsCount', event.target.value)}
                          />
                        </label>
                        <label>
                          Lesender oder schreibender Zugriff
                          <select value={selectedDemand.scope.accessType || ''} onChange={(event) => saveScopeField('accessType', event.target.value)}>
                            <option value="">Bitte wählen</option>
                            <option value="Lesender Zugriff">Lesender Zugriff</option>
                            <option value="Schreibender Zugriff">Schreibender Zugriff</option>
                          </select>
                        </label>
                        <label>
                          Vorhandene oder neu zu entwickelnde Schnittstellen
                          <select value={selectedDemand.scope.interfaceType || ''} onChange={(event) => saveScopeField('interfaceType', event.target.value)}>
                            <option value="">Bitte wählen</option>
                            <option value="Bestehende Schnittstellen">Bestehende Schnittstellen</option>
                            <option value="Neue Schnittstellen">Neue Schnittstellen</option>
                          </select>
                        </label>
                        <label>
                          Angenommene Umsetzungsdauer in Arbeitswochen
                          <input
                            type="number"
                            min="1"
                            value={selectedDemand.scope.durationWeeks || ''}
                            onChange={(event) => saveScopeField('durationWeeks', event.target.value)}
                          />
                        </label>
                        <label>
                          Betroffene Daten
                          <textarea
                            rows="2"
                            value={selectedDemand.scope.impactedData || ''}
                            onChange={(event) => updateRoleQuestion('impactedData', event.target.value)}
                          />
                        </label>
                        <label>
                          Nutzergruppen
                          <textarea
                            rows="2"
                            value={selectedDemand.scope.userGroups || ''}
                            onChange={(event) => updateRoleQuestion('userGroups', event.target.value)}
                          />
                        </label>
                        <label>
                          Zugriffsrechte
                          <textarea
                            rows="2"
                            value={selectedDemand.scope.accessRights || ''}
                            onChange={(event) => updateRoleQuestion('accessRights', event.target.value)}
                          />
                        </label>
                        <label>
                          Abnahmekriterien
                          <textarea
                            rows="2"
                            value={selectedDemand.scope.acceptanceCriteria || ''}
                            onChange={(event) => updateRoleQuestion('acceptanceCriteria', event.target.value)}
                          />
                        </label>
                      </div>

                      <div className="status-summary">
                        <strong>Gespeichert:</strong>
                        {getScopeCompleteness(selectedDemand.scope) ? (
                          <span className="ok">Umfang vollständig und im Demo-Bestand gespeichert.</span>
                        ) : (
                          <span className="warning">Noch offen: Umfangsangaben müssen ergänzt werden.</span>
                        )}
                        <div className="action-row">
                          <button className="secondary" onClick={requestActualityReview}>Aktualitätsprüfung anfragen</button>
                          {renderNextWorkflowAction()}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'quellen' && (
                    <div className="tab-panel">
                      <h3>Fiktive Wissensbasis</h3>
                      <div className="wiki-search">
                        <input
                          type="search"
                          value={wikiSearch}
                          onChange={(event) => setWikiSearch(event.target.value)}
                          placeholder="Dokumente durchsuchen"
                        />
                      </div>
                      <div className="wiki-grid">
                        {documents.map((doc) => {
                          const isRelevant = matchedDocs.some((item) => item.id === doc.id);
                          const oldDate = new Date(doc.changedAt) < new Date('2022-12-31');
                          return (
                            <article key={doc.id} className={`wiki-card ${isRelevant ? 'relevant' : ''}`}>
                              <div className="card-topline">
                                <span className="demo-id">{doc.id}</span>
                                {oldDate && <span className="status-badge warning">Aktualität fachlich prüfen</span>}
                              </div>
                              <h4>{doc.title}</h4>
                              <p>{doc.content}</p>
                              <ul className="doc-meta">
                                <li>Änderungsdatum: {formatDate(doc.changedAt)}</li>
                                <li>Verantwortlich: {doc.ownerRole}</li>
                                <li>Version: {doc.version}</li>
                                <li>Kategorie: {doc.category}</li>
                              </ul>
                              {isRelevant && (
                                <div className="source-quote">
                                  <strong>Relevante Aussage:</strong> {doc.content}
                                </div>
                              )}
                            </article>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {activeTab === 'verlauf' && (
                    <div className="tab-panel">
                      <h3>Verlauf und Zustandswechsel</h3>
                      <ul className="timeline">
                        {selectedDemand.history.map((event) => (
                          <li key={event.id}>
                            <div className="timeline-date">{formatDate(event.createdAt)}</div>
                            <div>
                              <strong>{event.status}</strong>
                              <p>{event.note}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <aside className="side-panel">
                  <div className="summary-box side-box">
                    <h3>Vorbewertung</h3>
                    <p>
                      <strong>Modell:</strong> Deterministisches Demo-Rechenmodell, nicht fachlich kalibriert.
                    </p>
                    <div className="mini-grid">
                      <div>
                        <label>PT</label>
                        <strong>
                          {assessment.valid ? `${assessment.effortRange.min}–${assessment.effortRange.max}` : 'Noch nicht schätzbar'}
                        </strong>
                      </div>
                      <div>
                        <label>Dauer</label>
                        <strong>{assessment.valid ? `${assessment.durationWeeks} Wochen` : 'Noch nicht schätzbar'}</strong>
                      </div>
                      <div>
                        <label>FTE</label>
                        <strong>
                          {assessment.valid ? toFteLabel(assessment.fte.min, assessment.fte.max) : 'Noch nicht schätzbar'}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="summary-box side-box">
                    <h3>Expertenprüfung</h3>
                    {selectedDemand.expertDecision?.valid ? (
                      <>
                        <p>
                          <strong>Entscheidung:</strong> {selectedDemand.expertDecision.decision}
                        </p>
                        <p>{selectedDemand.expertDecision.rationale}</p>
                        <p>
                          <strong>Bedingungen:</strong> {selectedDemand.expertDecision.conditions}
                        </p>
                        <p>
                          <strong>Aufwand:</strong> {selectedDemand.expertDecision.effortRange.min}–{selectedDemand.expertDecision.effortRange.max} PT
                        </p>
                      </>
                    ) : (
                      <>
                        <p>Die Entscheidung ist derzeit blockiert, weil noch keine gültige Expertenprüfung vorliegt oder der Umfang geändert wurde.</p>
                        <div className="expert-form">
                          <label>
                            Entscheidung
                            <select id="expertDecision" defaultValue="">
                              <option value="">Bitte wählen</option>
                              <option value="Machbar">Machbar</option>
                              <option value="Bedingt machbar">Bedingt machbar</option>
                              <option value="Nicht empfohlen">Nicht empfohlen</option>
                            </select>
                          </label>
                          <label>
                            Begründung
                            <textarea id="expertReason" rows="3" />
                          </label>
                          <label>
                            Bedingungen
                            <textarea id="expertConditions" rows="3" />
                          </label>
                          <div className="inline-fields">
                            <label>
                              PT min
                              <input id="expertMinPt" type="number" defaultValue={assessment.valid ? assessment.effortRange.min : 0} />
                            </label>
                            <label>
                              PT max
                              <input id="expertMaxPt" type="number" defaultValue={assessment.valid ? assessment.effortRange.max : 0} />
                            </label>
                          </div>
                          <button className="primary" onClick={saveExpertDecision}>
                            Entscheidung speichern
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="summary-box side-box">
                    <h3>Jira-Demoakte</h3>
                    <div className="jira-box">
                      <p>{selectedDemand.title}</p>
                      <p>Status: {selectedDemand.status}</p>
                      <p>Fachkategorie: {selectedDemand.scope.category || 'Offen'}</p>
                      <p>Empfohlene Analyse: {assessment.valid ? assessment.label : 'Noch nicht schätzbar'}</p>
                    </div>
                    <button className="secondary" onClick={copySummary}>Zusammenfassung kopieren</button>
                  </div>
                </aside>
              </div>
            </>
          ) : (
            <div>Keine Anforderung ausgewählt.</div>
          )}
        </section>
      </main>
    </div>
  );
}
