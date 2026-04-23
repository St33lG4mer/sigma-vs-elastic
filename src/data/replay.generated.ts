/* auto-generated from sliver_test_harness and rule_ast; do not edit by hand */
import type { AttackStep, Detection, Finding, Summary } from "../types";

export const summary: Summary = {
  "experimentStatus": "Replay model generated from S2_credential_theft",
  "snapshotLabel": "Sanitized public sample (S2_credential_theft)",
  "slug": "sigma-vs-elastic",
  "lastUpdated": "2026-04-23",
  "isSampleData": true,
  "attackStepCount": 13,
  "mitreTechniqueCount": 7,
  "sigmaHitCount": 68,
  "elasticHitCount": 148,
  "overlapCount": 9,
  "gapCount": 1,
  "draftFindingCount": 3
};

export const attackSteps: AttackStep[] = [
  {
    "id": "comsvcs_minidump",
    "order": 1,
    "phase": "Credential Access",
    "techniqueId": "T1003.001",
    "techniqueName": "LSASS Memory",
    "safeActionLabel": "Comsvcs Minidump",
    "telemetrySources": [
      "Sysmon",
      "PowerShell/Bash command telemetry",
      "Windows Event Log",
      "Elastic SIEM"
    ],
    "shellTelemetry": "PowerShell and process telemetry on Windows victim",
    "expectedDetections": [
      "proc_access_win_lsass_dump_comsvcs_dll",
      "proc_creation_win_rundll32_process_dump_via_comsvcs"
    ],
    "sigmaHits": 3,
    "elasticHits": 3,
    "gapCount": 0,
    "status": "sample"
  },
  {
    "id": "procdump_lsass",
    "order": 2,
    "phase": "Credential Access",
    "techniqueId": "T1003.001",
    "techniqueName": "LSASS Memory",
    "safeActionLabel": "Procdump Lsass",
    "telemetrySources": [
      "Sysmon",
      "PowerShell/Bash command telemetry",
      "Windows Event Log",
      "Elastic SIEM"
    ],
    "shellTelemetry": "Assembly execution and process telemetry on victim",
    "expectedDetections": [
      "create_remote_thread_win_powershell_lsass",
      "create_remote_thread_win_susp_password_dumper_lsass"
    ],
    "sigmaHits": 28,
    "elasticHits": 24,
    "gapCount": 0,
    "status": "sample"
  },
  {
    "id": "taskmgr_lsass_dump",
    "order": 3,
    "phase": "Credential Access",
    "techniqueId": "T1003.001",
    "techniqueName": "LSASS Memory",
    "safeActionLabel": "Manual: right-click lsass -> Create dump",
    "telemetrySources": [
      "Sysmon",
      "PowerShell/Bash command telemetry",
      "Windows Event Log",
      "Elastic SIEM"
    ],
    "shellTelemetry": "PowerShell and process telemetry on Windows victim",
    "expectedDetections": [
      "create_remote_thread_win_powershell_lsass",
      "create_remote_thread_win_susp_password_dumper_lsass"
    ],
    "sigmaHits": 30,
    "elasticHits": 40,
    "gapCount": 0,
    "status": "sample"
  },
  {
    "id": "reg_save_sam",
    "order": 4,
    "phase": "Credential Access",
    "techniqueId": "T1003.002",
    "techniqueName": "Security Account Manager",
    "safeActionLabel": "Reg Save Sam",
    "telemetrySources": [
      "Sysmon",
      "PowerShell/Bash command telemetry",
      "Windows Event Log",
      "Elastic SIEM"
    ],
    "shellTelemetry": "PowerShell and process telemetry on Windows victim",
    "expectedDetections": [
      "proc_creation_win_reg_dumping_sensitive_hives",
      "Multiple Vault Web Credentials Read"
    ],
    "sigmaHits": 1,
    "elasticHits": 2,
    "gapCount": 0,
    "status": "sample"
  },
  {
    "id": "reg_save_system",
    "order": 5,
    "phase": "Credential Access",
    "techniqueId": "T1003.002",
    "techniqueName": "Security Account Manager",
    "safeActionLabel": "Reg Save System",
    "telemetrySources": [
      "Sysmon",
      "PowerShell/Bash command telemetry",
      "Windows Event Log",
      "Elastic SIEM"
    ],
    "shellTelemetry": "PowerShell and process telemetry on Windows victim",
    "expectedDetections": [
      "proc_creation_win_reg_dumping_sensitive_hives",
      "win_certificateservicesclient_lifecycle_system_cert_exported"
    ],
    "sigmaHits": 3,
    "elasticHits": 4,
    "gapCount": 0,
    "status": "sample"
  },
  {
    "id": "reg_save_security",
    "order": 6,
    "phase": "Credential Access",
    "techniqueId": "T1003.002",
    "techniqueName": "Security Account Manager",
    "safeActionLabel": "Reg Save Security",
    "telemetrySources": [
      "Sysmon",
      "PowerShell/Bash command telemetry",
      "Windows Event Log",
      "Elastic SIEM"
    ],
    "shellTelemetry": "PowerShell and process telemetry on Windows victim",
    "expectedDetections": [
      "proc_creation_win_reg_dumping_sensitive_hives",
      "proc_creation_win_wmic_uninstall_security_products"
    ],
    "sigmaHits": 11,
    "elasticHits": 6,
    "gapCount": 0,
    "status": "sample"
  },
  {
    "id": "vssadmin_create",
    "order": 7,
    "phase": "Credential Access",
    "techniqueId": "T1003.003",
    "techniqueName": "NTDS",
    "safeActionLabel": "Vssadmin Create",
    "telemetrySources": [
      "Sysmon",
      "PowerShell/Bash command telemetry",
      "Windows Event Log",
      "Elastic SIEM"
    ],
    "shellTelemetry": "PowerShell and process telemetry on Windows victim",
    "expectedDetections": [
      "create_remote_thread_win_powershell_lsass",
      "create_remote_thread_win_susp_password_dumper_lsass"
    ],
    "sigmaHits": 2,
    "elasticHits": 1,
    "gapCount": 0,
    "status": "sample"
  },
  {
    "id": "copy_ntds",
    "order": 8,
    "phase": "Credential Access",
    "techniqueId": "T1003.003",
    "techniqueName": "NTDS",
    "safeActionLabel": "Copy Ntds",
    "telemetrySources": [
      "Sysmon",
      "PowerShell/Bash command telemetry",
      "Windows Event Log",
      "Elastic SIEM"
    ],
    "shellTelemetry": "PowerShell and process telemetry on Windows victim",
    "expectedDetections": [
      "file_event_win_ntds_dit_creation",
      "proc_creation_win_esentutl_sensitive_file_copy"
    ],
    "sigmaHits": 4,
    "elasticHits": 3,
    "gapCount": 0,
    "status": "sample"
  },
  {
    "id": "rubeus_kerberoast",
    "order": 9,
    "phase": "Credential Access",
    "techniqueId": "T1558.003",
    "techniqueName": "Kerberoasting",
    "safeActionLabel": "Rubeus Kerberoast",
    "telemetrySources": [
      "Sysmon",
      "PowerShell/Bash command telemetry",
      "Windows Event Log",
      "Elastic SIEM"
    ],
    "shellTelemetry": "Assembly execution and process telemetry on victim",
    "expectedDetections": [
      "proc_creation_win_hktl_rubeus",
      "proc_creation_win_hktl_sharpview"
    ],
    "sigmaHits": 4,
    "elasticHits": 2,
    "gapCount": 0,
    "status": "sample"
  },
  {
    "id": "rubeus_asreproast",
    "order": 10,
    "phase": "Credential Access",
    "techniqueId": "T1558.004",
    "techniqueName": "AS-REP Roasting",
    "safeActionLabel": "Rubeus Asreproast",
    "telemetrySources": [
      "Sysmon",
      "PowerShell/Bash command telemetry",
      "Windows Event Log",
      "Elastic SIEM"
    ],
    "shellTelemetry": "Assembly execution and process telemetry on victim",
    "expectedDetections": [
      "proc_creation_win_hktl_rubeus",
      "win_security_register_new_logon_process_by_rubeus"
    ],
    "sigmaHits": 2,
    "elasticHits": 0,
    "gapCount": 1,
    "status": "sample"
  },
  {
    "id": "mimikatz_dcsync",
    "order": 11,
    "phase": "Credential Access",
    "techniqueId": "T1003.006",
    "techniqueName": "DCSync",
    "safeActionLabel": "Mimikatz Dcsync",
    "telemetrySources": [
      "Sysmon",
      "PowerShell/Bash command telemetry",
      "Windows Event Log",
      "Elastic SIEM"
    ],
    "shellTelemetry": "Assembly execution and process telemetry on victim",
    "expectedDetections": [
      "file_event_win_hktl_mimikatz_files",
      "file_event_win_powershell_exploit_scripts"
    ],
    "sigmaHits": 8,
    "elasticHits": 6,
    "gapCount": 0,
    "status": "sample"
  },
  {
    "id": "mimikatz_dpapi",
    "order": 12,
    "phase": "Credential Access",
    "techniqueId": "T1555.003",
    "techniqueName": "Credentials from Web Browsers",
    "safeActionLabel": "Mimikatz Dpapi",
    "telemetrySources": [
      "Sysmon",
      "PowerShell/Bash command telemetry",
      "Windows Event Log",
      "Elastic SIEM"
    ],
    "shellTelemetry": "Assembly execution and process telemetry on victim",
    "expectedDetections": [
      "file_access_win_susp_dpapi_master_key_access",
      "file_event_win_hktl_mimikatz_files"
    ],
    "sigmaHits": 15,
    "elasticHits": 5,
    "gapCount": 0,
    "status": "sample"
  },
  {
    "id": "copy_chrome_login_data",
    "order": 13,
    "phase": "Credential Access",
    "techniqueId": "T1555.003",
    "techniqueName": "Credentials from Web Browsers",
    "safeActionLabel": "Copy Chrome Login Data",
    "telemetrySources": [
      "Sysmon",
      "PowerShell/Bash command telemetry",
      "Windows Event Log",
      "Elastic SIEM"
    ],
    "shellTelemetry": "PowerShell and process telemetry on Windows victim",
    "expectedDetections": [
      "proc_creation_win_esentutl_sensitive_file_copy",
      "proc_creation_win_susp_copy_browser_data"
    ],
    "sigmaHits": 4,
    "elasticHits": 3,
    "gapCount": 0,
    "status": "sample"
  }
];

