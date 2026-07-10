const TEMPLATES = {
  reviewReport: {
    title: "QA Review Report",
    fields: [
      { key: "project",     label: "Project Name",    type: "text" },
      { key: "reviewer",    label: "Reviewer",        type: "text" },
      { key: "date",        label: "Review Date",     type: "date" },
      { key: "category",    label: "Category",        type: "select", options: CATEGORIES.map(c => c.name) },
      { key: "scope",       label: "Scope",           type: "textarea" },
      { key: "findings",    label: "Findings (one per line)", type: "textarea" },
      { key: "severity",    label: "Overall Severity", type: "select", options: ["Critical", "High", "Medium", "Low", "Info"] },
      { key: "recommendations", label: "Recommendations", type: "textarea" },
      { key: "notes",       label: "Additional Notes", type: "textarea" }
    ]
  },
  incidentReport: {
    title: "Incident Report",
    fields: [
      { key: "incidentId",  label: "Incident ID",     type: "text" },
      { key: "reporter",    label: "Reported By",     type: "text" },
      { key: "date",        label: "Date & Time",     type: "date" },
      { key: "severity",    label: "Severity",         type: "select", options: ["P0 - Critical", "P1 - High", "P2 - Medium", "P3 - Low"] },
      { key: "description", label: "Description",      type: "textarea" },
      { key: "impact",      label: "Impact",           type: "textarea" },
      { key: "rootCause",   label: "Root Cause",       type: "textarea" },
      { key: "resolution",  label: "Resolution",       type: "textarea" },
      { key: "prevention",  label: "Preventive Measures", type: "textarea" },
      { key: "status",      label: "Status",           type: "select", options: ["Open", "Investigating", "Resolved", "Closed"] }
    ]
  },
  checklistReport: {
    title: "Checklist Report",
    fields: [
      { key: "project",     label: "Project Name",    type: "text" },
      { key: "checklist",   label: "Checklist Used",  type: "text" },
      { key: "reviewer",    label: "Reviewed By",     type: "text" },
      { key: "date",        label: "Review Date",     type: "date" },
      { key: "passed",      label: "Items Passed",    type: "text" },
      { key: "failed",      label: "Items Failed",    type: "text" },
      { key: "notes",       label: "Notes",           type: "textarea" },
      { key: "actionItems", label: "Action Items",    type: "textarea" }
    ]
  }
};
