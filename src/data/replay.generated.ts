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
    "ruleSlug": "create_remote_thread_win_powershell_lsass",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=create_remote_thread_win_powershell_lsass",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "ruleSlug": "create_remote_thread_win_susp_password_dumper_lsass",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=create_remote_thread_win_susp_password_dumper_lsass",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "ruleSlug": "file_access_win_susp_dpapi_master_key_access",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=file_access_win_susp_dpapi_master_key_access",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "ruleSlug": "file_event_win_cred_dump_tools_dropped_files",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=file_event_win_cred_dump_tools_dropped_files",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "ruleSlug": "file_event_win_hktl_mimikatz_files",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=file_event_win_hktl_mimikatz_files",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "ruleSlug": "file_event_win_lsass_default_dump_file_names",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=file_event_win_lsass_default_dump_file_names",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-file_event_win_ntds_dit_creation",
    "source": "Sigma",
    "ruleName": "file_event_win_ntds_dit_creation",
    "ruleSlug": "file_event_win_ntds_dit_creation",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=file_event_win_ntds_dit_creation",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1003.003"
    ],
    "attackStepIds": [
      "copy_ntds"
    ],
    "hitCount": 1,
    "overlapGroupId": "ntds_dit",
    "classification": "overlap",
    "notes": "ntds.dit"
  },
  {
    "id": "sigma-file_event_win_powershell_exploit_scripts",
    "source": "Sigma",
    "ruleName": "file_event_win_powershell_exploit_scripts",
    "ruleSlug": "file_event_win_powershell_exploit_scripts",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=file_event_win_powershell_exploit_scripts",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-file_event_win_shell_write_susp_files_extensions",
    "source": "Sigma",
    "ruleName": "file_event_win_shell_write_susp_files_extensions",
    "ruleSlug": "file_event_win_shell_write_susp_files_extensions",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=file_event_win_shell_write_susp_files_extensions",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
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
    "id": "sigma-file_event_win_susp_dpapi_backup_and_cert_export_ioc",
    "source": "Sigma",
    "ruleName": "file_event_win_susp_dpapi_backup_and_cert_export_ioc",
    "ruleSlug": "file_event_win_susp_dpapi_backup_and_cert_export_ioc",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=file_event_win_susp_dpapi_backup_and_cert_export_ioc",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-image_load_side_load_aruba_networks_virtual_intranet_access",
    "source": "Sigma",
    "ruleName": "image_load_side_load_aruba_networks_virtual_intranet_access",
    "ruleSlug": "image_load_side_load_aruba_networks_virtual_intranet_access",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=image_load_side_load_aruba_networks_virtual_intranet_access",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-posh_pm_exploit_scripts",
    "source": "Sigma",
    "ruleName": "posh_pm_exploit_scripts",
    "ruleSlug": "posh_pm_exploit_scripts",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=posh_pm_exploit_scripts",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-posh_pm_susp_reset_computermachinepassword",
    "source": "Sigma",
    "ruleName": "posh_pm_susp_reset_computermachinepassword",
    "ruleSlug": "posh_pm_susp_reset_computermachinepassword",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=posh_pm_susp_reset_computermachinepassword",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "keep",
    "notes": "posh_pm_susp_reset_computermachinepassword any where winlog."
  },
  {
    "id": "sigma-proc_access_win_hktl_generic_access",
    "source": "Sigma",
    "ruleName": "proc_access_win_hktl_generic_access",
    "ruleSlug": "proc_access_win_hktl_generic_access",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_access_win_hktl_generic_access",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-proc_access_win_hktl_handlekatz_lsass_access",
    "source": "Sigma",
    "ruleName": "proc_access_win_hktl_handlekatz_lsass_access",
    "ruleSlug": "proc_access_win_hktl_handlekatz_lsass_access",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_access_win_hktl_handlekatz_lsass_access",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-proc_access_win_lsass_dump_comsvcs_dll",
    "source": "Sigma",
    "ruleName": "proc_access_win_lsass_dump_comsvcs_dll",
    "ruleSlug": "proc_access_win_lsass_dump_comsvcs_dll",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_access_win_lsass_dump_comsvcs_dll",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "overlapGroupId": "lsass",
    "classification": "overlap",
    "notes": "lsass"
  },
  {
    "id": "sigma-proc_access_win_lsass_dump_keyword_image",
    "source": "Sigma",
    "ruleName": "proc_access_win_lsass_dump_keyword_image",
    "ruleSlug": "proc_access_win_lsass_dump_keyword_image",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_access_win_lsass_dump_keyword_image",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-proc_access_win_lsass_memdump",
    "source": "Sigma",
    "ruleName": "proc_access_win_lsass_memdump",
    "ruleSlug": "proc_access_win_lsass_memdump",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_access_win_lsass_memdump",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-proc_access_win_lsass_powershell_access",
    "source": "Sigma",
    "ruleName": "proc_access_win_lsass_powershell_access",
    "ruleSlug": "proc_access_win_lsass_powershell_access",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_access_win_lsass_powershell_access",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-proc_access_win_lsass_remote_access_trough_winrm",
    "source": "Sigma",
    "ruleName": "proc_access_win_lsass_remote_access_trough_winrm",
    "ruleSlug": "proc_access_win_lsass_remote_access_trough_winrm",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_access_win_lsass_remote_access_trough_winrm",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-proc_access_win_lsass_susp_source_process",
    "source": "Sigma",
    "ruleName": "proc_access_win_lsass_susp_source_process",
    "ruleSlug": "proc_access_win_lsass_susp_source_process",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_access_win_lsass_susp_source_process",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-proc_access_win_lsass_whitelisted_process_names",
    "source": "Sigma",
    "ruleName": "proc_access_win_lsass_whitelisted_process_names",
    "ruleSlug": "proc_access_win_lsass_whitelisted_process_names",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_access_win_lsass_whitelisted_process_names",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-proc_creation_win_citrix_trolleyexpress_procdump",
    "source": "Sigma",
    "ruleName": "proc_creation_win_citrix_trolleyexpress_procdump",
    "ruleSlug": "proc_creation_win_citrix_trolleyexpress_procdump",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_citrix_trolleyexpress_procdump",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-proc_creation_win_esentutl_sensitive_file_copy",
    "source": "Sigma",
    "ruleName": "proc_creation_win_esentutl_sensitive_file_copy",
    "ruleSlug": "proc_creation_win_esentutl_sensitive_file_copy",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_esentutl_sensitive_file_copy",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1003.003"
    ],
    "attackStepIds": [
      "copy_ntds"
    ],
    "hitCount": 1,
    "overlapGroupId": "ntds_dit",
    "classification": "overlap",
    "notes": "ntds.dit"
  },
  {
    "id": "sigma-proc_creation_win_hktl_certipy",
    "source": "Sigma",
    "ruleName": "proc_creation_win_hktl_certipy",
    "ruleSlug": "proc_creation_win_hktl_certipy",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_hktl_certipy",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "overlapGroupId": "kirbi",
    "classification": "overlap",
    "notes": "kirbi"
  },
  {
    "id": "sigma-proc_creation_win_hktl_impacket_tools",
    "source": "Sigma",
    "ruleName": "proc_creation_win_hktl_impacket_tools",
    "ruleSlug": "proc_creation_win_hktl_impacket_tools",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_hktl_impacket_tools",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-proc_creation_win_hktl_relay_attacks_tools",
    "source": "Sigma",
    "ruleName": "proc_creation_win_hktl_relay_attacks_tools",
    "ruleSlug": "proc_creation_win_hktl_relay_attacks_tools",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_hktl_relay_attacks_tools",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "keep",
    "notes": "ntlmrelay"
  },
  {
    "id": "sigma-proc_creation_win_hktl_rubeus",
    "source": "Sigma",
    "ruleName": "proc_creation_win_hktl_rubeus",
    "ruleSlug": "proc_creation_win_hktl_rubeus",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_hktl_rubeus",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1558.003"
    ],
    "attackStepIds": [
      "rubeus_kerberoast"
    ],
    "hitCount": 1,
    "overlapGroupId": "kerberoast",
    "classification": "overlap",
    "notes": "kerberoast"
  },
  {
    "id": "sigma-proc_creation_win_hktl_sharp_dpapi_execution",
    "source": "Sigma",
    "ruleName": "proc_creation_win_hktl_sharp_dpapi_execution",
    "ruleSlug": "proc_creation_win_hktl_sharp_dpapi_execution",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_hktl_sharp_dpapi_execution",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "medium",
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
    "id": "sigma-proc_creation_win_hktl_sharpview",
    "source": "Sigma",
    "ruleName": "proc_creation_win_hktl_sharpview",
    "ruleSlug": "proc_creation_win_hktl_sharpview",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_hktl_sharpview",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1558.003"
    ],
    "attackStepIds": [
      "rubeus_kerberoast"
    ],
    "hitCount": 1,
    "overlapGroupId": "kerberoast",
    "classification": "overlap",
    "notes": "kerberoast"
  },
  {
    "id": "sigma-proc_creation_win_hktl_xordump",
    "source": "Sigma",
    "ruleName": "proc_creation_win_hktl_xordump",
    "ruleSlug": "proc_creation_win_hktl_xordump",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_hktl_xordump",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
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
    "id": "sigma-proc_creation_win_powershell_dsinternals_cmdlets",
    "source": "Sigma",
    "ruleName": "proc_creation_win_powershell_dsinternals_cmdlets",
    "ruleSlug": "proc_creation_win_powershell_dsinternals_cmdlets",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_powershell_dsinternals_cmdlets",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-proc_creation_win_powershell_malicious_cmdlets",
    "source": "Sigma",
    "ruleName": "proc_creation_win_powershell_malicious_cmdlets",
    "ruleSlug": "proc_creation_win_powershell_malicious_cmdlets",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_powershell_malicious_cmdlets",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-proc_creation_win_pua_seatbelt",
    "source": "Sigma",
    "ruleName": "proc_creation_win_pua_seatbelt",
    "ruleSlug": "proc_creation_win_pua_seatbelt",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_pua_seatbelt",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-proc_creation_win_pua_webbrowserpassview",
    "source": "Sigma",
    "ruleName": "proc_creation_win_pua_webbrowserpassview",
    "ruleSlug": "proc_creation_win_pua_webbrowserpassview",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_pua_webbrowserpassview",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "keep",
    "notes": "browser password"
  },
  {
    "id": "sigma-proc_creation_win_reg_dumping_sensitive_hives",
    "source": "Sigma",
    "ruleName": "proc_creation_win_reg_dumping_sensitive_hives",
    "ruleSlug": "proc_creation_win_reg_dumping_sensitive_hives",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_reg_dumping_sensitive_hives",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "taskmgr_lsass_dump"
    ],
    "hitCount": 1,
    "classification": "keep",
    "notes": "reg.exe\" or process.pe.original_file_name:\"reg.exe\") and (pr"
  },
  {
    "id": "sigma-proc_creation_win_renamed_sysinternals_procdump",
    "source": "Sigma",
    "ruleName": "proc_creation_win_renamed_sysinternals_procdump",
    "ruleSlug": "proc_creation_win_renamed_sysinternals_procdump",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_renamed_sysinternals_procdump",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-proc_creation_win_rundll32_process_dump_via_comsvcs",
    "source": "Sigma",
    "ruleName": "proc_creation_win_rundll32_process_dump_via_comsvcs",
    "ruleSlug": "proc_creation_win_rundll32_process_dump_via_comsvcs",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_rundll32_process_dump_via_comsvcs",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "overlapGroupId": "comsvcs",
    "classification": "overlap",
    "notes": "comsvcs"
  },
  {
    "id": "sigma-proc_creation_win_rundll32_susp_activity",
    "source": "Sigma",
    "ruleName": "proc_creation_win_rundll32_susp_activity",
    "ruleSlug": "proc_creation_win_rundll32_susp_activity",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_rundll32_susp_activity",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "overlapGroupId": "comsvcs",
    "classification": "overlap",
    "notes": "comsvcs"
  },
  {
    "id": "sigma-proc_creation_win_susp_copy_browser_data",
    "source": "Sigma",
    "ruleName": "proc_creation_win_susp_copy_browser_data",
    "ruleSlug": "proc_creation_win_susp_copy_browser_data",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_susp_copy_browser_data",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1003.003"
    ],
    "attackStepIds": [
      "copy_ntds"
    ],
    "hitCount": 1,
    "classification": "keep",
    "notes": "browser_data"
  },
  {
    "id": "sigma-proc_creation_win_susp_ntds",
    "source": "Sigma",
    "ruleName": "proc_creation_win_susp_ntds",
    "ruleSlug": "proc_creation_win_susp_ntds",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_susp_ntds",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1003.003"
    ],
    "attackStepIds": [
      "copy_ntds"
    ],
    "hitCount": 1,
    "overlapGroupId": "ntds_dit",
    "classification": "overlap",
    "notes": "ntds.dit"
  },
  {
    "id": "sigma-proc_creation_win_susp_progname",
    "source": "Sigma",
    "ruleName": "proc_creation_win_susp_progname",
    "ruleSlug": "proc_creation_win_susp_progname",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_susp_progname",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-proc_creation_win_sysinternals_procdump_lsass",
    "source": "Sigma",
    "ruleName": "proc_creation_win_sysinternals_procdump_lsass",
    "ruleSlug": "proc_creation_win_sysinternals_procdump_lsass",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_sysinternals_procdump_lsass",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "critical",
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
    "id": "sigma-proc_creation_win_sysinternals_tools_masquerading",
    "source": "Sigma",
    "ruleName": "proc_creation_win_sysinternals_tools_masquerading",
    "ruleSlug": "proc_creation_win_sysinternals_tools_masquerading",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_sysinternals_tools_masquerading",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-proc_creation_win_where_browser_data_recon",
    "source": "Sigma",
    "ruleName": "proc_creation_win_where_browser_data_recon",
    "ruleSlug": "proc_creation_win_where_browser_data_recon",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_where_browser_data_recon",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1555.003"
    ],
    "attackStepIds": [
      "copy_chrome_login_data"
    ],
    "hitCount": 1,
    "classification": "keep",
    "notes": "browser_data"
  },
  {
    "id": "sigma-proc_creation_win_wmic_uninstall_security_products",
    "source": "Sigma",
    "ruleName": "proc_creation_win_wmic_uninstall_security_products",
    "ruleSlug": "proc_creation_win_wmic_uninstall_security_products",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=proc_creation_win_wmic_uninstall_security_products",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1003.002"
    ],
    "attackStepIds": [
      "reg_save_security"
    ],
    "hitCount": 1,
    "classification": "keep",
    "notes": "credential store"
  },
  {
    "id": "sigma-registry_event_cve_2021_1675_mimikatz_printernightmare_drivers",
    "source": "Sigma",
    "ruleName": "registry_event_cve_2021_1675_mimikatz_printernightmare_drivers",
    "ruleSlug": "registry_event_cve_2021_1675_mimikatz_printernightmare_drivers",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=registry_event_cve_2021_1675_mimikatz_printernightmare_drivers",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-registry_event_disable_wdigest_credential_guard",
    "source": "Sigma",
    "ruleName": "registry_event_disable_wdigest_credential_guard",
    "ruleSlug": "registry_event_disable_wdigest_credential_guard",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=registry_event_disable_wdigest_credential_guard",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "overlapGroupId": "wdigest",
    "classification": "overlap",
    "notes": "wdigest"
  },
  {
    "id": "sigma-registry_event_silentprocessexit_lsass",
    "source": "Sigma",
    "ruleName": "registry_event_silentprocessexit_lsass",
    "ruleSlug": "registry_event_silentprocessexit_lsass",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=registry_event_silentprocessexit_lsass",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-registry_event_susp_lsass_dll_load",
    "source": "Sigma",
    "ruleName": "registry_event_susp_lsass_dll_load",
    "ruleSlug": "registry_event_susp_lsass_dll_load",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=registry_event_susp_lsass_dll_load",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-registry_set_dsrm_tampering",
    "source": "Sigma",
    "ruleName": "registry_set_dsrm_tampering",
    "ruleSlug": "registry_set_dsrm_tampering",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=registry_set_dsrm_tampering",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "keep",
    "notes": "dsrm"
  },
  {
    "id": "sigma-registry_set_lsass_usermode_dumping",
    "source": "Sigma",
    "ruleName": "registry_set_lsass_usermode_dumping",
    "ruleSlug": "registry_set_lsass_usermode_dumping",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=registry_set_lsass_usermode_dumping",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-registry_set_pua_sysinternals_renamed_execution_via_eula",
    "source": "Sigma",
    "ruleName": "registry_set_pua_sysinternals_renamed_execution_via_eula",
    "ruleSlug": "registry_set_pua_sysinternals_renamed_execution_via_eula",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=registry_set_pua_sysinternals_renamed_execution_via_eula",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "medium",
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
    "id": "sigma-registry_set_pua_sysinternals_susp_execution_via_eula",
    "source": "Sigma",
    "ruleName": "registry_set_pua_sysinternals_susp_execution_via_eula",
    "ruleSlug": "registry_set_pua_sysinternals_susp_execution_via_eula",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=registry_set_pua_sysinternals_susp_execution_via_eula",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "medium",
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
    "id": "sigma-registry_set_renamed_sysinternals_eula_accepted",
    "source": "Sigma",
    "ruleName": "registry_set_renamed_sysinternals_eula_accepted",
    "ruleSlug": "registry_set_renamed_sysinternals_eula_accepted",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=registry_set_renamed_sysinternals_eula_accepted",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-registry_set_wdigest_enable_uselogoncredential",
    "source": "Sigma",
    "ruleName": "registry_set_wdigest_enable_uselogoncredential",
    "ruleSlug": "registry_set_wdigest_enable_uselogoncredential",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=registry_set_wdigest_enable_uselogoncredential",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "overlapGroupId": "wdigest",
    "classification": "overlap",
    "notes": "wdigest"
  },
  {
    "id": "sigma-win_certificateservicesclient_lifecycle_system_cert_exported",
    "source": "Sigma",
    "ruleName": "win_certificateservicesclient_lifecycle_system_cert_exported",
    "ruleSlug": "win_certificateservicesclient_lifecycle_system_cert_exported",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=win_certificateservicesclient_lifecycle_system_cert_exported",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1003.002"
    ],
    "attackStepIds": [
      "reg_save_system"
    ],
    "hitCount": 1,
    "classification": "keep",
    "notes": "win_certificateservices"
  },
  {
    "id": "sigma-win_defender_asr_lsass_access",
    "source": "Sigma",
    "ruleName": "win_defender_asr_lsass_access",
    "ruleSlug": "win_defender_asr_lsass_access",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=win_defender_asr_lsass_access",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-win_security_dpapi_domain_masterkey_backup_attempt",
    "source": "Sigma",
    "ruleName": "win_security_dpapi_domain_masterkey_backup_attempt",
    "ruleSlug": "win_security_dpapi_domain_masterkey_backup_attempt",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=win_security_dpapi_domain_masterkey_backup_attempt",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1003.002"
    ],
    "attackStepIds": [
      "reg_save_security"
    ],
    "hitCount": 1,
    "overlapGroupId": "dpapi",
    "classification": "overlap",
    "notes": "dpapi"
  },
  {
    "id": "sigma-win_security_kerberoasting_activity",
    "source": "Sigma",
    "ruleName": "win_security_kerberoasting_activity",
    "ruleSlug": "win_security_kerberoasting_activity",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=win_security_kerberoasting_activity",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1003.002"
    ],
    "attackStepIds": [
      "reg_save_security"
    ],
    "hitCount": 1,
    "overlapGroupId": "kerberoast",
    "classification": "overlap",
    "notes": "kerberoast"
  },
  {
    "id": "sigma-win_security_lsass_access_non_system_account",
    "source": "Sigma",
    "ruleName": "win_security_lsass_access_non_system_account",
    "ruleSlug": "win_security_lsass_access_non_system_account",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=win_security_lsass_access_non_system_account",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-win_security_password_policy_enumerated",
    "source": "Sigma",
    "ruleName": "win_security_password_policy_enumerated",
    "ruleSlug": "win_security_password_policy_enumerated",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=win_security_password_policy_enumerated",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1003.002"
    ],
    "attackStepIds": [
      "reg_save_security"
    ],
    "hitCount": 1,
    "classification": "keep",
    "notes": "security account"
  },
  {
    "id": "sigma-win_security_register_new_logon_process_by_rubeus",
    "source": "Sigma",
    "ruleName": "win_security_register_new_logon_process_by_rubeus",
    "ruleSlug": "win_security_register_new_logon_process_by_rubeus",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=win_security_register_new_logon_process_by_rubeus",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1003.002"
    ],
    "attackStepIds": [
      "reg_save_security"
    ],
    "hitCount": 1,
    "classification": "keep",
    "notes": "rubeus"
  },
  {
    "id": "sigma-win_security_susp_dsrm_password_change",
    "source": "Sigma",
    "ruleName": "win_security_susp_dsrm_password_change",
    "ruleSlug": "win_security_susp_dsrm_password_change",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=win_security_susp_dsrm_password_change",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1003.002"
    ],
    "attackStepIds": [
      "reg_save_security"
    ],
    "hitCount": 1,
    "classification": "keep",
    "notes": "dsrm"
  },
  {
    "id": "sigma-win_security_susp_lsass_dump",
    "source": "Sigma",
    "ruleName": "win_security_susp_lsass_dump",
    "ruleSlug": "win_security_susp_lsass_dump",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=win_security_susp_lsass_dump",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
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
    "id": "sigma-win_security_susp_rc4_kerberos",
    "source": "Sigma",
    "ruleName": "win_security_susp_rc4_kerberos",
    "ruleSlug": "win_security_susp_rc4_kerberos",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=win_security_susp_rc4_kerberos",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1003.002"
    ],
    "attackStepIds": [
      "reg_save_security"
    ],
    "hitCount": 1,
    "classification": "keep",
    "notes": "kerberos any where winlog.channel:\"security\" and ((event.cod"
  },
  {
    "id": "sigma-win_security_transf_files_with_cred_data_via_network_shares",
    "source": "Sigma",
    "ruleName": "win_security_transf_files_with_cred_data_via_network_shares",
    "ruleSlug": "win_security_transf_files_with_cred_data_via_network_shares",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=win_security_transf_files_with_cred_data_via_network_shares",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
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
    "id": "sigma-win_susp_ntlm_auth",
    "source": "Sigma",
    "ruleName": "win_susp_ntlm_auth",
    "ruleSlug": "win_susp_ntlm_auth",
    "lookupUrl": "https://github.com/SigmaHQ/sigma/search?q=win_susp_ntlm_auth",
    "applyHint": "Search the slug in SigmaHQ and convert/translate to your stack where needed.",
    "severity": "low",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "keep",
    "notes": "win_susp_ntlm"
  },
  {
    "id": "elastic-command_and_control_beaconing",
    "source": "Elastic",
    "ruleName": "Statistical Model Detected C2 Beaconing Activity",
    "ruleSlug": "command_and_control_beaconing",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=command_and_control_beaconing",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "high",
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
    "id": "elastic-credential_access_adidns_wildcard",
    "source": "Elastic",
    "ruleName": "Potential ADIDNS Poisoning via Wildcard Record Creation",
    "ruleSlug": "credential_access_adidns_wildcard",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_adidns_wildcard",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_adidns_wpad_record",
    "source": "Elastic",
    "ruleName": "Potential WPAD Spoofing via DNS Record Creation",
    "ruleSlug": "credential_access_adidns_wpad_record",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_adidns_wpad_record",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_attempted_bypass_of_okta_mfa",
    "source": "Elastic",
    "ruleName": "Attempted Bypass of Okta MFA",
    "ruleSlug": "credential_access_attempted_bypass_of_okta_mfa",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_attempted_bypass_of_okta_mfa",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_attempts_to_brute_force_okta_user_account",
    "source": "Elastic",
    "ruleName": "Attempts to Brute Force an Okta User Account",
    "ruleSlug": "credential_access_attempts_to_brute_force_okta_user_account",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_attempts_to_brute_force_okta_user_account",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_aws_creds_search_inside_container",
    "source": "Elastic",
    "ruleName": "AWS Credentials Searched For Inside A Container",
    "ruleSlug": "credential_access_aws_creds_search_inside_container",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_aws_creds_search_inside_container",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_aws_getpassword_for_ec2_instance",
    "source": "Elastic",
    "ruleName": "AWS EC2 Unauthorized Admin Credential Fetch via Assumed Role",
    "ruleSlug": "credential_access_aws_getpassword_for_ec2_instance",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_aws_getpassword_for_ec2_instance",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_azure_arc_proxy_secret_configmap_access",
    "source": "Elastic",
    "ruleName": "Kubernetes Secret or ConfigMap Access via Azure Arc Proxy",
    "ruleSlug": "credential_access_azure_arc_proxy_secret_configmap_access",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_azure_arc_proxy_secret_configmap_access",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_azure_entra_susp_device_code_signin",
    "source": "Elastic",
    "ruleName": "Entra ID OAuth Device Code Flow with Concurrent Sign-ins",
    "ruleSlug": "credential_access_azure_entra_susp_device_code_signin",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_azure_entra_susp_device_code_signin",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_azure_service_principal_signin_then_arc_credential_listing",
    "source": "Elastic",
    "ruleName": "Azure Service Principal Sign-In Followed by Arc Cluster Credential Access",
    "ruleSlug": "credential_access_azure_service_principal_signin_then_arc_credential_listing",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_azure_service_principal_signin_then_arc_credential_listing",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_azure_storage_account_keys_accessed",
    "source": "Elastic",
    "ruleName": "Azure Storage Account Keys Accessed by Privileged User",
    "ruleSlug": "credential_access_azure_storage_account_keys_accessed",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_azure_storage_account_keys_accessed",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_bruteforce_admin_account",
    "source": "Elastic",
    "ruleName": "Privileged Accounts Brute Force",
    "ruleSlug": "credential_access_bruteforce_admin_account",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_bruteforce_admin_account",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_bruteforce_multiple_logon_failure_followed_by_success",
    "source": "Elastic",
    "ruleName": "Multiple Logon Failure Followed by Logon Success",
    "ruleSlug": "credential_access_bruteforce_multiple_logon_failure_followed_by_success",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_bruteforce_multiple_logon_failure_followed_by_success",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_bruteforce_multiple_logon_failure_same_srcip",
    "source": "Elastic",
    "ruleName": "Multiple Logon Failure from the same Source Address",
    "ruleSlug": "credential_access_bruteforce_multiple_logon_failure_same_srcip",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_bruteforce_multiple_logon_failure_same_srcip",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_cloud_creds_search_inside_a_container",
    "source": "Elastic",
    "ruleName": "Cloud Credential Search Detected via Defend for Containers",
    "ruleSlug": "credential_access_cloud_creds_search_inside_a_container",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_cloud_creds_search_inside_a_container",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_cmdline_dump_tool",
    "source": "Elastic",
    "ruleName": "Potential Credential Access via Windows Utilities",
    "ruleSlug": "credential_access_cmdline_dump_tool",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_cmdline_dump_tool",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "overlapGroupId": "comsvcs",
    "classification": "overlap",
    "notes": "comsvcs"
  },
  {
    "id": "elastic-credential_access_collection_sensitive_files",
    "source": "Elastic",
    "ruleName": "Sensitive Files Compression",
    "ruleSlug": "credential_access_collection_sensitive_files",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_collection_sensitive_files",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "medium",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_collection_sensitive_files_compression_inside_a_container",
    "source": "Elastic",
    "ruleName": "Sensitive File Compression Detected via Defend for Containers",
    "ruleSlug": "credential_access_collection_sensitive_files_compression_inside_a_container",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_collection_sensitive_files_compression_inside_a_container",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "medium",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_collection_sensitive_files_compression_inside_container",
    "source": "Elastic",
    "ruleName": "Sensitive Files Compression Inside A Container",
    "ruleSlug": "credential_access_collection_sensitive_files_compression_inside_container",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_collection_sensitive_files_compression_inside_container",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_cookies_chromium_browsers_debugging",
    "source": "Elastic",
    "ruleName": "Potential Cookies Theft via Browser Debugging",
    "ruleSlug": "credential_access_cookies_chromium_browsers_debugging",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_cookies_chromium_browsers_debugging",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_copy_ntds_sam_volshadowcp_cmdline",
    "source": "Elastic",
    "ruleName": "NTDS or SAM Database File Copied",
    "ruleSlug": "credential_access_copy_ntds_sam_volshadowcp_cmdline",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_copy_ntds_sam_volshadowcp_cmdline",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.003"
    ],
    "attackStepIds": [
      "copy_ntds"
    ],
    "hitCount": 1,
    "overlapGroupId": "ntds_dit",
    "classification": "overlap",
    "notes": "ntds.dit"
  },
  {
    "id": "elastic-credential_access_credential_dumping",
    "source": "Elastic",
    "ruleName": "Potential Linux Credential Dumping via Unshadow",
    "ruleSlug": "credential_access_credential_dumping",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_credential_dumping",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "taskmgr_lsass_dump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_dump"
  },
  {
    "id": "elastic-credential_access_credential_dumping_msbuild",
    "source": "Elastic",
    "ruleName": "Potential Credential Access via Trusted Developer Utility",
    "ruleSlug": "credential_access_credential_dumping_msbuild",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_credential_dumping_msbuild",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "taskmgr_lsass_dump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_dump"
  },
  {
    "id": "elastic-credential_access_credentials_keychains",
    "source": "Elastic",
    "ruleName": "Keychain CommandLine Interaction via Unsigned or Untrusted Process",
    "ruleSlug": "credential_access_credentials_keychains",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_credentials_keychains",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_dcsync_newterm_subjectuser",
    "source": "Elastic",
    "ruleName": "FirstTime Seen Account Performing DCSync",
    "ruleSlug": "credential_access_dcsync_newterm_subjectuser",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_dcsync_newterm_subjectuser",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.006"
    ],
    "attackStepIds": [
      "mimikatz_dcsync"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "dcsync"
  },
  {
    "id": "elastic-credential_access_dcsync_replication_rights",
    "source": "Elastic",
    "ruleName": "Potential Credential Access via DCSync",
    "ruleSlug": "credential_access_dcsync_replication_rights",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_dcsync_replication_rights",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.006"
    ],
    "attackStepIds": [
      "mimikatz_dcsync"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "dcsync"
  },
  {
    "id": "elastic-credential_access_dcsync_user_backdoor",
    "source": "Elastic",
    "ruleName": "Potential Active Directory Replication Account Backdoor",
    "ruleSlug": "credential_access_dcsync_user_backdoor",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_dcsync_user_backdoor",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.006"
    ],
    "attackStepIds": [
      "mimikatz_dcsync"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "dcsync"
  },
  {
    "id": "elastic-credential_access_disable_kerberos_preauth",
    "source": "Elastic",
    "ruleName": "Kerberos Pre-authentication Disabled for User",
    "ruleSlug": "credential_access_disable_kerberos_preauth",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_disable_kerberos_preauth",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_dnsnode_creation",
    "source": "Elastic",
    "ruleName": "Creation of a DNS-Named Record",
    "ruleSlug": "credential_access_dnsnode_creation",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_dnsnode_creation",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_dollar_account_relay_kerberos",
    "source": "Elastic",
    "ruleName": "Potential Kerberos Relay Attack against a Computer Account",
    "ruleSlug": "credential_access_dollar_account_relay_kerberos",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_dollar_account_relay_kerberos",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
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
    "id": "elastic-credential_access_dollar_account_relay_ntlm",
    "source": "Elastic",
    "ruleName": "Potential NTLM Relay Attack against a Computer Account",
    "ruleSlug": "credential_access_dollar_account_relay_ntlm",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_dollar_account_relay_ntlm",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
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
    "id": "elastic-credential_access_domain_backup_dpapi_private_keys",
    "source": "Elastic",
    "ruleName": "Creation or Modification of Domain Backup DPAPI private key",
    "ruleSlug": "credential_access_domain_backup_dpapi_private_keys",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_domain_backup_dpapi_private_keys",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
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
    "id": "elastic-credential_access_dumping_hashes_bi_cmds",
    "source": "Elastic",
    "ruleName": "Dumping Account Hashes via Built-In Commands",
    "ruleSlug": "credential_access_dumping_hashes_bi_cmds",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_dumping_hashes_bi_cmds",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "taskmgr_lsass_dump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_dumping_keychain_security",
    "source": "Elastic",
    "ruleName": "Dumping of Keychain Content via Security Command",
    "ruleSlug": "credential_access_dumping_keychain_security",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_dumping_keychain_security",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "taskmgr_lsass_dump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_endgame_cred_dumping_detected",
    "source": "Elastic",
    "ruleName": "Credential Dumping - Detected - Elastic Endgame",
    "ruleSlug": "credential_access_endgame_cred_dumping_detected",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_endgame_cred_dumping_detected",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "taskmgr_lsass_dump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_endgame_cred_dumping_prevented",
    "source": "Elastic",
    "ruleName": "Credential Dumping - Prevented - Elastic Endgame",
    "ruleSlug": "credential_access_endgame_cred_dumping_prevented",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_endgame_cred_dumping_prevented",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "taskmgr_lsass_dump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_entra_id_excessive_account_lockouts",
    "source": "Elastic",
    "ruleName": "Entra ID Excessive Account Lockouts Detected",
    "ruleSlug": "credential_access_entra_id_excessive_account_lockouts",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_entra_id_excessive_account_lockouts",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_entra_id_suspicious_signin",
    "source": "Elastic",
    "ruleName": "Entra ID Concurrent Sign-in with Suspicious Properties",
    "ruleSlug": "credential_access_entra_id_suspicious_signin",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_entra_id_suspicious_signin",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_entra_id_totp_brute_force_attempts",
    "source": "Elastic",
    "ruleName": "Entra ID MFA TOTP Brute Force Attempted",
    "ruleSlug": "credential_access_entra_id_totp_brute_force_attempts",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_entra_id_totp_brute_force_attempts",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_forced_authentication_pipes",
    "source": "Elastic",
    "ruleName": "Active Directory Forced Authentication from Linux Host - SMB Named Pipes",
    "ruleSlug": "credential_access_forced_authentication_pipes",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_forced_authentication_pipes",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
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
    "id": "elastic-credential_access_gdb_init_process_hooking",
    "source": "Elastic",
    "ruleName": "Linux init (PID 1) Secret Dump via GDB",
    "ruleSlug": "credential_access_gdb_init_process_hooking",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_gdb_init_process_hooking",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_gdb_process_hooking",
    "source": "Elastic",
    "ruleName": "Linux Process Hooking via GDB",
    "ruleSlug": "credential_access_gdb_process_hooking",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_gdb_process_hooking",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_get_secrets_access",
    "source": "Elastic",
    "ruleName": "Kubernetes Secret Access via Unusual User Agent",
    "ruleSlug": "credential_access_get_secrets_access",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_get_secrets_access",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_gh_auth_via_nodejs",
    "source": "Elastic",
    "ruleName": "GitHub Authentication Token Access via Node.js",
    "ruleSlug": "credential_access_gh_auth_via_nodejs",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_gh_auth_via_nodejs",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_gitleaks_execution",
    "source": "Elastic",
    "ruleName": "Potential Secret Scanning via Gitleaks",
    "ruleSlug": "credential_access_gitleaks_execution",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_gitleaks_execution",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_google_workspace_drive_encryption_key_accessed_by_anonymous_user",
    "source": "Elastic",
    "ruleName": "Google Workspace Drive Encryption Key(s) Accessed from Anonymous User",
    "ruleSlug": "credential_access_google_workspace_drive_encryption_key_accessed_by_anonymous_user",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_google_workspace_drive_encryption_key_accessed_by_anonymous_user",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_grep_recursive_credential_discovery",
    "source": "Elastic",
    "ruleName": "Potential Credential Discovery via Recursive Grep",
    "ruleSlug": "credential_access_grep_recursive_credential_discovery",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_grep_recursive_credential_discovery",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_high_volume_of_pbpaste",
    "source": "Elastic",
    "ruleName": "Suspicious pbpaste High Volume Activity",
    "ruleSlug": "credential_access_high_volume_of_pbpaste",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_high_volume_of_pbpaste",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_iam_compromisedkeyquarantine_policy_attached_to_user",
    "source": "Elastic",
    "ruleName": "AWS IAM CompromisedKeyQuarantine Policy Attached to User",
    "ruleSlug": "credential_access_iam_compromisedkeyquarantine_policy_attached_to_user",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_iam_compromisedkeyquarantine_policy_attached_to_user",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_iam_long_term_access_key_first_seen_from_source_ip",
    "source": "Elastic",
    "ruleName": "AWS IAM Long-Term Access Key First Seen from Source IP",
    "ruleSlug": "credential_access_iam_long_term_access_key_first_seen_from_source_ip",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_iam_long_term_access_key_first_seen_from_source_ip",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_iam_user_addition_to_group",
    "source": "Elastic",
    "ruleName": "AWS IAM User Addition to Group",
    "ruleSlug": "credential_access_iam_user_addition_to_group",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_iam_user_addition_to_group",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_identity_user_account_lockouts",
    "source": "Elastic",
    "ruleName": "M365 Identity User Account Lockouts",
    "ruleSlug": "credential_access_identity_user_account_lockouts",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_identity_user_account_lockouts",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_iis_connectionstrings_dumping",
    "source": "Elastic",
    "ruleName": "Microsoft IIS Connection Strings Decryption",
    "ruleSlug": "credential_access_iis_connectionstrings_dumping",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_iis_connectionstrings_dumping",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "taskmgr_lsass_dump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_imageload_azureadconnectauthsvc",
    "source": "Elastic",
    "ruleName": "Untrusted DLL Loaded by Azure AD Sync Service",
    "ruleSlug": "credential_access_imageload_azureadconnectauthsvc",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_imageload_azureadconnectauthsvc",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_kerberoasting_unusual_process",
    "source": "Elastic",
    "ruleName": "Kerberos Traffic from Unusual Process",
    "ruleSlug": "credential_access_kerberoasting_unusual_process",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_kerberoasting_unusual_process",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
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
    "id": "elastic-credential_access_kerberos_coerce",
    "source": "Elastic",
    "ruleName": "Potential Kerberos Coercion via DNS-Based SPN Spoofing",
    "ruleSlug": "credential_access_kerberos_coerce",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_kerberos_coerce",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "coerce"
  },
  {
    "id": "elastic-credential_access_kerberos_coerce_dns",
    "source": "Elastic",
    "ruleName": "Potential Kerberos SPN Spoofing via Suspicious DNS Query",
    "ruleSlug": "credential_access_kerberos_coerce_dns",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_kerberos_coerce_dns",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "coerce"
  },
  {
    "id": "elastic-credential_access_kerberosdump_kcc",
    "source": "Elastic",
    "ruleName": "Kerberos Cached Credentials Dumping",
    "ruleSlug": "credential_access_kerberosdump_kcc",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_kerberosdump_kcc",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "taskmgr_lsass_dump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_key_vault_excessive_retrieval",
    "source": "Elastic",
    "ruleName": "Azure Key Vault Excessive Secret or Key Retrieved",
    "ruleSlug": "credential_access_key_vault_excessive_retrieval",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_key_vault_excessive_retrieval",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_key_vault_retrieval_from_rare_identity",
    "source": "Elastic",
    "ruleName": "Azure Key Vault Unusual Secret Key Usage",
    "ruleSlug": "credential_access_key_vault_retrieval_from_rare_identity",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_key_vault_retrieval_from_rare_identity",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_keychain_pwd_retrieval_security_cmd",
    "source": "Elastic",
    "ruleName": "Keychain Password Retrieval via Command Line",
    "ruleSlug": "credential_access_keychain_pwd_retrieval_security_cmd",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_keychain_pwd_retrieval_security_cmd",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.002"
    ],
    "attackStepIds": [
      "reg_save_security"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_kirbi_file",
    "source": "Elastic",
    "ruleName": "Kirbi File Creation",
    "ruleSlug": "credential_access_kirbi_file",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_kirbi_file",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "overlapGroupId": "kirbi",
    "classification": "overlap",
    "notes": "kirbi"
  },
  {
    "id": "elastic-credential_access_kubernetes_service_account_secret_access",
    "source": "Elastic",
    "ruleName": "Kubernetes Service Account Secret Access",
    "ruleSlug": "credential_access_kubernetes_service_account_secret_access",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_kubernetes_service_account_secret_access",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_ldap_attributes",
    "source": "Elastic",
    "ruleName": "Access to a Sensitive LDAP Attribute",
    "ruleSlug": "credential_access_ldap_attributes",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_ldap_attributes",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
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
    "id": "elastic-credential_access_lsass_handle_via_malseclogon",
    "source": "Elastic",
    "ruleName": "Suspicious LSASS Access via MalSecLogon",
    "ruleSlug": "credential_access_lsass_handle_via_malseclogon",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_lsass_handle_via_malseclogon",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
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
    "id": "elastic-credential_access_lsass_loaded_susp_dll",
    "source": "Elastic",
    "ruleName": "Suspicious Module Loaded by LSASS",
    "ruleSlug": "credential_access_lsass_loaded_susp_dll",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_lsass_loaded_susp_dll",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
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
    "id": "elastic-credential_access_lsass_memdump_file_created",
    "source": "Elastic",
    "ruleName": "LSASS Memory Dump Creation",
    "ruleSlug": "credential_access_lsass_memdump_file_created",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_lsass_memdump_file_created",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
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
    "id": "elastic-credential_access_lsass_memdump_handle_access",
    "source": "Elastic",
    "ruleName": "LSASS Memory Dump Handle Access",
    "ruleSlug": "credential_access_lsass_memdump_handle_access",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_lsass_memdump_handle_access",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
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
    "id": "elastic-credential_access_lsass_openprocess_api",
    "source": "Elastic",
    "ruleName": "LSASS Process Access via Windows API",
    "ruleSlug": "credential_access_lsass_openprocess_api",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_lsass_openprocess_api",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
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
    "id": "elastic-credential_access_machine_account_smb_relay",
    "source": "Elastic",
    "ruleName": "Potential Machine Account Relay Attack via SMB",
    "ruleSlug": "credential_access_machine_account_smb_relay",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_machine_account_smb_relay",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_manual_memory_dumping",
    "source": "Elastic",
    "ruleName": "Manual Memory Dumping via Proc Filesystem",
    "ruleSlug": "credential_access_manual_memory_dumping",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_manual_memory_dumping",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "taskmgr_lsass_dump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_mimikatz_memssp_default_logs",
    "source": "Elastic",
    "ruleName": "Mimikatz Memssp Log File Detected",
    "ruleSlug": "credential_access_mimikatz_memssp_default_logs",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_mimikatz_memssp_default_logs",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
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
    "id": "elastic-credential_access_mimikatz_powershell_module",
    "source": "Elastic",
    "ruleName": "Potential Invoke-Mimikatz PowerShell Script",
    "ruleSlug": "credential_access_mimikatz_powershell_module",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_mimikatz_powershell_module",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
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
    "id": "elastic-credential_access_mitm_localhost_webproxy",
    "source": "Elastic",
    "ruleName": "WebProxy Settings Modification",
    "ruleSlug": "credential_access_mitm_localhost_webproxy",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_mitm_localhost_webproxy",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_mod_wdigest_security_provider",
    "source": "Elastic",
    "ruleName": "Modification of WDigest Security Provider",
    "ruleSlug": "credential_access_mod_wdigest_security_provider",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_mod_wdigest_security_provider",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.002"
    ],
    "attackStepIds": [
      "reg_save_security"
    ],
    "hitCount": 1,
    "overlapGroupId": "wdigest",
    "classification": "overlap",
    "notes": "wdigest"
  },
  {
    "id": "elastic-credential_access_multi_could_secrets_via_api",
    "source": "Elastic",
    "ruleName": "Multiple Cloud Secrets Accessed by Source Address",
    "ruleSlug": "credential_access_multi_could_secrets_via_api",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_multi_could_secrets_via_api",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_multiple_auth_events_from_single_device_behind_proxy",
    "source": "Elastic",
    "ruleName": "Multiple Okta User Auth Events with Same Device Token Hash Behind a Proxy",
    "ruleSlug": "credential_access_multiple_auth_events_from_single_device_behind_proxy",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_multiple_auth_events_from_single_device_behind_proxy",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_multiple_device_token_hashes_for_single_okta_session",
    "source": "Elastic",
    "ruleName": "Multiple Device Token Hashes for Single Okta Session",
    "ruleSlug": "credential_access_multiple_device_token_hashes_for_single_okta_session",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_multiple_device_token_hashes_for_single_okta_session",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_multiple_user_agent_os_authentication",
    "source": "Elastic",
    "ruleName": "Okta Multiple OS Names Detected for a Single DT Hash",
    "ruleSlug": "credential_access_multiple_user_agent_os_authentication",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_multiple_user_agent_os_authentication",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_network_full_network_packet_capture_detected",
    "source": "Elastic",
    "ruleName": "Azure VNet Full Network Packet Capture Enabled",
    "ruleSlug": "credential_access_network_full_network_packet_capture_detected",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_network_full_network_packet_capture_detected",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_new_terms_secretsmanager_getsecretvalue",
    "source": "Elastic",
    "ruleName": "First Time Seen AWS Secret Value Accessed in Secrets Manager",
    "ruleSlug": "credential_access_new_terms_secretsmanager_getsecretvalue",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_new_terms_secretsmanager_getsecretvalue",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_okta_aitm_session_cookie_replay",
    "source": "Elastic",
    "ruleName": "Okta AiTM Session Cookie Replay",
    "ruleSlug": "credential_access_okta_aitm_session_cookie_replay",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_okta_aitm_session_cookie_replay",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_okta_authentication_for_multiple_users_with_the_same_device_token_hash",
    "source": "Elastic",
    "ruleName": "Multiple Okta User Authentication Events with Same Device Token Hash",
    "ruleSlug": "credential_access_okta_authentication_for_multiple_users_with_the_same_device_token_hash",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_okta_authentication_for_multiple_users_with_the_same_device_token_hash",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_okta_brute_force_device_token_rotation",
    "source": "Elastic",
    "ruleName": "Potential Okta Brute Force (Device Token Rotation)",
    "ruleSlug": "credential_access_okta_brute_force_device_token_rotation",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_okta_brute_force_device_token_rotation",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_okta_brute_force_multi_source",
    "source": "Elastic",
    "ruleName": "Potential Okta Brute Force (Multi-Source)",
    "ruleSlug": "credential_access_okta_brute_force_multi_source",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_okta_brute_force_multi_source",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_okta_credential_stuffing_single_source",
    "source": "Elastic",
    "ruleName": "Potential Okta Credential Stuffing (Single Source)",
    "ruleSlug": "credential_access_okta_credential_stuffing_single_source",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_okta_credential_stuffing_single_source",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_okta_mfa_bombing_via_push_notifications",
    "source": "Elastic",
    "ruleName": "Potential Okta MFA Bombing via Push Notifications",
    "ruleSlug": "credential_access_okta_mfa_bombing_via_push_notifications",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_okta_mfa_bombing_via_push_notifications",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_okta_password_spray_multi_source",
    "source": "Elastic",
    "ruleName": "Potential Okta Password Spray (Multi-Source)",
    "ruleSlug": "credential_access_okta_password_spray_multi_source",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_okta_password_spray_multi_source",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_okta_password_spray_single_source",
    "source": "Elastic",
    "ruleName": "Potential Okta Password Spray (Single Source)",
    "ruleSlug": "credential_access_okta_password_spray_single_source",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_okta_password_spray_single_source",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_okta_potentially_successful_okta_bombing_via_push_notifications",
    "source": "Elastic",
    "ruleName": "Potentially Successful Okta MFA Bombing via Push Notifications",
    "ruleSlug": "credential_access_okta_potentially_successful_okta_bombing_via_push_notifications",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_okta_potentially_successful_okta_bombing_via_push_notifications",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_okta_successful_login_after_credential_attack",
    "source": "Elastic",
    "ruleName": "Okta Successful Login After Credential Attack",
    "ruleSlug": "credential_access_okta_successful_login_after_credential_attack",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_okta_successful_login_after_credential_attack",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1555.003"
    ],
    "attackStepIds": [
      "copy_chrome_login_data"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_posh_invoke_ninjacopy",
    "source": "Elastic",
    "ruleName": "PowerShell Invoke-NinjaCopy script",
    "ruleSlug": "credential_access_posh_invoke_ninjacopy",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_posh_invoke_ninjacopy",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.003"
    ],
    "attackStepIds": [
      "copy_ntds"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_posh_minidump",
    "source": "Elastic",
    "ruleName": "PowerShell MiniDump Script",
    "ruleSlug": "credential_access_posh_minidump",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_posh_minidump",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_posh_request_ticket",
    "source": "Elastic",
    "ruleName": "PowerShell Kerberos Ticket Request",
    "ruleSlug": "credential_access_posh_request_ticket",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_posh_request_ticket",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_posh_veeam_sql",
    "source": "Elastic",
    "ruleName": "PowerShell Script with Veeam Credential Access Capabilities",
    "ruleSlug": "credential_access_posh_veeam_sql",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_posh_veeam_sql",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_potential_linux_local_account_bruteforce",
    "source": "Elastic",
    "ruleName": "Potential Linux Local Account Brute Force Detected",
    "ruleSlug": "credential_access_potential_linux_local_account_bruteforce",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_potential_linux_local_account_bruteforce",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_potential_linux_ssh_bruteforce_external",
    "source": "Elastic",
    "ruleName": "Potential External Linux SSH Brute Force Detected",
    "ruleSlug": "credential_access_potential_linux_ssh_bruteforce_external",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_potential_linux_ssh_bruteforce_external",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_potential_linux_ssh_bruteforce_internal",
    "source": "Elastic",
    "ruleName": "Potential Internal Linux SSH Brute Force Detected",
    "ruleSlug": "credential_access_potential_linux_ssh_bruteforce_internal",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_potential_linux_ssh_bruteforce_internal",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_potential_lsa_memdump_via_mirrordump",
    "source": "Elastic",
    "ruleName": "Potential Credential Access via DuplicateHandle in LSASS",
    "ruleSlug": "credential_access_potential_lsa_memdump_via_mirrordump",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_potential_lsa_memdump_via_mirrordump",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
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
    "id": "elastic-credential_access_potential_macos_ssh_bruteforce",
    "source": "Elastic",
    "ruleName": "Potential macOS SSH Brute Force Detected",
    "ruleSlug": "credential_access_potential_macos_ssh_bruteforce",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_potential_macos_ssh_bruteforce",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_potential_password_spraying_attack",
    "source": "Elastic",
    "ruleName": "Potential Password Spraying Attack via SSH",
    "ruleSlug": "credential_access_potential_password_spraying_attack",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_potential_password_spraying_attack",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_potential_successful_linux_ssh_bruteforce",
    "source": "Elastic",
    "ruleName": "Potential Successful SSH Brute Force Attack",
    "ruleSlug": "credential_access_potential_successful_linux_ssh_bruteforce",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_potential_successful_linux_ssh_bruteforce",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_proc_credential_dumping",
    "source": "Elastic",
    "ruleName": "Potential Linux Credential Dumping via Proc Filesystem",
    "ruleSlug": "credential_access_proc_credential_dumping",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_proc_credential_dumping",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "taskmgr_lsass_dump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_dump"
  },
  {
    "id": "elastic-credential_access_python_sensitive_file_access_first_occurrence",
    "source": "Elastic",
    "ruleName": "First Time Python Accessed Sensitive Credential Files",
    "ruleSlug": "credential_access_python_sensitive_file_access_first_occurrence",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_python_sensitive_file_access_first_occurrence",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_rapid_secret_retrieval_attempts_from_secretsmanager",
    "source": "Elastic",
    "ruleName": "AWS Secrets Manager Rapid Secrets Retrieval",
    "ruleSlug": "credential_access_rapid_secret_retrieval_attempts_from_secretsmanager",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_rapid_secret_retrieval_attempts_from_secretsmanager",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_regback_sam_security_hives",
    "source": "Elastic",
    "ruleName": "Sensitive Registry Hive Access via RegBack",
    "ruleSlug": "credential_access_regback_sam_security_hives",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_regback_sam_security_hives",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.002"
    ],
    "attackStepIds": [
      "reg_save_security"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_remote_sam_secretsdump",
    "source": "Elastic",
    "ruleName": "Potential Remote Credential Access via Registry",
    "ruleSlug": "credential_access_remote_sam_secretsdump",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_remote_sam_secretsdump",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "low",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "taskmgr_lsass_dump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_retrieve_secure_string_parameters_via_ssm",
    "source": "Elastic",
    "ruleName": "AWS Systems Manager SecureString Parameter Request with Decryption Flag",
    "ruleSlug": "credential_access_retrieve_secure_string_parameters_via_ssm",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_retrieve_secure_string_parameters_via_ssm",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_root_console_failure_brute_force",
    "source": "Elastic",
    "ruleName": "AWS Management Console Brute Force of Root User Identity",
    "ruleSlug": "credential_access_root_console_failure_brute_force",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_root_console_failure_brute_force",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_saved_creds_vault_winlog",
    "source": "Elastic",
    "ruleName": "Multiple Vault Web Credentials Read",
    "ruleSlug": "credential_access_saved_creds_vault_winlog",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_saved_creds_vault_winlog",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.002"
    ],
    "attackStepIds": [
      "reg_save_sam"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_saved_creds_vaultcmd",
    "source": "Elastic",
    "ruleName": "Searching for Saved Credentials via VaultCmd",
    "ruleSlug": "credential_access_saved_creds_vaultcmd",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_saved_creds_vaultcmd",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.002"
    ],
    "attackStepIds": [
      "reg_save_sam"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "vaultcmd"
  },
  {
    "id": "elastic-credential_access_seenabledelegationprivilege_assigned_to_user",
    "source": "Elastic",
    "ruleName": "Sensitive Privilege SeEnableDelegationPrivilege assigned to a User",
    "ruleSlug": "credential_access_seenabledelegationprivilege_assigned_to_user",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_seenabledelegationprivilege_assigned_to_user",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_sensitive_keys_or_passwords_search_inside_a_container",
    "source": "Elastic",
    "ruleName": "Sensitive Keys Or Passwords Search Detected via Defend for Containers",
    "ruleSlug": "credential_access_sensitive_keys_or_passwords_search_inside_a_container",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_sensitive_keys_or_passwords_search_inside_a_container",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_sensitive_keys_or_passwords_search_inside_container",
    "source": "Elastic",
    "ruleName": "Sensitive Keys Or Passwords Searched For Inside A Container",
    "ruleSlug": "credential_access_sensitive_keys_or_passwords_search_inside_container",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_sensitive_keys_or_passwords_search_inside_container",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_service_account_token_or_cert_read",
    "source": "Elastic",
    "ruleName": "Service Account Token or Certificate Read Detected via Defend for Containers",
    "ruleSlug": "credential_access_service_account_token_or_cert_read",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_service_account_token_or_cert_read",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_shadow_credentials",
    "source": "Elastic",
    "ruleName": "Potential Shadow Credentials added to AD Object",
    "ruleSlug": "credential_access_shadow_credentials",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_shadow_credentials",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_spn_attribute_modified",
    "source": "Elastic",
    "ruleName": "User account exposed to Kerberoasting",
    "ruleSlug": "credential_access_spn_attribute_modified",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_spn_attribute_modified",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_ssh_backdoor_log",
    "source": "Elastic",
    "ruleName": "Potential OpenSSH Backdoor Logging Activity",
    "ruleSlug": "credential_access_ssh_backdoor_log",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_ssh_backdoor_log",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "medium",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_ssh_password_grabbing_via_strace",
    "source": "Elastic",
    "ruleName": "Potential SSH Password Grabbing via strace",
    "ruleSlug": "credential_access_ssh_password_grabbing_via_strace",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_ssh_password_grabbing_via_strace",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "medium",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_storage_account_key_regenerated",
    "source": "Elastic",
    "ruleName": "Azure Storage Account Key Regenerated",
    "ruleSlug": "credential_access_storage_account_key_regenerated",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_storage_account_key_regenerated",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_suspicious_comsvcs_imageload",
    "source": "Elastic",
    "ruleName": "Potential Credential Access via Renamed COM+ Services DLL",
    "ruleSlug": "credential_access_suspicious_comsvcs_imageload",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_suspicious_comsvcs_imageload",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "overlapGroupId": "comsvcs",
    "classification": "overlap",
    "notes": "comsvcs"
  },
  {
    "id": "elastic-credential_access_suspicious_lsass_access_generic",
    "source": "Elastic",
    "ruleName": "Suspicious Lsass Process Access",
    "ruleSlug": "credential_access_suspicious_lsass_access_generic",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_suspicious_lsass_access_generic",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
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
    "id": "elastic-credential_access_suspicious_lsass_access_memdump",
    "source": "Elastic",
    "ruleName": "Potential Credential Access via LSASS Memory Dump",
    "ruleSlug": "credential_access_suspicious_lsass_access_memdump",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_suspicious_lsass_access_memdump",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
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
    "id": "elastic-credential_access_suspicious_lsass_access_via_snapshot",
    "source": "Elastic",
    "ruleName": "Potential LSASS Memory Dump via PssCaptureSnapShot",
    "ruleSlug": "credential_access_suspicious_lsass_access_via_snapshot",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_suspicious_lsass_access_via_snapshot",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
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
    "id": "elastic-credential_access_suspicious_web_browser_sensitive_file_access",
    "source": "Elastic",
    "ruleName": "Suspicious Web Browser Sensitive File Access",
    "ruleSlug": "credential_access_suspicious_web_browser_sensitive_file_access",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_suspicious_web_browser_sensitive_file_access",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_systemkey_dumping",
    "source": "Elastic",
    "ruleName": "SystemKey Access via Command Line",
    "ruleSlug": "credential_access_systemkey_dumping",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_systemkey_dumping",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "taskmgr_lsass_dump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_trufflehog_execution",
    "source": "Elastic",
    "ruleName": "Credential Access via TruffleHog Execution",
    "ruleSlug": "credential_access_trufflehog_execution",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_trufflehog_execution",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_user_impersonation_access",
    "source": "Elastic",
    "ruleName": "Okta User Session Impersonation",
    "ruleSlug": "credential_access_user_impersonation_access",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_user_impersonation_access",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_veeam_backup_dll_imageload",
    "source": "Elastic",
    "ruleName": "Veeam Backup Library Loaded by Unusual Process",
    "ruleSlug": "credential_access_veeam_backup_dll_imageload",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_veeam_backup_dll_imageload",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_veeam_commands",
    "source": "Elastic",
    "ruleName": "Potential Veeam Credential Access Command",
    "ruleSlug": "credential_access_veeam_commands",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_veeam_commands",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "high",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-credential_access_via_snapshot_lsass_clone_creation",
    "source": "Elastic",
    "ruleName": "Potential LSASS Clone Creation via PssCaptureSnapShot",
    "ruleSlug": "credential_access_via_snapshot_lsass_clone_creation",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_via_snapshot_lsass_clone_creation",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
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
    "id": "elastic-credential_access_wbadmin_ntds",
    "source": "Elastic",
    "ruleName": "NTDS Dump via Wbadmin",
    "ruleSlug": "credential_access_wbadmin_ntds",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_wbadmin_ntds",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.003"
    ],
    "attackStepIds": [
      "copy_ntds"
    ],
    "hitCount": 1,
    "overlapGroupId": "ntds_dit",
    "classification": "overlap",
    "notes": "ntds.dit"
  },
  {
    "id": "elastic-credential_access_wireless_creds_dumping",
    "source": "Elastic",
    "ruleName": "Wireless Credential Dumping using Netsh Command",
    "ruleSlug": "credential_access_wireless_creds_dumping",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=credential_access_wireless_creds_dumping",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "taskmgr_lsass_dump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "credential_access_"
  },
  {
    "id": "elastic-defense_evasion_obf_args_unicode_modified_letters",
    "source": "Elastic",
    "ruleName": "Command Obfuscation via Unicode Modifier Letters",
    "ruleSlug": "defense_evasion_obf_args_unicode_modified_letters",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=defense_evasion_obf_args_unicode_modified_letters",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "high",
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
    "id": "elastic-defense_evasion_suspicious_process_access_direct_syscall",
    "source": "Elastic",
    "ruleName": "Suspicious Process Access via Direct System Call",
    "ruleSlug": "defense_evasion_suspicious_process_access_direct_syscall",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=defense_evasion_suspicious_process_access_direct_syscall",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "high",
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
    "id": "elastic-defense_evasion_system_critical_proc_abnormal_file_activity",
    "source": "Elastic",
    "ruleName": "Unusual Executable File Creation by a System Critical Process",
    "ruleSlug": "defense_evasion_system_critical_proc_abnormal_file_activity",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=defense_evasion_system_critical_proc_abnormal_file_activity",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "high",
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
    "id": "elastic-discovery_posh_invoke_sharefinder",
    "source": "Elastic",
    "ruleName": "PowerShell Share Enumeration Script",
    "ruleSlug": "discovery_posh_invoke_sharefinder",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=discovery_posh_invoke_sharefinder",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "low",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "posh_invoke_sharefinder"
  },
  {
    "id": "elastic-discovery_tool_enumeration",
    "source": "Elastic",
    "ruleName": "Tool Enumeration Detected via Defend for Containers",
    "ruleSlug": "discovery_tool_enumeration",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=discovery_tool_enumeration",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "low",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "ccache"
  },
  {
    "id": "elastic-execution_command_shell_started_by_unusual_process",
    "source": "Elastic",
    "ruleName": "Unusual Parent Process for cmd.exe",
    "ruleSlug": "execution_command_shell_started_by_unusual_process",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=execution_command_shell_started_by_unusual_process",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "medium",
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
    "id": "elastic-execution_network_event_post_compilation",
    "source": "Elastic",
    "ruleName": "Network Connection via Recently Compiled Executable",
    "ruleSlug": "execution_network_event_post_compilation",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=execution_network_event_post_compilation",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "medium",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "ccache"
  },
  {
    "id": "elastic-execution_posh_hacktool_functions",
    "source": "Elastic",
    "ruleName": "Potential PowerShell HackTool Script by Function Names",
    "ruleSlug": "execution_posh_hacktool_functions",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=execution_posh_hacktool_functions",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "medium",
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
    "id": "elastic-execution_via_hidden_shell_conhost",
    "source": "Elastic",
    "ruleName": "Conhost Spawned By Suspicious Parent Process",
    "ruleSlug": "execution_via_hidden_shell_conhost",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=execution_via_hidden_shell_conhost",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "medium",
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
    "id": "elastic-lateral_movement_credential_access_kerberos_bifrostconsole",
    "source": "Elastic",
    "ruleName": "Potential Kerberos Attack via Bifrost",
    "ruleSlug": "lateral_movement_credential_access_kerberos_bifrostconsole",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=lateral_movement_credential_access_kerberos_bifrostconsole",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "critical",
    "techniqueIds": [
      "T1558.003"
    ],
    "attackStepIds": [
      "rubeus_kerberoast"
    ],
    "hitCount": 1,
    "overlapGroupId": "kerberoast",
    "classification": "overlap",
    "notes": "kerberoast"
  },
  {
    "id": "elastic-lateral_movement_credential_access_kerberos_correlation",
    "source": "Elastic",
    "ruleName": "Suspicious Kerberos Authentication Ticket Request",
    "ruleSlug": "lateral_movement_credential_access_kerberos_correlation",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=lateral_movement_credential_access_kerberos_correlation",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
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
    "id": "elastic-persistence_ad_adminsdholder",
    "source": "Elastic",
    "ruleName": "AdminSDHolder Backdoor",
    "ruleSlug": "persistence_ad_adminsdholder",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=persistence_ad_adminsdholder",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "medium",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "adminsdholder"
  },
  {
    "id": "elastic-privilege_escalation_krbrelayup_service_creation",
    "source": "Elastic",
    "ruleName": "Service Creation via Local Kerberos Authentication",
    "ruleSlug": "privilege_escalation_krbrelayup_service_creation",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=privilege_escalation_krbrelayup_service_creation",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "low",
    "techniqueIds": [
      "T1003.001"
    ],
    "attackStepIds": [
      "comsvcs_minidump"
    ],
    "hitCount": 1,
    "classification": "observe",
    "notes": "kerberos ticket"
  },
  {
    "id": "elastic-privilege_escalation_tokenmanip_sedebugpriv_enabled",
    "source": "Elastic",
    "ruleName": "SeDebugPrivilege Enabled by a Suspicious Process",
    "ruleSlug": "privilege_escalation_tokenmanip_sedebugpriv_enabled",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=privilege_escalation_tokenmanip_sedebugpriv_enabled",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "low",
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
    "id": "elastic-privilege_escalation_unusual_parentchild_relationship",
    "source": "Elastic",
    "ruleName": "Unusual Parent-Child Relationship",
    "ruleSlug": "privilege_escalation_unusual_parentchild_relationship",
    "lookupUrl": "https://github.com/elastic/detection-rules/search?q=privilege_escalation_unusual_parentchild_relationship",
    "applyHint": "Search the slug in elastic/detection-rules and enable/tune it in Kibana.",
    "severity": "low",
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
      "sigma-file_event_win_lsass_default_dump_file_names",
      "sigma-file_event_win_ntds_dit_creation",
      "sigma-file_event_win_powershell_exploit_scripts",
      "sigma-file_event_win_shell_write_susp_files_extensions",
      "sigma-file_event_win_susp_dpapi_backup_and_cert_export_ioc",
      "sigma-image_load_side_load_aruba_networks_virtual_intranet_access",
      "sigma-posh_pm_exploit_scripts",
      "sigma-proc_access_win_hktl_generic_access",
      "sigma-proc_access_win_hktl_handlekatz_lsass_access",
      "sigma-proc_access_win_lsass_dump_comsvcs_dll",
      "sigma-proc_access_win_lsass_dump_keyword_image",
      "sigma-proc_access_win_lsass_memdump",
      "sigma-proc_access_win_lsass_powershell_access",
      "sigma-proc_access_win_lsass_remote_access_trough_winrm",
      "sigma-proc_access_win_lsass_susp_source_process",
      "sigma-proc_access_win_lsass_whitelisted_process_names",
      "sigma-proc_creation_win_citrix_trolleyexpress_procdump",
      "sigma-proc_creation_win_esentutl_sensitive_file_copy",
      "sigma-proc_creation_win_hktl_certipy",
      "sigma-proc_creation_win_hktl_impacket_tools",
      "sigma-proc_creation_win_hktl_rubeus",
      "sigma-proc_creation_win_hktl_sharp_dpapi_execution",
      "sigma-proc_creation_win_hktl_sharpview",
      "sigma-proc_creation_win_hktl_xordump",
      "sigma-proc_creation_win_powershell_dsinternals_cmdlets",
      "sigma-proc_creation_win_powershell_malicious_cmdlets",
      "sigma-proc_creation_win_pua_seatbelt",
      "sigma-proc_creation_win_renamed_sysinternals_procdump",
      "sigma-proc_creation_win_rundll32_process_dump_via_comsvcs",
      "sigma-proc_creation_win_rundll32_susp_activity",
      "sigma-proc_creation_win_susp_ntds",
      "sigma-proc_creation_win_susp_progname",
      "sigma-proc_creation_win_sysinternals_procdump_lsass",
      "sigma-proc_creation_win_sysinternals_tools_masquerading",
      "sigma-registry_event_cve_2021_1675_mimikatz_printernightmare_drivers",
      "sigma-registry_event_disable_wdigest_credential_guard",
      "sigma-registry_event_silentprocessexit_lsass",
      "sigma-registry_event_susp_lsass_dll_load",
      "sigma-registry_set_lsass_usermode_dumping",
      "sigma-registry_set_pua_sysinternals_renamed_execution_via_eula",
      "sigma-registry_set_pua_sysinternals_susp_execution_via_eula",
      "sigma-registry_set_renamed_sysinternals_eula_accepted",
      "sigma-registry_set_wdigest_enable_uselogoncredential",
      "sigma-win_defender_asr_lsass_access",
      "sigma-win_security_dpapi_domain_masterkey_backup_attempt",
      "sigma-win_security_kerberoasting_activity",
      "sigma-win_security_lsass_access_non_system_account",
      "sigma-win_security_susp_lsass_dump",
      "sigma-win_security_transf_files_with_cred_data_via_network_shares",
      "elastic-command_and_control_beaconing",
      "elastic-credential_access_cmdline_dump_tool",
      "elastic-credential_access_copy_ntds_sam_volshadowcp_cmdline",
      "elastic-credential_access_dollar_account_relay_kerberos",
      "elastic-credential_access_dollar_account_relay_ntlm",
      "elastic-credential_access_domain_backup_dpapi_private_keys",
      "elastic-credential_access_forced_authentication_pipes",
      "elastic-credential_access_kerberoasting_unusual_process",
      "elastic-credential_access_kirbi_file",
      "elastic-credential_access_ldap_attributes",
      "elastic-credential_access_lsass_handle_via_malseclogon",
      "elastic-credential_access_lsass_loaded_susp_dll",
      "elastic-credential_access_lsass_memdump_file_created",
      "elastic-credential_access_lsass_memdump_handle_access",
      "elastic-credential_access_lsass_openprocess_api",
      "elastic-credential_access_mimikatz_memssp_default_logs",
      "elastic-credential_access_mimikatz_powershell_module",
      "elastic-credential_access_mod_wdigest_security_provider",
      "elastic-credential_access_potential_lsa_memdump_via_mirrordump",
      "elastic-credential_access_suspicious_comsvcs_imageload",
      "elastic-credential_access_suspicious_lsass_access_generic",
      "elastic-credential_access_suspicious_lsass_access_memdump",
      "elastic-credential_access_suspicious_lsass_access_via_snapshot",
      "elastic-credential_access_via_snapshot_lsass_clone_creation",
      "elastic-credential_access_wbadmin_ntds",
      "elastic-defense_evasion_obf_args_unicode_modified_letters",
      "elastic-defense_evasion_suspicious_process_access_direct_syscall",
      "elastic-defense_evasion_system_critical_proc_abnormal_file_activity",
      "elastic-execution_command_shell_started_by_unusual_process",
      "elastic-execution_posh_hacktool_functions",
      "elastic-execution_via_hidden_shell_conhost",
      "elastic-lateral_movement_credential_access_kerberos_bifrostconsole",
      "elastic-lateral_movement_credential_access_kerberos_correlation",
      "elastic-privilege_escalation_tokenmanip_sedebugpriv_enabled",
      "elastic-privilege_escalation_unusual_parentchild_relationship"
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
