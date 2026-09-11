import {
  CalendarDays,
  FileText,
  Folder,
  MonitorSmartphone,
  ScrollText,
  Waypoints,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  CalendarDays,
  Workflow,
  FileText,
  MonitorSmartphone,
  ScrollText,
  Waypoints,
};

export function getDeliveryIcon(name: string): LucideIcon {
  return iconMap[name] ?? Folder;
}