export const detections: Detection[] = [
  {
    "id": "sigma-create_remote_thread_win_powershell_lsass",
    "source": "Sigma",
    "ruleName": "create_remote_thread_win_powershell_lsass",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "procdump_lsass"
    ],
    "hitCount": 1,
    "overlapGroupId": "lsass",
    "classification": "overlap",
    "notes": "lsass"
  },
  {
    "id": "sigma-create_remote_thread_win_susp_password_dumper_lsass",
    "source": "Sigma",
    "ruleName": "create_remote_thread_win_susp_password_dumper_lsass",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "procdump_lsass"
    ],
    "hitCount": 1,
    "overlapGroupId": "lsass",
    "classification": "overlap",
    "notes": "lsass"
  },
  {
    "id": "sigma-file_access_win_susp_dpapi_master_key_access",
    "source": "Sigma",
    "ruleName": "file_access_win_susp_dpapi_master_key_access",
    "severity": "low",
    "techniqueIds": [
      "T1555.003"
    ],
    "attackStepIds": [
      "mimikatz_dpapi"
    ],
    "hitCount": 1,
    "overlapGroupId": "dpapi",
    "classification": "overlap",
    "notes": "dpapi"
  },
  {
    "id": "sigma-file_event_win_cred_dump_tools_dropped_files",
    "source": "Sigma",
    "ruleName": "file_event_win_cred_dump_tools_dropped_files",
    "severity": "low",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "procdump_lsass"
    ],
    "hitCount": 1,
    "overlapGroupId": "procdump",
    "classification": "overlap",
    "notes": "procdump"
  },
  {
    "id": "sigma-file_event_win_hktl_mimikatz_files",
    "source": "Sigma",
    "ruleName": "file_event_win_hktl_mimikatz_files",
    "severity": "low",
    "techniqueIds": [
      "T1003.006"
    ],
    "attackStepIds": [
      "mimikatz_dcsync"
    ],
    "hitCount": 1,
    "overlapGroupId": "mimikatz",
    "classification": "overlap",
    "notes": "mimikatz"
  },
  {
    "id": "sigma-file_event_win_lsass_default_dump_file_names",
    "source": "Sigma",
    "ruleName": "file_event_win_lsass_default_dump_file_names",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "procdump_lsass"
    ],
    "hitCount": 1,
    "overlapGroupId": "lsass",
    "classification": "overlap",
    "notes": "lsass"
  }
];

export const findings: Finding[] = [
  {
    "id": "keep-strongest-source",
    "category": "Keep",
    "title": "Keep strongest source rules per technique",
    "description": "Generated from S2_credential_theft: compare Sigma (68) and Elastic (148) alerts per step.",
    "relatedRuleIds": [
      "sigma-create_remote_thread_win_powershell_lsass",
      "sigma-create_remote_thread_win_susp_password_dumper_lsass"
    ],
    "relatedTechniqueIds": [
      "T1003.001",
      "T1003.001"
    ],
    "recommendation": "Retain higher-signal rules and document overlap rationale per replay step.",
    "confidence": "medium",
    "status": "draft"
  },
  {
    "id": "tune-overlap-groups",
    "category": "Tune",
    "title": "Tune overlap groups from harness coverage",
    "description": "9 overlap groups appear in the selected scenario coverage map.",
    "relatedRuleIds": [
      "sigma-create_remote_thread_win_powershell_lsass",
      "sigma-create_remote_thread_win_susp_password_dumper_lsass",
      "sigma-file_access_win_susp_dpapi_master_key_access",
      "sigma-file_event_win_cred_dump_tools_dropped_files",
      "sigma-file_event_win_hktl_mimikatz_files",
      "sigma-file_event_win_lsass_default_dump_file_names"
    ],
    "relatedTechniqueIds": [
      "T1003.001",
      "T1003.001",
      "T1003.001",
      "T1003.002",
      "T1003.002",
      "T1003.002",
      "T1003.003",
      "T1003.003",
      "T1558.003",
      "T1558.004",
      "T1003.006",
      "T1555.003",
      "T1555.003"
    ],
    "recommendation": "Tune overlapping rules to reduce duplicate alerting while preserving context.",
    "confidence": "medium",
    "status": "draft"
  },
  {
    "id": "create-gap-rules",
    "category": "Create custom rule",
    "title": "Create custom rules for uncovered replay steps",
    "description": "1 replay steps have one-sided or missing source coverage in the generated model.",
    "relatedRuleIds": [],
    "relatedTechniqueIds": [
      "T1558.004"
    ],
    "recommendation": "Author custom correlation rules for steps where one source consistently misses.",
    "confidence": "low",
    "status": "draft"
  }
];
